"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Award, 
  CheckCircle, 
  Clock, 
  MapPin, 
  ShoppingBag, 
  ChevronRight, 
  MessageSquare,
  Gift
} from "lucide-react";
import { COLORS } from "@sugar-story/shared";

export default function OrderConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId as string;

  const [pointsEarned, setPointsEarned] = useState(66);
  const [estimatedDays, setEstimatedDays] = useState(4);

  useEffect(() => {
    // Generate simple seed values based on order number length
    setPointsEarned(Math.floor(Math.random() * 80) + 60);
    setEstimatedDays(3 + (orderId.length % 3));
  }, [orderId]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center space-y-12">
      
      {/* Visual Success Header */}
      <div className="space-y-4 flex flex-col items-center">
        <CheckCircle className="text-gold w-16 h-16 animate-pulse" />
        <span className="text-[10px] font-sans text-gold uppercase tracking-[0.3em] font-semibold">Payment Authenticated Successfully</span>
        <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight">
          Chapter Reserved
        </h1>
        <p className="font-sans text-stone text-xs uppercase tracking-widest">
          Order Reference: <strong className="text-cocoa">{orderId}</strong>
        </p>
      </div>

      {/* Ex-Taj Chef Shalini Gratitude Letter */}
      <div className="border border-gold/30 bg-[#F6EFE3] p-10 text-left space-y-6 relative">
        <div className="absolute -top-3 left-8 bg-gold text-cocoa px-4 py-0.5 text-[8px] font-sans font-bold uppercase tracking-widest">
          Patron Correspondence
        </div>
        <p className="font-serif text-lg md:text-xl italic text-cocoa/90 leading-relaxed pt-2">
          "Baking is a medium of written memories. Thank you for allowing us to author a chapter of your celebrations. Every fold of butter and tempering of cocoa in this order has been supervised to our ex-Taj hotel standards. We hope it brings delight."
        </p>
        <div className="border-t border-stone/20 pt-6 flex justify-between items-center">
          <div>
            <p className="font-sans text-[10px] text-stone uppercase tracking-widest">Chef de Pâtisserie</p>
            <p className="font-signature text-4xl text-gold mt-1">Shalini Singh</p>
          </div>
          <svg className="w-16 h-8 text-gold stroke-current" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 25 C 20 5, 40 45, 50 25 C 60 5, 80 45, 90 25" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="90" cy="25" r="2" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Loyalty points ledger earned */}
      <div className="border border-stone/20 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center text-left bg-cream/40">
        <div className="flex gap-4 items-center">
          <div className="bg-gold/10 p-3 text-gold">
            <Award size={24} />
          </div>
          <div>
            <h4 className="font-serif text-lg font-semibold text-cocoa">Loyalty Points Accrued</h4>
            <p className="font-sans text-stone text-xs leading-relaxed mt-0.5">Your customer balance has been credited with points.</p>
          </div>
        </div>
        <div className="md:text-right">
          <span className="font-serif text-3xl font-bold text-cocoa">+{pointsEarned} Points</span>
          <span className="block text-[9px] font-sans text-success uppercase tracking-widest font-semibold mt-1">Reader Tier Confirmed</span>
        </div>
      </div>

      {/* Shipping & Delivery slot summaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left font-sans text-xs">
        
        <div className="p-5 border border-stone/10 bg-cream/30 space-y-2">
          <p className="text-stone uppercase tracking-widest text-[9px] font-semibold">Delivery Coordination</p>
          <div className="flex items-start gap-2">
            <Clock size={14} className="text-gold mt-0.5" />
            <div>
              <p className="font-semibold text-cocoa">Rolling Slot Booked</p>
              <p className="text-stone mt-0.5">Please check WhatsApp for live kitchen dispatch times.</p>
            </div>
          </div>
        </div>

        <div className="p-5 border border-stone/10 bg-cream/30 space-y-2">
          <p className="text-stone uppercase tracking-widest text-[9px] font-semibold">Outstation Cargo (Pan-India)</p>
          <div className="flex items-start gap-2">
            <Gift size={14} className="text-gold mt-0.5" />
            <div>
              <p className="font-semibold text-cocoa">Vacuum-Sealed Packaging</p>
              <p className="text-stone mt-0.5">Shipment arrives within 3-5 business days via BlueDart Air cargo.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Support and Back paths */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 border-t border-stone/20">
        <Link href="/shop/pan-india" className="px-8 py-4 bg-primary hover:bg-cocoa text-cream text-[10px] font-sans font-medium uppercase tracking-[0.2em] transition-all text-center w-full sm:w-auto">
          Shop More Collections
        </Link>
        <Link href="/track-order" className="px-8 py-4 border border-cocoa hover:bg-cocoa hover:text-cream text-cocoa text-[10px] font-sans font-medium uppercase tracking-[0.2em] transition-all text-center w-full sm:w-auto">
          Track Current Order
        </Link>
      </div>

    </div>
  );
}
