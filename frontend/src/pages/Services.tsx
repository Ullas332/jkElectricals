import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import {
  ArrowRight, ChevronLeft, ChevronRight, X, Phone,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CTA from "@/components/CTA";

// 1. Electrical Infrastructure & Substation Works
import e1 from "@/assets/e1.jpeg";
import e2 from "@/assets/e2.jpeg";
import e3 from "@/assets/e3.jpeg";
import e4 from "@/assets/e4.jpeg";

// 2. Transformer Services
import t2 from "@/assets/t2.jpeg";

// 3. HT Metering & Distribution Systems
import ht2 from "@/assets/ht2.jpeg";
import ht3 from "@/assets/ht3.jpeg";

// 4. Electrical Installation & Wiring
import w1 from "@/assets/w1.jpeg";
import w2 from "@/assets/w2.jpeg";
import w3 from "@/assets/w3.jpeg";

// 5. Industrial Electrical Works
import I2 from "@/assets/I2.jpeg";

// Generator
import g1 from "@/assets/g1.jpeg";

// 6. Electrical Panels & Control Systems
import p1 from "@/assets/p1.jpeg";
import p2 from "@/assets/p2.jpeg";
import p3 from "@/assets/p3.jpeg";
import p4 from "@/assets/p4.jpeg";

// 7. Testing & Commissioning
import test1 from "@/assets/test1.jpeg";
import test2 from "@/assets/test2.jpeg";
import test3 from "@/assets/test3.jpeg";

// 8. Electrical Maintenance
import em1 from "@/assets/em1.jpeg";
import em2 from "@/assets/em2.jpeg";

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
// Page-load stagger: reveals children shortly after mount
const useMountReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const t = setTimeout(() => {
      el.querySelectorAll(".stagger-child").forEach((child) => {
        (child as HTMLElement).classList.add("revealed");
      });
    }, 120);
    return () => clearTimeout(t);
  }, []);
  return ref;
};

// ─────────────────────────────────────────────────────────────────────────────
// ImageLightbox — portal-rendered split-panel modal
// ─────────────────────────────────────────────────────────────────────────────
const ImageLightbox = ({
  images, imageClasses, startIndex, title, description, link, onClose,
}: {
  images: string[];
  imageClasses?: string[];
  startIndex: number;
  title: string;
  description: React.ReactNode;
  link: string;
  onClose: () => void;
}) => {
  const [idx, setIdx] = useState(startIndex);
  const N = images.length;

  const goTo = (next: number) => setIdx(((next % N) + N) % N);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goTo(idx + 1);
      if (e.key === "ArrowLeft") goTo(idx - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [idx, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ animation: "lbFadeIn 0.22s ease forwards" }}
    >
      <div className="absolute inset-0 bg-slate-900/92 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative z-10 w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
        style={{ maxHeight: "90vh", animation: "lbScaleIn 0.28s cubic-bezier(0.2,0.8,0.2,1) forwards" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: image viewer */}
        <div className="relative md:w-[55%] bg-black flex-shrink-0 overflow-hidden" style={{ aspectRatio: "4/3" }}>
          {images.map((src, i) => {
            const cls = imageClasses?.[i] || "object-center";
            const isContain = cls.includes("object-contain");
            return (
              <div key={i} className={`absolute inset-0 transition-opacity duration-500 ${i === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
                {isContain && <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-40" />}
                <img src={src} alt={`${title} ${i + 1}`} draggable={false} className={`absolute inset-0 w-full h-full object-cover ${cls}`} />
              </div>
            );
          })}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-20" />
          {N > 1 && (
            <>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                {images.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)}
                    className={`rounded-full transition-all duration-300 ${i === idx ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"}`} />
                ))}
              </div>
              <button onClick={() => goTo(idx - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-[#00B4D8] backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={() => goTo(idx + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-[#00B4D8] backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
                <ChevronRight className="h-5 w-5" />
              </button>
              <span className="absolute top-4 right-4 z-30 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full tabular-nums">
                {idx + 1} / {N}
              </span>
            </>
          )}
        </div>

        {/* Right: description */}
        <div className="flex flex-col flex-1 p-7 md:p-9 overflow-y-auto">
          <h2 className="font-display text-xl md:text-2xl font-extrabold text-slate-800 leading-snug mb-5">{title}</h2>
          <div className="w-12 h-1 bg-[#00B4D8] rounded-full mb-6" />
          <p className="text-slate-600 text-sm md:text-base leading-relaxed flex-1">{description}</p>
          <div className="mt-8 pt-6 border-t border-slate-100">
            <Link to={link} onClick={onClose}
              className="inline-flex items-center justify-center gap-2 bg-[#00B4D8] hover:bg-[#0096b4] text-white font-bold py-3.5 px-7 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
              Request This Service <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      <button onClick={onClose}
        className="absolute top-4 right-4 z-[10000] w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        aria-label="Close">
        <X className="h-6 w-6" />
      </button>

      <style>{`
        @keyframes lbFadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes lbScaleIn { from{opacity:0;transform:scale(0.95) translateY(15px)} to{opacity:1;transform:scale(1) translateY(0)} }
      `}</style>
    </div>,
    document.body
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MediaServiceCard
// ─────────────────────────────────────────────────────────────────────────────
interface MediaServiceCardProps {
  index: number;
  title: string;
  description: React.ReactNode;
  images: string[];
  imageClasses?: string[];
  link?: string;
  reverse?: boolean;
}

const MediaServiceCard = ({
  index, title, description, images, imageClasses, link = "/contact", reverse = false,
}: MediaServiceCardProps) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (next: number) => setImgIndex(((next % images.length) + images.length) % images.length);

  useEffect(() => {
    if (paused || lightbox || images.length < 2) return;
    timerRef.current = setTimeout(() => goTo(imgIndex + 1), 4500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [imgIndex, paused, lightbox]);

  return (
    <>
      {lightbox && (
        <ImageLightbox
          images={images} imageClasses={imageClasses} startIndex={imgIndex}
          title={title} description={description} link={link}
          onClose={() => setLightbox(false)}
        />
      )}

      <div
        className={`group bg-white rounded-2xl border border-slate-200/80 overflow-hidden flex flex-col md:flex-row hover:shadow-xl hover:border-slate-300 transition-all duration-300 shadow-sm ${reverse ? "md:flex-row-reverse" : ""}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="relative overflow-hidden cursor-pointer bg-slate-900 flex-shrink-0 md:w-[45%] lg:w-[48%]"
          style={{ minHeight: "260px" }}
          onClick={() => setLightbox(true)}
        >
          {images.map((src, i) => {
            const cls = imageClasses?.[i] || "object-center";
            const isContain = cls.includes("object-contain");
            return (
              <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === imgIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
                {isContain && <img src={src} alt="" draggable={false} className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-50" />}
                <img src={src} alt={`${title} ${i + 1}`} draggable={false}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${cls}`} />
              </div>
            );
          })}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none z-20" />

          {/* Dot indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
              {images.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); goTo(i); }}
                  className={`rounded-full transition-all duration-300 ${i === imgIndex ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"}`} />
              ))}
            </div>
          )}

          {/* Prev/Next arrows */}
          {images.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); goTo(imgIndex - 1); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/40 hover:bg-[#00B4D8] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); goTo(imgIndex + 1); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/40 hover:bg-[#00B4D8] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        {/* ── Description side ── */}
        <div className="flex flex-col justify-center flex-1 p-6 md:p-8">
          {/* Professional numbering */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl md:text-3xl font-extrabold text-slate-400 leading-none select-none tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>
          <h3 className="font-display text-xl md:text-2xl font-extrabold text-slate-800 mb-3 leading-snug">
            {title}
          </h3>
          <div className="text-slate-500 text-[14px] md:text-[15px] leading-relaxed mb-6">
            {description}
          </div>
          <div>
            <Link to={link}
              className="inline-flex items-center gap-2 bg-[#00B4D8] hover:bg-[#0096b4] text-white font-bold py-2.5 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-[13px] md:text-sm">
              Request Service <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// GovLiaisonCard — full-width description card
// ─────────────────────────────────────────────────────────────────────────────
const GovLiaisonCard = ({
  index, title, description, link = "/contact",
}: {
  index: number;
  title: string;
  description: React.ReactNode;
  link?: string;
}) => (
  <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300">
    <div className="p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl md:text-3xl font-extrabold text-slate-400 leading-none tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>
      <h3 className="font-display text-xl md:text-2xl font-extrabold text-slate-800 mb-3 leading-snug">
        {title}
      </h3>
      <div className="text-slate-500 text-[14px] md:text-[15px] leading-relaxed mb-6">
        {description}
      </div>
      <Link to={link}
        className="inline-flex items-center gap-2 bg-[#00B4D8] hover:bg-[#0096b4] text-white font-bold py-2.5 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-[13px] md:text-sm">
        Request Service <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Service data
// ─────────────────────────────────────────────────────────────────────────────
const industrialServices = [
  {
    id: "substation",
    title: "Electrical Infrastructure & Substation Works",
    description: (
      <>
        We provide comprehensive 66/11 kV substation projects and HT/EHT installations, ensuring reliable, compliant power infrastructure from design to handover.
        <br /><br />
        <strong className="text-slate-800">Key Scope:</strong>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Complete supply, installation, testing, and commissioning</li>
          <li>66/11 kV substation erection and commissioning</li>
          <li>Supply of HT installation materials and equipment</li>
        </ul>
      </>
    ),
    images: [e1, e2, e3, e4],
  },
  {
    id: "generators",
    title: "Transformer & Generator Services",
    description: (
      <>
        We deliver complete transformer and generator solutions, including supply and servicing, to ensure efficient and uninterrupted power backup systems.
        <br /><br />
        <strong className="text-slate-800">Key Scope:</strong>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Supply, installation, and commissioning of generator sets</li>
          <li>Transformer oil filtration, supply, and maintenance</li>
          <li>HV &amp; LV Megger testing and conditioning</li>
          <li>Rewinding of motors and transformers</li>
        </ul>
      </>
    ),
    images: [t2, g1],
  },
  {
    id: "industrial",
    title: "Industrial Electrical Works",
    description: (
      <>
        We execute specialized electrification and consultancy services for industrial and infrastructure projects, maintaining the highest safety and compliance standards.
        <br /><br />
        <strong className="text-slate-800">Key Scope:</strong>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Project consultancy, design, and execution</li>
          <li>Electrification for industries, commercial complexes, and apartments</li>
          <li>Effluent treatment electrification works</li>
          <li>Industrial earthing as per IS 3034 with rigorous testing</li>
        </ul>
      </>
    ),
    images: [I2],
  },
  {
    id: "wiring",
    title: "Electrical Installation & Wiring",
    description: (
      <>
        We provide reliable electrical wiring and luminary installation solutions, focusing on safety, efficiency, and long-term durability.
        <br /><br />
        <strong className="text-slate-800">Key Scope:</strong>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Complete supply and installation of electrical materials</li>
          <li>Overhead and underground EHT &amp; HT installations</li>
          <li>Internal wiring, lifting room, and network communication wiring</li>
          <li>Street lighting, yard lighting, and internal illumination</li>
        </ul>
      </>
    ),
    images: [w1, w2, w3],
    imageClasses: ["object-center", "object-top scale-120", "object-top scale-120"],
  },
  {
    id: "panels",
    title: "Electrical Panels & Distribution",
    description: (
      <>
        We offer precision-engineered panel boards and distribution solutions, ensuring reliable and compliant power management across facilities.
        <br /><br />
        <strong className="text-slate-800">Key Scope:</strong>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Supply, installation, testing, and commissioning of panels</li>
          <li>HT metering cubicles and accessories</li>
          <li>Supply of distribution boards, switchgears, and accessories</li>
          <li>Assembling and wiring of control and test panels</li>
        </ul>
      </>
    ),
    images: [p1, p2, p3, p4, ht2, ht3],
  },
  {
    id: "testing",
    title: "Testing, Commissioning & Maintenance",
    description: (
      <>
        We ensure the long-term reliability and safety of electrical systems through detailed testing, certification, and scheduled maintenance.
        <br /><br />
        <strong className="text-slate-800">Key Scope:</strong>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Pre-commissioning testing and fault diagnosis</li>
          <li>All types of electrical and predictive maintenance work</li>
          <li>Industrial maintenance (MUDA, KPTCL, KPCL, BARC, BEML)</li>
          <li>Equipment performance verification and servicing</li>
        </ul>
      </>
    ),
    images: [test1, test2, test3, em1, em2],
  },
  {
    id: "liaison",
    title: "Government Liaison & Approvals",
    description: (
      <>
        We provide complete support for regulatory approvals, ensuring strict compliance with all local and national electrical safety standards.
        <br /><br />
        <strong className="text-slate-800">Key Scope:</strong>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Liaisoning with KPTCL, CESC, and Electrical Inspectorate</li>
          <li>End-to-end documentation for government approvals</li>
          <li>Safety compliance and final installation certification</li>
        </ul>
      </>
    ),
    images: [],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
const ServicesPage = () => {
  const listRef = useMountReveal();

  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <div className="bg-white">
      <style>{`
        /* ── Card stagger ── */
        .stagger-child { opacity: 0; transform: translateY(28px); transition: opacity 0.65s cubic-bezier(0.2,0.8,0.2,1), transform 0.65s cubic-bezier(0.2,0.8,0.2,1); }
        .stagger-child.revealed { opacity: 1; transform: translateY(0); }
        .stagger-child:nth-child(1) { transition-delay: 0.04s }
        .stagger-child:nth-child(2) { transition-delay: 0.12s }
        .stagger-child:nth-child(3) { transition-delay: 0.20s }
        .stagger-child:nth-child(4) { transition-delay: 0.28s }
        .stagger-child:nth-child(5) { transition-delay: 0.36s }
        .stagger-child:nth-child(6) { transition-delay: 0.44s }
        .stagger-child:nth-child(n+7) { transition-delay: 0.52s }
      `}</style>

      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Services list ── */}
      <section className="section-padding bg-slate-50">
        <div className="container-max">
          <div className="text-center mb-0">
            <SectionHeading
              title="Comprehensive Electrical Offerings"
              subtitle=""
            />
            <p className="text-slate-600 text-base md:text-lg font-medium -mt-6">
              Explore our specialized scope of work for industrial, commercial, and utility sectors.
            </p>
          </div>

          <div ref={listRef} className="flex flex-col gap-5 mt-14">
            {industrialServices.map((svc, i) => (
              <div key={i} id={svc.id} className="stagger-child scroll-mt-24">
                {svc.images.length > 0 ? (
                  <MediaServiceCard
                    index={i}
                    title={svc.title}
                    description={svc.description}
                    images={svc.images}
                    imageClasses={svc.imageClasses}
                    link="/contact"
                    reverse={i % 2 !== 0}
                  />
                ) : (
                  <GovLiaisonCard
                    index={i}
                    title={svc.title}
                    description={svc.description}
                    link="/contact"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <CTA 
        headline="Looking for Reliable Electrical Services?"
        subtext="Our engineering team is ready to support your project needs."
      />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// HeroSection
// ─────────────────────────────────────────────────────────────────────────────
const HeroSection = () => (
  <section className="bg-[#0A3A5C] text-white py-20 md:py-28 text-center px-4 relative overflow-hidden">
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      <div className="absolute -top-[30%] -right-[10%] w-[60%] h-[120%] rounded-full bg-gradient-to-bl from-[#00B4D8]/20 to-transparent blur-3xl" />
      <div className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[120%] rounded-full bg-gradient-to-tr from-[#00B4D8]/20 to-transparent blur-3xl" />
    </div>
    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]"
      style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
    <div className="container-max relative z-10">
      <p className="text-[#00B4D8] font-bold text-sm uppercase tracking-widest mb-4">
        Industrial &amp; Commercial
      </p>
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-sm">
        Our Engineering Services
      </h1>
      <p className="mt-5 text-white/85 text-lg md:text-xl max-w-3xl mx-auto font-medium">
        Providing high-tension installations, substation commissioning, and industrial electrical solutions engineered for reliability.
      </p>
    </div>
  </section>
);

export default ServicesPage;