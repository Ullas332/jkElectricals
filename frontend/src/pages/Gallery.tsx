import { useEffect, useRef, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, Images } from "lucide-react";
import CTA from "@/components/CTA";

// ── Gallery image imports ─────────────────────────────────────────────────────
import gallery1  from "@/assets/gallery1.jpeg";
import gallery2  from "@/assets/gallery2.jpeg";
import gallery3  from "@/assets/gallery3.jpeg";
import gallery4  from "@/assets/gallery4.jpeg";
import gallery5  from "@/assets/gallery5.jpeg";
import gallery6  from "@/assets/gallery6.jpeg";
import gallery7  from "@/assets/gallery7.jpeg";
import gallery8  from "@/assets/gallery8.jpeg";
import gallery9  from "@/assets/gallery9.jpeg";
import gallery10 from "@/assets/gallery10.jpeg";
import gallery11 from "@/assets/gallery11.jpeg";

import g1 from "@/assets/g1.jpeg";
import g2 from "@/assets/g2.jpeg";

import e1 from "@/assets/e1.jpeg";
import e2 from "@/assets/e2.jpeg";
import e3 from "@/assets/e3.jpeg";
import e4 from "@/assets/e4.jpeg";

import em1 from "@/assets/em1.jpeg";
import em2 from "@/assets/em2.jpeg";

import I1 from "@/assets/I1.jpeg";
import I2 from "@/assets/I2.jpeg";

import p1 from "@/assets/p1.jpeg";
import p2 from "@/assets/p2.jpeg";
import p3 from "@/assets/p3.jpeg";
import p4 from "@/assets/p4.jpeg";

import ht2 from "@/assets/ht2.jpeg";
import ht3 from "@/assets/ht3.jpeg";

import work1 from "@/assets/work1.jpeg";
import work2 from "@/assets/work2.jpeg";
import work3 from "@/assets/work3.jpeg";
import work4 from "@/assets/work4.jpeg";
import work5 from "@/assets/work5.jpeg";
import work6 from "@/assets/work6.jpeg";
import work7 from "@/assets/work7.jpeg";

// ── All images — flat list, no categories or labels ───────────────────────────
const ALL_IMAGES: string[] = [
  gallery1, gallery2, gallery3, gallery4, gallery5, gallery6,
  gallery7, gallery8, gallery9, gallery10, gallery11,
  g1, g2,
  e1, e2, e3, e4,
  em1, em2,
  I1, I2,
  p1, p2, p3, p4,
  ht2, ht3,
  work1, work2, work3, work4, work5, work6, work7,
];

// Assign a "wide" or "tall" hint per index so the grid has visual rhythm
const WIDE_INDICES  = new Set([0, 6, 12, 17, 21, 25, 29, 33]);
const TALL_INDICES  = new Set([4, 9, 14, 22, 31]);

// ── Scroll-reveal hook ────────────────────────────────────────────────────────
const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("sr-in"); obs.disconnect(); } },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
};

// ── Lightbox ──────────────────────────────────────────────────────────────────
const Lightbox = ({
  index, total, src, onClose, onPrev, onNext,
}: {
  index: number; total: number; src: string;
  onClose: () => void; onPrev: () => void; onNext: () => void;
}) => {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center"
      style={{ animation: "lbFadeIn 0.2s ease forwards" }}>
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />

      <div className="relative z-10 flex flex-col items-center max-w-[92vw] max-h-[92vh]"
        style={{ animation: "lbScale 0.28s cubic-bezier(0.34,1.56,0.64,1) forwards" }}>
        <img src={src} alt={`Site photo ${index + 1}`}
          className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-[0_24px_80px_rgba(0,0,0,0.8)]"
          draggable={false} />
        <span className="mt-4 text-white/40 text-xs tabular-nums tracking-widest">
          {index + 1} / {total}
        </span>
      </div>

      <button onClick={onClose}
        className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110">
        <X className="h-5 w-5" />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-[#00B4D8] flex items-center justify-center text-white transition-all hover:scale-110">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-[#00B4D8] flex items-center justify-center text-white transition-all hover:scale-110">
        <ChevronRight className="h-6 w-6" />
      </button>

      <style>{`
        @keyframes lbFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes lbScale  { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
      `}</style>
    </div>
  );
};

// ── Gallery card ──────────────────────────────────────────────────────────────
const GalleryCard = ({ src, index, onClick }: { src: string; index: number; onClick: () => void }) => {
  const [loaded, setLoaded] = useState(false);
  const isWide = WIDE_INDICES.has(index);
  const isTall = TALL_INDICES.has(index);

  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl cursor-pointer gallery-card"
      style={{
        gridColumn: isWide ? "span 2" : "span 1",
        gridRow:    isTall ? "span 2" : "span 1",
        animationDelay: `${(index % 10) * 55}ms`,
      }}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse rounded-2xl" />
      )}
      <img
        src={src}
        alt={`Site photo ${index + 1}`}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        draggable={false}
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
      />

      {/* Very subtle hover overlay with zoom icon only */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
          <ZoomIn className="h-4 w-4 text-white" />
        </div>
      </div>
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────
const GalleryPage = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const heroRef = useScrollReveal();
  const gridRef = useScrollReveal();
  const total = ALL_IMAGES.length;

  const handleClose = useCallback(() => setLightboxIndex(null), []);
  const handlePrev  = useCallback(() => setLightboxIndex((i) => i !== null ? (((i - 1) % total) + total) % total : null), [total]);
  const handleNext  = useCallback(() => setLightboxIndex((i) => i !== null ? (i + 1) % total : null), [total]);

  return (
    <div className="bg-[#050f1a] min-h-screen">
      <style>{`
        /* Scroll reveal */
        .sr-hidden { opacity:0; transform:translateY(28px); transition:opacity .7s ease,transform .7s ease; }
        .sr-in     { opacity:1; transform:translateY(0); }

        /* Card enter animation */
        .gallery-card { animation: cardIn 0.5s ease both; }
        @keyframes cardIn {
          from { opacity:0; transform:scale(0.95) translateY(8px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }

        /* Responsive masonry-like auto grid */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: 200px;
          grid-auto-flow: dense;
          gap: 10px;
        }
        @media (min-width: 640px) {
          .gallery-grid { grid-template-columns: repeat(3, 1fr); grid-auto-rows: 220px; grid-auto-flow: dense; gap: 12px; }
        }
        @media (min-width: 1024px) {
          .gallery-grid { grid-template-columns: repeat(4, 1fr); grid-auto-rows: 250px; grid-auto-flow: dense; gap: 14px; }
        }
        @media (min-width: 1280px) {
          .gallery-grid { grid-auto-rows: 270px; gap: 16px; }
        }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-16 md:pt-20 md:pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[140%] rounded-full bg-gradient-to-br from-[#00B4D8]/15 to-transparent blur-3xl" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[140%] rounded-full bg-gradient-to-tl from-[#0A3A5C]/40 to-transparent blur-3xl" />
        </div>

        <div ref={heroRef} className="container-max px-4 relative z-10 sr-hidden text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00B4D8]/10 border border-[#00B4D8]/30 text-[#00B4D8] text-xs font-bold uppercase tracking-widest mb-6">
            <Images className="h-3.5 w-3.5" />
            Site Gallery
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-5">
            Our Work in{" "}
            <span className="text-[#00B4D8]">Pictures</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            A visual showcase of our industrial infrastructure projects — from EHT substations and HT line erection
            to panel installations and on-site engineering operations across Karnataka.
          </p>

        </div>
      </section>

      {/* ── Grid ─────────────────────────────────────────────────────────────── */}
      <section className="container-max px-4 pb-16 md:pb-24">
        <div ref={gridRef} className="sr-hidden">
          <div className="gallery-grid">
            {ALL_IMAGES.map((src, idx) => (
              <GalleryCard key={src} src={src} index={idx} onClick={() => setLightboxIndex(idx)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox ──────────────────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          total={total}
          src={ALL_IMAGES[lightboxIndex]}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <CTA 
        headline="Inspired by Our Work?"
        subtext="Get in touch to bring your project to life."
      />
    </div>
  );
};

export default GalleryPage;
