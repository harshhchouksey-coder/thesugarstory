/* ============================================================
   THE SUGAR STORY — Hero.tsx
   Luxury editorial hero with a staggered ~2.2s load sequence,
   ambient Ken Burns + flour-dust atmosphere, and scroll parallax.

   Install (in frontend/):  npm i framer-motion
   Files:    frontend/src/components/Hero.tsx   (this file)
             frontend/src/components/hero.css
   Assets:   frontend/public/hero-bakery.mp4
             frontend/public/hero-poster.png
   Usage in App.tsx:
             import Hero from './components/Hero';
             <Hero videoSrc="/hero-bakery.mp4"
                   posterSrc="/hero-poster.png"
                   onShopClick={...}
                   onWhatsAppClick={...} />
   ============================================================ */
import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';
import './hero.css';

/* Signature luxury ease — fast attack, long satin settle */
const TS_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const TS_HEADLINE_WORDS = ['Every', 'bite,', 'a', 'chapter.'];

interface HeroProps {
  /** Background video URL (autoplay · muted · loop) */
  videoSrc?: string;
  /** Poster still — shows while the video loads and replaces it under reduced motion */
  posterSrc?: string;
  /** Static photograph fallback (used when there is no video) */
  imageSrc?: string;
  /** QA helper — scales the whole intro timing (1 = spec, 0.5 = half speed) */
  speed?: number;
  /** QA helper — toggle the flour-dust atmosphere */
  showDust?: boolean;
  /** QA helper — preview the prefers-reduced-motion experience */
  forceReducedMotion?: boolean;
  onShopClick?: () => void;
  onWhatsAppClick?: () => void;
}

export default function Hero({
  videoSrc = "/hero-bakery.mp4",
  posterSrc = "/hero-poster.png",
  imageSrc,
  speed = 1,
  showDust = true,
  forceReducedMotion = false,
  onShopClick,
  onWhatsAppClick,
}: HeroProps) {
  const prefersReduced = useReducedMotion();
  const reduced = prefersReduced || forceReducedMotion;

  /* t() — all delays/durations flow through one helper so the
     whole sequence can be retimed (or inspected) in one place. */
  const t = (s: number) => s / speed;

  /* ----- Scroll parallax: content shifts up at 0.85x scroll speed
     (i.e. lags the page by 15%) and fades out by ~0.75 viewport. ----- */
  const [vh, setVh] = useState(() =>
    typeof window !== 'undefined' ? window.innerHeight : 800
  );
  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* Manual rAF-throttled scroll listener feeding a motion value —
     more robust than useScroll() across builds, same output. */
  const scrollMv = useMotionValue(
    typeof window !== 'undefined' ? window.scrollY : 0
  );
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        scrollMv.set(window.scrollY);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scrollMv]);

  const contentY = useTransform(scrollMv, [0, vh], [0, vh * 0.15]);
  const contentOpacity = useTransform(scrollMv, [0, vh * 0.75], [1, 0]);

  /* ----- Background video: autoplay (muted + playsInline lets iOS start it) ----- */
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  }, [videoSrc, reduced]);

  /* ----- Reduced motion: simple opacity fade ----- */
  const fade = (_delay: number) =>
    reduced
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.3, ease: 'easeOut' as any },
        }
      : null;

  /* Step b/e helpers — fade in + rise (16px eyebrow, 12px sub/CTAs) */
  const rise = (delay: number, distance: number) =>
    fade(delay) || {
      initial: { opacity: 0, y: distance },
      animate: { opacity: 1, y: 0 },
      transition: { delay: t(delay), duration: t(0.9), ease: TS_EASE as any },
    };

  return (
    <section
      className={'ts-hero' + (forceReducedMotion ? ' ts-hero--reduced' : '')}
      data-screen-label="Hero"
    >
      {/* (a) Background: scale 1.08 + blur 6px → 1.0 / 0 over 1.6s. */}
      <motion.div
        className="ts-hero__bg"
        initial={
          reduced ? { opacity: 0 } : { scale: 1.08, filter: 'blur(6px)' }
        }
        animate={reduced ? { opacity: 1 } : { scale: 1, filter: 'blur(0px)' }}
        transition={
          reduced
            ? { duration: 0.3 }
            : { duration: t(1.6), ease: TS_EASE as any }
        }
      >
        <div className="ts-hero__kenburns">
          {videoSrc && !reduced ? (
            <video
              ref={videoRef}
              src={videoSrc}
              poster={posterSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            ></video>
          ) : (
            <img
              src={videoSrc ? posterSrc : imageSrc}
              alt="Handcrafted patisserie by The Sugar Story"
            />
          )}
        </div>
      </motion.div>

      {/* (a) Legibility scrim — cocoa veil + bottom cream */}
      <motion.div
        className="ts-hero__scrim"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0.3 : t(1.6), ease: 'easeOut' as any }}
      ></motion.div>

      {/* (2) Flour-dust atmosphere */}
      {showDust && (
        <div className="ts-hero__dust" aria-hidden="true">
          <span></span><span></span><span></span>
          <span></span><span></span><span></span>
        </div>
      )}

      {/* (4) Content layer — parallax + fade on scroll */}
      <motion.div
        className="ts-hero__content"
        style={
          reduced ? undefined : { y: contentY, opacity: contentOpacity }
        }
      >
        {/* (b) Eyebrow — 0.4s */}
        <motion.p className="ts-hero__eyebrow" {...rise(0.4, 16)}>
          Ex-Taj Chef · Bhopal
        </motion.p>

        {/* (c) H1 — word-by-word mask reveal */}
        <h1 className="ts-hero__title">
          {TS_HEADLINE_WORDS.map((word, i) => {
            const isLast = i === TS_HEADLINE_WORDS.length - 1;
            return (
              <span className="ts-hero__wordwrap" key={word}>
                <span className="ts-hero__word-mask">
                  <motion.span
                    className="ts-hero__word"
                    initial={reduced ? { opacity: 0 } : { y: 24, opacity: 0 }}
                    animate={reduced ? { opacity: 1 } : { y: 0, opacity: 1 }}
                    transition={
                      reduced
                        ? { duration: 0.3 }
                        : {
                            delay: t(0.6 + i * 0.08),
                            duration: t(0.85),
                            ease: TS_EASE as any,
                          }
                    }
                  >
                    {word}
                  </motion.span>
                </span>

                {/* (d) Hand-drawn gold underline */}
                {isLast && (
                  <svg
                    className="ts-hero__underline"
                    viewBox="0 0 220 14"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M4 9.5 C 38 4.5, 84 11.5, 122 7.5 S 192 5.5, 216 8.5"
                      fill="none"
                      stroke="#C9962B"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={reduced ? { opacity: 0 } : { pathLength: 0 }}
                      animate={reduced ? { opacity: 1 } : { pathLength: 1 }}
                      transition={
                        reduced
                          ? { duration: 0.3 }
                          : { delay: t(1.4), duration: t(0.9), ease: TS_EASE as any }
                      }
                    ></motion.path>
                  </svg>
                )}
              </span>
            );
          })}
        </h1>

        {/* (e) Subline + CTAs */}
        <motion.p className="ts-hero__sub" {...rise(1.6, 12)}>
          Premium handcrafted bakery in Bhopal, by ex-Taj chef Shalini Singh.
        </motion.p>

        <motion.div className="ts-hero__ctas" {...rise(1.6, 12)}>
          <button
            className="ts-btn ts-btn--primary cursor-pointer"
            onClick={onShopClick}
          >
            Shop the Menu
            <span className="ts-btn__arrow" aria-hidden="true">→</span>
          </button>
          <button
            className="ts-btn ts-btn--ghost cursor-pointer"
            onClick={onWhatsAppClick}
          >
            Order on WhatsApp
          </button>
        </motion.div>

        {/* (f) Signature */}
        <motion.div
          className="ts-hero__signature"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduced ? 0 : t(2.0), duration: t(0.8), ease: 'easeOut' as any }}
        >
          Shalini Singh
        </motion.div>

        {/* (3) Scroll cue */}
        <motion.div
          className="ts-hero__cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduced ? 0 : t(2.0), duration: t(0.8), ease: 'easeOut' as any }}
        >
          <span className="ts-hero__cue-label">Scroll</span>
          <span className="ts-hero__cue-line"><i className="ts-hero__cue-dot"></i></span>
        </motion.div>
      </motion.div>
    </section>
  );
}
