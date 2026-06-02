"use client";

import Link from "next/link";
import { Award, ShieldCheck, Heart, ArrowRight } from "lucide-react";

export default function OurStoryPage() {
  return (
    <div className="w-full bg-cream text-cocoa">
      
      {/* Editorial Header */}
      <section className="bg-cocoa text-cream py-24 text-left border-b border-stone/20">
        <div className="max-w-5xl mx-auto px-6 space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-semibold">Our Origin Chapter</span>
          <h1 className="font-serif text-4xl md:text-6xl tracking-tight leading-tight">
            Crafted by ex-Taj <br />
            <span className="italic font-light text-cream/90">Chef Shalini Singh</span>
          </h1>
          <p className="font-sans text-stone text-sm leading-relaxed max-w-3xl">
            Bringing world-class French-style lamination, biological moisture control, and exquisite small-batch artisanal baking from Mumbai's iconic luxury hotels home to Bhopal.
          </p>
        </div>
      </section>

      {/* Narrative grid */}
      <section className="py-20 max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 text-left">
        
        {/* Main Narrative - 8 Columns */}
        <div className="md:col-span-8 space-y-6 text-sm font-sans text-stone leading-relaxed">
          
          <h2 className="font-serif text-2xl md:text-3xl text-cocoa font-medium">The Journey of Pastry Mastery</h2>
          
          <p>
            Baking is not a simple assembly of ingredients; it is a rigid chemical balance. Chef Shalini Singh spent over a decade heading the elite pastry section at the iconic Taj Mahal Palace. Surrounded by heritage and the high-pressure demands of global state dinners, she perfected the art of French-style baking, temperature-controlled tempering, and intricate sugar flower designs.
          </p>

          <p>
            Despite the grandeur of luxury hotels, Shalini harbored a dream: to bring this uncompromising culinary standard home. She observed that the local dessert scene in Bhopal was dominated by heavily sweetened cakes, commercial hydrogenated fats, and synthetic color layers. In 2026, she launched *The Sugar Story* to introduce a new chapter in Bhopal’s dessert culture.
          </p>

          <h3 className="font-serif text-xl text-cocoa font-semibold mt-8">Our Uncompromising Manifestos</h3>
          
          <ul className="space-y-4">
            <li className="flex gap-3">
              <ShieldCheck className="text-gold flex-shrink-0 mt-0.5" size={16} />
              <div>
                <strong className="text-cocoa block font-sans text-xs uppercase tracking-wider font-semibold">100%preservative-Free</strong>
                <p className="mt-1">We refuse to use artificial cake gels, humectants, or chemical shelf-stabilizers. Our cakes retain moisture solely through natural egg aeration, precise baking control, and whipped dairy fats.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="text-gold flex-shrink-0 mt-0.5" size={16} />
              <div>
                <strong className="text-cocoa block font-sans text-xs uppercase tracking-wider font-semibold">Direct Importing</strong>
                <p className="mt-1">We import AOP Lescure butter from France and single-origin Valrhona chocolate from France and Ghana, ensuring that every pastry meets the same luxury standards as the grand high tea tables of Taj Mahal Palace.</p>
              </div>
            </li>
          </ul>

        </div>

        {/* Sidebar specs - 4 Columns */}
        <div className="md:col-span-4 space-y-8">
          <div className="border border-gold/30 bg-cream/40 p-6 space-y-6 relative text-left">
            <h3 className="font-serif text-lg font-medium text-cocoa">Master Baker Credentials</h3>
            
            <div className="space-y-4 text-xs font-sans text-stone">
              <div>
                <span className="text-[10px] text-stone uppercase block font-semibold">Taj Palace Service</span>
                <span className="font-medium text-cocoa">2014 – 2025</span>
              </div>
              <div>
                <span className="text-[10px] text-stone uppercase block font-semibold">Specialization</span>
                <span className="font-medium text-cocoa">French Pastry & Laminated Doughs</span>
              </div>
              <div>
                <span className="text-[10px] text-stone uppercase block font-semibold">Sourcing Policy</span>
                <span className="font-medium text-cocoa">Preservative-Free Organic Agriculture</span>
              </div>
            </div>

            <div className="border-t border-stone/20 pt-4 flex flex-col gap-2">
              <span className="text-[9px] font-sans text-stone uppercase tracking-widest">Handwritten Guarantee</span>
              <span className="font-signature text-5xl text-gold">Shalini Singh</span>
            </div>
          </div>
        </div>

      </section>
      
    </div>
  );
}
