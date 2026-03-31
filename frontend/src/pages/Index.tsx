import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Shield, Clock, Star, Phone, ArrowRight, Award, Users,
  CheckCircle2, Mail
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
import barcLogo from "@/assets/BARC.png";
import raneLogo from "@/assets/rane.jpg";
import mysoreUniversityLogo from "@/assets/mysoreUniversity.jpg";

// Hero Images
import hero1 from "@/assets/hero1.jpg";
import hero2 from "@/assets/hero2.jpeg";
import heroMain from "@/assets/hero.jpeg";
import heroes1 from "@/assets/heroes1.jpeg";

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
import CTA from "@/components/CTA";

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
  { name: "BARC", logo: barcLogo, customWidth: "w-[85%]" },
  { name: "Rane", logo: raneLogo, customWidth: "w-[85%]" },
  { name: "Mysore University", logo: mysoreUniversityLogo, customWidth: "w-[80%]" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
const HomePage = () => {
  const introRef = useScrollReveal();
  const statsRef = useScrollReveal();
  const industriesRef = useScrollReveal();

  // Hero card stagger on mount
  const heroGridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = heroGridRef.current;
    if (!el) return;
    const cards = el.querySelectorAll(".hero-card");
    cards.forEach((card, i) => {
      setTimeout(() => {
        (card as HTMLElement).classList.add("revealed");
      }, 150 + i * 150);
    });
  }, []);

  const galleryHeaderRef = useScrollReveal();
  const galleryCarouselRef = useScrollReveal();

  const [showMoreHighlights, setShowMoreHighlights] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [hero1, hero2, heroMain, heroes1];

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

      {/* ── Partitioned Hero ─────────────────────────────────────────────── */}
      <section className="pt-6 pb-12 md:pt-10 md:pb-16 bg-[#f8fafc] relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-slate-200/40 to-transparent pointer-events-none" />

        <div className="container-max px-4 relative z-10">
          <div ref={heroGridRef} className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">

            {/* Introduction Partition */}
            <div className="hero-card md:col-span-12 lg:col-span-6 bg-white rounded-[2rem] p-8 lg:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-200/60 flex flex-col justify-center relative overflow-hidden group">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 text-[#00B4D8] text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] w-fit mb-6 sm:mb-8 border border-sky-100">
                  Super Grade Electrical Contractor
                </div>
                <h1 className="font-display text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 leading-[1.1] mb-5 tracking-tight">
                  <span className="block mb-2">JK Electricals</span>
                  <span className="text-[#00B4D8] block text-[0.6em] leading-tight drop-shadow-sm">Industrial &amp; Infrastructure Solutions</span>
                </h1>
                <p className="text-slate-600 text-base md:text-lg max-w-2xl leading-relaxed">
                  Delivering reliable, high-quality electrical solutions for commercial facilities, factories, and power projects with over 25 years of trusted engineering excellence.
                </p>
              </div>
            </div>

            {/* Photos Partition */}
            <div className="hero-card md:col-span-12 lg:col-span-6 rounded-[2rem] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] relative min-h-[400px] lg:min-h-[450px] border border-slate-200/60">
              {heroSlides.map((slide, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 bg-cover bg-[center_top] transition-all duration-1000 ease-in-out ${i === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
                  style={{ backgroundImage: `url(${slide})` }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A3A5C]/90 via-black/20 to-transparent opacity-90 transition-opacity duration-300" />
              <div className="absolute inset-0 border-4 border-white/10 rounded-[2rem] pointer-events-none" />

            </div>

            {/* Who We Are Partition */}
            <div className="hero-card md:col-span-12 lg:col-span-6 bg-white rounded-[2rem] p-8 lg:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-200/60 flex flex-col justify-center relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-[#00B4D8] font-bold text-[1.8rem] lg:text-[2.1rem] leading-tight drop-shadow-sm mb-4">Who We Are</p>
                <h3 className="font-display text-3xl md:text-3xl lg:text-4xl font-extrabold text-slate-800 leading-[1.2] mb-5 tracking-tight">
                  25+ Years of Trusted Electrical Excellence
                </h3>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6">
                  Based in Mysore, we provide reliable and high-quality electrical solutions for industrial plants, infrastructure projects, and commercial facilities. Our experienced team of engineers, technicians, and electricians delivers professional services while maintaining the highest safety and quality standards across all projects.
                </p>
                <Link to="/about" className="inline-flex items-center gap-2 text-[#0A3A5C] font-semibold text-sm hover:text-[#00B4D8] transition-colors group-hover:translate-x-1 duration-300">
                  Read Full Story <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Contacts Partition */}
            <div className="hero-card md:col-span-12 lg:col-span-6 bg-[#0A3A5C] rounded-[2rem] p-8 lg:p-12 shadow-[0_8px_32px_rgba(10,58,92,0.15)] flex flex-col justify-center relative overflow-hidden border border-[#0A3A5C]">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#00B4D8] rounded-full blur-[100px] opacity-20 pointer-events-none" />
              <div className="absolute -left-10 -top-10 opacity-[0.03] pointer-events-none">
                <Phone className="w-64 h-64 text-white" />
              </div>

              <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 text-white relative z-10">
                Get in Touch
              </h3>
              <p className="text-white/70 mb-8 text-sm md:text-base leading-relaxed max-w-[340px] relative z-10">
                Connect with our experts right away for queries, project specifications, and detailed estimates.
              </p>

              <div className="flex flex-col gap-4 relative z-10 w-full mt-auto">
                <Link to="/contact" className="w-full bg-white hover:bg-slate-50 text-[#0A3A5C] font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-between group">
                  <span className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[#00B4D8]" /> Request a Quote
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-[#00B4D8] group-hover:text-white transition-colors">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
                <div className="grid grid-cols-2 gap-4">
                  <a href="tel:+919448069346" className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-300 flex flex-col items-center justify-center gap-3 text-center group backdrop-blur-sm">
                    <div className="bg-white/20 group-hover:bg-white group-hover:text-[#0A3A5C] text-white w-12 h-12 flex items-center justify-center rounded-full shadow-inner transition-colors border border-white/10 mx-auto">
                      <Phone className="h-5 w-5" />
                    </div>
                    <span className="text-sm">Call Us</span>
                  </a>
                  <a href="https://wa.me/919448069346" target="_blank" rel="noopener noreferrer"
                    className="bg-green-500/20 hover:bg-green-500/30 border border-green-400/30 hover:border-green-400/50 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-300 flex flex-col items-center justify-center gap-3 text-center group backdrop-blur-sm">
                    <div className="bg-green-500/30 group-hover:bg-[#25D366] text-white w-12 h-12 flex items-center justify-center rounded-full shadow-inner transition-colors border border-green-400/20 mx-auto">
                      <div className="w-5 h-5"><WhatsAppIcon /></div>
                    </div>
                    <span className="text-sm">WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

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

      {/* ── Site Gallery teaser ──────────────────────────────────────────── */}
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

          {/* 6-photo preview grid */}
          <div ref={galleryCarouselRef} className="reveal-zoom" style={{ transitionDelay: "0.15s" }}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {[gallery1, gallery2, gallery3, gallery4, gallery5, gallery6].map((src, i) => (
                <Link
                  key={i}
                  to="/gallery"
                  className="relative overflow-hidden rounded-2xl group"
                  style={{ aspectRatio: "4/3" }}
                >
                  <img
                    src={src}
                    alt={`Site photo ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Last tile — overlay with count */}
                  {i === 5 && (
                    <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2">
                      <span className="text-white font-extrabold text-2xl md:text-3xl">28+</span>
                      <span className="text-white/80 text-xs font-semibold uppercase tracking-widest">Photos</span>
                    </div>
                  )}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-8">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-3 bg-[#00B4D8] hover:bg-[#0096b8] text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_24px_rgba(0,180,216,0.3)] hover:shadow-[0_0_36px_rgba(0,180,216,0.5)] hover:-translate-y-0.5"
              >
                View Full Gallery
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <CTA 
        headline="Powering Your Next Big Project"
        subtext="Reliable electrical solutions tailored to your requirements."
      />
    </div>
  );
};

export default HomePage;