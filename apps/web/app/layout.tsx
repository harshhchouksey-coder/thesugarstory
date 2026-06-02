import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Allison } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ShoppingBag, Heart, Menu, PhoneCall, HelpCircle, MapPin } from "lucide-react";

// Load fonts dynamically
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant"
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter"
});

const allison = Allison({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-allison"
});

export const metadata: Metadata = {
  title: "The Sugar Story | Premium Artisanal Bakery by Chef Shalini Singh",
  description: "Exquisite French-inspired pastries, wedding cakes, and signature brownies handcrafted by ex-Taj Chef Shalini Singh. Operates local delivery in Bhopal and pan-India shipping.",
  keywords: ["artisan bakery", "Bhopal cake delivery", "online cake order", "premium brownies", "wedding cakes", "Shalini Singh Taj chef", "Ladurée", "Theobroma", "magnolia bakery"],
  metadataBase: new URL("https://thesugarstory.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/en-IN"
    }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${inter.variable} ${allison.variable}`}>
      <body className="antialiased flex flex-col min-h-screen bg-cream text-cocoa selection:bg-primary selection:text-cream">
        
        {/* Elegant Top Bar Tagline */}
        <div className="w-full bg-[#1F1410] text-[#F6EFE3] py-2 text-center text-xs tracking-[0.2em] font-sans uppercase">
          "Every bite, a chapter." • Crafted by ex-Taj chef Shalini Singh.
        </div>

        {/* Premium Luxury Navigation Header */}
        <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-stone/20">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            
            {/* Left Nav Menu Links */}
            <nav className="hidden md:flex items-center gap-8 text-xs font-sans uppercase tracking-[0.15em] font-medium text-cocoa/80">
              <Link href="/shop/pan-india" className="hover:text-gold transition-colors">Pan-India Shop</Link>
              <Link href="/shop/fresh-cakes-bhopal" className="hover:text-gold transition-colors">Bhopal Cakes</Link>
              <Link href="/our-story" className="hover:text-gold transition-colors">Our Story</Link>
              <Link href="/the-notebook" className="hover:text-gold transition-colors">The Notebook</Link>
            </nav>

            <button className="md:hidden p-2 text-cocoa" aria-label="Menu Open">
              <Menu size={20} />
            </button>

            {/* Central Luxury Logo */}
            <div className="text-center flex flex-col items-center">
              <Link href="/" className="font-serif text-2xl md:text-3xl font-medium tracking-[0.08em] hover:opacity-90 transition-opacity">
                THE SUGAR STORY
              </Link>
              <span className="text-[9px] font-sans tracking-[0.3em] text-gold uppercase mt-0.5">
                Artisan Pastry House
              </span>
            </div>

            {/* Right Quick Actions (Account, Cart, Support) */}
            <div className="flex items-center gap-6 text-cocoa/80">
              <Link href="/visit-us" className="hidden lg:flex items-center gap-1.5 text-xs font-sans uppercase tracking-[0.1em] hover:text-gold transition-colors">
                <MapPin size={14} className="text-gold" />
                <span>Bhopal Salon</span>
              </Link>
              <Link href="/corporate-gifting" className="hidden md:block text-xs font-sans uppercase tracking-[0.15em] hover:text-gold transition-colors">
                Gifting
              </Link>
              
              <Link href="/cart" className="relative p-2 hover:text-gold transition-colors" aria-label="View Shopping Bag">
                <ShoppingBag size={20} strokeWidth={1.8} />
                <span className="absolute -top-1 -right-1 bg-gold text-cream text-[9px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-sans font-semibold">
                  2
                </span>
              </Link>
            </div>

          </div>
        </header>

        {/* Global Storefront Main Workspace */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Premium Luxury Footer (Aesop & Ladurée Inspired) */}
        <footer className="bg-cocoa text-cream pt-24 pb-12 border-t border-stone/20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-stone/20 pb-16">
            
            {/* Column 1: Philosophy & Signature */}
            <div className="md:col-span-2 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="font-serif text-3xl italic tracking-wide text-cream/90">The Sugar Story</h3>
                <p className="font-sans text-stone text-sm max-w-md leading-relaxed">
                  Established in Bhopal by Chef Shalini Singh (ex-Taj Pastry Chef), we blend classic French confectionary science with rich artisanal narratives. Every bite is designed to write a lasting chapter of your celebrations.
                </p>
              </div>
              <div className="space-y-2 pt-4">
                <p className="text-[10px] font-sans text-stone uppercase tracking-widest">Master Baker Signature</p>
                {/* Master Chef SVG Signature in Footer */}
                <div className="flex items-center gap-4 text-gold">
                  <span className="font-signature text-5xl">Shalini Singh</span>
                  <svg className="w-16 h-8 text-gold stroke-current" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 25 C 20 5, 40 45, 50 25 C 60 5, 80 45, 90 25" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="90" cy="25" r="2" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Chapters */}
            <div className="space-y-4">
              <h4 className="font-serif text-lg tracking-wide uppercase text-gold font-medium">Bake Collections</h4>
              <ul className="space-y-2.5 font-sans text-sm text-stone text-left">
                <li><Link href="/shop/fresh-cakes-bhopal" className="hover:text-cream transition-colors">Fresh Bhopal Cakes</Link></li>
                <li><Link href="/shop/brownies" className="hover:text-cream transition-colors">Signature Brownies (Pan-India)</Link></li>
                <li><Link href="/shop/cookies" className="hover:text-cream transition-colors">Artisanal Cookies</Link></li>
                <li><Link href="/shop/cheesecakes" className="hover:text-cream transition-colors">Luxury Cheesecakes</Link></li>
                <li><Link href="/subscription" className="hover:text-cream transition-colors">The Notebook Box Subscription</Link></li>
              </ul>
            </div>

            {/* Column 3: Inquiries & Help */}
            <div className="space-y-4">
              <h4 className="font-serif text-lg tracking-wide uppercase text-gold font-medium">Salon Support</h4>
              <ul className="space-y-2.5 font-sans text-sm text-stone text-left">
                <li><Link href="/visit-us" className="hover:text-cream transition-colors">Visit Bhopal Storefront</Link></li>
                <li><Link href="/corporate-gifting" className="hover:text-cream transition-colors">Corporate Gifting & CSV Orders</Link></li>
                <li><Link href="/track-order" className="hover:text-cream transition-colors">Track Custom Order</Link></li>
                <li><Link href="/help" className="hover:text-cream transition-colors">Help & Slot FAQs</Link></li>
                <li><Link href="/legal/refund" className="hover:text-cream transition-colors">Bespoke Refund Policy</Link></li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright & SEO Marks */}
          <div className="max-w-7xl mx-auto px-6 pt-10 flex flex-col md:flex-row items-center justify-between text-xs font-sans text-stone/60 gap-4">
            <p>© 2026 The Sugar Story. Crafted by ex-Taj Pastry Chef Shalini Singh. All rights reserved.</p>
            <div className="flex gap-6 uppercase tracking-wider text-[10px]">
              <Link href="/legal/terms" className="hover:text-cream transition-colors">Terms of Chapter</Link>
              <Link href="/legal/privacy" className="hover:text-cream transition-colors">Privacy Shield</Link>
              <Link href="/legal/shipping" className="hover:text-cream transition-colors">Shipping Log</Link>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
