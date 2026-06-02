"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { seedNotebookPosts } from "../../../backend/src/scripts/seed";

export default function TheNotebookPage() {
  const [selectedCat, setSelectedCat] = useState("all");
  const posts = seedNotebookPosts;

  const categories = ["all", ...Array.from(new Set(posts.map(p => p.category.toLowerCase())))];

  const filteredPosts = selectedCat === "all" 
    ? posts 
    : posts.filter(p => p.category.toLowerCase() === selectedCat);

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 text-left">
      
      {/* Header */}
      <div className="space-y-4 mb-16 border-b border-stone/20 pb-8">
        <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-semibold">Editorial Logbook</span>
        <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight">The Notebook</h1>
        <p className="font-sans text-stone text-sm max-w-xl leading-relaxed">
          Ex-Taj Chef Shalini Singh writes about the science of chocolate tempering, the biology of baking without stabilizers, and sourcing tales from Madagascar and France.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-12 border-b border-stone/15 pb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 border text-[10px] font-sans uppercase tracking-widest transition-all ${selectedCat === cat ? "bg-primary text-cream border-primary" : "bg-cream text-cocoa border-stone/20 hover:border-primary"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {filteredPosts.map(post => (
          <article key={post.id} className="flex flex-col space-y-4 group">
            
            {/* Image Placeholder */}
            <div className="aspect-[16/10] bg-stone/20 overflow-hidden relative border border-stone/10 p-1">
              <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-102" style={{ backgroundImage: `url('/images/blog/${post.slug}.jpg')` }} />
            </div>

            <div className="space-y-2 flex-grow flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[9px] font-sans text-stone uppercase tracking-widest font-semibold">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {post.read_minutes} Mins read</span>
                </div>
                <h3 className="font-serif text-2xl font-medium hover:text-gold transition-colors leading-snug">
                  <Link href={`/the-notebook/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="font-sans text-stone text-xs leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-stone/10 mt-auto flex justify-between items-center text-[10px] font-sans text-stone uppercase tracking-widest">
                <span>By {post.author}</span>
                <Link href={`/the-notebook/${post.slug}`} className="group-hover:text-gold flex items-center gap-1 transition-colors">
                  <span>Read Chapter</span>
                  <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

          </article>
        ))}
      </div>

    </div>
  );
}
