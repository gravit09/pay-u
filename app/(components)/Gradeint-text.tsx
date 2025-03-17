interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientText({ children, className = "" }: GradientTextProps) {
  return (
    <span
      className={`text-transparent bg-clip-text  from-primary via-primary/80 to-primary/60 ${className}`}
    >
      {children}
    </span>
  );
}
