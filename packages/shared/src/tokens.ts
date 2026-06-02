// Shared Brand Tokens, Delivery Zones, and Types for The Sugar Story

export const BRAND = {
  tagline: "Every bite, a chapter.",
  founder: "Crafted by ex-Taj chef Shalini Singh.",
  voiceGuardrails: {
    forbidden: ["yummy", "cheap", "hurry"],
    recommended: ["artisanal", "exquisite", "handcrafted", "chapters"]
  }
};

export const COLORS = {
  primary: "#6B3F2A",  // Deep cocoa-caramel
  cream: "#F6EFE3",    // Warm premium ivory backdrop
  gold: "#C9962B",     // Exquisite metallic accents
  cocoa: "#1F1410",    // Rich text contrast
  stone: "#A8A095",    // Elegant dividers and stone-grey borders
  rose: "#D08A7E",     // Pastel rose icing
  success: "#5C7F5A",  // Sage green
  error: "#A53F2B"     // Premium crimson red
};

export const FONTS = {
  display: "Cormorant Garamond, serif",
  sans: "Inter, sans-serif",
  signature: "Allison, cursive"
};

export interface BhopalZone {
  id: string;
  name: string;
  pincodes: string[];
  deliveryFee: number;
  sameDayCutoffHour: number; // e.g. 13 for 1:00 PM
  midnightAvailable: boolean;
  midnightFee: number;
  earlyMorningFee: number;
  active: boolean;
}

export const BHOPAL_SERVICE_ZONES: BhopalZone[] = [
  {
    id: "Z1",
    name: "Central",
    pincodes: ["462001", "462002", "462003", "462004", "462008", "462011", "462016"],
    deliveryFee: 0,
    sameDayCutoffHour: 13,
    midnightAvailable: true,
    midnightFee: 199,
    earlyMorningFee: 199,
    active: true
  },
  {
    id: "Z2",
    name: "New Bhopal/Kolar/Shahpura",
    pincodes: ["462039", "462041", "462042", "462043"],
    deliveryFee: 49,
    sameDayCutoffHour: 13,
    midnightAvailable: true,
    midnightFee: 199,
    earlyMorningFee: 199,
    active: true
  },
  {
    id: "Z3",
    name: "North/Bairagarh/Lalghati",
    pincodes: ["462030", "462031", "462032", "462036"],
    deliveryFee: 59,
    sameDayCutoffHour: 13,
    midnightAvailable: true,
    midnightFee: 199,
    earlyMorningFee: 199,
    active: true
  },
  {
    id: "Z4",
    name: "East/Govindpura/Ashoka Garden",
    pincodes: ["462022", "462023", "462024", "462026"],
    deliveryFee: 59,
    sameDayCutoffHour: 13,
    midnightAvailable: true,
    midnightFee: 199,
    earlyMorningFee: 199,
    active: true
  },
  {
    id: "Z5",
    name: "Outer/Misrod/Bhojpur Rd",
    pincodes: ["462044", "463106"], // includes Berasia 463106 markup
    deliveryFee: 99,
    sameDayCutoffHour: 13,
    midnightAvailable: true,
    midnightFee: 199,
    earlyMorningFee: 199,
    active: true
  }
];

export const BHOPAL_PINCODES = BHOPAL_SERVICE_ZONES.flatMap(z => z.pincodes);

export interface DeliverySlot {
  id: string;
  label: string;
  isMidnight: boolean;
  capacity: number;
}

export const DEFAULT_DELIVERY_SLOTS: DeliverySlot[] = [
  { id: "slot-1", label: "9:00 AM – 12:00 PM", isMidnight: false, capacity: 25 },
  { id: "slot-2", label: "12:00 PM – 3:00 PM", isMidnight: false, capacity: 25 },
  { id: "slot-3", label: "3:00 PM – 6:00 PM", isMidnight: false, capacity: 25 },
  { id: "slot-4", label: "6:00 PM – 9:00 PM", isMidnight: false, capacity: 25 },
  { id: "slot-5", label: "11:30 PM – 12:30 AM", isMidnight: true, capacity: 25 }
];

export interface LoyaltyTier {
  name: "Reader" | "Storyteller" | "Author";
  spendThreshold: number;
  perks: string[];
}

export const LOYALTY_TIERS: LoyaltyTier[] = [
  {
    name: "Reader",
    spendThreshold: 0,
    perks: ["Earn 1 point per ₹10 spent", "Early updates on new chapters (launches)"]
  },
  {
    name: "Storyteller",
    spendThreshold: 15000,
    perks: ["Free PAN-India shipping", "Festival early access", "Special invitation previews"]
  },
  {
    name: "Author",
    spendThreshold: 50000,
    perks: ["Monthly complimentary brownie-box credit", "Annual baking masterclass invite with chef Shalini"]
  }
];

export function getBhopalZoneForPincode(pincode: string): BhopalZone | undefined {
  return BHOPAL_SERVICE_ZONES.find(zone => zone.pincodes.includes(pincode));
}
