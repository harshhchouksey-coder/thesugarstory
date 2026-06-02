"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Bookmark, Tag } from "lucide-react";
import { seedNotebookPosts } from "../../../../backend/src/scripts/seed";

export default function NotebookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [post, setPost] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);

  useEffect(() => {
    const found = seedNotebookPosts.find(p => p.slug === slug);
    if (found) {
      setPost(found);
      // Filter other posts as related
      const others = seedNotebookPosts.filter(p => p.slug !== slug).slice(0, 2);
      setRelated(others);
    } else {
      setPost(seedNotebookPosts[0]);
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <span className="text-stone text-xs uppercase tracking-widest animate-pulse">Turning Page...</span>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-24 text-left">
      
      {/* Back Button */}
      <button
        onClick={() => router.push("/the-notebook")}
        className="group flex items-center gap-2 text-[10px] font-sans uppercase tracking-widest font-semibold text-stone hover:text-gold transition-colors mb-12"
      >
        <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
        <span>Return to Notebook</span>
      </button>

      {/* Article Header */}
      <header className="space-y-6 mb-12 border-b border-stone/20 pb-8">
        <div className="flex items-center gap-3 text-[9px] font-sans text-gold uppercase tracking-[0.2em] font-semibold">
          <span>{post.category}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Clock size={10} /> {post.read_minutes} Mins read</span>
        </div>
        <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-tight">
          {post.title}
        </h1>
        <p className="font-sans text-stone text-sm leading-relaxed max-w-2xl italic">
          "{post.excerpt}"
        </p>

        <div className="flex justify-between items-center text-[10px] font-sans text-stone uppercase tracking-widest pt-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-cocoa">By {post.author}</span>
            <span>(Ex-Taj Pastry Chef)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={12} />
            <span>June 2026</span>
          </div>
        </div>
      </header>

      {/* Featured Hero Box */}
      <div className="aspect-[16/9] bg-stone/20 overflow-hidden relative border border-stone/10 p-1 mb-16">
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('/images/blog/${post.slug}.jpg')` }} />
      </div>

      {/* Article Markdown Body */}
      <div className="prose prose-stone max-w-none font-sans text-stone text-sm leading-relaxed space-y-6">
        {/* Render paragraphs cleanly */}
        {post.body_mdx.split("\n\n").map((para: string, idx: number) => {
          if (para.startsWith("### ")) {
            return <h3 key={idx} className="font-serif text-2xl font-semibold text-cocoa pt-6">{para.replace("### ", "")}</h3>;
          }
          if (para.startsWith("#### ")) {
            return <h4 key={idx} className="font-serif text-lg font-semibold text-cocoa pt-4">{para.replace("#### ", "")}</h4>;
          }
          if (para.startsWith("* ")) {
            return (
              <ul key={idx} className="list-disc pl-6 space-y-2">
                {para.split("\n").map((li, i) => (
                  <li key={i}>{li.replace("* ", "")}</li>
                ))}
              </ul>
            );
          }
          if (para.startsWith("1. ")) {
            return (
              <ol key={idx} className="list-decimal pl-6 space-y-2">
                {para.split("\n").map((li, i) => (
                  <li key={i}>{li.substring(3)}</li>
                ))}
              </ol>
            );
          }
          if (para.startsWith("*Tip:")) {
            return (
              <div key={idx} className="border border-gold/30 bg-[#F6EFE3] p-6 italic font-serif text-base text-cocoa/90 flex gap-2">
                <Bookmark className="text-gold flex-shrink-0 mt-1" size={16} />
                <span>{para}</span>
              </div>
            );
          }
          return <p key={idx}>{para}</p>;
        })}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-12 border-t border-stone/20 mt-16">
        {post.tags?.map((tag: string) => (
          <span key={tag} className="px-3 py-1 bg-stone/10 text-cocoa text-[10px] font-sans uppercase tracking-widest flex items-center gap-1">
            <Tag size={10} className="text-gold" />
            <span>{tag}</span>
          </span>
        ))}
      </div>

      {/* Related Chapters footer */}
      <div className="border-t border-stone/20 pt-16 mt-16 text-left space-y-8">
        <h3 className="font-serif text-2xl font-medium text-cocoa">Browse Next Chapters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {related.map(rel => (
            <div key={rel.id} className="p-6 border border-stone/10 bg-cream/30 space-y-3 flex flex-col justify-between hover:border-stone/30 transition-all">
              <div className="space-y-1">
                <span className="text-[9px] font-sans text-gold uppercase tracking-wider">{rel.category}</span>
                <h4 className="font-serif text-lg font-semibold text-cocoa hover:text-gold transition-colors">
                  <Link href={`/the-notebook/${rel.slug}`}>{rel.title}</Link>
                </h4>
                <p className="font-sans text-stone text-xs line-clamp-2 leading-relaxed">{rel.excerpt}</p>
              </div>
              <Link href={`/the-notebook/${rel.slug}`} className="text-[10px] font-sans uppercase tracking-widest font-semibold text-primary mt-4 inline-block">
                Read Chapter →
              </Link>
            </div>
          ))}
        </div>
      </div>

    </article>
  );
}
