import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Send, Loader2, ChevronDown, Search } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Karnataka cities list
// ─────────────────────────────────────────────────────────────────────────────
const KARNATAKA_CITIES = [
  "Mysuru", "Bengaluru", "Hubballi", "Dharwad", "Mangaluru", "Belagavi",
  "Kalaburagi", "Davanagere", "Ballari", "Vijayapura", "Shivamogga",
  "Tumakuru", "Raichur", "Bidar", "Hassan", "Udupi", "Chikkamagaluru",
  "Chitradurga", "Kolar", "Mandya", "Bagalkot", "Gadag", "Haveri",
  "Koppal", "Yadgir", "Chamarajanagar", "Kodagu", "Chikkaballapur",
  "Ramnagara", "Dakshina Kannada", "Uttara Kannada", "Shimoga",
  "Robertsonpet", "Hospet", "Bhadravati", "Ranebennur", "Gangavati",
  "Sindagi", "Gokak", "Ilkal", "Indi", "Jevargi", "Muddebihal",
  "Mudgal", "Mulbagal", "Mudhol", "Nanjangud", "Pavagada", "Sagara",
  "Sira", "Srinivaspur", "Tarikere", "Tiptur", "Honnavar", "Karwar",
  "Sirsi", "Ankola", "Kumta", "Bhatkal", "Dandeli", "Yellapur",
].sort();

// ─────────────────────────────────────────────────────────────────────────────
// Scroll-aware stagger reveal hook
// ─────────────────────────────────────────────────────────────────────────────
const useStaggerReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = Array.from(el.querySelectorAll(".stagger-child"));
    let batchIndex = 0;
    let batchTimer: ReturnType<typeof setTimeout> | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        visible.forEach((entry, i) => {
          const delay = (batchIndex + i) * 120;
          setTimeout(() => {
            (entry.target as HTMLElement).classList.add("revealed");
          }, delay);
          observer.unobserve(entry.target);
        });
        batchIndex += visible.length;
        if (batchTimer) clearTimeout(batchTimer);
        batchTimer = setTimeout(() => { batchIndex = 0; }, 500);
      },
      { threshold: 0.08 },
    );
    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);
  return ref;
};

// ─────────────────────────────────────────────────────────────────────────────
// City Dropdown with Search
// ─────────────────────────────────────────────────────────────────────────────
const CityDropdown = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (city: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filtered = KARNATAKA_CITIES.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => { setOpen((o) => !o); setSearch(""); }}
        className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]/50 focus:border-[#00B4D8] focus:bg-white transition-all flex items-center justify-between"
      >
        <span className={value ? "text-slate-800" : "text-slate-400"}>
          {value || "Select city in Karnataka"}
        </span>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-100">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search city..."
              className="flex-1 text-sm text-slate-800 outline-none bg-transparent placeholder:text-slate-400"
            />
          </div>
          <ul className="max-h-52 overflow-y-auto">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-slate-400">No cities found</li>
            ) : (
              filtered.map((city) => (
                <li
                  key={city}
                  onClick={() => { onChange(city); setOpen(false); setSearch(""); }}
                  className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-sky-50 hover:text-[#00B4D8] transition-colors ${
                    value === city ? "bg-sky-50 text-[#00B4D8] font-semibold" : "text-slate-700"
                  }`}
                >
                  {city}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

const getPhoneDigits = (phone: string) =>
  phone.replace(/^\+91\s?/, "").replace(/\D/g, "");

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const prefilledService = searchParams.get("service") || "";
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "+91 ",
    service: prefilledService,
    city: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; phone?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const contentRef = useStaggerReveal();

  const validateField = (name: string, value: string) => {
    const errs = { ...fieldErrors };
    if (name === "email") {
      errs.email =
        value && !isValidEmail(value)
          ? "Please enter a valid email address (e.g. name@example.com)"
          : undefined;
    }
    if (name === "phone") {
      const digits = getPhoneDigits(value);
      errs.phone =
        value.replace("+91 ", "") && digits.length !== 10
          ? "Phone number must be exactly 10 digits"
          : undefined;
    }
    setFieldErrors(errs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(form.email)) {
      setFieldErrors((prev) => ({ ...prev, email: "Please enter a valid email address (e.g. name@example.com)" }));
      return;
    }
    const digits = getPhoneDigits(form.phone);
    if (digits.length !== 10) {
      setFieldErrors((prev) => ({ ...prev, phone: "Phone number must be exactly 10 digits" }));
      return;
    }

    setLoading(true);
    setError("");

    try {
      const recaptchaToken = await new Promise<string>((resolve, reject) => {
        const grecaptcha = (window as any).grecaptcha;
        if (!grecaptcha) {
          reject(new Error("reCAPTCHA not loaded. Please refresh and try again."));
          return;
        }
        grecaptcha.ready(() => {
          grecaptcha
            .execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, { action: "contact_submit" })
            .then(resolve)
            .catch(() => reject(new Error("reCAPTCHA verification failed. Please try again.")));
        });
      });

      const messageWithCity = form.city
        ? `City: ${form.city}, Karnataka\n\n${form.message}`
        : form.message;

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, message: messageWithCity, recaptchaToken }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Failed to send. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <style>{`
        .stagger-child {
          opacity: 0;
          transform: translateY(32px) scale(0.97);
          transition: opacity 0.7s cubic-bezier(0.2, 0.8, 0.2, 1),
                      transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .stagger-child.revealed {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-animate {
          opacity: 0;
          animation: heroFadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .hero-animate-1 { animation-delay: 0s; }
        .hero-animate-2 { animation-delay: 0.12s; }
        .hero-animate-3 { animation-delay: 0.24s; }
        .field-error { color: #dc2626; font-size: 0.78rem; margin-top: 4px; display: flex; align-items: center; gap: 4px; }
      `}</style>

      {/* Hero Header */}
      <section className="bg-[#0A3A5C] text-white py-20 md:py-28 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[30%] -right-[10%] w-[60%] h-[120%] rounded-full bg-gradient-to-bl from-[#00B4D8]/20 to-transparent blur-3xl" />
          <div className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[120%] rounded-full bg-gradient-to-tr from-[#00B4D8]/20 to-transparent blur-3xl" />
        </div>
        <div className="container-max relative z-10">
          <p className="hero-animate hero-animate-1 text-[#00B4D8] font-bold text-sm uppercase tracking-widest mb-4">
            Get In Touch
          </p>
          <h1 className="hero-animate hero-animate-2 font-display text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-sm">
            Contact JK Electricals
          </h1>
          <p className="hero-animate hero-animate-3 mt-5 text-white/90 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Ready to discuss your industrial electrification or infrastructure project? Reach out to our engineering team today.
          </p>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-max">
          <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left Column: Contact Form Card */}
            <div className="stagger-child bg-white shadow-xl rounded-2xl p-8 border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00B4D8] to-[#0A3A5C]"></div>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="bg-sky-50 text-[#00B4D8] p-4 rounded-full inline-block mb-4">
                    <Send className="h-8 w-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-800 mb-2">Request Received!</h3>
                  <p className="text-slate-600">Thank you for reaching out. One of our engineers will contact you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-slate-800 mb-2">Request a Project Quote</h3>
                    <p className="text-slate-500 text-sm">Fill out the details below and we'll get back to you promptly.</p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg flex items-start gap-2">
                      <div className="mt-0.5 shrink-0">⚠️</div>
                      <div>{error}</div>
                    </div>
                  )}

                  {/* Row 1: Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-sm font-semibold text-slate-700">Full Name <span className="text-sky-500">*</span></label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]/50 focus:border-[#00B4D8] focus:bg-white transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Address <span className="text-sky-500">*</span></label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        required
                        value={form.email}
                        onChange={(e) => {
                          setForm({ ...form, email: e.target.value });
                          validateField("email", e.target.value);
                        }}
                        onBlur={(e) => validateField("email", e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                          fieldErrors.email
                            ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                            : "border-slate-200 focus:border-[#00B4D8] focus:ring-[#00B4D8]/50"
                        }`}
                      />
                      {fieldErrors.email && (
                        <p className="field-error">⚠️ {fieldErrors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone + Service */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-sm font-semibold text-slate-700">Phone Number <span className="text-sky-500">*</span></label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+91 9876543210"
                        required
                        value={form.phone}
                        onChange={(e) => {
                          const val = e.target.value;
                          let updated: string;
                          if (val.startsWith("+91 ")) {
                            updated = val;
                          } else if (val === "+91" || val.length < 4) {
                            updated = "+91 ";
                          } else {
                            updated = "+91 " + val.replace(/^\+91\s*/, "");
                          }
                          setForm({ ...form, phone: updated });
                          validateField("phone", updated);
                        }}
                        onBlur={(e) => validateField("phone", e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                          fieldErrors.phone
                            ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                            : "border-slate-200 focus:border-[#00B4D8] focus:ring-[#00B4D8]/50"
                        }`}
                      />
                      {fieldErrors.phone && (
                        <p className="field-error">⚠️ {fieldErrors.phone}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="service" className="text-sm font-semibold text-slate-700">Service Required</label>
                      <select
                        id="service"
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]/50 focus:border-[#00B4D8] focus:bg-white transition-all"
                      >
                        <option value="">Select a Service</option>
                        <option>Substation &amp; EHT Installations</option>
                        <option>Transformer Services</option>
                        <option>HT Metering &amp; Distribution</option>
                        <option>Industrial Electrification</option>
                        <option>Control Panels &amp; Testing</option>
                        <option>Govt Liaison &amp; Approvals</option>
                        <option>Generator Maintenance</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: City (Karnataka only) */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                      City <span className="text-slate-400 font-normal">(Karnataka)</span>
                    </label>
                    <CityDropdown
                      value={form.city}
                      onChange={(city) => setForm({ ...form, city })}
                    />
                  </div>

                  {/* Row 4: Project Details */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-sm font-semibold text-slate-700">Project Details</label>
                    <textarea
                      id="message"
                      placeholder="Tell us about your project or specific requirements..."
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]/50 focus:border-[#00B4D8] focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full text-base flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed bg-[#00B4D8] hover:bg-[#0096b4] text-white font-bold py-3.5 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    {loading ? (
                      <><Loader2 className="h-5 w-5 animate-spin" /> Sending Request...</>
                    ) : (
                      <><Send className="h-5 w-5" /> Send Request</>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Contact Info */}
            <div className="stagger-child pt-8 lg:pl-8 flex flex-col h-full">
              <div className="mb-8">
                <h3 className="font-display text-2xl font-bold text-slate-800 mb-2">Direct Contact</h3>
                <p className="text-slate-500 text-sm">Reach out to us directly through any of the channels below.</p>
              </div>

              <div className="space-y-8 flex-grow flex flex-col justify-start">

                <a href="tel:+919448069346" className="flex items-start gap-5 group">
                  <div className="bg-sky-50 border border-sky-100 text-[#00B4D8] p-3.5 rounded-full shrink-0 mt-1 transition-colors group-hover:bg-[#00B4D8] group-hover:text-white">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-0.5">Call Us</p>
                    <p className="text-xl font-bold text-slate-800 group-hover:text-[#00B4D8] transition-colors">+91 9448069346</p>
                  </div>
                </a>

                <a href="https://mail.google.com/mail/?view=cm&to=jk.electricals@yahoo.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-5 group">
                  <div className="bg-sky-50 border border-sky-100 text-[#00B4D8] p-3.5 rounded-full shrink-0 mt-1 transition-colors group-hover:bg-[#00B4D8] group-hover:text-white">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-0.5">Email Us</p>
                    <p className="text-lg font-bold text-slate-800 group-hover:text-[#00B4D8] transition-colors">jk.electricals@yahoo.com</p>
                  </div>
                </a>

                <a href="https://maps.google.com/maps?q=JK+Electricals,+KIADB+Housing+Layout,+Hebbal+2nd+Stage,+Mysuru,+Karnataka+570017" target="_blank" rel="noopener noreferrer" className="flex items-start gap-5 group">
                  <div className="bg-sky-50 border border-sky-100 text-[#00B4D8] p-3.5 rounded-full shrink-0 mt-1 transition-colors group-hover:bg-[#00B4D8] group-hover:text-white">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-0.5">Head Office</p>
                    <p className="text-base font-bold text-slate-800 leading-snug group-hover:text-[#00B4D8] transition-colors">
                      #212, KIADB Housing Layout,<br />
                      Hebbal 2nd Stage, Mysore – 570017
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-5">
                  <div className="bg-sky-50 border border-sky-100 text-[#00B4D8] p-3.5 rounded-full shrink-0 mt-1">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-0.5">Business Hours</p>
                    <p className="text-base font-bold text-slate-800">Mon–Sat: 9:00 AM – 6:00 PM</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;