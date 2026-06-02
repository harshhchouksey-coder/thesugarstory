"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ShieldCheck } from "lucide-react";

export default function VisitUsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24 text-left">
      <div className="space-y-4 mb-16 border-b border-stone/20 pb-8">
        <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-semibold">Bhopal coordinates</span>
        <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight">Visit the Pastry Salon</h1>
        <p className="font-sans text-stone text-sm max-w-xl leading-relaxed">
          Step into our physical space where high-end French baking meets peaceful ivory and gold-trimmed tea rooms. Taste our daily bakes directly from the source.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        
        {/* Salon coordinates - 5 Columns */}
        <div className="md:col-span-5 space-y-8 bg-cream/40 border border-stone/15 p-8">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-medium text-cocoa">Bhopal Dessert Salon</h3>
            <p className="font-sans text-xs text-stone uppercase tracking-widest font-semibold flex items-center gap-1">
              <MapPin size={12} className="text-gold" />
              <span>Arera Colony, Link Road 1</span>
            </p>
          </div>

          <div className="space-y-4 font-sans text-xs text-stone border-t border-stone/20 pt-6">
            <div className="flex gap-3">
              <Clock size={16} className="text-gold flex-shrink-0" />
              <div>
                <strong className="text-cocoa uppercase tracking-wider block font-semibold">Working Hours</strong>
                <p className="mt-1">Monday – Sunday: 9:00 AM – 9:00 PM</p>
                <p className="text-stone">Kitchen preps start at 6:00 AM daily.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone size={16} className="text-gold flex-shrink-0" />
              <div>
                <strong className="text-cocoa uppercase tracking-wider block font-semibold">Direct Telephone</strong>
                <p className="mt-1">+91 99999 88888</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail size={16} className="text-gold flex-shrink-0" />
              <div>
                <strong className="text-cocoa uppercase tracking-wider block font-semibold">Salon Correspondence</strong>
                <p className="mt-1">salon@thesugarstory.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Map Simulator - 7 Columns */}
        <div className="md:col-span-7 space-y-6">
          <div className="aspect-[16/10] bg-stone/20 overflow-hidden relative border border-stone/10 p-1">
            {/* Mock map imagery backdrop */}
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/bhopal-map-mock.jpg')" }} />
            <div className="absolute inset-0 bg-cocoa/30 hover:opacity-0 transition-opacity flex items-center justify-center">
              <span className="bg-cream/95 text-cocoa text-[10px] font-sans font-bold uppercase tracking-widest py-3 px-6 shadow-md border border-stone/30">
                Center Coordinates locked
              </span>
            </div>
          </div>

          <div className="bg-[#F6EFE3] border border-gold/30 p-6 space-y-3 text-left">
            <h4 className="font-serif text-lg font-semibold text-cocoa flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-gold" />
              <span>Taj Pastry Standards</span>
            </h4>
            <p className="font-sans text-stone text-xs leading-relaxed">
              Our salon adheres to international hygiene and refrigeration protocols. We operate a completely transparent preparation kitchen where visitors can watch Chef Shalini and her team ice our signature celebration range.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
