import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-[#0A3A5C] text-white">
    <div className="container-max px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-12">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-3 mb-4">
            <img
              src="/logo.png"
              alt="JK Electricals"
              className="h-12 w-auto"
            />
            <span className="font-display text-xl font-bold tracking-tight text-[#00B4D8]">JK Electricals</span>
          </Link>
          <p className="text-white/70 text-sm leading-relaxed">
            Licensed & insured electrical contractor serving residential and commercial clients with excellence for over a decade.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-[#00B4D8]">Quick Links</h4>
          <div className="flex flex-col gap-3">
            {[
              { to: "/services", label: "Our Services" },
              { to: "/projects", label: "Projects" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact" },
            ].map((link) => (
              <Link key={link.to} to={link.to} className="text-sm text-white/70 hover:text-accent transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-[#00B4D8]">Services</h4>
          <div className="flex flex-col gap-3 text-sm text-white/70">
            <span>Residential Wiring</span>
            <span>Commercial Electrical</span>
            <span>Panel Upgrades</span>
            <span>Emergency Repairs</span>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-[#00B4D8]">Contact Us</h4>
          <div className="flex flex-col gap-4 text-sm">
            <a href="tel:+919448069346" className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors">
              <Phone className="h-4 w-4 shrink-0" /> +91 9448069346
            </a>
            <a href="mailto:jk.electricals@yahoo.com" className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors">
              <Mail className="h-4 w-4 shrink-0" /> jk.electricals@yahoo.com
            </a>
            <div className="flex items-start gap-3 text-white/70">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5" /> #212, KIADB Housing layout, Hebbal 2nd stage, Mysore - 570017
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="border-t border-white/15">
      <div className="container-max px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
        <span>© {new Date().getFullYear()} JK Electricals. All rights reserved.</span>
        <span>License #EC-123456 | Fully Insured</span>
      </div>
    </div>
  </footer>
);

export default Footer;