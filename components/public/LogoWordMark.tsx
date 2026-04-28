// components/LogoWordmark.tsx

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap = {
  sm: "text-2xl",
  md: "text-3xl md:text-4xl",
  lg: "text-5xl md:text-6xl",
  xl: "text-[52px] sm:text-[64px]"
};

export function LogoWordmarkStacked({ className ="display", size = "xl" }: LogoProps) {
  return (
    <div className={`font-display leading-[0.9] ${sizeMap[size]} ${className}`}>
      <div>
        <span className="text-brand">I</span>{" "}
        <span className="text-accent-green">Want</span>
      </div>
      <div className="text-brand">That!</div>
    </div>
  );
}

export function LogoWordmarkHorizontal({ className = "display", size = "xl" }: LogoProps) {
  return (
    <div className={`font-display leading-none whitespace-nowrap ${sizeMap[size]} ${className}`}>
        <span className="text-brand">I</span>{" "}
        <span className="text-accent-green">Want</span>{" "}
        <span className="text-brand">That!</span>
    </div>
  );
}