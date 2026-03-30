import { Link, useLocation, useNavigate } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const serviceLinks = [
  { to: "/services#substation", label: "Electrical Infrastructure & Substation Works" },
  { to: "/services#generators", label: "Transformer & Generator Services" },
  { to: "/services#industrial", label: "Industrial Electrical Works" },
  { to: "/services#wiring",     label: "Electrical Installation & Wiring" },
  { to: "/services#panels",     label: "Electrical Panels & Distribution" },
  { to: "/services#testing",    label: "Testing, Commissioning & Maintenance" },
  { to: "/services#liaison",    label: "Government Liaison & Approvals" },
];

const Footer = () => {
  const location  = useLocation();
  const navigate  = useNavigate();

  const handleServiceClick = (e: React.MouseEvent, to: string) => {
    const hash = to.split("#")[1];
    if (location.pathname === "/services") {
      e.preventDefault();
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // navigate then scroll after mount
      e.preventDefault();
      navigate(to);
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  return (
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
            Leading licensed Super Grade Electrical contractor serving industrial, commercial, and power plant sectors for over two decades.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-[#00B4D8]">Quick Links</h4>
          <div className="flex flex-col gap-3">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About Us" },
              { to: "/services", label: "Our Services" },
              { to: "/projects", label: "Projects" },
              { to: "/gallery", label: "Gallery" },
              { to: "/contact", label: "Contact" },
            ].map((link) => (
              <Link key={link.to} to={link.to} className="text-sm text-white/70 hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-[#00B4D8]">Services</h4>
          <div className="flex flex-col gap-3 text-[13px] text-white/70">
            {serviceLinks.map(({ to, label }) => (
              <a
                key={to}
                href={to}
                onClick={(e) => handleServiceClick(e, to)}
                className="hover:text-white transition-colors cursor-pointer"
              >{label}</a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-[#00B4D8]">Contact Us</h4>
          <div className="flex flex-col gap-4 text-sm">
            <a href="tel:+919448069346" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
              <Phone className="h-4 w-4 shrink-0" /> +91 9448069346
            </a>
            <a href="mailto:jk.electricals@yahoo.com" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
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
        <span>Super Grade Reg. No: SGL00051MYS / SGL191657MYS</span>
      </div>
    </div>
  </footer>
  );
};

export default Footer;