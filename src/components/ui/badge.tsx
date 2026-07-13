import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] transition",
  {
    variants: {
      variant: {
        default: "border-accent/25 bg-accent-tint/60 text-accent-strong",
        secondary: "border-line-strong bg-paper-sunk/60 text-muted",
        outline: "border-line-strong text-ink",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
