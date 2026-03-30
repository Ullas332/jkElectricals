import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { X, ChevronLeft, ChevronRight, MapPin, ArrowRight, Building2, Calendar, ZoomIn, CheckCircle2, ShieldCheck, Briefcase } from "lucide-react";
import CTA from "@/components/CTA";

// Certificates
import kptclCertificate from "@/assets/kptclcertificate.jpg";
import mgmCertificate from "@/assets/mgmcertificate.jpg";
import wiproCertificate from "@/assets/wiprocertificate.jpg";
import raneCertificate from "@/assets/ranecertificate.jpg";
import lunarsCertificate from "@/assets/lunarscertificate.jpg";
import speechCertificate from "@/assets/speechcertificate.jpg";
import kpclCertificate from "@/assets/kpclcertificate.jpg";
import barcCertificate from "@/assets/barccertificate.jpg";

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
          el.querySelectorAll(".reveal-up").forEach((child) => {
            (child as HTMLElement).classList.add("revealed");
          });
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
};

// ─────────────────────────────────────────────────────────────────────────────
// Single Image Lightbox
// ─────────────────────────────────────────────────────────────────────────────
const CertificateLightbox = ({
  image,
  onClose,
}: {
  image: string;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
      style={{ animation: "lbFadeIn 0.25s ease forwards" }}
    >
      <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative z-10 max-h-full max-w-5xl w-full flex flex-col items-center justify-center"
        style={{ animation: "lbScaleIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards" }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image}
          alt={`Official Certificate`}
          className="max-h-[85vh] w-auto max-w-full object-contain rounded-xl shadow-2xl bg-white/5"
          draggable={false}
        />
      </div>
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-[10000] w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md flex items-center justify-center text-white transition-all duration-200 hover:scale-110 border border-white/10"
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
// Page Component
// ─────────────────────────────────────────────────────────────────────────────
const ProjectsPage = () => {
  const navigate = useNavigate();
  const revealRef = useScrollReveal();

  const [activeParams, setActiveParams] = useState<{ image: string } | null>(null);

  const projects = [
    {
      id: "mgm",
      title: "66/11 kV Substation Erection & Commissioning – AMW MGM Forgings, Mysore",
      overview: "JK Electricals successfully executed a complete Extra High Tension (EHT) substation project for AMW MGM Forgings, supporting high-demand industrial operations with reliable power infrastructure.",
      scope: ["Supply and erection of substation equipment", "Installation of transformers and switchgear", "Cable laying and termination", "Testing and commissioning of the entire system"],
      techDetails: [
        { label: "Voltage Level", value: "66/11 kV" },
        { label: "Type", value: "EHT Industrial Substation" },
        { label: "Systems", value: "Transformers, HT panels, protection systems" }
      ],
      locations: "Metagalli Industrial Area, Mysore",
      execution: [
        { label: "Project Value", value: "₹1+ Crore" },
        { label: "Type of Work", value: "Erection, Testing & Commissioning" },
        { label: "Status", value: "Completed" },
        { label: "Client", value: "AMW MGM Forgings Pvt Ltd" }
      ],
      certificate: mgmCertificate,
    },
    {
      id: "barc",
      title: "Electrical Maintenance Services – Bhabha Atomic Research Centre (BARC), Mysore",
      overview: "JK Electricals provided electrical maintenance services at BARC, a premier government research facility. The project required strict adherence to safety, reliability, and operational standards.",
      scope: ["Maintenance of LT electrical systems", "Troubleshooting and fault rectification", "Preventive inspection of electrical installations", "Ensuring uninterrupted system performance"],
      techDetails: [
        { label: "Type", value: "Low Tension (LT) Systems" },
        { label: "Environment", value: "High-security research facility" }
      ],
      locations: "BARC Facility, Mysore",
      execution: [
        { label: "Type of Work", value: "Maintenance" },
        { label: "Client", value: "Bhabha Atomic Research Centre (BARC)" }
      ],
      certificate: barcCertificate,
    },
    {
      id: "kpcl",
      title: "Electrical Maintenance Works – Karnataka Power Corporation Limited (KPCL)",
      overview: "JK Electricals executed maintenance works for KPCL power facilities, ensuring efficient operation of electrical systems in power generation environments.",
      scope: ["Maintenance of electrical systems", "Inspection and servicing of equipment", "Ensuring operational efficiency", "Compliance with safety standards"],
      techDetails: [
        { label: "Type", value: "Power Generation Electrical Systems" },
        { label: "Systems", value: "LT/HT equipment" }
      ],
      locations: "Shivanasamudra / Shimsha",
      execution: [
        { label: "Type of Work", value: "Maintenance" },
        { label: "Client", value: "KPCL" }
      ],
      certificate: kpclCertificate,
    },
    {
      id: "wipro",
      title: "Electrical Installation & Maintenance – Wipro Lighting Division, Mysore",
      overview: "JK Electricals carried out electrical installation and maintenance works for Wipro’s Lighting Division, supporting large-scale industrial manufacturing operations.",
      scope: ["Internal electrification", "Installation of electrical systems", "Maintenance and servicing", "Power distribution management"],
      techDetails: [
        { label: "Type", value: "Industrial Electrical Systems" },
        { label: "Systems", value: "LT distribution, lighting systems" }
      ],
      locations: "Hootagalli Industrial Area, Mysore",
      execution: [
        { label: "Type of Work", value: "Installation & Maintenance" },
        { label: "Client", value: "Wipro" }
      ],
      certificate: wiproCertificate,
    },
    {
      id: "rane",
      title: "High Tension Electrical Works – Rane (Madras) Ltd, Mysore",
      overview: "JK Electricals executed high tension electrical infrastructure works for Rane (Madras) Ltd, ensuring reliable power supply for manufacturing operations.",
      scope: ["Installation of HT systems", "Cable laying and termination", "Testing and commissioning", "Maintenance support"],
      techDetails: [
        { label: "Type", value: "High Tension (HT) Systems" },
        { label: "Application", value: "Industrial manufacturing" }
      ],
      locations: "Mysore",
      execution: [
        { label: "Type of Work", value: "HT Installation & Commissioning" },
        { label: "Status", value: "Completed" },
        { label: "Client", value: "Rane (Madras) Ltd" }
      ],
      certificate: raneCertificate,
    },
    {
      id: "lunars",
      title: "Electrical Installation & Maintenance – Lunars Exports Pvt Ltd, Mysore",
      overview: "JK Electricals provided comprehensive electrical services for Lunars Exports, ensuring efficient and uninterrupted power supply for industrial operations.",
      scope: ["Electrical installation", "Maintenance and servicing", "System troubleshooting", "Power system optimization"],
      techDetails: [
        { label: "Type", value: "Industrial Electrical Systems" }
      ],
      locations: "Hootagalli Industrial Area, Mysore",
      execution: [
        { label: "Type of Work", value: "Installation & Maintenance" },
        { label: "Client", value: "Lunars Exports Pvt Ltd" }
      ],
      certificate: lunarsCertificate,
    },
    {
      id: "aiish",
      title: "HT Electrical Upgradation Works – All India Institute of Speech & Hearing (AIISH)",
      overview: "JK Electricals executed high-tension (HT) electrical upgradation works at the All India Institute of Speech & Hearing (AIISH), a premier government institution. The project focused on enhancing the reliability and efficiency of the electrical infrastructure to support uninterrupted operations in a critical healthcare and research environment.",
      scope: ["Upgradation of HT electrical systems", "Installation and modification of electrical infrastructure", "Testing and commissioning of upgraded systems", "Ensuring system stability and operational safety"],
      techDetails: [
        { label: "Type", value: "High Tension (HT) Electrical Systems" },
        { label: "Application", value: "Institutional / Healthcare Infrastructure" },
        { label: "Systems", value: "Electrical panels, distribution systems" }
      ],
      locations: "AIISH Campus, Mysore",
      execution: [
        { label: "Type of Work", value: "HT Upgradation, Testing & Commissioning" },
        { label: "Client", value: "AIISH" }
      ],
      certificate: speechCertificate,
    },
    {
      id: "kptcl",
      title: "KPTCL 66/11 kV Substation Operation & Maintenance – Mysore Region",
      overview: "JK Electricals has been executing long-term operation and maintenance (O&M) services for multiple 66/11 kV substations under KPTCL. The project ensures uninterrupted power transmission and reliability of critical grid infrastructure across the Mysore region.",
      scope: ["Shift-based substation operation", "Preventive and breakdown maintenance", "Minor repair and servicing", "Monitoring of transformers and switchgear", "Housekeeping and safety compliance"],
      techDetails: [
        { label: "Voltage Level", value: "66/11 kV" },
        { label: "Type", value: "EHT Substation Systems" },
        { label: "Equipment", value: "Transformers, switchgear, control panels" }
      ],
      locations: "Bannimantap, Talakadu, Hunsur, Megalapura, Periyapatna",
      execution: [
        { label: "Duration", value: "Since 2013 – Ongoing" },
        { label: "Type of Work", value: "Operation & Maintenance" },
        { label: "Client", value: "KPTCL" }
      ],
      certificate: kptclCertificate,
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">

      {/* Lightbox Portal */}
      {activeParams && (
        <CertificateLightbox
          image={activeParams.image}
          onClose={() => setActiveParams(null)}
        />
      )}

      {/* Animation Styles */}
      <style>{`
        .hero-fade-up { opacity: 0; animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .reveal-up { opacity:0; transform:translateY(36px); transition:opacity .65s ease,transform .65s ease; }
        .reveal-up.revealed { opacity:1; transform:translate(0,0); }
      `}</style>

      {/* ── Premium Dark Navy Hero Header ── */}
      <section className="bg-[#0A3A5C] text-white py-20 md:py-28 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[30%] -right-[10%] w-[60%] h-[120%] rounded-full bg-gradient-to-bl from-[#00B4D8]/20 to-transparent blur-3xl" />
          <div className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[120%] rounded-full bg-gradient-to-tr from-[#00B4D8]/20 to-transparent blur-3xl" />
        </div>

        <div className="container-max relative z-10">
          <p className="text-[#00B4D8] font-bold text-sm uppercase tracking-widest mb-4 hero-fade-up">
            Track Record
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-sm hero-fade-up delay-100">
            Work Completion & Credentials
          </h1>
          <p className="mt-5 text-white/90 text-lg md:text-xl max-w-2xl mx-auto font-medium hero-fade-up delay-200">
            Verified credentials highlighting our extensive experience designing, executing, and maintaining industrial electrical infrastructure.
          </p>
        </div>
      </section>

      {/* ── Projects Wrapper ── */}
      <div ref={revealRef}>
        {projects.map((project, idx) => (
          <section
            key={project.id}
            className={`container-max px-4 relative z-20 reveal-up ${idx === 0 ? '-mt-10' : 'mt-16'}`}
          >
            <div className="bg-gradient-to-br from-[#f8fdff] to-[#eef8ff] rounded-3xl shadow-[0_8px_30px_rgb(0,180,216,0.06)] hover:shadow-[0_12px_40px_rgb(0,180,216,0.12)] border border-[#d6efff] hover:border-sky-200 p-6 md:p-10 lg:p-12 overflow-hidden transition-all duration-300">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                
                {/* Left Side: Description */}
                <div className="flex-1 lg:w-2/3">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A3A5C]/5 text-[#0A3A5C] text-xs font-bold uppercase tracking-[0.1em] mb-5 border border-[#0A3A5C]/10">
                    <Briefcase className="w-3.5 h-3.5" /> Project Detail
                  </div>
                  
                  <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-800 leading-tight mb-5">
                    {project.title}
                  </h2>
                  <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8">
                    {project.overview}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Technical Details */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Technical Details</h4>
                      <ul className="space-y-3">
                        {project.techDetails.map((tech, i) => (
                          <li key={i} className="flex flex-col text-sm">
                            <span className="font-bold text-slate-700">{tech.label}</span>
                            <span className="text-slate-500 mt-0.5">{tech.value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Execution Details */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Execution Details</h4>
                      <ul className="space-y-3">
                        {project.execution.map((exec, i) => (
                          <li key={i} className="flex flex-col text-sm">
                            <span className="font-bold text-slate-700">{exec.label}</span>
                            <span className="text-slate-500 mt-0.5">{exec.value}</span>
                          </li>
                        ))}
                        <li className="flex flex-col text-sm">
                          <span className="font-bold text-slate-700">Location</span>
                          <span className="text-slate-500 mt-0.5 whitespace-pre-wrap">{project.locations}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Scope of Work */}
                  <div className="bg-slate-50 rounded-2xl p-5 md:p-6 border border-slate-100">
                    <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#00B4D8]" /> Scope of Work
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                      {project.scope.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 leading-snug">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Right Side: Certificate Proof */}
                <div className="flex-shrink-0 lg:w-1/3 flex flex-col items-center justify-start py-2">
                  <div className="w-full">
                    {project.certificate ? (
                      <div 
                        className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-sm border border-slate-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white"
                        onClick={() => setActiveParams({ image: project.certificate! })}
                      >
                        {/* Certificate Image Frame */}
                        <div className="aspect-[3/4] sm:aspect-auto sm:h-[350px] w-full bg-slate-50 relative p-4 flex items-center justify-center">
                          <img 
                            src={project.certificate} 
                            alt={`${project.title} Certificate`} 
                            className="max-w-full max-h-full object-contain"
                          />
                          <div className="absolute inset-0 bg-[#0A3A5C]/0 group-hover:bg-[#0A3A5C]/20 transition-colors duration-300 flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-md rounded-full p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 shadow-lg border border-white/30 text-white flex items-center gap-2 font-semibold text-sm">
                              <ZoomIn className="h-5 w-5" /> View Proof
                            </div>
                          </div>
                        </div>
                        <div className="bg-white border-t border-slate-100 py-3.5 px-4 text-center">
                          <span className="text-xs font-bold text-[#00B4D8] uppercase tracking-wider flex items-center justify-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5"/> Verified Certificate</span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full aspect-[3/4] sm:aspect-auto sm:h-[350px] rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center p-6 text-center">
                        <div className="bg-slate-100 p-4 rounded-full mb-4">
                          <Building2 className="w-8 h-8 text-slate-400" />
                        </div>
                        <h4 className="text-slate-500 font-semibold mb-1">Official Credentials</h4>
                        <p className="text-slate-400 text-sm max-w-[200px] mt-1 space-y-2">Certificate currently being verified for digital display.</p>
                      </div>
                    )}
                    
                    <button
                      onClick={() => navigate(`/contact?service=${encodeURIComponent(project.title)}`)}
                      className="w-full mt-6 bg-slate-50 hover:bg-[#0A3A5C] text-slate-700 hover:text-white border border-slate-200 hover:border-[#0A3A5C] font-semibold py-3.5 px-4 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm focus:outline-none"
                    >
                      Inquire About Work <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </section>
        ))}
      </div>

      <CTA 
        headline="Have a Similar Project in Mind?"
        subtext="Let’s help you execute it with the same precision and reliability."
      />
    </div>
  );
};

export default ProjectsPage;