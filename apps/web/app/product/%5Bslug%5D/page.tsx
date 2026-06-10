"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  Truck, 
  Calendar, 
  Clock, 
  HelpCircle, 
  MapPin, 
  AlertCircle, 
  Cake,
  Check,
  Award,
  ShoppingBag
} from "lucide-react";
import { seedProducts } from "../../../../../backend/src/scripts/seed";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.slug as string;

  // State Management
  const [product, setProduct] = useState<any>(null);
  const [pincode, setPincode] = useState("");
  const [checking, setChecking] = useState(false);
  
  const [serviceStatus, setServiceStatus] = useState<"idle" | "serviceable" | "blocked">("idle");
  const [serviceMessage, setServiceMessage] = useState("");
  const [calendar, setCalendar] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [alternatives, setAlternatives] = useState<any[]>([]);
  const [shiprocketMeta, setShiprocketMeta] = useState<any>(null);

  // Customisations
  const [cakeMessage, setCakeMessage] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isEggless, setIsEggless] = useState(false);
  const [flavourNotes, setFlavourNotes] = useState("");
  const [allergenNotes, setAllergenNotes] = useState("");
  const [atcCompleted, setAtcCompleted] = useState(false);

  useEffect(() => {
    // Find product from seed catalog
    const found = seedProducts.find(p => p.product_id === productId);
    if (found) {
      setProduct(found);
    } else {
      // default fallback to first product
      setProduct(seedProducts[0]);
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <span className="text-stone text-xs uppercase tracking-widest animate-pulse">Gathering Chapters...</span>
      </div>
    );
  }

  // Handle serviceability check
  const handleCheckServiceability = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length !== 6 || isNaN(Number(pincode))) {
      alert("Please enter a valid 6-digit Indian pincode.");
      return;
    }

    setChecking(true);
    setServiceStatus("idle");
    setServiceMessage("");
    setCalendar([]);
    setShiprocketMeta(null);

    try {
      if (product.is_local_only) {
        // Query Bhopal Serviceability Simulator
        const res = await fetch(`http://localhost:9000/api/serviceability/bhopal?pin=${pincode}&productId=${product.product_id}`);
        const data = await res.json();

        if (data.serviceable) {
          setServiceStatus("serviceable");
          setCalendar(data.calendar);
          setSelectedDate(data.calendar[0]?.date || "");
          setServiceMessage(`Serviced by Bhopal Salon. Delivery Zone: ${data.zoneName}.`);
        } else {
          setServiceStatus("blocked");
          setServiceMessage(data.message || "Out of Bhopal delivery boundaries.");
          // Suggest pan-India items
          const suggested = seedProducts.filter(p => !p.is_local_only);
          setAlternatives(suggested);
        }
      } else {
        // Query Shiprocket Serviceability Simulator for Pan-India items
        const res = await fetch(`http://localhost:9000/api/serviceability/shiprocket?pin=${pincode}&weight=${product.pack_weight_grams}`);
        const data = await res.json();

        if (data.serviceable) {
          setServiceStatus("serviceable");
          setShiprocketMeta(data);
          setServiceMessage(`Serviced via Pan-India Courier. Courier partner: ${data.courierName}.`);
        } else {
          setServiceStatus("blocked");
          setServiceMessage("Location currently outside active service bounds.");
        }
      }
    } catch (err) {
      // Sandbox fallback if server not running
      console.log("Using checkout client fallback...", err);
      // Simulate Bhopal zones Z1-Z5
      const bhopalPins = ["462001", "462016", "462039", "462042", "462030", "462022", "462044"];
      const isBhopal = bhopalPins.some(p => pincode.startsWith(p.substring(0, 4)));

      if (product.is_local_only) {
        if (isBhopal) {
          setServiceStatus("serviceable");
          setServiceMessage("Serviced by Bhopal Salon (Z2 New Bhopal).");
          // Generate simple fallback mock dates
          const mockDays = [];
          for (let i = 1; i <= 3; i++) {
            mockDays.push({
              date: `2026-06-0${2+i}`,
              displayDate: `Jun ${2+i} (Day ${i})`,
              slots: [
                { id: "s1", label: "12:00 PM – 3:00 PM", isAvailable: true, remaining: 12, status: "Available", deliveryFee: 49 },
                { id: "s2", label: "6:00 PM – 9:00 PM", isAvailable: true, remaining: 3, status: "Few slots left", deliveryFee: 49 },
                { id: "s3", label: "11:30 PM – 12:30 AM", isAvailable: true, remaining: 2, status: "Few slots left", deliveryFee: 199 }
              ]
            });
          }
          setCalendar(mockDays);
          setSelectedDate(mockDays[0].date);
        } else {
          setServiceStatus("blocked");
          setServiceMessage("This delicate celebration item is restricted to Bhopal fresh delivery only.");
          setAlternatives(seedProducts.filter(p => !p.is_local_only));
        }
      } else {
        setServiceStatus("serviceable");
        setShiprocketMeta({
          courierName: "Delhivery Air",
          estimatedDays: 4,
          shippingCost: 99
        });
        setServiceMessage("Serviced via Shiprocket air delivery.");
      }
    } finally {
      setChecking(false);
    }
  };

  const handleAddToCart = () => {
    // If local and hasn't picked slot, trigger validation
    if (product.is_local_only && !selectedSlot) {
      alert("Please select an active delivery time slot before checkout.");
      return;
    }
    
    setAtcCompleted(true);
    setTimeout(() => {
      // Route directly to unified checkout, passing selections
      const params = new URLSearchParams({
        productId: product.product_id,
        pincode,
        selectedDate,
        selectedSlotId: selectedSlot?.id || "",
        selectedSlotLabel: selectedSlot?.label || "",
        isEggless: isEggless ? "true" : "false",
        cakeMessage
      });
      router.push(`/checkout?${params.toString()}`);
    }, 800);
  };

  // Extract slots for selected date
  const currentDaySlots = calendar.find(day => day.date === selectedDate)?.slots || [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Side: Exquisite Image Gallery */}
        <div className="space-y-6">
          <div className="relative aspect-square bg-stone/20 border border-stone/10 p-4">
            {/* Visual badging */}
            <div className="absolute top-8 left-8 z-10">
              {product.is_local_only ? (
                <span className="bg-[#5C7F5A] text-cream text-[10px] font-sans uppercase tracking-[0.2em] px-4 py-1.5 font-bold">
                  Bhopal Local Fresh
                </span>
              ) : (
                <span className="bg-primary text-cream text-[10px] font-sans uppercase tracking-[0.2em] px-4 py-1.5 font-bold">
                  Pan-India Shipping
                </span>
              )}
            </div>
            
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('/images/products/${product.product_id}.jpg')` }} />
          </div>

          {/* Premium Shelf-Life and Storage Guidelines Block */}
          <div className="bg-[#F6EFE3] border border-stone/30 p-6 text-left space-y-4">
            <h3 className="font-serif text-lg font-medium text-cocoa flex items-center gap-2">
              <ShieldCheck className="text-gold" size={16} />
              <span>Storage & Shelf-Life Chapter</span>
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs font-sans">
              <div>
                <p className="text-stone uppercase tracking-widest text-[9px] mb-1">Shelf Life</p>
                <p className="font-medium text-cocoa">{product.shelf_life_days} Days</p>
              </div>
              <div>
                <p className="text-stone uppercase tracking-widest text-[9px] mb-1">Fragile</p>
                <p className="font-medium text-cocoa">{product.fragile ? "Yes, handle carefully" : "Standard Care"}</p>
              </div>
              <div className="col-span-2">
                <p className="text-stone uppercase tracking-widest text-[9px] mb-1">Care Guidelines</p>
                <p className="text-cocoa/90 leading-relaxed italic">"{product.storage_instructions}"</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Product Details & Config Workspace */}
        <div className="space-y-8 text-left">
          
          {/* Header */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-semibold">
              {product.is_local_only ? "Bespoke Celebration Range" : "Luxury Pantry Collections"}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight">
              {product.title}
            </h1>
            <div className="flex items-center gap-4 border-b border-stone/20 pb-4">
              <span className="font-serif text-2xl font-semibold text-cocoa">
                ₹{product.price_inr}
              </span>
              <span className="text-[10px] font-sans text-stone uppercase tracking-widest">
                Inclusive of {product.gst_pct}% GST (HSN: {product.hsn_code})
              </span>
            </div>
            <p className="font-sans text-stone text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* ==========================================
              PINCODE GATING SERVICEABILITY WIDGET
              ========================================== */}
          <div className="border border-stone/30 p-6 bg-cream/40 space-y-6">
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-medium text-cocoa flex items-center gap-2">
                <MapPin size={16} className="text-gold" />
                <span>Serviceability & Slot Gater</span>
              </h3>
              <p className="font-sans text-stone text-[11px] leading-relaxed">
                {product.is_local_only 
                  ? "Delicate celebration cakes are hand-delivered only inside Bhopal zones Z1-Z5." 
                  : "Baked brownies and cookies are shipped across India using express cargo."}
              </p>
            </div>

            <form onSubmit={handleCheckServiceability} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={e => setPincode(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter 6-digit PIN code"
                className="flex-grow px-4 py-3 bg-cream border border-stone/40 text-xs font-sans rounded-none focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                disabled={checking}
                className="px-6 py-3 bg-primary hover:bg-cocoa text-cream text-[10px] font-sans font-medium uppercase tracking-widest transition-all"
              >
                {checking ? "Checking..." : "Check"}
              </button>
            </form>

            {/* Service Status Messages */}
            {serviceStatus !== "idle" && (
              <div className={`p-4 text-xs font-sans flex items-start gap-2 ${serviceStatus === "serviceable" ? "bg-success/10 text-success border-l-2 border-success" : "bg-error/10 text-error border-l-2 border-error"}`}>
                {serviceStatus === "serviceable" ? (
                  <>
                    <Check size={14} className="mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-semibold">{serviceMessage}</p>
                      {shiprocketMeta && (
                        <p className="text-cocoa/80">Estimated Delivery: <strong>{shiprocketMeta.estimatedDays} Business Days</strong>. Cargo Rate: ₹{shiprocketMeta.shippingCost}</p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle size={14} className="mt-0.5" />
                    <div className="space-y-2">
                      <p className="font-semibold">{serviceMessage}</p>
                      
                      {/* Suggest Pan-India alternatives */}
                      {alternatives.length > 0 && (
                        <div className="pt-2 border-t border-error/20 space-y-2">
                          <p className="text-[10px] uppercase tracking-wider text-cocoa font-bold">Suggested Pan-India Chapters:</p>
                          <div className="grid grid-cols-2 gap-2">
                            {alternatives.map(alt => (
                              <button
                                key={alt.product_id}
                                onClick={() => router.push(`/product/${alt.product_id}`)}
                                className="p-2 border border-error/30 text-left hover:bg-cream transition-all flex flex-col justify-between"
                              >
                                <span className="font-medium text-cocoa font-serif text-[11px]">{alt.title}</span>
                                <span className="text-[9px] text-stone mt-1">₹{alt.price_inr}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Bhopal Local Slot Calendar Picker */}
            {serviceStatus === "serviceable" && product.is_local_only && calendar.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-stone/20 text-left">
                <div className="space-y-1">
                  <h4 className="font-serif text-sm font-semibold text-cocoa flex items-center gap-1.5">
                    <Calendar size={14} className="text-gold" />
                    <span>Select Delivery Calendar Slot</span>
                  </h4>
                  {product.advance_hours_required > 0 && (
                    <p className="text-[9px] text-gold uppercase tracking-wider font-semibold">Requires {product.advance_hours_required}h baking and prep time.</p>
                  )}
                </div>

                {/* Date Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {calendar.map(day => (
                    <button
                      key={day.date}
                      type="button"
                      onClick={() => {
                        setSelectedDate(day.date);
                        setSelectedSlot(null);
                      }}
                      className={`px-4 py-2 border text-[10px] font-sans uppercase tracking-widest whitespace-nowrap transition-all ${selectedDate === day.date ? "bg-primary text-cream border-primary" : "bg-cream text-cocoa border-stone/30 hover:border-primary"}`}
                    >
                      {day.displayDate}
                    </button>
                  ))}
                </div>

                {/* Slots Board */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {currentDaySlots.map((slot: any) => (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={!slot.isAvailable}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3 border text-left flex flex-col justify-between transition-all ${!slot.isAvailable ? "opacity-40 cursor-not-allowed bg-stone/10 border-stone/20" : selectedSlot?.id === slot.id ? "bg-primary/5 border-primary ring-1 ring-primary" : "bg-cream border-stone/30 hover:border-primary"}`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="font-sans font-medium text-xs text-cocoa">{slot.label}</span>
                        {slot.isMidnight && (
                          <span className="bg-gold/20 text-gold text-[8px] font-sans px-1.5 py-0.5 uppercase tracking-widest">Midnight Slot</span>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-baseline mt-2 w-full">
                        <span className="text-[9px] font-sans uppercase tracking-wider text-stone">
                          Fee: {slot.deliveryFee === 0 ? "Free" : `₹${slot.deliveryFee}`}
                        </span>
                        
                        {/* Capacity warning */}
                        {slot.isAvailable && (
                          <span className={`text-[9px] font-sans font-semibold uppercase tracking-wider ${slot.status === "Few slots left" ? "text-error" : "text-success"}`}>
                            {slot.status}
                          </span>
                        )}
                        {!slot.isAvailable && (
                          <span className="text-[9px] font-sans text-error italic uppercase font-semibold">
                            {slot.reason}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ==========================================
              CUSTOMISATIONS FORM WORKSPACE
              ========================================== */}
          {serviceStatus === "serviceable" && (
            <div className="border border-stone/30 p-6 space-y-6 bg-cream/20">
              <h3 className="font-serif text-lg font-medium text-cocoa flex items-center gap-2 border-b border-stone/20 pb-3">
                <Cake size={16} className="text-gold" />
                <span>Customisation Directives</span>
              </h3>

              {/* Eggless Checkbox */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="eggless"
                  checked={isEggless}
                  onChange={e => setIsEggless(e.target.checked)}
                  className="w-4 h-4 text-primary bg-cream border-stone/40 rounded-none focus:ring-0 cursor-pointer"
                />
                <label htmlFor="eggless" className="font-sans text-xs font-semibold uppercase tracking-wider text-cocoa cursor-pointer">
                  Request 100% Eggless Preparation
                </label>
              </div>

              {/* Cake message limit validation */}
              {product.is_local_only && (
                <div className="space-y-2">
                  <label className="block font-sans text-xs uppercase tracking-widest text-stone">
                    Cake Plaque Message (Max 500 Characters)
                  </label>
                  <input
                    type="text"
                    maxLength={500}
                    value={cakeMessage}
                    onChange={e => setCakeMessage(e.target.value)}
                    placeholder="e.g. Happy 30th Anniversary Papa & Mamma"
                    className="w-full px-4 py-3 bg-cream border border-stone/40 text-xs font-sans focus:outline-none focus:border-primary"
                  />
                  <div className="flex justify-between text-[9px] font-sans text-stone uppercase">
                    <span>Write clearly in capitals if needed</span>
                    <span>{cakeMessage.length}/500</span>
                  </div>
                </div>
              )}

              {/* Photo upload mock */}
              {product.is_local_only && (
                <div className="space-y-2">
                  <label className="block font-sans text-xs uppercase tracking-widest text-stone">
                    Custom Photo Reference Upload (Optional URL)
                  </label>
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={e => setPhotoUrl(e.target.value)}
                    placeholder="Paste reference photo image link"
                    className="w-full px-4 py-3 bg-cream border border-stone/40 text-xs font-sans focus:outline-none focus:border-primary"
                  />
                </div>
              )}

              {/* Flavour notes */}
              <div className="space-y-2">
                <label className="block font-sans text-xs uppercase tracking-widest text-stone">
                  Special Kitchen Preferences / Flavour Notes
                </label>
                <textarea
                  rows={2}
                  value={flavourNotes}
                  onChange={e => setFlavourNotes(e.target.value)}
                  placeholder="e.g. Prefer slightly less sweet, intense dark chocolate profile..."
                  className="w-full px-4 py-3 bg-cream border border-stone/40 text-xs font-sans focus:outline-none focus:border-primary"
                />
              </div>

              {/* Allergen notes */}
              <div className="space-y-2">
                <label className="block font-sans text-xs uppercase tracking-widest text-stone">
                  Allergen Warnings / Notes
                </label>
                <input
                  type="text"
                  value={allergenNotes}
                  onChange={e => setAllergenNotes(e.target.value)}
                  placeholder="e.g. Traces of peanuts / lactose intolerance..."
                  className="w-full px-4 py-3 bg-cream border border-stone/40 text-xs font-sans focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          )}

          {/* ADD TO CART ACTION */}
          <button
            type="button"
            disabled={serviceStatus !== "serviceable" || atcCompleted}
            onClick={handleAddToCart}
            className={`w-full py-4 text-[11px] font-sans font-medium uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2 ${serviceStatus !== "serviceable" ? "bg-stone/20 text-stone cursor-not-allowed border border-stone/30" : atcCompleted ? "bg-[#5C7F5A] text-cream" : "bg-primary hover:bg-cocoa text-cream shadow-md"}`}
          >
            {atcCompleted ? (
              <>
                <Check size={14} />
                <span>Chapter Selected</span>
              </>
            ) : serviceStatus !== "serviceable" ? (
              <span>Unlock with Service Pincode</span>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span>Add to Shopping Bag</span>
              </>
            )}
          </button>

          {/* ==========================================
              INGREDIENT CARD (Valrhona, French butter)
              ========================================== */}
          <div className="border-t border-stone/20 pt-8 space-y-4">
            <h3 className="font-serif text-xl font-medium text-cocoa">Exquisite Ingredient Catalog</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.ingredients?.map((ing: any, i: number) => (
                <div key={i} className="p-4 border border-stone/10 bg-cream/30 space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="font-serif text-sm font-semibold text-cocoa">{ing.name}</span>
                    {ing.premium && (
                      <span className="text-[8px] font-sans font-bold text-gold uppercase tracking-widest flex items-center gap-0.5">
                        <Award size={8} /> Premium
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] font-sans text-stone uppercase tracking-wider">Origin: {ing.origin}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ==========================================
              FOUNDER STORY CARD
              ========================================== */}
          {product.product_id === "prod_chocolate_taj" && (
            <div className="border border-gold/30 bg-cocoa text-cream p-6 text-left space-y-4 mt-8">
              <span className="text-[9px] font-sans text-gold uppercase tracking-[0.3em] font-semibold">Ex-Taj Signature memoir</span>
              <h4 className="font-serif text-xl text-cream/95 italic">"From the Pastry Sections of Grandeur"</h4>
              <p className="font-sans text-stone text-xs leading-relaxed">
                "This chocolate mousse cake represents over ten years heading pastry sections inside Mumbai's iconic Taj Mahal Palace. We bring that strict global, uncompromising standard home to Bhopal." — Chef Shalini
              </p>
              <div className="font-signature text-4xl text-gold">Shalini Singh</div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
