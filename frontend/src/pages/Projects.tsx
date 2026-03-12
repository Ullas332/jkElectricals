import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";

const projects = [
  {
    image: project1,
    title: "66/11 KV Substation Erection",
    category: "Infrastructure",
    description: "Complete turnkey execution of a 66/11 KV electrical substation for a major manufacturing plant. Included structural erection, transformer commissioning, and thorough testing as per IS standards.",
    location: "KIADB Industrial Area, Mysore",
    service: "Substation & EHT Installations",
  },
  {
    image: project2,
    title: "Heavy Machinery Electrification",
    category: "Industrial",
    description: "Comprehensive factory floor electrification including high-capacity control panels, cable tray routing, and industrial earthing systems to support heavy-duty forging equipment.",
    location: "Nanjangud, Karnataka",
    service: "Industrial Electrification",
  },
  {
    image: project3,
    title: "HT Metering Cubicle Install",
    category: "Installation",
    description: "Design, supply, and installation of specialized HT metering cubicles and distribution boards. Project included full KPTCL liaisoning and Electrical Inspectorate safety approvals.",
    location: "Hebbal Industrial Estate, Mysore",
    service: "HT Metering & Distribution",
  },
  {
    image: project4,
    title: "Transformer Servicing & Filtration",
    category: "Maintenance",
    description: "Critical maintenance operation involving oil filtration, dehydration, and comprehensive megger testing for multiple distribution transformers at a large-scale sugar factory.",
    location: "Mandya, Karnataka",
    service: "Transformer Services",
  },
  {
    image: project5,
    title: "Commercial Complex Wiring",
    category: "Commercial",
    description: "End-to-end electrical infrastructure development for a multi-story commercial complex. Included reliable power distribution, lift room wiring, and integrated backup generator systems.",
    location: "Mysore City Center",
    service: "Commercial Electrical",
  },
  {
    image: project6,
    title: "Emergency Generator Commissioning",
    category: "Emergency",
    description: "Rapid deployment and commissioning of high-capacity industrial generator sets following a critical power failure at a technical institution, ensuring zero operational downtime.",
    location: "Hassan, Karnataka",
    service: "Generator Maintenance",
  },
];

const ProjectsPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const openLightbox = (index: number) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % projects.length);
  }, [activeIndex]);

  const goPrev = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + projects.length) % projects.length);
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [activeIndex, goNext, goPrev]);

  const handleCTA = (service: string) => {
    navigate(`/contact?service=${encodeURIComponent(service)}`);
  };

  const active = activeIndex !== null ? projects[activeIndex] : null;

  return (
    <div>
      {/* Hero Header */}
      <section className="bg-[#0A3A5C] text-white py-20 md:py-28 text-center px-4 relative overflow-hidden">
        {/* Decorative gradient blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[30%] -right-[10%] w-[60%] h-[120%] rounded-full bg-gradient-to-bl from-[#00B4D8]/20 to-transparent blur-3xl" />
          <div className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[120%] rounded-full bg-gradient-to-tr from-[#00B4D8]/20 to-transparent blur-3xl" />
        </div>

        <div className="container-max relative z-10">
          <p className="text-[#00B4D8] font-bold text-sm uppercase tracking-widest mb-4">
            Our Work
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-sm">
            Project Portfolio
          </h1>
          <p className="mt-5 text-white/90 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Browse our recent industrial and infrastructure electrical projects showcasing our engineering excellence and attention to detail.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-max">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <div
                key={project.title}
                className="overflow-hidden rounded-xl relative group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-200"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A3A5C]/95 via-[#0A3A5C]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[#00B4D8] text-xs font-bold uppercase tracking-wider">{project.category}</span>
                  <h3 className="font-display text-xl font-bold text-white mt-1 leading-snug">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-slate-900/90 transition-opacity duration-300 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-50 bg-white/10 hover:bg-[#00B4D8] text-white p-2.5 rounded-full transition-colors"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev Arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-2 md:left-6 z-50 bg-white/10 hover:bg-[#00B4D8] text-white p-2.5 md:p-3 rounded-full transition-colors"
            aria-label="Previous project"
          >
            <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-2 md:right-6 z-50 bg-white/10 hover:bg-[#00B4D8] text-white p-2.5 md:p-3 rounded-full transition-colors"
            aria-label="Next project"
          >
            <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
          </button>

          {/* Content */}
          <div
            className="flex flex-col lg:flex-row max-w-5xl w-full mx-4 md:mx-16 max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="lg:w-3/5 bg-slate-100 flex-shrink-0">
              <img
                src={active.image}
                alt={active.title}
                className="w-full h-64 sm:h-80 lg:h-full object-cover"
              />
            </div>

            {/* Details Panel */}
            <div className="lg:w-2/5 p-8 md:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100">
              <div>
                <span className="text-[#00B4D8] text-xs font-bold uppercase tracking-wider">{active.category}</span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-800 mt-2 leading-tight">{active.title}</h3>
                <p className="text-slate-600 mt-4 leading-relaxed text-sm md:text-base">{active.description}</p>
                <div className="flex items-center gap-2 mt-6 text-slate-500 font-medium text-sm">
                  <MapPin className="h-4 w-4 text-[#00B4D8]" />
                  {active.location}
                </div>
              </div>

              <button
                onClick={() => handleCTA(active.service)}
                className="bg-[#00B4D8] hover:bg-[#0096b4] text-white font-bold py-3.5 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg w-full mt-8 text-base"
              >
                Request Quote for this Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;