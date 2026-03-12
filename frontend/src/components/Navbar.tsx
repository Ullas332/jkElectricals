import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A3A5C]/95 backdrop-blur-sm border-b border-white/10 shadow-sm">
      {/* Custom load animations */}
      <style>{`
        @keyframes logo-intro {
          0% { opacity: 0; transform: scale(0.3) rotate(-10deg); }
          60% { transform: scale(1.05) rotate(2deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes text-intro {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-logo-load {
          animation: logo-intro 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .animate-text-load {
          animation: text-intro 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.15s forwards;
          opacity: 0; /* Hides text until the 0.15s delay is over */
        }
      `}</style>

      <div className="w-full flex items-center h-16 md:h-20 pl-2 md:pl-4 pr-6 md:pr-10">
        {/* Logo Container */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/logo.png"
            alt="JK Electricals"
            // Removed mix-blend-multiply so it doesn't vanish against the dark background
            className="h-14 md:h-16 w-auto animate-logo-load"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <span className="font-display text-3xl md:text-4xl font-extrabold text-[#00B4D8] tracking-tight antialiased animate-text-load">
            JK Electricals
          </span>
        </Link>

        {/* Desktop links - right aligned, equal spacing */}
        <div className="hidden md:flex items-center gap-8 ml-auto">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative text-[15px] font-semibold transition-colors duration-200 group ${location.pathname === link.to
                  ? "text-[#00B4D8]"
                  : "text-white/90 hover:text-[#00B4D8]"
                }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#00B4D8] transition-all duration-300 rounded-full ${location.pathname === link.to ? "w-full" : "w-0 group-hover:w-full"
                }`} />
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden ml-auto text-white hover:text-[#00B4D8] p-2 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0A3A5C] border-t border-white/10 animate-fade-in shadow-xl absolute w-full">
          <div className="flex flex-col py-4 px-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`py-3 px-4 rounded-lg text-sm font-semibold transition-colors ${location.pathname === link.to
                    ? "bg-[#00B4D8]/10 text-[#00B4D8]"
                    : "text-white/90 hover:bg-white/5 hover:text-[#00B4D8]"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;