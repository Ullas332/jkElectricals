interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  light?: boolean;
  className?: string;
}

const SectionHeading = ({ title, subtitle, light, className = "" }: SectionHeadingProps) => (
  <div className={`text-center mb-12 md:mb-16 ${className}`}>
    <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold ${light ? "text-primary-foreground" : "text-foreground"}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`mt-4 text-lg max-w-2xl mx-auto font-medium ${light ? "text-primary-foreground/90" : "text-slate-700"}`}>
        {subtitle}
      </p>
    )}
    <div className="mt-6 w-16 h-1 bg-accent rounded-full mx-auto" />
  </div>
);

export default SectionHeading;
