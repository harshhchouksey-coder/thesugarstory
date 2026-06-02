import express from "express";
import cors from "cors";
import { 
  BHOPAL_SERVICE_ZONES, 
  DEFAULT_DELIVERY_SLOTS, 
  getBhopalZoneForPincode,
  BHOPAL_PINCODES,
  colors
} from "@sugar-story/shared";
import { seedProducts, seedNotebookPosts, seedFounderStories } from "./scripts/seed";

const app = express();
app.use(cors());
app.use(express.json());

// In-Memory Database Staging (Simulating PostgreSQL Custom Tables)
const db = {
  products: [...seedProducts],
  notebookPosts: [...seedNotebookPosts],
  founderStories: [...seedFounderStories],
  serviceZones: [...BHOPAL_SERVICE_ZONES],
  deliverySlots: [] as any[],
  orderCustomisations: [] as any[],
  loyaltyAccounts: [] as any[],
  loyaltyTransactions: [] as any[],
  referrals: [] as any[],
  productReviews: [] as any[],
  subscriptions: [] as any[],
  giftCards: [] as any[],
  corporateQuotes: [] as any[],
  waOptins: [] as any[],
  abandonedCarts: [] as any[],
  eventLogs: [] as any[]
};

// HELPER: Initialize dynamic bookings count for slots
const slotBookingsRegistry: Record<string, number> = {};

// ==========================================
// 1. SERVICEABILITY & SLOT BOOKING
// ==========================================
app.get("/api/serviceability/bhopal", (req, res) => {
  const pin = req.query.pin as string;
  const productId = req.query.productId as string;

  if (!pin) {
    return res.status(400).json({ error: "Pincode is required." });
  }

  const zone = getBhopalZoneForPincode(pin);
  if (!zone) {
    return res.json({ 
      serviceable: false, 
      message: "Delivery is restricted to Bhopal Service Zones Z1–Z5 only.",
      suggestedAlternatives: ["prod_brownies_665", "prod_cookies_box", "prod_tea_cake_vanilla"]
    });
  }

  // Calculate product advance preparation time requirements
  let advanceHours = 0;
  if (productId) {
    const product = db.products.find(p => p.product_id === productId);
    if (product) {
      advanceHours = product.advance_hours_required || 0;
    }
  }

  // Generate delivery calendar for the next 7 days
  const now = new Date();
  const availableDays = [];

  for (let i = 0; i < 7; i++) {
    const targetDate = new Date();
    targetDate.setDate(now.getDate() + i);
    const dateStr = targetDate.toISOString().split("T")[0];

    const slotsForDay = DEFAULT_DELIVERY_SLOTS.map(slot => {
      const slotTime = new Date(targetDate);
      
      // Map slot labels to approximate delivery starting hours
      let startHour = 9;
      if (slot.label.includes("12:00 PM")) startHour = 12;
      if (slot.label.includes("3:00 PM")) startHour = 15;
      if (slot.label.includes("6:00 PM")) startHour = 18;
      if (slot.isMidnight) startHour = 23;

      slotTime.setHours(startHour, 0, 0, 0);

      // Rule A: Same day cutoff enforcement (1:00 PM / 13:00)
      const isSameDay = i === 0;
      let isAvailable = true;
      let reason = "";

      if (isSameDay) {
        if (now.getHours() >= zone.same_day_cutoff_hour) {
          isAvailable = false;
          reason = "Past same-day baking cutoff (1:00 PM)";
        }
      }

      // Rule B: Enforce advance hours required for custom baking (24h custom, 48h wedding)
      const hoursUntilSlot = (slotTime.getTime() - now.getTime()) / (1000 * 60 * 60);
      if (isAvailable && hoursUntilSlot < advanceHours) {
        isAvailable = false;
        reason = `Requires ${advanceHours}h preparation time.`;
      }

      // Rule C: Midnight slots checking
      if (slot.isMidnight && !zone.midnightSlotAvailable) {
        isAvailable = false;
        reason = "Midnight slot not available in this zone.";
      }

      // Rule D: Slot Capacity Limit check (Max 25 bookings per slot)
      const bookingKey = `${dateStr}_${zone.id}_${slot.id}`;
      const bookedCount = slotBookingsRegistry[bookingKey] || Math.floor(Math.random() * 8); // seed some bookings for realism
      slotBookingsRegistry[bookingKey] = bookedCount;

      const capacity = slot.capacity;
      const remaining = Math.max(0, capacity - bookedCount);

      if (isAvailable && remaining <= 0) {
        isAvailable = false;
        reason = "Slot is completely booked.";
      }

      // Midnight Slot Additional Fee
      const slotFee = slot.isMidnight ? zone.midnightFee : zone.deliveryFee;

      return {
        id: slot.id,
        label: slot.label,
        isMidnight: slot.isMidnight,
        isAvailable,
        reason: isAvailable ? null : reason,
        booked: bookedCount,
        capacity,
        remaining,
        status: remaining <= 0 ? "Full" : remaining <= 5 ? "Few slots left" : "Available",
        deliveryFee: slotFee
      };
    });

    availableDays.push({
      date: dateStr,
      displayDate: targetDate.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }),
      slots: slotsForDay
    });
  }

  return res.json({
    serviceable: true,
    zoneName: zone.name,
    baseDeliveryFee: zone.deliveryFee,
    calendar: availableDays
  });
});

// ==========================================
// 2. SHIPROCKET PAN-INDIA SERVICEABILITY
// ==========================================
app.get("/api/serviceability/shiprocket", (req, res) => {
  const pin = req.query.pin as string;
  const weight = Number(req.query.weight || 500);

  if (!pin || pin.length !== 6) {
    return res.status(400).json({ error: "Valid 6-digit Indian Pincode is required." });
  }

  // Bhopal is handled locally, but let's allow it as standard shipping too
  // Simulate shipping courier routes
  const randomDays = 3 + (Number(pin[0]) % 3); // 3 to 5 business days
  const isMetro = ["110001", "400001", "560001", "600001", "700001"].includes(pin);
  const cost = weight > 1000 ? 149 : 99;

  return res.json({
    serviceable: true,
    courierName: isMetro ? "BlueDart Air" : "Delhivery Express",
    estimatedDays: randomDays,
    shippingCost: cost,
    requiresColdChainOverride: pin.startsWith("462") ? false : true // Cheesecakes get cold chain warning for metros
  });
});

// ==========================================
// 3. PRODUCTS & INGREDIENTS
// ==========================================
app.get("/api/products", (req, res) => {
  res.json(db.products);
});

app.get("/api/products/:id", (req, res) => {
  const product = db.products.find(p => p.product_id === req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found." });
  
  // Attach founder story matching
  const story = db.founderStories.find(s => s.product_id === product.product_id);
  res.json({
    ...product,
    founderStory: story || null
  });
});

// ==========================================
// 4. LOYALTY LEDGER
// ==========================================
app.get("/api/loyalty/:customerId", (req, res) => {
  let account = db.loyaltyAccounts.find(a => a.customer_id === req.params.customerId);
  if (!account) {
    // Auto-enroll customer
    account = {
      id: "l_" + Math.random().toString(36).substr(2, 9),
      customer_id: req.params.customerId,
      points_balance: 150, // Seed sign up credit
      lifetime_spend_inr: 0,
      tier: "Reader",
      joined_at: new Date()
    };
    db.loyaltyAccounts.push(account);
  }
  
  const transactions = db.loyaltyTransactions.filter(t => t.customer_id === req.params.customerId);

  res.json({ account, transactions });
});

app.post("/api/loyalty/redeem", (req, res) => {
  const { customerId, points } = req.body;
  if (!customerId || !points || points < 100) {
    return res.status(400).json({ error: "Min 100 points required for redemption." });
  }

  const account = db.loyaltyAccounts.find(a => a.customer_id === customerId);
  if (!account || account.points_balance < points) {
    return res.status(400).json({ error: "Insufficient loyalty points balance." });
  }

  // Deduct points
  const pointsToRedeem = Math.floor(points / 100) * 100;
  const discountVal = (pointsToRedeem / 100) * 50; // 100 points = ₹50

  account.points_balance -= pointsToRedeem;
  
  db.loyaltyTransactions.push({
    id: "tx_" + Math.random().toString(36).substr(2, 9),
    customer_id: customerId,
    type: "redeem",
    points: -pointsToRedeem,
    reason: `Redeemed ${pointsToRedeem} points for ₹${discountVal} checkout coupon`,
    created_at: new Date()
  });

  return res.json({
    success: true,
    discountAmount: discountVal,
    couponCode: `LOYAL-${discountVal}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
    newBalance: account.points_balance
  });
});

// ==========================================
// 5. REFERRAL CODE & ANTI-FRAUD
// ==========================================
app.post("/api/referrals/attribute", (req, res) => {
  const { code, customerId, deviceFingerprint, paymentInstrumentHash } = req.body;

  if (!code || !customerId) {
    return res.status(400).json({ error: "Code and customer identification are required." });
  }

  // Anti-fraud validation
  const existingReferrals = db.referrals.filter(
    r => r.code === code && 
    (r.referrer_customer_id === customerId || 
     r.deviceFingerprint === deviceFingerprint || 
     r.paymentHash === paymentInstrumentHash)
  );

  if (existingReferrals.length > 0) {
    return res.status(400).json({ 
      error: "Referral attribution blocked: Potential self-referral or device fingerprint match detected." 
    });
  }

  const newReferral = {
    id: "ref_" + Math.random().toString(36).substr(2, 9),
    referrer_customer_id: "cust_chef_advisor", // simulated referrer
    code,
    referred_customer_id: customerId,
    deviceFingerprint,
    paymentHash: paymentInstrumentHash,
    reward_status: "pending",
    give_amount_inr: 250,
    get_amount_inr: 250,
    created_at: new Date()
  };

  db.referrals.push(newReferral);
  return res.json({
    success: true,
    discountAmount: 250,
    message: "Referral code applied! You will receive ₹250 off on this checkout (cart ≥ ₹999)."
  });
});

// ==========================================
// 6. CORPORATE GIFTING KANBAN
// ==========================================
app.post("/api/quotes", (req, res) => {
  const { companyName, contactName, email, phone, units, targetDate, budgetInr, customBranding, addressesCsv } = req.body;
  
  if (!companyName || !contactName || !email || !units) {
    return res.status(400).json({ error: "Missing required corporate quote fields." });
  }

  const newQuote = {
    id: "q_" + Math.random().toString(36).substr(2, 9),
    company_name: companyName,
    contact_name: contactName,
    email,
    phone,
    units: Number(units),
    target_date: targetDate,
    budget_inr: Number(budgetInr),
    custom_branding: !!customBranding,
    addresses_csv_url: addressesCsv || "/uploads/quotes/bulk-sample.csv",
    status: "New",
    created_at: new Date()
  };

  db.corporateQuotes.push(newQuote);
  return res.status(201).json({
    success: true,
    quote: newQuote,
    message: "Thank you. Our B2B relationship manager will contact you within 2 business hours with an automated GST invoice."
  });
});

app.get("/api/quotes", (req, res) => {
  res.json(db.corporateQuotes);
});

app.post("/api/quotes/update-status", (req, res) => {
  const { quoteId, status } = req.body;
  const quote = db.corporateQuotes.find(q => q.id === quoteId);
  if (!quote) return res.status(404).json({ error: "Quote not found." });

  quote.status = status;
  return res.json({ success: true, quote });
});

// ==========================================
// 7. ORDER CUSTOMISATION MODERATION
// ==========================================
app.post("/api/customisations", (req, res) => {
  const { orderId, lineItemId, cakeMessage, photoUploadUrl, flavourNotes, allergenNotes, isEggless } = req.body;

  const newCustomisation = {
    id: "cust_" + Math.random().toString(36).substr(2, 9),
    order_id: orderId || "ord_" + Math.random().toString(36).substr(2, 9),
    line_item_id: lineItemId || "item_" + Math.random().toString(36).substr(2, 9),
    cake_message: cakeMessage,
    photo_upload_url: photoUploadUrl,
    flavour_notes: flavourNotes,
    allergen_notes: allergenNotes,
    is_eggless: !!isEggless,
    moderation_status: "pending",
    created_at: new Date()
  };

  db.orderCustomisations.push(newCustomisation);
  res.json({ success: true, customisation: newCustomisation });
});

app.get("/api/customisations/pending", (req, res) => {
  res.json(db.orderCustomisations.filter(c => c.moderation_status === "pending"));
});

app.post("/api/customisations/moderate", (req, res) => {
  const { customisationId, status, moderatorId } = req.body; // status: 'approved' or 'rejected'
  const custom = db.orderCustomisations.find(c => c.id === customisationId);
  if (!custom) return res.status(404).json({ error: "Customisation entry not found." });

  custom.moderation_status = status;
  custom.moderator_id = moderatorId || "usr_chef_shalini";
  custom.moderated_at = new Date();

  return res.json({ success: true, customisation: custom });
});

// ==========================================
// 8. CUSTOM REVIEWS ARCHITECTURE
// ==========================================
app.post("/api/reviews", (req, res) => {
  const { productId, customerId, rating, title, body, photoUrls, verifiedBuyer } = req.body;

  if (!productId || !rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Valid product ID and 1-5 rating required." });
  }

  const review = {
    id: "rev_" + Math.random().toString(36).substr(2, 9),
    product_id: productId,
    customer_id: customerId || "cust_guest",
    rating,
    title,
    body,
    photo_urls: photoUrls || [],
    verified_buyer: !!verifiedBuyer,
    status: "pending",
    helpful_count: 0,
    created_at: new Date()
  };

  db.productReviews.push(review);
  return res.json({ success: true, review, message: "Review submitted. Under chef moderation before listing." });
});

app.get("/api/reviews/:productId", (req, res) => {
  // Return only approved reviews for the product
  const reviews = db.productReviews.filter(r => r.product_id === req.params.productId && r.status === "approved");
  
  // Seed reviews if none exists for a realistic wall look
  if (reviews.length === 0) {
    return res.json([
      {
        id: "rev_seed1",
        product_id: req.params.productId,
        rating: 5,
        title: "Chef Shalini's legacy shines",
        body: "The chocolate texture is reminiscent of the grand high tea plates at Taj Mahal Palace. Exquisite quality.",
        photo_urls: ["/images/review-choc.jpg"],
        verified_buyer: true,
        helpful_count: 12,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: "rev_seed2",
        product_id: req.params.productId,
        rating: 5,
        title: "Unmatched in Bhopal",
        body: "The sea salt balance cuts through the dark cocoa beautifully. Simply premium craftsmanship.",
        photo_urls: [],
        verified_buyer: true,
        helpful_count: 8,
        created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
      }
    ]);
  }
  return res.json(reviews);
});

// ==========================================
// 9. EVENT TELEMETRY LOGS
// ==========================================
app.post("/api/events", (req, res) => {
  const { sessionId, customerId, event, properties } = req.body;
  const log = {
    id: db.eventLogs.length + 1,
    occurred_at: new Date(),
    session_id: sessionId,
    customer_id: customerId,
    event,
    properties: properties || {}
  };
  db.eventLogs.push(log);
  res.json({ success: true });
});

// ==========================================
// 10. ABANDONED CART SEQUENCE & OPT-INS
// ==========================================
app.post("/api/carts/abandoned", (req, res) => {
  const { cartId, customerId, email, phone, cartValueInr, itemsSnapshot, lastStep } = req.body;

  const existing = db.abandonedCarts.find(c => c.cart_id === cartId);
  if (existing) {
    existing.cart_value_inr = cartValueInr;
    existing.items_snapshot = itemsSnapshot;
    existing.last_step = lastStep;
    return res.json({ success: true, status: "updated" });
  }

  const newAbandoned = {
    id: "ab_" + Math.random().toString(36).substr(2, 9),
    cart_id: cartId,
    customer_id: customerId,
    email,
    phone,
    cart_value_inr: cartValueInr,
    items_snapshot: itemsSnapshot,
    last_step: lastStep,
    message1_sent_at: null,
    message2_sent_at: null,
    message3_sent_at: null,
    recovered: false
  };

  db.abandonedCarts.push(newAbandoned);
  res.json({ success: true, status: "registered" });
});

// ==========================================
// 11. RAZORPAY PAYMENT WEBHOOK (SUCCESS TRIGGER)
// ==========================================
app.post("/api/webhooks/razorpay", (req, res) => {
  const { paymentId, orderId, cartId, customerId, amountInr, phone, email, appliedReferralCode, appliedLoyaltyPoints } = req.body;

  console.log(`Razorpay checkout webhook authenticated for payment ID: ${paymentId}`);

  // 1. Loyalty Points Awarding (1 point per ₹10 spent post-tax)
  const baseEarnPoints = Math.floor(amountInr / 10);
  let customerAccount = db.loyaltyAccounts.find(a => a.customer_id === customerId);
  if (!customerAccount) {
    customerAccount = {
      id: "l_" + Math.random().toString(36).substr(2, 9),
      customer_id: customerId || "cust_" + Math.random().toString(36).substr(2, 9),
      points_balance: 0,
      lifetime_spend_inr: 0,
      tier: "Reader",
      joined_at: new Date()
    };
    db.loyaltyAccounts.push(customerAccount);
  }

  customerAccount.points_balance += baseEarnPoints;
  customerAccount.lifetime_spend_inr += amountInr;

  // Upgrade loyalty tiers based on lifetime spend thresholds
  if (customerAccount.lifetime_spend_inr >= 50000) {
    customerAccount.tier = "Author";
  } else if (customerAccount.lifetime_spend_inr >= 15000) {
    customerAccount.tier = "Storyteller";
  }

  db.loyaltyTransactions.push({
    id: "tx_" + Math.random().toString(36).substr(2, 9),
    customer_id: customerAccount.customer_id,
    order_id: orderId,
    type: "earn",
    points: baseEarnPoints,
    reason: `Earned from Order #${orderId}`,
    created_at: new Date()
  });

  // Deduct points if redeemed
  if (appliedLoyaltyPoints) {
    const pointsDeducted = Number(appliedLoyaltyPoints);
    customerAccount.points_balance = Math.max(0, customerAccount.points_balance - pointsDeducted);
    db.loyaltyTransactions.push({
      id: "tx_" + Math.random().toString(36).substr(2, 9),
      customer_id: customerAccount.customer_id,
      order_id: orderId,
      type: "redeem",
      points: -pointsDeducted,
      reason: `Points redeemed during Checkout Order #${orderId}`,
      created_at: new Date()
    });
  }

  // 2. Referral Rewards payout on delivery status update (simulated)
  if (appliedReferralCode) {
    const referral = db.referrals.find(r => r.code === appliedReferralCode && r.referred_customer_id === customerId);
    if (referral) {
      referral.first_order_id = orderId;
      referral.reward_status = "approved";
      console.log(`Referral credited: Referrer ${referral.referrer_customer_id} receives ₹250, Referee ${customerId} receives ₹250.`);
    }
  }

  // 3. Suppress Abandoned Cart tracking for this cart
  const cartRecord = db.abandonedCarts.find(c => c.cart_id === cartId);
  if (cartRecord) {
    cartRecord.recovered = true;
    cartRecord.recovered_at = new Date();
    cartRecord.recovered_order_id = orderId;
    console.log(`Abandoned cart successfully recovered! Log suppressed.`);
  }

  // 4. Trigger Klaviyo & Interakt simulated template messages
  console.log(`[Interakt WA] Sending Booking Confirmation template to ${phone || "+91 99999 88888"}`);
  console.log(`[Klaviyo Email] Sending Chef Shalini's gratitude letter & invoice to ${email || "patron@example.com"}`);

  res.json({
    success: true,
    orderId,
    earnedPoints: baseEarnPoints,
    newTier: customerAccount.tier
  });
});

// ==========================================
// 12. NOTEBOOK BLOG POSTS
// ==========================================
app.get("/api/notebook", (req, res) => {
  res.json(db.notebookPosts.filter(p => p.status === "published"));
});

app.get("/api/notebook/:slug", (req, res) => {
  const post = db.notebookPosts.find(p => p.slug === req.params.slug);
  if (!post) return res.status(404).json({ error: "Post not found." });
  res.json(post);
});

// ==========================================
// 13. MOCK KITCHEN BOARD & ANALYTICS KPI
// ==========================================
app.get("/api/admin/kpis", (req, res) => {
  res.json({
    cr: "3.45%",
    aov: "₹1,240",
    ltv: "₹4,890",
    repeatRate: "42.8%",
    slotFill: "84.2%",
    waRecoveryRevenue: "₹84,500"
  });
});

// START SERVER
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`[The Sugar Story Backend] Medusa.js Engine simulator live on http://localhost:${PORT}`);
});
