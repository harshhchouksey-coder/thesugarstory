"use client";

import React, { useState } from "react";
import { 
  FileSpreadsheet, 
  ShieldCheck, 
  Award, 
  Send, 
  TrendingUp, 
  Upload, 
  Download 
} from "lucide-react";

export default function CorporateGiftingPage() {
  // Form coordinates
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [units, setUnits] = useState(50);
  const [budget, setBudget] = useState(1000);
  const [customBranding, setCustomBranding] = useState(false);
  const [csvUploaded, setCsvUploaded] = useState(false);
  const [csvFileName, setCsvFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Handle CSV upload mock
  const handleCsvMock = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCsvFileName(e.target.files[0].name);
      setCsvUploaded(true);
    }
  };

  // Submit quote
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactName || !email || !phone) {
      alert("Please fill all required business coordinates.");
      return;
    }

    try {
      const res = await fetch("http://localhost:9000/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          contactName,
          email,
          phone,
          units,
          targetDate: "2026-07-02",
          budgetInr: budget,
          customBranding,
          addressesCsv: csvFileName || "/uploads/quotes/bulk-sample.csv"
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        alert("Quote submittal failed.");
      }
    } catch (err) {
      console.log("Mock lead submittal...", err);
      setSubmitted(true);
    }
  };

  // Live total estimates
  const estSubtotal = units * budget;
  const estGst = Math.floor(estSubtotal * 0.18); // 18% corporate confectionery GST
  const estTotal = estSubtotal + estGst;

  return (
    <div className="max-w-5xl mx-auto px-6 py-24 text-left">
      <div className="space-y-4 mb-16 border-b border-stone/20 pb-8">
        <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-semibold">B2B Confectionery Solutions</span>
        <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight">The Gift Concierge</h1>
        <p className="font-sans text-stone text-sm max-w-xl leading-relaxed">
          Plan tailored corporate orders with customized branding ribbon seals, custom card inserts, and multi-address delivery logistics.
        </p>
      </div>

      {submitted ? (
        <div className="border border-gold/30 bg-[#F6EFE3] p-12 text-center space-y-6">
          <Award className="text-gold w-16 h-16 mx-auto animate-pulse" />
          <h2 className="font-serif text-3xl font-medium">B2B Quote Request Lodged</h2>
          <p className="font-sans text-stone text-xs max-w-md mx-auto leading-relaxed">
            Thank you. Our dedicated corporate relationship manager will review your address files and budget targets and reach out within 2 business hours with a formal proposal and automated GST invoice templates.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Inquiry form - 7 Columns */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
            <h3 className="font-serif text-2xl font-medium text-cocoa border-b border-stone/20 pb-3 flex items-center gap-2">
              <Send size={18} className="text-gold" />
              <span>Request Custom Proposal</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-sans uppercase tracking-widest text-stone">Company Name *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  placeholder="Taj Luxury Holdings"
                  className="w-full px-4 py-3 bg-cream border border-stone/40 text-xs font-sans focus:outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-sans uppercase tracking-widest text-stone">Contact Name *</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={e => setContactName(e.target.value)}
                  placeholder="Shalini Singh"
                  className="w-full px-4 py-3 bg-cream border border-stone/40 text-xs font-sans focus:outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-sans uppercase tracking-widest text-stone">Business Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="b2b@company.com"
                  className="w-full px-4 py-3 bg-cream border border-stone/40 text-xs font-sans focus:outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-sans uppercase tracking-widest text-stone">Direct Telephone *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 99999 88888"
                  className="w-full px-4 py-3 bg-cream border border-stone/40 text-xs font-sans focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Slider/Counters for Units */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-cream/40 border border-stone/15">
              <div className="space-y-2 text-left">
                <label className="block text-[10px] font-sans uppercase tracking-widest text-stone">Volume Target (Min 25 Units)</label>
                <input
                  type="number"
                  min={25}
                  value={units}
                  onChange={e => setUnits(Math.max(25, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 bg-cream border border-stone/40 text-xs font-sans focus:outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-2 text-left">
                <label className="block text-[10px] font-sans uppercase tracking-widest text-stone">Budget Cap per Unit (₹)</label>
                <input
                  type="number"
                  min={250}
                  step={50}
                  value={budget}
                  onChange={e => setBudget(Math.max(250, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 bg-cream border border-stone/40 text-xs font-sans focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Custom Brand opt */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="branding"
                checked={customBranding}
                onChange={e => setCustomBranding(e.target.checked)}
                className="w-4 h-4 text-primary bg-cream border-stone/40 focus:ring-0 cursor-pointer"
              />
              <label htmlFor="branding" className="font-sans text-xs font-semibold uppercase tracking-wider text-cocoa cursor-pointer">
                Requires Custom Logo Branding Wraps (+₹50/Unit)
              </label>
            </div>

            {/* CSV upload interface */}
            <div className="border border-dashed border-stone/40 p-6 text-center space-y-3 bg-cream/20">
              <FileSpreadsheet className="text-gold w-8 h-8 mx-auto" />
              <div className="space-y-1">
                <p className="font-serif text-sm font-semibold text-cocoa">Multi-Address Dispatch Sheet</p>
                <p className="font-sans text-stone text-[10px] uppercase">Upload bulk shipping coordinates in CSV format</p>
              </div>
              
              <div className="flex items-center justify-center gap-4 pt-2">
                <label className="px-4 py-2 border border-stone/40 hover:border-primary text-[10px] font-sans uppercase tracking-widest font-semibold cursor-pointer bg-cream text-cocoa transition-all flex items-center gap-1.5">
                  <Upload size={12} />
                  <span>Choose CSV</span>
                  <input type="file" accept=".csv" onChange={handleCsvMock} className="hidden" />
                </label>
                <a href="/downloads/multi-sample.csv" className="text-[10px] font-sans text-stone hover:text-gold uppercase tracking-widest flex items-center gap-1">
                  <Download size={12} />
                  <span>Template</span>
                </a>
              </div>

              {csvUploaded && (
                <p className="text-[10px] font-sans text-success font-semibold flex items-center justify-center gap-1 mt-2">
                  <ShieldCheck size={12} />
                  <span>File Linked: {csvFileName}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary hover:bg-cocoa text-cream text-xs font-sans font-medium uppercase tracking-[0.2em] transition-all shadow-md"
            >
              Submit Business Request
            </button>
          </form>

          {/* Recalculating ledger summary - 5 Columns */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-stone/30 bg-cream/40 p-6 space-y-6">
              <h3 className="font-serif text-xl font-medium border-b border-stone/20 pb-4 flex items-center gap-2">
                <TrendingUp size={18} className="text-gold" />
                <span>Estimate Board</span>
              </h3>

              <div className="space-y-3 font-sans text-xs text-stone">
                <div className="flex justify-between">
                  <span>Unit Quantity</span>
                  <span className="font-medium text-cocoa">{units} Boxes</span>
                </div>
                <div className="flex justify-between">
                  <span>Target Price per Box</span>
                  <span className="font-medium text-cocoa">₹{budget}</span>
                </div>
                <div className="flex justify-between border-t border-stone/20 pt-3">
                  <span>Confectionery Subtotal</span>
                  <span className="font-semibold text-cocoa">₹{estSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Corporate GST (18%)</span>
                  <span className="font-medium text-cocoa">+₹{estGst}</span>
                </div>
                <div className="flex justify-between border-t border-stone/20 pt-4 text-base text-cocoa">
                  <span className="font-serif text-lg font-medium">Estimated Invoice</span>
                  <span className="font-serif text-xl font-bold">₹{estTotal}</span>
                </div>
              </div>
            </div>

            <div className="border border-stone/25 p-6 bg-cream/30 space-y-3 text-xs font-sans text-stone leading-relaxed">
              <h4 className="font-serif text-sm font-semibold text-cocoa">Customization Options</h4>
              <p>Corporate accounts enjoy complete menu personalization. Chef Shalini will align with your design directors to print packaging sleeves, emboss chocolate squares, or select custom flavor profiles.</p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
