import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Shield, Clock, Star, Phone, ArrowRight, Award, Users,
  CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, ZoomIn, X,
} from "lucide-react";

// Client Logos
import tvsLogo from "@/assets/tvs.png";
import infosysLogo from "@/assets/infosys.png";
import wiproLogo from "@/assets/wipro.png";
import kptclLogo from "@/assets/kptcl.png";
import speechLogo from "@/assets/speech.png";
import tritonLogo from "@/assets/triton.png";
import cescLogo from "@/assets/cesc.png";
import lunarsLogo from "@/assets/lunars.png";
import hitachiLogo from "@/assets/hitachi.png";

// Hero Images
import hero1 from "@/assets/hero1.jpg";
import hero2 from "@/assets/hero2.jpeg";
import hero3 from "@/assets/hero3.jpeg";

// Gallery — 11 Photos
import gallery1 from "@/assets/gallery1.jpeg";
import gallery2 from "@/assets/gallery2.jpeg";
import gallery3 from "@/assets/gallery3.jpeg";
import gallery4 from "@/assets/gallery4.jpeg";
import gallery5 from "@/assets/gallery5.jpeg";
import gallery6 from "@/assets/gallery6.jpeg";
import gallery7 from "@/assets/gallery7.jpeg";
import gallery8 from "@/assets/gallery8.jpeg";
import gallery9 from "@/assets/gallery9.jpeg";
import gallery10 from "@/assets/gallery10.jpeg";
import gallery11 from "@/assets/gallery11.jpeg";

import SectionHeading from "@/components/SectionHeading";

// ─────────────────────────────────────────────────────────────────────────────
// WhatsApp Icon
// ─────────────────────────────────────────────────────────────────────────────
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// Scroll reveal hook
// ─────────────────────────────────────────────────────────────────────────────
const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          el.querySelectorAll(".stagger-child").forEach((child) => {
            (child as HTMLElement).classList.add("revealed");
          });
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
};

// ─────────────────────────────────────────────────────────────────────────────
// Animated Rolling Counter
// ─────────────────────────────────────────────────────────────────────────────
const RollingDigit = ({ target, visible, delayOffset }: { target: string; visible: boolean; delayOffset: number }) => {
  const isNumber = !isNaN(Number(target));
  if (!isNumber) return <span className="inline-block">{target}</span>;

  const num = parseInt(target, 10);
  const digits = Array.from({ length: 30 }, (_, i) => i % 10);
  const targetIndex = 20 + num;

  return (
    <span className="inline-flex flex-col h-[1em] overflow-hidden leading-none tabular-nums" style={{ verticalAlign: "top" }}>
      <span
        className="flex flex-col"
        style={{
          transform: visible ? `translateY(-${targetIndex}em)` : `translateY(0)`,
          transition: `transform 2.5s cubic-bezier(0.16, 1, 0.3, 1) ${delayOffset}ms`
        }}
      >
        {digits.map((n, i) => (
          <span key={i} className="h-[1em] flex-shrink-0 flex items-center justify-center">{n}</span>
        ))}
      </span>
    </span>
  );
};

const RollingCounter = ({ value, suffix = "", delayOffset = 0 }: { value: number; suffix?: string; delayOffset?: number }) => {
  const str = value.toString();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setVisible(true), 100);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className="inline-flex items-center">
      {str.split("").map((char, i) => (
        <RollingDigit key={i} target={char} visible={visible} delayOffset={delayOffset + i * 150} />
      ))}
      <span
        className="inline-block transition-all duration-700 text-[#00B4D8]"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1) translateX(0)' : 'scale(0.8) translateX(-10px)',
          transitionDelay: `${delayOffset + str.length * 150 + 600}ms`
        }}
      >
        {suffix}
      </span>
    </span>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Gallery data
// ─────────────────────────────────────────────────────────────────────────────
type MediaItem = { type: "photo"; src: string; label: string };

const GALLERY: MediaItem[] = [
  { type: "photo", src: gallery1, label: "Substation Installation" },
  { type: "photo", src: gallery2, label: "HT Cable Laying" },
  { type: "photo", src: gallery3, label: "Control Panel Assembly" },
  { type: "photo", src: gallery4, label: "Industrial Switchgear" },
  { type: "photo", src: gallery5, label: "Metering Cubicle Setup" },
  { type: "photo", src: gallery6, label: "Factory Electrification" },
  { type: "photo", src: gallery7, label: "Overhead Line Works" },
  { type: "photo", src: gallery8, label: "Site Operations" },
  { type: "photo", src: gallery9, label: "Electrical Infrastructure" },
  { type: "photo", src: gallery10, label: "Industrial Wiring" },
  { type: "photo", src: gallery11, label: "Project Completion" },
];

const SLIDE_DURATION = 4500;

// ─────────────────────────────────────────────────────────────────────────────
// Lightbox
// ─────────────────────────────────────────────────────────────────────────────
const Lightbox = ({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  const item = GALLERY[index];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      style={{ animation: "lbFadeIn 0.22s ease forwards" }}
    >
      <div
        className="absolute inset-0 bg-black/92 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative z-10 flex flex-col items-center max-w-[92vw] max-h-[92vh]"
        style={{ animation: "lbScaleIn 0.28s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
      >
        <img
          src={item.src}
          alt={item.label}
          className="max-w-full max-h-[80vh] rounded-xl object-contain shadow-2xl"
          draggable={false}
        />
        <div className="mt-4 flex items-center gap-4">
          <span className="text-white/50 text-xs tabular-nums">{index + 1} / {GALLERY.length}</span>
          <span className="text-white font-medium text-sm">{item.label}</span>
        </div>
      </div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
      >
        <X className="h-5 w-5" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-[#00B4D8] backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-[#00B4D8] backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      <style>{`
        @keyframes lbFadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes lbScaleIn { from { opacity: 0; transform: scale(0.92) } to { opacity: 1; transform: scale(1) } }
      `}</style>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// GalleryShowcase — multi-card focus carousel with Ken Burns + lightbox
// ─────────────────────────────────────────────────────────────────────────────
const GalleryShowcase = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const N = GALLERY.length;

  const rafRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);
  const lastTsRef = useRef<number>(0);

  const goTo = useCallback((next: number) => {
    cancelAnimationFrame(rafRef.current);
    elapsedRef.current = 0;
    lastTsRef.current = 0;
    setActive(((next % N) + N) % N);
  }, [N]);

  const goNext = useCallback(() => goTo(active + 1), [active, goTo]);
  const goPrev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (paused || lightbox !== null) {
      cancelAnimationFrame(rafRef.current);
      lastTsRef.current = 0;
      return;
    }
    const tick = (ts: number) => {
      if (lastTsRef.current) {
        elapsedRef.current += ts - lastTsRef.current;
      }
      lastTsRef.current = ts;

      if (elapsedRef.current < SLIDE_DURATION) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        elapsedRef.current = 0;
        lastTsRef.current = 0;
        goNext();
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, paused, lightbox, goNext]);

  const dist = (i: number) => {
    const d = ((i - active) % N + N) % N;
    return d > N / 2 ? d - N : d;
  };

  return (
    <>
      {lightbox !== null && (
        <Lightbox
          index={lightbox}
          onClose={() => setLightbox(null)}
          onPrev={() => setLightbox((((lightbox - 1) % N) + N) % N)}
          onNext={() => setLightbox((lightbox + 1) % N)}
        />
      )}

      <div className="select-none">
        <div
          className="relative overflow-hidden"
          style={{
            // Increased height to accommodate the wider 16:9 cards
            height: "clamp(300px, 45vw, 600px)",
            maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          {GALLERY.map((item, i) => {
            const d = dist(i);
            const abs = Math.abs(d);
            if (abs > 2) return null;

            const isActive = d === 0;
            // Increased translation step (65) so the wider side cards don't overlap too much
            const tx = d * 65;
            const scale = isActive ? 1 : abs === 1 ? 0.75 : 0.55;
            const opacity = isActive ? 1 : abs === 1 ? 0.45 : 0.15;
            const zIndex = isActive ? 10 : abs === 1 ? 5 : 1;

            return (
              <div
                key={i}
                onClick={() => isActive ? setLightbox(i) : goTo(i)}
                onMouseEnter={isActive ? () => setPaused(true) : undefined}
                onMouseLeave={isActive ? () => setPaused(false) : undefined}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  // Enlarged the width significantly
                  width: "clamp(300px, 60%, 900px)",
                  // Changed to 16:9 widescreen format
                  aspectRatio: "16/9",
                  transform: `translate(-50%, -50%) translateX(${tx}%) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: "transform 0.65s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.65s cubic-bezier(0.25, 1, 0.5, 1)",
                  cursor: isActive ? "zoom-in" : "pointer",
                }}
                className="rounded-2xl overflow-hidden shadow-2xl group"
              >
                <img
                  src={item.src}
                  alt={item.label}
                  draggable={false}
                  className="w-full h-full object-cover"
                />

                {isActive && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="bg-black/50 backdrop-blur-sm rounded-full p-4">
                        <ZoomIn className="h-7 w-7 text-white" />
                      </div>
                    </div>

                    <div className="absolute bottom-0 inset-x-0 px-6 py-5 pointer-events-none flex items-end justify-between">
                      <p className="text-white font-bold text-lg md:text-xl drop-shadow-lg tracking-wide">
                        {item.label}
                      </p>
                      <span className="text-white/60 text-sm font-medium tabular-nums">{active + 1} / {N}</span>
                    </div>
                  </>
                )}

                {!isActive && (
                  <div className="absolute inset-0 bg-[#0A3A5C]/50 pointer-events-none rounded-2xl" />
                )}
              </div>
            );
          })}

          <button
            onClick={goPrev}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="absolute left-[4%] top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-[#00B4D8] backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            onClick={goNext}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="absolute right-[4%] top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-[#00B4D8] backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {GALLERY.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              aria-label={`Go to slide ${i + 1}`}
              style={{ transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)" }}
              className={`rounded-full h-2.5 ${i === active
                ? "w-8 bg-[#00B4D8] shadow-[0_0_10px_rgba(0,180,216,0.8)]"
                : "w-2.5 bg-white/30 hover:bg-white/60"
                }`}
            />
          ))}
        </div>

      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────────────────────────────────────
const trustItems = [
  { icon: Shield, text: "Government Approved Contractors" },
  { icon: Clock, text: "Serving Industrial Clients" },
  { icon: Star, text: "Certified EHT Installations" },
];

const stats = [
  { icon: CheckCircle2, value: 90, suffix: "+", label: "Projects Completed" },
  { icon: Users, value: 70, suffix: "+", label: "Industrial Clients" },
  { icon: Award, value: 25, suffix: "+", label: "Years Experience" },
];

const industries = [
  "Substations", "Electrical Industry", "Machine Tool Industry",
  "Electronic Industry", "Technical Institutions", "Forge / Needle Industry",
  "Sugar Factories", "Plywood Industry", "Distilleries", "Coffee Curing Works",
  "Banks & Apartments", "Hospitals & Nursing Homes", "Commercial Complexes",
  "Rubber Industry", "Maintenance Works",
];

const highlights = [
  "HT & EHT electrical installations including substation erection and commissioning",
  "Electrical infrastructure development and control panel installations",
  "Transformer services and industrial electrical maintenance",
  "Industrial earthing systems as per IS 3034 standards",
  "Liaisoning for KPTCL, CESC and Electrical Inspectorate approvals",
  "Work executed in strict compliance with Indian Standards (IS specifications)",
];

const clientLogos = [
  { name: "Infosys", logo: infosysLogo, customWidth: "w-[65%]" },
  { name: "Wipro", logo: wiproLogo, customWidth: "w-[85%]" },
  { name: "KPTCL", logo: kptclLogo, customWidth: "w-[85%]" },
  { name: "Speech", logo: speechLogo, customWidth: "w-[85%]" },
  { name: "Triton", logo: tritonLogo, customWidth: "w-[85%]" },
  { name: "CESC", logo: cescLogo, customWidth: "w-[65%]" },
  { name: "Lunars", logo: lunarsLogo, customWidth: "w-[55%]" },
  { name: "Hitachi", logo: hitachiLogo, customWidth: "w-[60%]" },
  { name: "TVS", logo: tvsLogo, customWidth: "w-[170%] max-w-[170%]" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
const HomePage = () => {
  const introRef = useScrollReveal();
  const statsRef = useScrollReveal();
  const industriesRef = useScrollReveal();

  const galleryHeaderRef = useScrollReveal();
  const galleryCarouselRef = useScrollReveal();

  const [showMoreHighlights, setShowMoreHighlights] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [hero1, hero2, hero3];

  useEffect(() => {
    const t = setInterval(() => setCurrentSlide((p) => (p + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, [heroSlides.length]);

  return (
    <div className="bg-white">
      <style>{`
        .reveal-up { opacity:0; transform:translateY(36px); transition:opacity .65s ease,transform .65s ease; }
        .reveal-up.revealed { opacity:1; transform:translate(0,0); }
        
        /* Sleek zoom animation for the gallery carousel */
        .reveal-zoom { opacity:0; transform:scale(0.92) translateY(40px); transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1); }
        .reveal-zoom.revealed { opacity:1; transform:scale(1) translateY(0); }

        .stagger-child { opacity:0; transform:translateY(20px); transition:opacity .5s ease,transform .5s ease; }
        .stagger-child.revealed { opacity:1; transform:translateY(0); }
        .stagger-child:nth-child(1)  { transition-delay:.05s }
        .stagger-child:nth-child(2)  { transition-delay:.12s }
        .stagger-child:nth-child(3)  { transition-delay:.19s }
        .stagger-child:nth-child(4)  { transition-delay:.26s }
        .stagger-child:nth-child(5)  { transition-delay:.33s }
        .stagger-child:nth-child(6)  { transition-delay:.40s }
        .stagger-child:nth-child(7)  { transition-delay:.47s }
        .stagger-child:nth-child(8)  { transition-delay:.54s }
        .stagger-child:nth-child(9)  { transition-delay:.61s }
        .stagger-child:nth-child(10) { transition-delay:.68s }
        .stagger-child:nth-child(n+11){ transition-delay:.72s }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
            style={{ backgroundImage: `url(${slide})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 text-center px-4 py-20 max-w-4xl mx-auto">
          <p className="text-white/90 font-medium text-xs sm:text-sm uppercase tracking-[0.15em] mb-4 animate-fade-in-up">
            SUPER GRADE ELECTRICAL CONTRACTOR
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight animate-fade-in-up drop-shadow-sm">
            JK Electricals
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-white/95 max-w-2xl mx-auto animate-fade-in-up-delay-1 font-medium drop-shadow-sm">
            Industrial & Infrastructure Electrical Solutions
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mt-10 animate-fade-in-up-delay-2">
            <Link to="/contact" className="bg-[#00B4D8] hover:bg-[#0096b4] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-md">
              Request a Quote
            </Link>
            <a href="tel:+919448069346" className="bg-[#0A3A5C] hover:bg-[#082a43] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md">
              <Phone className="h-5 w-5" /> +91 9448069346
            </a>
            <a href="https://wa.me/919448069346" target="_blank" rel="noopener noreferrer"
              className="bg-[#25D366] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-[#128C7E] flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
              <WhatsAppIcon /> +91 9448069346
            </a>
          </div>
        </div>
      </section>

      {/* ── Trust Banner ─────────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground py-5">
        <div className="container-max px-4 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          {trustItems.map((item) => (
            <div key={item.text} className="flex items-center gap-3 text-sm font-medium">
              <item.icon className="h-5 w-5 text-accent shrink-0" />
              <span className="text-primary-foreground/90">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────────── */}
      <section className="section-padding bg-slate-50 overflow-hidden">
        <div className="container-max">
          <div ref={introRef} className="reveal-up space-y-6 max-w-4xl mx-auto flex flex-col items-center text-center">
            <p className="text-[#00B4D8] font-semibold text-sm uppercase tracking-widest">Who We Are</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-800 leading-snug">
              25+ Years of Trusted<br className="hidden md:block" />
              <span className="text-[#00B4D8]"> Electrical Excellence</span>
            </h2>
            <div className="text-slate-600 text-base leading-relaxed space-y-4 max-w-3xl">
              <p>
                JK Electricals is a licensed <strong>Super Grade Electrical Contractor</strong> based in Mysore with over 25 years of experience in industrial, infrastructure, and power sector electrical works. We provide reliable and high-quality electrical solutions for industrial plants, infrastructure projects, and commercial facilities.
              </p>
              <p>
                Our team of experienced engineers, technicians, and electricians delivers professional electrical services while maintaining the highest safety and quality standards.
              </p>
            </div>
            <div className="max-w-3xl mt-6 flex flex-col items-center">
              <ul className="space-y-3 text-left">
                {highlights.slice(0, 3).map((point) => (
                  <li key={point} className="flex items-start gap-3 text-slate-700 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-[#00B4D8] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className={`grid transition-all duration-500 ease-in-out ${showMoreHighlights ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"} w-full`}>
                <ul className="space-y-3 overflow-hidden text-left">
                  {highlights.slice(3).map((point) => (
                    <li key={point} className="flex items-start gap-3 text-slate-700 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-[#00B4D8] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => setShowMoreHighlights(!showMoreHighlights)}
                className="flex items-center gap-1.5 text-sky-800 font-bold text-sm hover:text-[#00B4D8] transition-colors mt-6 mb-2 focus:outline-none"
              >
                {showMoreHighlights ? "View Less" : "View More"}
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showMoreHighlights ? "rotate-180" : ""}`} />
              </button>
            </div>
            <Link to="/about" className="inline-flex items-center gap-2 bg-[#00B4D8] text-white font-semibold py-3 px-7 rounded-lg hover:bg-[#0096b4] transition-all duration-300 shadow-sm hover:shadow-md mt-6">
              Learn More About Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="relative py-24 bg-[#0A3A5C] overflow-hidden">
        {/* Abstract background blobs for premium feel */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-30%] left-[-10%] w-[60%] h-[120%] rounded-full bg-gradient-to-br from-[#00B4D8]/20 to-transparent blur-3xl opacity-60" />
          <div className="absolute bottom-[-30%] right-[-10%] w-[60%] h-[120%] rounded-full bg-gradient-to-tl from-[#00B4D8]/20 to-transparent blur-3xl opacity-60" />
        </div>

        <div ref={statsRef} className="container-max relative z-10 reveal-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className="stagger-child relative bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[2rem] flex flex-col items-center gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)] overflow-hidden group hover:-translate-y-2 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_16px_48px_rgba(0,180,216,0.15)] transition-all duration-500"
              >
                {/* Glowing orb behind icon */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#00B4D8]/30 rounded-full blur-2xl group-hover:bg-[#00B4D8]/50 transition-all duration-500" />

                <div className="relative z-10 bg-gradient-to-br from-[#00B4D8]/20 to-transparent p-5 rounded-2xl border border-[#00B4D8]/30 group-hover:scale-110 transition-transform duration-500">
                  <stat.icon className="h-8 w-8 text-[#00B4D8] drop-shadow-[0_0_8px_rgba(0,180,216,0.8)]" strokeWidth={2} />
                </div>

                <div className="relative z-10 space-y-3">
                  <div className="font-display text-5xl md:text-6xl font-extrabold text-white drop-shadow-md flex justify-center">
                    <RollingCounter value={stat.value} suffix={stat.suffix} delayOffset={idx * 150} />
                  </div>
                  <p className="text-white/80 text-sm md:text-base font-bold tracking-[0.2em] uppercase mt-2 group-hover:text-white transition-colors">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ───────────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <SectionHeading
            title="Industries We've Served"
            subtitle="Over two decades of delivering reliable electrical solutions across a wide range of sectors."
          />
          <div ref={industriesRef} className="reveal-up mt-10 flex flex-wrap gap-3 justify-center">
            {industries.map((industry) => (
              <span key={industry} className="stagger-child bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium px-4 py-2 rounded-full hover:bg-[#00B4D8]/10 hover:border-[#00B4D8]/40 hover:text-[#0A3A5C] transition-colors duration-300 cursor-default">
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Client Logos Marquee ─────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-br from-white via-slate-50 to-white border-y border-slate-100 overflow-hidden">
        <div className="container-max mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Our Top Customers</p>
          <h3 className="font-display text-2xl font-bold text-slate-800 mt-2">Trusted by Leading Organisations</h3>
        </div>
        <div className="relative w-full" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
          <div className="flex gap-6 w-max py-4 px-2" id="marquee-track" style={{ animation: "marquee 36s linear infinite" }}>
            {[...clientLogos, ...clientLogos].map((client, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-64 h-36 bg-white rounded-2xl border border-slate-200 flex items-center justify-center p-6 cursor-default group transition-all duration-300 hover:border-[#00B4D8]/30 hover:-translate-y-2"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)" }}
                onMouseEnter={(e) => {
                  (document.getElementById("marquee-track") as HTMLElement).style.animationPlayState = "paused";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,180,216,0.15), 0 0 0 1px rgba(0,180,216,0.15)";
                }}
                onMouseLeave={(e) => {
                  (document.getElementById("marquee-track") as HTMLElement).style.animationPlayState = "running";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)";
                }}
              >
                <img src={client.logo} alt={client.name} className={`${client.customWidth} max-h-full object-contain transition-transform duration-300 group-hover:scale-105`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Site Gallery ─────────────────────────────────────────────────── */}
      <section className="section-padding bg-[#0A3A5C] overflow-hidden">
        <div className="container-max">

          <div ref={galleryHeaderRef} className="reveal-up text-center mb-10">
            <p className="text-[#00B4D8] font-bold text-sm uppercase tracking-widest mb-3">
              Site Gallery
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white">
              Our Work in Pictures
            </h2>
            <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-base leading-relaxed">
              A visual showcase of our industrial infrastructure, panel installations,
              and on-site engineering operations.
            </p>
          </div>

          <div ref={galleryCarouselRef} className="reveal-zoom" style={{ transitionDelay: '0.15s' }}>
            <GalleryShowcase />
          </div>

        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-sky-50 border-t border-sky-100 py-16 text-center px-4">
        <div className="container-max">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Discuss Your Next Industrial Project
          </h2>
          <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto">
            From new substation installations to factory electrification and critical maintenance, our engineers are ready to partner with you.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <a href="https://wa.me/919448069346" target="_blank" rel="noopener noreferrer"
              className="bg-[#25D366] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-[#128C7E] flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
              <WhatsAppIcon /> +91 9448069346
            </a>
            <a href="tel:+919448069346" className="bg-[#0A3A5C] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-[#082a43] inline-flex items-center justify-center gap-2 shadow-sm">
              <Phone className="h-5 w-5" /> +91 9448069346
            </a>
            <Link to="/contact" className="border-2 border-[#00B4D8] text-[#00B4D8] font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-[#00B4D8] hover:text-white inline-flex items-center justify-center gap-2">
              Contact Team <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;