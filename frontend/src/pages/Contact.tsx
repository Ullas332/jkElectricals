import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const prefilledService = searchParams.get("service") || "";
  const [form, setForm] = useState({ name: "", email: "", phone: "+91 ", service: prefilledService, message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Get reCAPTCHA v3 token
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

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, recaptchaToken }),
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
      {/* Hero Header */}
      <section className="bg-[#0A3A5C] text-white py-20 md:py-28 text-center px-4 relative overflow-hidden">
        {/* Decorative gradient blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[30%] -right-[10%] w-[60%] h-[120%] rounded-full bg-gradient-to-bl from-[#00B4D8]/20 to-transparent blur-3xl" />
          <div className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[120%] rounded-full bg-gradient-to-tr from-[#00B4D8]/20 to-transparent blur-3xl" />
        </div>

        <div className="container-max relative z-10">
          <p className="text-[#00B4D8] font-bold text-sm uppercase tracking-widest mb-4">
            Get In Touch
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-sm">
            Contact JK Electricals
          </h1>
          <p className="mt-5 text-white/90 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Ready to discuss your industrial electrification or infrastructure project? Reach out to our engineering team today.
          </p>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left Column: Contact Form Card */}
            <div className="bg-white shadow-xl rounded-2xl p-8 border border-slate-100 relative overflow-hidden">
              {/* Subtle top border accent */}
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

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-sm font-semibold text-slate-700">Full Name <span className="text-sky-500">*</span></label>
                      <input
                        id="name"
                        type="text"
                        placeholder="e.g. John Doe"
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
                        placeholder="e.g. john@example.com"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]/50 focus:border-[#00B4D8] focus:bg-white transition-all"
                      />
                    </div>
                  </div>
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
                          if (val.startsWith("+91 ")) {
                            setForm({ ...form, phone: val });
                          } else if (val === "+91" || val.length < 4) {
                            setForm({ ...form, phone: "+91 " });
                          } else {
                            setForm({ ...form, phone: "+91 " + val.replace(/^\+91\s*/, "") });
                          }
                        }}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]/50 focus:border-[#00B4D8] focus:bg-white transition-all"
                      />
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
                        <option>Substation & EHT Installations</option>
                        <option>Transformer Services</option>
                        <option>HT Metering & Distribution</option>
                        <option>Industrial Electrification</option>
                        <option>Control Panels & Testing</option>
                        <option>Govt Liaison & Approvals</option>
                        <option>Generator Maintenance</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
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

            {/* Right Column: Contact Info (No Card) */}
            {/* Added pt-8 to perfectly align the headings horizontally */}
            <div className="pt-8 lg:pl-8 flex flex-col h-full">

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

                <a href="https://maps.google.com/?q=212,+KIADB+Housing+Layout,+Hebbal+2nd+Stage,+Mysore" target="_blank" rel="noopener noreferrer" className="flex items-start gap-5 group">
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