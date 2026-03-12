import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, X, Phone } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";

// 1. Electrical Infrastructure & Substation Works
import e1 from "@/assets/e1.jpeg";
import e2 from "@/assets/e2.jpeg";
import e3 from "@/assets/e3.jpeg";
import e4 from "@/assets/e4.jpeg";

// 2. Transformer Services
import t1 from "@/assets/t1.jpeg";
import t2 from "@/assets/t2.jpeg";

// 3. HT Metering & Distribution Systems
import ht1 from "@/assets/ht1.jpeg";
import ht2 from "@/assets/ht2.jpeg";
import ht3 from "@/assets/ht3.jpeg";

// 4. Electrical Installation & Wiring
import w1 from "@/assets/w1.jpeg";
import w2 from "@/assets/w2.jpeg";
import w3 from "@/assets/w3.jpeg";

// 5. Industrial Electrical Works
import I1 from "@/assets/I1.jpeg";
import I2 from "@/assets/I2.jpeg";
import I3 from "@/assets/I3.jpeg";

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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
};

// ─────────────────────────────────────────────────────────────────────────────
// ServiceDetailModal — Safely rendered via React Portal
// ─────────────────────────────────────────────────────────────────────────────
const ImageLightbox = ({
  images,
  imageClasses,
  startIndex,
  title,
  description,
  link,
  onClose,
}: {
  images: string[];
  imageClasses?: string[];
  startIndex: number;
  title: string;
  description: string;
  link: string;
  onClose: () => void;
}) => {
  const [idx, setIdx] = useState(startIndex);
  const N = images.length;

  const goTo = (next: number) => {
    setIdx(((next % N) + N) % N);
  };

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
      style={{ animation: "lbFadeIn 0.25s ease forwards" }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm" onClick={onClose} />

      {/* Modal panel */}
      <div
        className="relative z-10 w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
        style={{ maxHeight: "90vh", animation: "lbScaleIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Left: image viewer ── */}
        <div className="relative md:w-[55%] bg-black flex-shrink-0 overflow-hidden" style={{ aspectRatio: "4/3" }}>

          {/* Stacked Images for Seamless Crossfade */}
          {images.map((src, i) => {
            const customClass = imageClasses?.[i] || "object-center";
            const isContain = customClass.includes("object-contain");
            return (
              <div
                key={i}
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${i === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
              >
                {isContain && (
                  <img
                    src={src}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-40"
                  />
                )}
                <img
                  src={src}
                  alt={`${title} - image ${i + 1}`}
                  draggable={false}
                  className={`absolute inset-0 w-full h-full object-cover ${customClass}`}
                />
              </div>
            );
          })}

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-20" />

          {/* Dot indicators */}
          {N > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${i === idx ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"
                    }`}
                />
              ))}
            </div>
          )}

          {/* Prev / Next */}
          {N > 1 && (
            <>
              <button
                onClick={() => goTo(idx - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-[#00B4D8] backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => goTo(idx + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-[#00B4D8] backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Image counter */}
          {N > 1 && (
            <span className="absolute top-4 right-4 z-30 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full tabular-nums">
              {idx + 1} / {N}
            </span>
          )}
        </div>

        {/* ── Right: description ── */}
        <div className="flex flex-col flex-1 p-7 md:p-8 overflow-y-auto">
          <div className="mb-5">
            <h2 className="font-display text-xl md:text-2xl font-extrabold text-slate-800 leading-snug">
              {title}
            </h2>
          </div>

          <div className="w-12 h-1 bg-[#00B4D8] rounded-full mb-6" />

          <p className="text-slate-600 text-sm md:text-base leading-relaxed flex-1">
            {description}
          </p>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <Link
              to={link}
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 bg-[#00B4D8] hover:bg-[#0096b4] text-white font-bold py-3.5 px-7 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg w-full md:w-auto"
            >
              Request This Service <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[10000] w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>

      <style>{`
        @keyframes lbFadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes lbScaleIn { from { opacity: 0; transform: scale(0.95) translateY(15px) } to { opacity: 1; transform: scale(1) translateY(0) } }
      `}</style>
    </div>,
    document.body
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MediaServiceCard — Seamless Auto-Switching Photo Card
// ─────────────────────────────────────────────────────────────────────────────
interface MediaServiceCardProps {
  title: string;
  description: string;
  images: string[];
  imageClasses?: string[]; // Array to target specific images for zooming/cropping
  link?: string;
}

const MediaServiceCard = ({
  title,
  description,
  images,
  imageClasses,
  link = "/contact",
}: MediaServiceCardProps) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (next: number) => {
    setImgIndex(((next % images.length) + images.length) % images.length);
  };

  // Auto-switch every 4.5s
  useEffect(() => {
    if (paused || lightbox || images.length < 2) return;
    timerRef.current = setTimeout(() => goTo(imgIndex + 1), 4500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [imgIndex, paused, lightbox]);

  return (
    <>
      {lightbox && (
        <ImageLightbox
          images={images}
          imageClasses={imageClasses}
          startIndex={imgIndex}
          title={title}
          description={description}
          link={link}
          onClose={() => setLightbox(false)}
        />
      )}

      <div
        className="group bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* ── Photo switcher ── */}
        <div
          className="relative overflow-hidden cursor-pointer bg-slate-900"
          style={{ aspectRatio: "16/9" }}
          onClick={() => setLightbox(true)}
        >
          {/* Stacked Images for Seamless Crossfade */}
          {images.map((src, i) => {
            const customClass = imageClasses?.[i] || "object-center";
            const isContain = customClass.includes("object-contain");
            return (
              <div
                key={i}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${i === imgIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
              >
                {isContain && (
                  <img
                    src={src}
                    alt=""
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-50"
                  />
                )}
                <img
                  src={src}
                  alt={`${title} - image ${i + 1}`}
                  draggable={false}
                  className={`absolute inset-0 w-full h-full object-cover ${customClass}`}
                />
              </div>
            );
          })}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-20" />

          {/* Dot indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); goTo(i); }}
                  className={`rounded-full transition-all duration-300 ${i === imgIndex ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                    }`}
                />
              ))}
            </div>
          )}

          {/* Prev / Next arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goTo(imgIndex - 1); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/40 hover:bg-[#00B4D8] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goTo(imgIndex + 1); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/40 hover:bg-[#00B4D8] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col flex-1 p-6 md:p-8">
          <h3 className="font-display text-xl font-bold text-slate-800 mb-3 leading-snug">
            {title}
          </h3>

          <div className="flex-1 mb-5">
            <p className={`text-slate-600 text-sm leading-relaxed transition-all duration-300 ${!isExpanded ? "line-clamp-3" : ""}`}>
              {description}
            </p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-[#00B4D8] hover:text-[#0096b4] text-xs font-bold tracking-wide transition-colors duration-200"
            >
              {isExpanded ? "View Less ↑" : "View More ↓"}
            </button>
          </div>

          <div className="pt-5 border-t border-slate-100 mt-auto">
            <Link
              to={link}
              className="inline-flex items-center justify-center gap-2 bg-[#00B4D8] hover:bg-[#0096b4] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-sm w-full"
            >
              Request Service <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Service Data Array
// ─────────────────────────────────────────────────────────────────────────────
const industrialServices = [
  {
    title: "Electrical Infrastructure & Substation Works",
    description: "We provide complete 66/11 KV substation erection and commissioning services for industrial and infrastructure projects. Our expertise includes EHT and HT installations for both overhead and underground systems. We handle supply, erection, testing, and commissioning of electrical infrastructure with strict adherence to Indian Standard (IS) specifications.",
    images: [e1, e2, e3, e4]
  },
  {
    title: "Transformer Services",
    description: "Our transformer services include oil filtration, testing, and maintenance of distribution transformers to ensure reliable performance. We also provide rewinding services for motors and transformers, along with the supply of transformer oil and accessories. Our team ensures proper servicing and operational efficiency for industrial power systems.",
    images: [t1, t2]
  },
  {
    title: "HT Metering & Distribution Systems",
    description: "We specialize in the design, fabrication, supply, and servicing of HT metering cubicles and distribution transformer systems. Our services include supply of HT installation materials, distribution boards, and transformer accessories. These solutions help industries maintain accurate power distribution and monitoring systems.",
    images: [ht1, ht2, ht3]
  },
  {
    title: "Electrical Installation & Wiring",
    description: "We provide professional electrical installation and wiring services for various facilities including telephone systems, computer networks, and lift room wiring. Our services also cover street lighting, yard lighting, and internal lighting installations. All work is carried out with proper safety practices and quality standards.",
    images: [w1, w2, w3],
    // Removed from 1st, applied to 2nd and 3rd!
    imageClasses: ["object-center", "object-top scale-120", "object-top scale-120"]
  },
  {
    title: "Industrial Electrical Works",
    description: "We undertake complete electrification projects for industries, residential layouts, apartments, and commercial complexes. Our services also include effluent treatment plant electrification and industrial earthing work as per IS 3034 standards. We provide reliable electrical solutions designed to meet industrial power requirements.",
    images: [I1, I2, I3]
  },
  {
    title: "Electrical Panels & Control Systems",
    description: "Our team performs assembling and wiring of control panels and test panels for industrial electrical systems. We ensure proper installation, wiring, and configuration of panels to support efficient equipment operation. All panel work is carried out with attention to safety, precision, and reliability.",
    images: [p1, p2, p3, p4],
    imageClasses: ["!object-contain", "!object-contain", "!object-contain", "!object-contain"]
  },
  {
    title: "Testing & Commissioning",
    description: "We provide testing and commissioning services for electrical installations, transformers, and HT systems. Our testing services include HV and LV megger testing, system inspections, and performance verification. These procedures ensure that electrical systems operate safely and efficiently before full operation.",
    images: [test1, test2, test3]
  },
  {
    title: "Electrical Maintenance",
    description: "We offer comprehensive electrical maintenance services for industries, commercial facilities, and infrastructure projects. Our maintenance support includes inspections, repairs, and servicing to ensure uninterrupted power systems. We have experience working with organizations such as MUDA, KPTCL, KPCL, BARC, and BEML.",
    images: [em1, em2]
  },
  {
    title: "Government & Utility Liaison Services",
    description: "We assist clients with liaisoning and approval processes with electrical authorities, including KPTCL, CESC, and the Electrical Inspectorate. Our services help ensure that electrical installations meet regulatory requirements and receive the necessary government approvals for project completion.",
    images: []
  },
  {
    title: "Generator Services",
    description: "We provide commissioning, servicing, and maintenance of generator sets for industrial and commercial applications. Our team ensures that generator systems are properly installed and tested for reliable backup power. We focus on maintaining efficiency and operational readiness of generator units.",
    images: []
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────────────────────────────────────
const ServicesPage = () => {
  const gridRef = useScrollReveal();

  return (
    <div className="bg-white">
      {/* Seamless load animations */}
      <style>{`
        .hero-fade-up { opacity: 0; animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .stagger-child { opacity: 0; transform: translateY(30px); transition: all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .stagger-child.revealed { opacity: 1; transform: translateY(0); }
        .stagger-child:nth-child(1)  { transition-delay: .05s }
        .stagger-child:nth-child(2)  { transition-delay: .12s }
        .stagger-child:nth-child(3)  { transition-delay: .19s }
        .stagger-child:nth-child(4)  { transition-delay: .26s }
        .stagger-child:nth-child(5)  { transition-delay: .33s }
        .stagger-child:nth-child(6)  { transition-delay: .40s }
        .stagger-child:nth-child(n+7) { transition-delay: .47s }
      `}</style>

      {/* Premium Dark Navy Hero Header */}
      <section className="bg-[#0A3A5C] text-white py-20 md:py-28 text-center px-4 relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[30%] -right-[10%] w-[60%] h-[120%] rounded-full bg-gradient-to-bl from-[#00B4D8]/20 to-transparent blur-3xl" />
          <div className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[120%] rounded-full bg-gradient-to-tr from-[#00B4D8]/20 to-transparent blur-3xl" />
        </div>

        <div className="container-max relative z-10">
          <p className="text-[#00B4D8] font-bold text-sm uppercase tracking-widest mb-4 hero-fade-up">
            Industrial & Commercial
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-sm hero-fade-up delay-100">
            Our Engineering Services
          </h1>
          <p className="mt-5 text-white/90 text-lg md:text-xl max-w-3xl mx-auto font-medium hero-fade-up delay-200">
            Providing high-tension installations, substation commissioning, and industrial electrical solutions engineered for reliability.
          </p>
        </div>
      </section>

      {/* Services Card Grid */}
      <section className="section-padding bg-slate-50">
        <div className="container-max">
          <SectionHeading
            title="Comprehensive Electrical Offerings"
            subtitle="Explore our specialized scope of work for industrial, commercial, and utility sectors."
          />

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {industrialServices.map((service, index) => (
              <div key={index} className="stagger-child h-full">
                {service.images && service.images.length > 0 ? (
                  <MediaServiceCard
                    title={service.title}
                    description={service.description}
                    images={service.images}
                    imageClasses={service.imageClasses}
                    link="/contact"
                  />
                ) : (
                  <ServiceCard
                    title={service.title}
                    description={service.description}
                    link="/contact"
                  />
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-sky-50 border-t border-sky-100 py-16 text-center px-4">
        <div className="container-max">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Discuss Your Next Industrial Project
          </h2>
          <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto">
            From new substation installations to factory electrification and critical maintenance, our engineers are ready to partner with you.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            {/* WhatsApp - Green */}
            <a
              href="https://wa.me/919448069346"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-[#128C7E] flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <WhatsAppIcon /> +91 9448069346
            </a>
            {/* Phone Button */}
            <a
              href="tel:+919448069346"
              className="bg-[#0A3A5C] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-[#082a43] inline-flex items-center justify-center gap-2 shadow-sm"
            >
              <Phone className="h-5 w-5" /> +91 9448069346
            </a>
            {/* Contact Team - Outline */}
            <Link
              to="/contact"
              className="border-2 border-[#00B4D8] text-[#00B4D8] font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-[#00B4D8] hover:text-white inline-flex items-center justify-center gap-2"
            >
              Contact Team <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;