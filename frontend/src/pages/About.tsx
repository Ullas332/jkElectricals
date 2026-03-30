import { useEffect, useRef, useState } from "react";
import { CheckCircle, ArrowRight, ShieldCheck, Phone, Award, Users, Zap, HardHat, Wrench, Plug, UserRound, GraduationCap } from "lucide-react";
import proprietorPhoto from "@/assets/jkprop.jpg";

import SectionHeading from "@/components/SectionHeading";
import { Link } from "react-router-dom";
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
const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("revealed"); io.disconnect(); } },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
};

// ─────────────────────────────────────────────────────────────────────────────
// Scope of work items (numbered)
// ─────────────────────────────────────────────────────────────────────────────
const scopeItems = [
  "66/11 KV Substation, Erection and Commissioning Works",
  "EHT & HT Installation Works (Overhead / Underground)",
  "Commissioning and Servicing of Generator Sets",
  "Telephone, Computer and Lift Room Wiring Works",
  "Street Light / Yard Light and Internal Lighting & Fan Works",
  "Effluent Treatment Electrification Work",
  "Supply of Distribution Boards and Accessories",
  "All Types of Electrical Maintenance Work",
  "Liaisoning — KPTCL, CESC & Electrical Inspectorate (Govt.) Approvals",
  "Assembling and Wiring of Control Panels / Test Panels",
  "Industrial Earthing Work as per IS 3034 and Testing",
  "Oil Filtration of Transformer, HV and LV Megger Test",
  "Rewinding of Motors and Transformers",
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
const AboutPage = () => {
  const storyRef = useReveal();
  const scopeRef = useReveal();
  const msgRef = useReveal();
  const licenseRef = useReveal();

  return (
    <div className="bg-white">
      <style>{`
        .reveal-section { opacity: 0; transform: translateY(24px); transition: opacity 0.7s cubic-bezier(0.2,0.8,0.2,1), transform 0.7s cubic-bezier(0.2,0.8,0.2,1); }
        .reveal-section.revealed { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* ── Hero ── */}
      <section className="bg-[#0A3A5C] text-white py-20 md:py-28 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[30%] -right-[10%] w-[60%] h-[120%] rounded-full bg-gradient-to-bl from-[#00B4D8]/20 to-transparent blur-3xl" />
          <div className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[120%] rounded-full bg-gradient-to-tr from-[#00B4D8]/20 to-transparent blur-3xl" />
        </div>
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="container-max relative z-10">
          <p className="text-[#00B4D8] font-bold text-sm uppercase tracking-widest mb-4">Who We Are</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold">About JK Electricals</h1>
          <p className="mt-5 text-white/85 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            A licensed Super Grade Electrical Contractor delivering reliable power infrastructure and industrial electrification since 2004.
          </p>
        </div>
      </section>

      {/* ── Overview & Leadership ── */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Subtle background abstract */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-sky-50 to-transparent rounded-full blur-[100px] opacity-70 pointer-events-none -translate-y-1/2 translate-x-1/4" />

        <div className="container-max reveal-section relative z-10" ref={storyRef}>
          <div className="grid lg:grid-cols-12 gap-12 items-start">

            {/* ── Left Column: Our Story ── */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 text-[#00B4D8] text-[11px] font-bold uppercase tracking-[0.15em] mb-4 border border-sky-100">
                  Our Story
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-800 leading-tight">
                  25+ Years of Electrical Excellence
                </h2>
              </div>

              <div className="space-y-5 text-slate-600 leading-relaxed text-[16px]">
                <p>
                  JK Electricals is a leading licensed electrical contractors in Mysore, delivering reliable solutions across industrial, infrastructure, and power sectors for over <strong className="text-[#00B4D8] font-bold">25+ years</strong>.
                </p>
                <p>
                  We bring extensive expertise across a wide range of electrical works, including substations, HT/EHT installations, industrial electrification, and maintenance services. Every project is executed in strict compliance with <strong className="text-slate-800 font-bold">Indian Standards (IS specifications)</strong>, ensuring safety, quality, and long-term performance.
                </p>
                <p>
                  Our team of experienced <strong className="text-slate-800 font-bold">engineers, technicians, and electricians</strong> manages the complete project lifecycle — from design and installation to commissioning and government liaisoning with authorities such as KPTCL, CESC, and the Electrical Inspectorate.
                </p>
              </div>
            </div>

            {/* ── Right Column: Proprietor Profile ── */}
            <div className="lg:col-span-5 relative" ref={msgRef}>
              <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] lg:sticky lg:top-32 flex flex-col items-center text-center">

                {/* Photo — natural, unclipped, perfectly centred */}
                <div className="w-full max-w-[240px] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-inner mb-6 pointer-events-none select-none">
                  <img
                    src={proprietorPhoto}
                    alt="N Jayakrishna — Proprietor"
                    className="w-full h-auto object-cover"
                  />
                </div>

                <p className="text-slate-800 font-extrabold text-2xl leading-tight mb-1">N. Jayakrishna</p>
                <p className="text-[#00B4D8] text-[12px] font-bold uppercase tracking-[0.15em] mb-8">Founder &amp; Proprietor</p>

                {/* Quote */}
                <div className="relative bg-gradient-to-br from-slate-50 to-[#f3fafd] rounded-2xl p-7 border border-sky-100/60 w-full">
                  <div className="absolute -top-3 -left-1 text-[#00B4D8]/25">
                    <svg width="32" height="24" viewBox="0 0 60 45" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.9231 44.5C5.84615 44.5 0 38.65 0 31.65C0 23.35 12.6154 3.7 18.1538 0L24 3.4C18.4615 8.95 10.7692 23.35 10.7692 27.25C13.2308 26.65 17.2308 26.65 19.3846 28.15C22.4615 30.25 24 33.7 24 36.7C24 41.05 20.3077 44.5 15.3846 44.5H12.9231ZM48.9231 44.5C41.8462 44.5 36 38.65 36 31.65C36 23.35 48.6154 3.7 54.1538 0L60 3.4C54.4615 8.95 46.7692 23.35 46.7692 27.25C49.2308 26.65 53.2308 26.65 55.3846 28.15C58.4615 30.25 60 33.7 60 36.7C60 41.05 56.3077 44.5 51.3846 44.5H48.9231Z" />
                    </svg>
                  </div>
                  <p className="text-slate-700 font-medium italic text-[15px] md:text-[16px] leading-relaxed relative z-10">
                    "Always, we assure the very best service to all our customers — irrespective of the commercial value of the order."
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ── Team Strength ── */}
      <section className="section-padding bg-slate-50 border-t border-slate-100">
        <div className="container-max">
          <p className="text-[#00B4D8] font-bold text-sm uppercase tracking-widest mb-3 text-center">The People Behind the Work</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800 mb-3 text-center">Our Team Strength</h2>
          <p className="text-slate-500 text-center max-w-xl mx-auto mb-12 text-[15px]">
            A skilled, multi-disciplinary workforce capable of handling complex electrical projects from conception to commissioning.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { role: "Electrical Engineers", count: "5+", Icon: Zap, desc: "Licensed" },
              { role: "Diploma Engineers", count: "18+", Icon: GraduationCap, desc: "Supervision" },
              { role: "ITI Technicians", count: "35+", Icon: Wrench, desc: "Technicians" },
              { role: "Electricians", count: "30+", Icon: Plug, desc: "Field Work" },
              { role: "Helpers", count: "30+", Icon: HardHat, desc: "Support" },
            ].map(({ role, count, Icon, desc }) => (
              <div key={role} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:scale-[1.03] hover:border-[#00B4D8]/30 transition-all duration-300 group">
                <div className="bg-slate-100 group-hover:bg-[#00B4D8]/10 p-3 rounded-xl mb-4 transition-colors duration-300">
                  <Icon className="h-5 w-5 text-[#0A3A5C] group-hover:text-[#00B4D8] transition-colors duration-300" strokeWidth={2} />
                </div>
                <div className="font-display text-3xl font-extrabold text-[#0A3A5C] mb-1 group-hover:text-[#00B4D8] transition-colors duration-300">{count}</div>
                <p className="font-semibold text-slate-800 text-sm leading-tight mb-1">{role}</p>
                <p className="text-slate-400 text-xs font-medium">{desc}</p>
              </div>
            ))}
          </div>

          {/* Total strength callout */}
          <div className="mt-8 bg-[#0A3A5C] rounded-2xl px-8 py-5 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            <Users className="h-6 w-6 text-[#00B4D8] flex-shrink-0" />
            <p className="text-white font-semibold text-base">
              <span className="text-[#00B4D8] font-extrabold text-xl mr-2">118+</span>
              skilled professionals ready to mobilise on your project
            </p>
          </div>
        </div>
      </section>

      {/* ── Tools & Equipment ── */}
      <section className="section-padding bg-white border-t border-slate-100">
        <div className="container-max">
          <p className="text-[#00B4D8] font-bold text-sm uppercase tracking-widest mb-3 text-center">Ready to Deploy</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800 mb-3 text-center">Tools &amp; Equipment Capability</h2>
          <p className="text-slate-500 text-center max-w-2xl mx-auto mb-12 text-[15px]">
            Equipped with modern tools and testing instruments to handle complex electrical installations safely and efficiently — from cable laying to high-voltage testing.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Zap,
                title: "Electrical Testing Instruments",
                items: ["Digital Multimeter & Megger", "Earth Tester & Tong Tester", "Phase Sequence Meter", "Power Factor Meter, Ammeter & Voltmeter"],
              },
              {
                icon: ShieldCheck,
                title: "Safety Equipment",
                items: ["15 kV Rubber Hand Gloves", "Full Harness & Safety Belts", "Raincoats & Protective Gear", "Rechargeable Torch & Test Lamps"],
              },
              {
                icon: Award,
                title: "Cable Laying & Jointing",
                items: ["Cable Drum Lifting Jacks", "Rollers for Cable Laying", "Blow Lamp for Cable Jointing", "Hydraulic Crimping Tool (up to 400 sq.mm)"],
              },
              {
                icon: CheckCircle,
                title: "Installation & Fabrication",
                items: ["Portable Drill & Grinder", "Commander Drilling Machine", "Hole Saw Cutter Set", "Welding Generator & Jeep Ladder"],
              },
              {
                icon: Users,
                title: "Rigging & Heavy Handling",
                items: ["Chain Pulley Block", "Crow Bar & Manilla Rope", "Clamp Along Meter", "Mumties & Hand Hammers"],
              },
              {
                icon: ArrowRight,
                title: "Precision Hand Tools",
                items: ["Spanner Set (Ring & Screw)", "Torque Wrench Spanner", "Cutting Pliers & Wire Gauge", "Crimping Tool (up to 400 sq.mm)"],
              },
            ].map(({ icon: Icon, title, items }) => (
              <div key={title} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#0A3A5C]/10 p-2.5 rounded-xl group-hover:bg-[#00B4D8]/15 transition-colors">
                    <Icon className="h-5 w-5 text-[#0A3A5C] group-hover:text-[#00B4D8] transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-[15px] leading-tight">{title}</h3>
                </div>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00B4D8] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Credentials & License ── */}
      <section className="section-padding bg-slate-50 border-t border-slate-100">
        <div ref={licenseRef} className="container-max reveal-section">
          <div className="max-w-6xl mx-auto">
            <p className="text-[#00B4D8] font-bold text-sm uppercase tracking-widest mb-3 text-center">Verified & Certified</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800 mb-10 text-center">Certifications & Credentials</h2>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
              {/* Card 1: License Details */}
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-[#0A3A5C]/10 p-3.5 rounded-2xl">
                    <ShieldCheck className="h-8 w-8 text-[#0A3A5C]" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-slate-800">License Details</h3>
                    <p className="text-slate-500 text-sm mt-1">Government approved credentials</p>
                  </div>
                </div>
                <dl className="space-y-6 mt-2">
                  {[
                    { label: "License No.", value: "SGL00051MYS / SGL191657MYS" },
                    { label: "Grade", value: "Super Grade Licensed" },
                    { label: "Liaison", value: "KPTCL, CESC & Electrical Inspectorate" },
                    { label: "Standards", value: "IS 3034 & Indian Standards" },
                    { label: "Experience", value: "25+ Years Excellence" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex gap-4 md:text-base items-center">
                      <dt className="w-32 flex-shrink-0 text-slate-400 font-bold">{label}</dt>
                      <dd className="text-slate-700 font-semibold">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Card 2: Why Partner With Us? */}
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-[#00B4D8]/10 p-3.5 rounded-2xl">
                    <Award className="h-8 w-8 text-[#00B4D8]" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-slate-800">Why Partner With Us?</h3>
                    <p className="text-slate-500 text-sm mt-1">Our commitment to quality</p>
                  </div>
                </div>
                <div className="grid gap-6 mt-2">
                  {[
                    "Complete Govt. liaisoning (KPTCL, CESC, Inspectorate)",
                    "Strict compliance with IS specifications & safety codes",
                    "End-to-end execution: from design to commissioning",
                    "Over 25+ years of proven industry excellence",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-[#00B4D8] shrink-0 mt-0.5" />
                      <span className="text-slate-600 md:text-base font-medium leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTA
        headline="Work With a Trusted Electrical Partner"
        subtext="Over 25+ years of experience delivering quality and reliability."
      />
    </div>
  );
};

export default AboutPage;