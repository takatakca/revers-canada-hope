type Variant = "to-light" | "to-dark" | "to-teal" | "to-charcoal";

const fillByVariant: Record<Variant, string> = {
  "to-light": "bg-background",
  "to-dark": "bg-[color:var(--charcoal)]",
  "to-teal": "bg-gradient-band",
  "to-charcoal": "bg-[color:var(--charcoal)]",
};

export function TornDivider({
  variant = "to-light",
  flip = false,
  className = "",
}: {
  variant?: Variant;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative h-10 ${className}`} aria-hidden="true">
      <div
        className={`absolute inset-x-0 ${flip ? "-top-px" : "-bottom-px"} h-10 ${fillByVariant[variant]} ${flip ? "torn-bottom" : "torn-top"}`}
      />
    </div>
  );
}
