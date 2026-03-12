import { CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg"; // Keep your existing image import
import SectionHeading from "@/components/SectionHeading";
import { Link } from "react-router-dom";

const whyChooseUs = [
  "Super Grade Electrical Contractor License",
  "Over 25 years of specialized industrial & commercial experience",
  "Comprehensive Govt. Liaisoning (KPTCL, CESC, Electrical Inspectorate)",
  "Strict compliance with Indian Standards (IS specifications)",
  "End-to-end project execution from design to commissioning",
  "Dedicated team of experienced engineers and technicians",
];

const AboutPage = () => (
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
          Who We Are
        </p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-sm">
          About JK Electricals
        </h1>
        <p className="mt-5 text-white/90 text-lg md:text-xl max-w-2xl mx-auto font-medium">
          A licensed Super Grade Electrical Contractor delivering reliable power infrastructure and industrial electrification solutions for over 25 years.
        </p>
      </div>
    </section>

    {/* Our Story */}
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800 mb-6">Our Legacy of Excellence</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
              <p>
                Based in Mysore, JK Electricals has built a steadfast reputation over the past two and a half decades as a premier provider of industrial and infrastructure electrical services.
              </p>
              <p>
                As a licensed <strong>Super Grade Electrical Contractor</strong>, we possess the technical capabilities and regulatory authorizations to handle highly complex HT and EHT electrical installations, including comprehensive 66/11 KV substation erections and transformer commissioning.
              </p>
              <p>
                Our philosophy is rooted in uncompromising safety, stringent adherence to Indian Standards (IS), and seamless project execution. From heavy machinery electrification to securing crucial approvals from KPTCL and CESC, our experienced team of engineers ensures your facility is powered safely and efficiently.
              </p>
            </div>
          </div>
          <div className="relative">
            {/* Decorative background accent for the image */}
            <div className="absolute -inset-4 bg-sky-50 rounded-3xl -z-10 hidden sm:block"></div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
              <img
                src={teamPhoto}
                alt="JK Electricals Team & Infrastructure"
                className="w-full h-full object-cover min-h-[400px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Why Choose Us */}
    <section className="section-padding bg-slate-50 border-y border-slate-100">
      <div className="container-max">
        <SectionHeading
          title="Why Partner with JK Electricals?"
          subtitle="We bring technical expertise, regulatory know-how, and decades of hands-on experience to every project."
        />
        <div className="max-w-3xl mx-auto mt-12 grid sm:grid-cols-2 gap-6">
          {whyChooseUs.map((item) => (
            <div key={item} className="flex items-start gap-3 p-4 rounded-xl bg-white shadow-sm border border-slate-100 hover:border-sky-200 transition-colors">
              <CheckCircle className="h-6 w-6 text-[#00B4D8] shrink-0 mt-0.5" />
              <span className="text-slate-700 font-medium leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* License Block & CTA */}
    <section className="section-padding bg-white">
      <div className="container-max max-w-4xl">
        <div className="bg-sky-50 border-l-4 border-[#00B4D8] p-8 md:p-10 rounded-r-2xl shadow-sm flex flex-col sm:flex-row gap-8 items-start sm:items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="h-8 w-8 text-[#0A3A5C]" />
              <h3 className="font-display text-2xl font-bold text-slate-800">Credentials & Compliance</h3>
            </div>
            <div className="space-y-3 text-slate-600 text-base">
              <p><strong className="text-slate-800">Contractor License:</strong> Super Grade Electrical Contractor</p>
              <p><strong className="text-slate-800">Liaisoning Expertise:</strong> KPTCL, CESC, & Electrical Inspectorate</p>
              <p><strong className="text-slate-800">Quality Standards:</strong> Execution as per IS 3034 & Indian Standards</p>
              <p><strong className="text-slate-800">Base of Operations:</strong> Mysore, Karnataka</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Ready to start your next project?</h3>
          <Link
            to="/contact"
            className="bg-[#00B4D8] hover:bg-[#0096b4] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 inline-flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            Contact Our Engineering Team <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default AboutPage;