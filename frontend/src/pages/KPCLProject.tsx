import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import CTA from "@/components/CTA";

// Assuming gallery1 to gallery11 in assets are KPCL photos
import img1 from "@/assets/gallery1.jpeg";
import img2 from "@/assets/gallery2.jpeg";
import img3 from "@/assets/gallery3.jpeg";
import img4 from "@/assets/gallery4.jpeg";
import img5 from "@/assets/gallery5.jpeg";
import img6 from "@/assets/gallery6.jpeg";
import img7 from "@/assets/gallery7.jpeg";
import img8 from "@/assets/gallery8.jpeg";
import img9 from "@/assets/gallery9.jpeg";
import img10 from "@/assets/gallery10.jpeg";
import img11 from "@/assets/gallery11.jpeg";

const photos = [
  { src: img1, alt: "KPCL Project Photo 1" },
  { src: img2, alt: "KPCL Project Photo 2" },
  { src: img3, alt: "KPCL Project Photo 3" },
  { src: img4, alt: "KPCL Project Photo 4" },
  { src: img5, alt: "KPCL Project Photo 5" },
  { src: img6, alt: "KPCL Project Photo 6" },
  { src: img7, alt: "KPCL Project Photo 7" },
  { src: img8, alt: "KPCL Project Photo 8" },
  { src: img9, alt: "KPCL Project Photo 9" },
  { src: img10, alt: "KPCL Project Photo 10" },
  { src: img11, alt: "KPCL Project Photo 11" },
];

const KPCLProject = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % photos.length);
  }, [activeIndex]);

  const goPrev = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + photos.length) % photos.length);
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

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-[#0A3A5C] text-white py-24 md:py-32 text-center px-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[120%] rounded-full bg-gradient-to-bl from-[#00B4D8]/30 to-transparent blur-[120px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[120%] rounded-full bg-gradient-to-tr from-[#00B4D8]/20 to-transparent blur-[120px]" />
        </div>

        <div className="container-max relative z-10 max-w-4xl mx-auto">
          <p className="text-[#00B4D8] font-bold text-sm tracking-widest uppercase mb-4 animate-fade-in">
            Featured Enterprise Project
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 drop-shadow-lg animate-slide-up">
            KPCL Infrastructure 
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-medium leading-relaxed mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            We're proud to showcase our comprehensive electrical infrastructure work for Karnataka Power Corporation Limited (KPCL). This gallery features highlights from site installation, structural erection, and critical commissioning phases.
            <br/><br/>
            <span className="italic opacity-80 text-base font-normal">Detailed project descriptions and technical specifications are coming soon.</span>
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 md:py-32 px-4 md:px-8 max-w-[1400px] mx-auto">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
              onClick={() => openLightbox(i)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm text-[#0A3A5C] px-6 py-3 rounded-full font-bold shadow-lg transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  View Photo
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {activeIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 bg-white/10 hover:bg-[#00B4D8] text-white p-3 rounded-full transition-colors backdrop-blur-sm"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 md:left-8 z-50 bg-white/10 hover:bg-[#00B4D8] text-white p-4 rounded-full transition-colors backdrop-blur-sm"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 md:right-8 z-50 bg-white/10 hover:bg-[#00B4D8] text-white p-4 rounded-full transition-colors backdrop-blur-sm"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <div
            className="relative max-w-7xl max-h-[90vh] w-full mx-4 md:mx-24 flex items-center justify-center p-4 outline-none"
            onClick={closeLightbox}
          >
            <img
              src={photos[activeIndex].src}
              alt={photos[activeIndex].alt}
              className="max-h-[85vh] max-w-full object-contain drop-shadow-2xl rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />
            {/* Counter */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/70 font-medium tracking-widest text-sm">
              {activeIndex + 1} / {photos.length}
            </div>
          </div>
        </div>
      )}

      <CTA 
        headline="Have a Similar Project in Mind?"
        subtext="Let’s help you execute it with the same precision and reliability."
      />
    </div>
  );
};

export default KPCLProject;
