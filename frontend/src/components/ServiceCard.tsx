import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// 1. Removed 'icon: LucideIcon' from here to fix the TypeScript error
interface ServiceCardProps {
  title: string;
  description: string;
  link?: string;
}

// 2. Removed 'icon: Icon' from the destructured props
const ServiceCard = ({ title, description, link = "/contact" }: ServiceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-7 md:p-8 border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">

      {/* Title — fixed min-height so all cards align below it consistently */}
      <h3 className="font-display text-xl font-bold text-slate-800 mb-3 min-h-[3.5rem] leading-snug">
        {title}
      </h3>

      {/* Description with View More/Less toggle — flex-1 pushes button to bottom */}
      <div className="flex-1 mb-5">
        <p className={cn(
          "text-slate-600 text-sm leading-relaxed transition-all duration-300",
          !isExpanded && "line-clamp-3" // Changed to line-clamp-3 for a bit more default context
        )}>
          {description}
        </p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-[#00B4D8] hover:text-[#0096b4] text-xs font-bold tracking-wide transition-colors duration-200"
        >
          {isExpanded ? "View Less ↑" : "View More ↓"}
        </button>
      </div>

      {/* Button — always pinned to bottom */}
      <div className="pt-5 border-t border-slate-100 mt-auto">
        <Link
          to={link}
          className="inline-flex items-center justify-center gap-2 bg-[#00B4D8] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#0096b4] transition-all duration-300 shadow-md hover:shadow-lg text-sm w-full"
        >
          Request Service <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;