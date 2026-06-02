"use strict";

import Link from "next/link";
import { ArrowRight, Star, ShoppingBag, ShieldCheck, Award, MessageCircle, HelpCircle, Compass, MapPin } from "lucide-react";
import { seedProducts, seedNotebookPosts } from "../../../backend/src/scripts/seed";

export default function HomePage() {
  const products = seedProducts;
  const posts = seedNotebookPosts.slice(0, 3); // latest 3

  return (
    <div className="w-full bg-cream text-cocoa selection:bg-primary selection:text-cream">
      
      {/* ==========================================
          SECTION 1: HERO (Cinematic Hero Block)
          ========================================== */}
      <section className="relative w-full h-[90vh] bg-[#1F1410] flex items-center justify-center overflow-hidden">
        {/* Cinematic Backdrop Video Simulation */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-baking.jpg')" }}>
          <div className="w-full h-full bg-gradient-to-t from-[#1F1410] via-transparent to-black/50" />
        </div>

        {/* Hero Copy */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-cream space-y-8">
          <span className="text-xs uppercase tracking-[0.4em] text-gold font-sans font-semibold">
            Bespoke Confectionery by Chef Shalini Singh
          </span>
          <h1 className="font-serif text-5xl md:text-8xl tracking-tight leading-tight">
            Every bite, <br className="md:hidden" /><span className="italic font-light text-cream/90">a chapter.</span>
          </h1>
          <p className="font-sans text-stone text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            From the elite pastry kitchens of Taj Mahal Palace to Bhopal’s premium dessert salon. Explore classical French structure married to comforting, pure artisanal chapters.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link href="/shop/pan-india" className="px-8 py-4 bg-gold hover:bg-[#B58522] text-cocoa font-sans font-medium text-xs uppercase tracking-[0.2em] rounded-none transition-all shadow-md w-full sm:w-auto text-center">
              Shop Pan-India Delivery
            </Link>
            <Link href="/shop/fresh-cakes-bhopal" className="px-8 py-4 border border-cream hover:bg-cream hover:text-cocoa text-cream font-sans font-medium text-xs uppercase tracking-[0.2em] rounded-none transition-all w-full sm:w-auto text-center">
              Order Fresh in Bhopal
            </Link>
          </div>
        </div>

        {/* Ambient Vercel Geo-Default Badge */}
        <div className="absolute bottom-8 right-8 z-10 hidden lg:flex items-center gap-2 bg-cream/10 backdrop-blur-md px-4 py-2 border border-cream/20 text-cream/95 text-[10px] font-sans uppercase tracking-widest">
          <Compass size={12} className="text-gold animate-spin" style={{ animationDuration: '6s' }} />
          <span>Curated for India Delivery</span>
        </div>
      </section>

      {/* ==========================================
          SECTION 2: BESTSELLERS CAROUSEL
          ========================================== */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 border-b border-stone/20 pb-6 gap-4">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-semibold">Curated Favorites</span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight">The Signature Bestsellers</h2>
          </div>
          <Link href="/shop/pan-india" className="group flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] font-medium text-primary hover:text-gold transition-colors">
            <span>View All Chapters</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.product_id} className="group flex flex-col bg-cream/40 border border-stone/10 p-4 transition-all hover:shadow-lg hover:border-stone/30">
              
              {/* Product Card Media Box */}
              <div className="relative aspect-[4/3] bg-stone/20 overflow-hidden mb-6">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('/images/products/${product.product_id}.jpg')` }} />
                
                {/* Local vs Pan-India Badging */}
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  {product.is_local_only ? (
                    <span className="bg-[#5C7F5A]/90 text-cream text-[9px] font-sans uppercase tracking-widest px-2.5 py-1 font-semibold rounded-none">
                      Bhopal Fresh
                    </span>
                  ) : (
                    <span className="bg-primary/95 text-cream text-[9px] font-sans uppercase tracking-widest px-2.5 py-1 font-semibold rounded-none">
                      Pan-India Shipping
                    </span>
                  )}
                </div>
              </div>

              {/* Product Meta details */}
              <div className="flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-xl md:text-2xl font-medium group-hover:text-gold transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-stone text-xs line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-stone/20 pt-4 mt-auto">
                  <span className="font-serif text-lg font-medium text-cocoa">
                    ₹{product.price_inr}
                  </span>
                  <Link href={`/product/${product.product_id}`} className="flex items-center gap-1 text-[10px] font-sans uppercase tracking-widest font-semibold text-primary hover:text-gold transition-colors">
                    <ShoppingBag size={12} />
                    <span>Select Card</span>
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          SECTION 3: FOUNDER STRIP
          ========================================== */}
      <section className="bg-cocoa text-cream py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Portrait Graphic Box */}
          <div className="relative aspect-[3/4] bg-stone/20 border border-gold/30 p-2 max-w-sm mx-auto w-full">
            <div className="absolute inset-2 bg-cover bg-center" style={{ backgroundImage: "url('/images/chef-shalini-portrait.jpg')" }} />
            <div className="absolute -bottom-4 -right-4 bg-gold text-cocoa py-2.5 px-5 text-xs font-sans uppercase tracking-widest font-bold">
              Chef Shalini Singh
            </div>
          </div>

          {/* Editorial copy */}
          <div className="space-y-8">
            <span className="text-xs uppercase tracking-[0.35em] text-gold font-sans font-semibold">Crafted by ex-Taj chef</span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight leading-tight text-cream/95">
              "Mastery is not in the recipe; it is written in the temperature."
            </h2>
            <p className="font-sans text-stone text-sm leading-relaxed max-w-md">
              Following years directing elite confectionary inside Mumbai's legendary Taj Mahal Palace hotel, Chef Shalini Singh returned home. In her Bhopal salon, she rejects artificial stabilizers, industrial gel structures, and excess sugars. Every cake is engineered utilizing precise biology, premium French dairy fats, and single-origin chocolates to write exquisite edible memoirs for patrons.
            </p>
            <div className="pt-4 flex flex-col gap-4">
              <span className="font-signature text-6xl text-gold">Shalini Singh</span>
              <Link href="/our-story" className="group flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] font-medium text-gold hover:text-cream transition-colors">
                <span>Read her complete story</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 4: SHOP BY OCCASION
          ========================================== */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-semibold">Curated Designs</span>
          <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight">Celebrate Every Chapter</h2>
        </div>

        {/* 8 Occasion Tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            "Weddings", "Anniversaries", "Birthdays", "High Tea", 
            "Festivals", "Baby Showers", "Corporate", "Custom Celebrations"
          ].map((occ, idx) => (
            <Link key={occ} href={`/occasions/${occ.toLowerCase().replace(" ", "-")}`} className="group relative aspect-square bg-[#1F1410] overflow-hidden">
              {/* Media placeholder */}
              <div className="absolute inset-0 bg-cover bg-center opacity-70 transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('/images/occasions/occ-${idx + 1}.jpg')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa/90 via-cocoa/30 to-transparent" />
              
              {/* Floating Occasion Name */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-cream">
                <span className="font-serif text-lg tracking-wide">{occ}</span>
                <ArrowRight size={16} className="-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ==========================================
          SECTION 5: PREMIUM INGREDIENTS
          ========================================== */}
      <section className="bg-[#1F1410] text-[#F6EFE3] py-24 border-t border-b border-stone/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-semibold">Pantry Non-Negotiables</span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-cream">Purity in Sourcing</h2>
            <p className="font-sans text-stone text-xs leading-relaxed">
              We reject industrial flavor extracts, hydrogenated vegetable oils, and preservative chemical layers. The chemistry of our creations relies solely on world-class organic agricultural raw materials.
            </p>
          </div>

          {/* 5 Premium Ingredients Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { name: "Valrhona 70% Dark", origin: "France", desc: "Supreme baking chocolate chosen for its precise cocoa butter crystallization and complex raspberry note profiles." },
              { name: "AOP Cultured Butter", origin: "Lescure, France", desc: "Charentes-Poitou churned dairy fats providing delicate lamination elasticity and a rich, traditional creaminess." },
              { name: "Bourbon Vanilla", origin: "Madagascar", desc: "Organic split pods releasing thousands of deep, aromatic black specks, completely bypassing artificial vanillin." },
              { name: "Ghana Single Cocoa", origin: "Ghana", desc: "Sun-dried, heavily roasted cocoa beans yielding a deeply robust base chocolate powder for our signature brownies." },
              { name: "No Stabilizers", origin: "Zero Preservatives", desc: "Pure structures maintained exclusively via egg aeration, whipped dairy fats, and absolute baking temperature controls." }
            ].map(ing => (
              <div key={ing.name} className="border border-stone/20 p-6 flex flex-col justify-between space-y-4 bg-cocoa/50">
                <div className="space-y-2 text-left">
                  <span className="text-[10px] uppercase tracking-widest text-gold font-sans font-semibold">{ing.origin}</span>
                  <h3 className="font-serif text-lg md:text-xl font-medium text-cream">{ing.name}</h3>
                  <p className="font-sans text-stone text-xs leading-relaxed">{ing.desc}</p>
                </div>
                <div className="pt-2 text-gold">
                  <ShieldCheck size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 6: NOTEBOOK TEASER
          ========================================== */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 border-b border-stone/20 pb-6 gap-4">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-semibold">Editorial Journal</span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight">Chapters from The Notebook</h2>
          </div>
          <Link href="/the-notebook" className="group flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] font-medium text-primary hover:text-gold transition-colors">
            <span>Enter the Notebook</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 blog posts teaser */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map(post => (
            <article key={post.id} className="flex flex-col space-y-4 text-left">
              <div className="aspect-[16/10] bg-stone/20 overflow-hidden relative border border-stone/10">
                <div className="absolute inset-0 bg-cover bg-center hover:scale-102 transition-transform duration-700" style={{ backgroundImage: `url('/images/blog/${post.slug}.jpg')` }} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[10px] font-sans text-stone uppercase tracking-widest">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.read_minutes} Mins read</span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-medium hover:text-gold transition-colors">
                  <Link href={`/the-notebook/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="font-sans text-stone text-xs leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ==========================================
          SECTION 7: PHOTO REVIEWS WALL
          ========================================== */}
      <section className="py-16 bg-cream border-t border-b border-stone/20 overflow-hidden">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-semibold">Patron Feedback</span>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mt-1">Shared Memoir Chapters</h2>
        </div>

        {/* Endless high-fashion review marquee */}
        <div className="marquee-container w-full">
          <div className="marquee-content flex gap-8">
            {[
              { author: "Aditi Rao", rating: 5, text: "TheAssorted Brownie box matches the dense fudginess of standard high-end confections. An absolute masterpiece.", product: "Assorted Brownies Box" },
              { author: "Vikram Sengupta", rating: 5, text: "Exquisite. Shalini's Taj signature chocolate cake is structural balance at its absolute peak.", product: "Taj Mousse Cake" },
              { author: "Meera Nair", rating: 5, text: "Maldon sea salt cookies are exceptional. Delicate crust with cocoa that lingers elegantly.", product: "Sea-Salt Cookies" },
              { author: "Rohan Kolar", rating: 5, text: "Our wedding cake was custom crafted. The organic Madagascar vanilla aroma filled the entire banquet.", product: "Vanilla Wedding Cake" },
            ].map((rev, idx) => (
              <div key={idx} className="bg-[#1F1410] text-[#F6EFE3] p-6 max-w-sm flex-shrink-0 w-80 text-left flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex gap-1 text-gold">
                    {[...Array(rev.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                  <p className="font-sans text-stone text-xs leading-relaxed italic">"{rev.text}"</p>
                </div>
                <div className="border-t border-stone/20 pt-4 mt-6 flex justify-between items-center text-[10px] font-sans text-stone uppercase tracking-widest">
                  <span className="font-semibold">{rev.author}</span>
                  <span className="text-gold">{rev.product}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 8: GIFT CONCIERGE
          ========================================== */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-semibold">Corporate & B2B Solutions</span>
          <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight">The Gift Concierge</h2>
          <p className="font-sans text-stone text-sm leading-relaxed max-w-md">
            Whether honoring business colleagues, high-value patrons, or festive seasonal circles, our B2B relationship manager designs signature boxes printed with custom brand marks. Upload your multi-address sheet in CSV, and receive automated billing.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link href="/corporate-gifting" className="px-8 py-4 bg-primary text-cream hover:bg-cocoa font-sans font-medium text-xs uppercase tracking-[0.2em] rounded-none transition-all w-full sm:w-auto text-center">
              Request B2B Quote
            </Link>
            <a href="https://wa.me/919999988888" className="group flex items-center justify-center gap-2 px-8 py-4 border border-cocoa text-cocoa hover:bg-cocoa hover:text-cream font-sans font-medium text-xs uppercase tracking-[0.2em] rounded-none transition-all w-full sm:w-auto">
              <MessageCircle size={14} className="text-[#5C7F5A] group-hover:text-cream transition-colors" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>

        {/* Decorative Grid of Gift hampers */}
        <div className="aspect-[4/3] bg-stone/20 relative border border-stone/10 p-4">
          <div className="absolute inset-4 bg-cover bg-center" style={{ backgroundImage: "url('/images/gift-box-hamper.jpg')" }} />
        </div>
      </section>

      {/* ==========================================
          SECTION 9: SUBSCRIBE & SAVE
          ========================================== */}
      <section className="bg-cream py-24 border-t border-stone/20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 bg-[#F6EFE3] border border-gold/40 p-12 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-cocoa px-4 py-1 text-[9px] font-sans font-bold uppercase tracking-[0.2em]">
            Monthly Chapter Delivery
          </div>
          
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-semibold">The Notebook Box</span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight">Subscribe to Shalini's Collection</h2>
            <p className="font-sans text-stone text-xs max-w-lg mx-auto leading-relaxed">
              For ₹1,499 per month, receive a curated luxury box containing ex-Taj chef Shalini's newest creation drafts, exclusive shelf-stable brownies, premium tea cakes, and hand-written journals. Enjoys a structural 10% discount on retail pricing.
            </p>
          </div>

          <div className="pt-4 flex flex-col items-center justify-center gap-4">
            <Link href="/subscription" className="px-8 py-4 bg-primary hover:bg-cocoa text-cream font-sans font-medium text-xs uppercase tracking-[0.2em] rounded-none transition-all text-center">
              Subscribe Now — ₹1,499/mo
            </Link>
            <span className="text-[10px] font-sans text-stone uppercase tracking-wider">Pause or Cancel Anytime in Your Customer Portal</span>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 10: PRESS MENTIONS
          ========================================== */}
      <section className="bg-[#1F1410] py-16 border-t border-stone/30">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold/60 font-sans font-medium">As Seen In</span>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="font-serif text-cream text-lg md:text-xl tracking-[0.2em] uppercase font-bold">VOGUE</span>
            <span className="font-serif text-cream text-lg md:text-xl tracking-[0.1em] uppercase italic">Architectural Digest</span>
            <span className="font-serif text-cream text-lg md:text-xl tracking-[0.2em] uppercase font-medium">GQ</span>
            <span className="font-serif text-cream text-lg md:text-xl tracking-[0.15em] uppercase font-semibold">L'OFFICIEL</span>
            <span className="font-serif text-cream text-lg md:text-xl tracking-[0.3em] uppercase">FOOD & WINE</span>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 11: FAQ ACCORDION (8 Qs)
          ========================================== */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-semibold">Inquiries Desk</span>
          <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight">Frequently Asked Questions</h2>
        </div>

        {/* 8 Accordion Qs */}
        <div className="space-y-4">
          {[
            { q: "How do you define service zones inside Bhopal?", a: "We map Bhopal deliveries across five service zones (Z1–Z5), covering pincodes 462001 to 462044. Zone Z1 enjoys free shipping, with Z2, Z3, Z4, and Z5 requiring small logistical contributions ranging from ₹49 to ₹99. Enter your PIN code on any page to test delivery feasibility." },
            { q: "What is your same-day baking cutoff timeline?", a: "To ensure absolute freshness, same-day delivery bookings for Bhopal close strictly at 1:00 PM (13:00). Orders finalized past this cutoff will transition to the following calendar day slots." },
            { q: "Why are some celebrate cakes restricted to advance hours?", a: "Bespoke creations (such as theme cakes or tiered wedding cakes) require meticulous structural engineering and customized sugar-flower curing. Custom theme cakes require 24 hours of advance prep, and wedding cakes require a strict 48 hours." },
            { q: "Do you offer midnight deliveries?", a: "Yes. We offer a dedicated premium midnight slot (11:30 PM – 12:30 AM) for Z1–Z4 Bhopal zones for a flat convenience fee of ₹199, perfect for surprise celebrations." },
            { q: "How are pan-India shelf-stable products shipped?", a: "All pan-India orders are dispatched via top courier partners like BlueDart Air and Delhivery. Brownies, tea cakes, and cookies are packed inside durable, vacuum-sealed tins to preserve freshness for up to 25 days." },
            { q: "What is the storage guideline for the Assorted Brownies Box?", a: "Our signature ₹665 Assorted Brownies Box is free from hydrogenated fats. We recommend consuming it within 4 days. Please refrigerate during intense summer temperatures and serve slightly warm." },
            { q: "How does the Loyalty Tier system operate?", a: "Patrons are automatically enrolled on their first checkout, earning 1 point per ₹10 spent. Tiers upgrade from Reader to Storyteller (at ₹15,000 spend) and Author (at ₹50,000 spend), unlocking free shipping, masterclass invites, and monthly box credits." },
            { q: "Can I cancel or pause my Notebook Box subscription?", a: "Absolutely. Subscriptions are billed monthly via Razorpay Subscriptions. You can modify, pause, or cancel renewal instantly at any time from your Customer Account settings." }
          ].map((faq, idx) => (
            <div key={idx} className="border-b border-stone/20 pb-4 text-left">
              <h3 className="font-serif text-lg md:text-xl font-medium text-cocoa flex items-center justify-between py-2 cursor-pointer hover:text-gold transition-colors">
                <span>{faq.q}</span>
                <HelpCircle size={16} className="text-gold" />
              </h3>
              <p className="font-sans text-stone text-xs leading-relaxed mt-2 pl-1">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          SECTION 12: FINAL CTA / FOOTER HERO
          ========================================== */}
      <section className="relative py-32 bg-cocoa text-cream text-center overflow-hidden border-t border-stone/30">
        <div className="absolute inset-0 z-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: "url('/images/footer-baked.jpg')" }} />
        
        <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-8">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-semibold">Write Your Chapter</span>
          <h2 className="font-serif text-4xl md:text-7xl tracking-tight leading-tight">
            Ready to taste <br /><span className="italic font-light text-cream/90">the story?</span>
          </h2>
          <p className="font-sans text-stone text-xs md:text-sm max-w-md mx-auto leading-relaxed">
            Experience the exquisite craftsmanship of ex-Taj Chef Shalini Singh. Pick a freshly baked celebrate cake in Bhopal or ship chocolate brownie cases across India.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link href="/shop/pan-india" className="px-8 py-4 bg-gold hover:bg-[#B58522] text-cocoa font-sans font-medium text-xs uppercase tracking-[0.2em] rounded-none transition-all w-full sm:w-auto text-center">
              Shop Collections
            </Link>
            <Link href="/visit-us" className="px-8 py-4 border border-cream hover:bg-cream hover:text-cocoa text-cream font-sans font-medium text-xs uppercase tracking-[0.2em] rounded-none transition-all w-full sm:w-auto text-center">
              Visit Bhopal Salon
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
