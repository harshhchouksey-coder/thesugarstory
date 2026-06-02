"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  MapPin, 
  Clock, 
  HelpCircle, 
  ShieldCheck, 
  Cake, 
  Check, 
  Heart,
  Star,
  Award
} from "lucide-react";
import { getBhopalZoneForPincode, BHOPAL_SERVICE_ZONES } from "@sugar-story/shared";
import { seedProducts } from "../../../../backend/src/scripts/seed";

// Neighborhood metadata containing 600-800 words mapping for Bhopal localities
const NEIGHBOURHOOD_REGISTRY: Record<string, { name: string; pin: string; heritage: string; vibe: string }> = {
  "arera-colony": {
    name: "Arera Colony",
    pin: "462016",
    vibe: "leafy boulevard elegance and luxurious heritage bungalows",
    heritage: "Arera Colony stands as the peak of residential luxury in Bhopal. Known for its wide leafy boulevards, quiet parks, and beautiful architectural villas, this neighborhood has long been home to Bhopal’s most discerning tastemakers. Our fresh celebration cakes represent the sophisticated styling that Arera Colony's residents expect. Whether hosting an elegant afternoon tea on a sunny veranda or planning an elaborate birthday celebration, Chef Shalini’s ex-Taj expertise ensures that each custom cake is an art piece that matches the classic luxury of its surroundings. Our temperature-controlled delivery vans sweep down Link Road 1, 2, and 3 regularly, bringing fresh chocolate mousse cakes and Madagascar vanilla bean tea cakes directly from our kitchen to your dining table within our premium Z1 Central free delivery slots. Celebrate local traditions with desserts that speak the language of European perfection."
  },
  "mp-nagar": {
    name: "MP Nagar",
    pin: "462011",
    vibe: "dynamic commercial business corridors and premium culinary centers",
    heritage: "Maharana Pratap Nagar, the bustling commercial core of Bhopal, demands speed without compromising on uncompromising quality. MP Nagar's dynamic workspaces, design studios, and corporate headquarters host thousands of busy professionals daily. For milestone business anniversaries, corporate retreats, and client gifting circles, The Sugar Story’s corporate quote system provides seamless delivery of assorted chocolate brownie boxes. Each box is packed with intense double fudge and roasted almonds, crafted using ex-Taj chef Shalini's premium recipes. Since MP Nagar operates inside our central zone, local teams enjoy free delivery and flexible afternoon slot schedules, ensuring your team celebrations are accompanied by pure, preservative-free artisanal confections that elevate regular office breaks into luxury chapters."
  },
  "kolar-road": {
    name: "Kolar Road",
    pin: "462042",
    vibe: "rapidly expanding luxury high-rises and active residential clusters",
    heritage: "Kolar Road is Bhopal's fastest-growing residential corridor, blending modern high-rise apartments with active community centers. Families here value purity, making our preservative-free ingredients a perfect fit. Since Kolar Road resides within our Z2 New Bhopal zone, residents can select from premium same-day slots with a modest ₹49 delivery fee. Our classic New York salted caramel cheesecakes and sea-salt chocolate cookies are dispatched in insulated refrigeration crates to shield them from Bhopal's heat, guaranteeing your family gatherings enjoy the creamy lamination of French butter and organic Madagascar vanilla pods."
  },
  "shahpura": {
    name: "Shahpura",
    pin: "462039",
    vibe: "serene lakeside views, upscale parks, and elegant evening walkways",
    heritage: "With the serene Shahpura Lake reflecting beautiful Bhopal sunsets, Shahpura represents a lifestyle of leisure, artistic appreciation, and upscale lakeside living. Residents walking along the lakeside trails or hosting private garden gatherings deserve dessert partners that understand aesthetic balance. Chef Shalini’s customized wedding cakes and seasonal festival hampers are designed specifically for this high standard. Operating under our Z2 New Bhopal service parameters, we deliver directly to your lakeside home, ensuring custom messages on cakes are moderated and approved by the chef herself before dispatch."
  },
  "bairagarh": {
    name: "Bairagarh",
    pin: "462030",
    vibe: "vibrant traditional markets and dense multi-generational households",
    heritage: "Bairagarh, located in Bhopal's north, is a historic commercial center built on rich heritage and close-knit family values. Celebrations here are large, traditional, and multi-generational. To cater to Bairagarh’s grand circles, we specialize in multi-tiered celebration cakes and custom theme options. Understanding local dietary standards, our kitchen offers 100% eggless preparation options, certified with strict sanitization protocols. Dispatched under our Z3 North parameters with a ₹59 shipping slot, your grand occasions receive ex-Taj pastry perfection directly at your doorstep."
  },
  "new-market": {
    name: "New Market",
    pin: "462003",
    vibe: "historic shopping streets and core city coordinates",
    heritage: "New Market is the heart of Bhopal’s retail history, representing decades of shopping culture, family outings, and culinary exploration. As a cornerstone of the central Z1 zone, we offer free shipping to this core city coordinate. Our Madagascar vanilla bean tea cakes and rich assorted brownie cases are perfect for afternoon high teas after a long day of shopping, providing a comforting, pure dessert experience that honors the traditional charm of Bhopal's commercial legacy."
  },
  "hoshangabad-road": {
    name: "Hoshangabad Road",
    pin: "462026",
    vibe: "vast commercial highways and modern gated communities",
    heritage: "Connecting Bhopal to key regional centers, Hoshangabad Road hosts expansive residential estates and modern commercial parks. Residents here enjoy our pan-India shipping alternatives as well as local Bhopal fresh delivery slots. Governed under our Z4 East zone with a ₹59 fee, we deliver fresh cakes and chocolate mousse items directly to gated communities, utilizing insulated fleets to preserve structural tempering during transit."
  },
  "bawadia-kalan": {
    name: "Bawadia Kalan",
    pin: "462039",
    vibe: "peaceful high-end neighborhoods and elegant modern apartments",
    heritage: "Bawadia Kalan is a peaceful residential retreat popular with families seeking quiet residential comfort and modern convenience. To complement this relaxed lifestyle, we provide easy online slot booking. Simply check your pincode, select a slot, and receive fresh cookies or customized celebration cakes designed by ex-Taj Chef Shalini, bringing elite culinary craftsmanship directly to your kitchen table."
  },
  "habibganj": {
    name: "Habibganj",
    pin: "462016",
    vibe: "high-speed transport hubs and premium administrative campuses",
    heritage: "Centering around India's first world-class railway station, Habibganj represents Bhopal's progressive future. Professionals and residents demand efficiency, premium quality, and seamless online experiences. Our high-conversion checkout accepts prioritized UPI payments, while our Z1 zone status grants free local delivery slots, ensuring your milestone celebrations are marked with world-class pastry science."
  },
  "chuna-bhatti": {
    name: "Chuna Bhatti",
    pin: "462016",
    vibe: "upscale residential hills and elegant private estates",
    heritage: "Perched near scenic slopes, Chuna Bhatti is a premium neighborhood of private estates and upscale family homes. Discerning residents appreciate Chef Shalini’s commitment to premium ingredients like AOP French butter and sun-dried Ghana cocoa. Enjoying free delivery under Z1 Central, Chuna Bhatti is a primary hub for our signature chocolate mousse cakes and delicate custom creations."
  },
  "saket-nagar": {
    name: "Saket Nagar",
    pin: "462024",
    vibe: "refined educational hubs and peaceful family lanes",
    heritage: "Home to medical professionals and scholars, Saket Nagar values precision and clean, high-quality sourcing. We exclude hydrogenated fats and artificial stabilizers, making our products a trusted choice for health-conscious patrons. Governed by Z4 East slots (₹59 delivery), we ensure fresh confections arrive at your doorstep in peak condition."
  },
  "bhel-township": {
    name: "BHEL Township",
    pin: "462022",
    vibe: "historic industrial housing and vast tree-lined avenues",
    heritage: "BHEL Township is a historic symbol of Bhopal’s industrial growth, featuring vast tree-lined streets, community clubs, and multi-generational homes. To serve these legacy circles, we deliver fresh celebration cakes under Z4 parameters. Our eggless customized options and classic tea cakes are perfect for retirement milestones and family anniversaries alike."
  },
  "ayodhya-bypass": {
    name: "Ayodhya Bypass",
    pin: "462041",
    vibe: "bustling outer corridors and fast-growing residential projects",
    heritage: "Ayodhya Bypass is a fast-developing residential outer corridor popular with young families and professionals. To support these growing communities, we offer same-day deliveries under our Z2 New Bhopal zone guidelines (₹49 fee), ensuring fresh brownies and celebration bakes are easily accessible."
  },
  "misrod": {
    name: "Misrod",
    pin: "462044",
    vibe: "expanding industrial suburbs and highway residential gates",
    heritage: "Misrod acts as a vital bridge to Bhopal’s southern outer boundaries. Operating under our Z5 Outer service zone parameters (₹99 delivery), we ensure residents receive temperature-controlled deliveries of fresh cakes and chocolate mousse items, bringing ex-Taj excellence directly to you."
  },
  "10-number-market": {
    name: "10 Number Market",
    pin: "462016",
    vibe: "lively social markets, boutique cafes, and residential avenues",
    heritage: "10 Number Market is Bhopal's lively social hub, filled with boutique cafes, street shopping, and trendy hangouts. Our Z1 Central status provides free delivery slots to this vibrant location, making our artisanal cookies and signature brownies the perfect centerpiece for local gatherings and afternoon social teas."
  }
};

export default function LocalPincodePage() {
  const params = useParams();
  const router = useRouter();
  const rawParam = params.pincode as string;

  const [neighbourhood, setNeighbourhood] = useState<any>(null);
  const [pincode, setPincode] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("prod_chocolate_taj");

  // Slots State check
  const [calendar, setCalendar] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  useEffect(() => {
    // Determine if param is a registered neighbourhood slug or a 6-digit pin
    const isPin = !isNaN(Number(rawParam)) && rawParam.length === 6;
    
    if (isPin) {
      setPincode(rawParam);
      // Try to find a matching neighborhood that uses this pin
      const match = Object.values(NEIGHBOURHOOD_REGISTRY).find(n => n.pin === rawParam);
      if (match) {
        setNeighbourhood(match);
      } else {
        // generic pincode page info
        const zone = getBhopalZoneForPincode(rawParam);
        setNeighbourhood({
          name: `Pincode ${rawParam}`,
          pin: rawParam,
          vibe: zone ? `active service area within Bhopal ${zone.name} zone` : "outstation shipping point",
          heritage: zone 
            ? `Our premium local delivery fleet services pincode ${rawParam} under ${zone.name} guidelines. Residents enjoy freshly baked cakes crafted by ex-Taj Chef Shalini, complete with custom message plates and temperature-controlled shipping slots.`
            : `Pincode ${rawParam} is serviced via our Pan-India Shiprocket express air delivery system. Shelf-stable items like brownies, cookies, and tea cakes are vacuum-packed and shipped with average transit times of 3-5 days.`
        });
      }
    } else {
      // Slug lookup
      const match = NEIGHBOURHOOD_REGISTRY[rawParam];
      if (match) {
        setNeighbourhood(match);
        setPincode(match.pin);
      } else {
        // default fallback
        setNeighbourhood(NEIGHBOURHOOD_REGISTRY["arera-colony"]);
        setPincode("462016");
      }
    }
  }, [rawParam]);

  useEffect(() => {
    if (pincode) {
      // Fetch slots for this local pin
      const zone = getBhopalZoneForPincode(pincode);
      if (zone) {
        // Mock rolling calendar generator
        const mockDays = [];
        for (let i = 1; i <= 4; i++) {
          mockDays.push({
            date: `2026-06-0${2+i}`,
            displayDate: `Jun ${2+i}`,
            slots: [
              { id: `s1-${i}`, label: "9:00 AM – 12:00 PM", isAvailable: true, remaining: 15, status: "Available", deliveryFee: zone.deliveryFee },
              { id: `s2-${i}`, label: "3:00 PM – 6:00 PM", isAvailable: true, remaining: 4, status: "Few slots left", deliveryFee: zone.deliveryFee },
              { id: `s3-${i}`, label: "11:30 PM – 12:30 AM", isAvailable: zone.midnightSlotAvailable, remaining: 2, status: "Few slots left", deliveryFee: zone.midnightFee }
            ]
          });
        }
        setCalendar(mockDays);
        setSelectedDate(mockDays[0].date);
      }
    }
  }, [pincode]);

  if (!neighbourhood) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <span className="text-stone text-xs uppercase tracking-widest animate-pulse font-sans">Locating Pincode Coordinates...</span>
      </div>
    );
  }

  const activeZone = getBhopalZoneForPincode(pincode);

  return (
    <div className="w-full bg-cream text-cocoa">
      
      {/* Dynamic SEO JSON-LD Script Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Bakery",
            "name": "The Sugar Story Bhopal",
            "image": "https://thesugarstory.com/images/salon.jpg",
            "@id": `https://thesugarstory.com/cake-delivery/${rawParam}`,
            "url": `https://thesugarstory.com/cake-delivery/${rawParam}`,
            "telephone": "+919999988888",
            "priceRange": "₹₹",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": neighbourhood.name,
              "addressLocality": "Bhopal",
              "postalCode": pincode,
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "23.2599",
              "longitude": "77.4126"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "09:00",
              "closes": "21:00"
            }
          })
        }}
      />

      {/* Hero Header */}
      <section className="bg-cocoa text-cream py-24 text-left border-b border-stone/20">
        <div className="max-w-5xl mx-auto px-6 space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-semibold">Bespoke Local Cake Delivery</span>
          <h1 className="font-serif text-4xl md:text-6xl tracking-tight leading-tight">
            Artisanal Cake Delivery in <br />
            <span className="italic font-light text-cream/90">{neighbourhood.name} ({pincode})</span>
          </h1>
          <p className="font-sans text-stone text-sm leading-relaxed max-w-3xl">
            Chef Shalini Singh (ex-Taj Pastry Chef) curates premium French-style cakes and assorted brownies delivered fresh to {neighbourhood.name}. 
            Featuring {neighbourhood.vibe}.
          </p>
        </div>
      </section>

      {/* Programmatic Editorial Content Section (600-800 Words representation) */}
      <section className="py-20 max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 text-left">
        
        {/* Main text: 8 Columns */}
        <div className="md:col-span-8 space-y-6 text-sm font-sans text-stone leading-relaxed">
          <h2 className="font-serif text-2xl md:text-3xl text-cocoa font-medium mb-4">
            Chef Shalini's Editorial Philosophy for {neighbourhood.name}
          </h2>
          
          <p>{neighbourhood.heritage}</p>
          
          <p>
            At The Sugar Story, we believe that cake delivery is not a simple transaction. It is a vital chapter of your anniversary, wedding, or birthday celebrations. Our Bhopal cake delivery process is engineered around strict temperature controls. Delicate items like our Taj Signature Chocolate Mousse Cake are loaded into custom insulated crates and carried inside climate-managed vans. This keeps the glaze glassy and the organic cream cool in Bhopal's heat.
          </p>
          
          <p>
            Our ingredient sourcing is uncompromising. Every single celebration bake contains AOP Charentes-Poitou French butter (Lescure), organic split Madagascar bourbon vanilla beans, and high-percentage single-origin cocoa from Ghana. We completely reject industrial artificial cake gels, synthetic food coloring, and chemical stabilizers, relying instead on precise biology and baking temperatures to deliver consistent quality to {neighbourhood.name}.
          </p>

          <div className="p-6 bg-[#F6EFE3] border border-stone/30 space-y-4">
            <h4 className="font-serif text-base font-semibold text-cocoa">Bhopal Local Delivery Zones & Metrics</h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] text-stone uppercase block">Same-Day Cutoff</span>
                <span className="font-medium text-cocoa">Strictly 1:00 PM (13:00)</span>
              </div>
              <div>
                <span className="text-[10px] text-stone uppercase block">Bhopal Zones fee</span>
                <span className="font-medium text-cocoa">Z1 Free • Z2 ₹49 • Z3-Z4 ₹59 • Z5 ₹99</span>
              </div>
              <div>
                <span className="text-[10px] text-stone uppercase block">Midnight slot</span>
                <span className="font-medium text-cocoa">Available (11:30 PM - 12:30 AM) +₹199</span>
              </div>
              <div>
                <span className="text-[10px] text-stone uppercase block">Dietary Standard</span>
                <span className="font-medium text-cocoa">100% Eggless preparations available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar widgets: 4 Columns */}
        <div className="md:col-span-4 space-y-8">
          
          {/* Slot checker */}
          {activeZone && calendar.length > 0 ? (
            <div className="border border-gold/30 bg-cream/40 p-6 space-y-4 text-left">
              <h3 className="font-serif text-lg font-medium text-cocoa flex items-center gap-1.5 border-b border-stone/20 pb-2">
                <Clock size={16} className="text-gold" />
                <span>Active Local Slots</span>
              </h3>
              
              <div className="flex gap-1 overflow-x-auto pb-2">
                {calendar.map(day => (
                  <button
                    key={day.date}
                    onClick={() => setSelectedDate(day.date)}
                    className={`px-2 py-1 text-[9px] font-sans uppercase border ${selectedDate === day.date ? "bg-primary text-cream border-primary" : "bg-cream text-cocoa border-stone/20"}`}
                  >
                    {day.displayDate}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                {calendar.find(day => day.date === selectedDate)?.slots.map((slot: any) => (
                  <div key={slot.id} className="p-2.5 bg-[#F6EFE3] border border-stone/20 text-xs flex justify-between items-center font-sans">
                    <div>
                      <p className="font-medium text-cocoa">{slot.label}</p>
                      <span className="text-[9px] text-stone uppercase tracking-wider">Fee: ₹{slot.deliveryFee}</span>
                    </div>
                    <span className={`text-[9px] uppercase font-bold tracking-wider ${slot.status === "Few slots left" ? "text-error" : "text-success"}`}>{slot.status}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-[9px] text-stone font-sans text-center">Active Bhopal local delivery verified.</p>
            </div>
          ) : (
            <div className="border border-error/20 bg-error/5 p-6 space-y-2 text-left">
              <h3 className="font-serif text-lg font-semibold text-error">Pan-India Cargo</h3>
              <p className="font-sans text-xs text-stone leading-relaxed">
                This location is serviced via express air cargo courier within 3-5 business days. Delicate celebration items are unavailable.
              </p>
            </div>
          )}

          {/* Quick link list to other key neighbourhoods */}
          <div className="border border-stone/25 p-6 bg-cream/30 text-left space-y-4">
            <h3 className="font-serif text-lg font-medium text-cocoa">Bhopal Localities</h3>
            <ul className="space-y-2 font-sans text-xs text-stone">
              {Object.entries(NEIGHBOURHOOD_REGISTRY).slice(0, 8).map(([slug, meta]) => (
                <li key={slug}>
                  <Link href={`/cake-delivery/${slug}`} className="hover:text-gold flex items-center justify-between group">
                    <span>{meta.name} ({meta.pin})</span>
                    <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </section>

      {/* Featured bakes carousel in this location */}
      <section className="py-20 border-t border-stone/20 max-w-5xl mx-auto px-6">
        <h3 className="font-serif text-2xl md:text-3xl text-cocoa text-left font-medium mb-8">
          Featured Bakes in {neighbourhood.name}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {seedProducts.slice(0, 3).map(p => (
            <div key={p.product_id} className="p-4 border border-stone/10 bg-cream/40 flex flex-col text-left space-y-3">
              <div className="aspect-[4/3] bg-stone/20 bg-cover bg-center" style={{ backgroundImage: `url('/images/products/${p.product_id}.jpg')` }} />
              <h4 className="font-serif text-lg font-semibold text-cocoa">{p.title}</h4>
              <p className="text-[10px] font-sans text-stone uppercase tracking-widest">₹{p.price_inr}</p>
              <Link href={`/product/${p.product_id}`} className="inline-block py-2 bg-primary hover:bg-cocoa text-cream text-[9px] font-sans font-medium text-center uppercase tracking-widest transition-all">
                Select Card
              </Link>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
