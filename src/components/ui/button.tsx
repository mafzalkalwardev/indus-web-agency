import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary CTA — ember accent
        default: "bg-accent text-white shadow-[0_1px_0_rgba(0,0,0,0.05)] hover:bg-accent-strong hover:-translate-y-0.5",
        // Dark ink button
        navy: "bg-ink text-paper hover:bg-ink-soft hover:-translate-y-0.5",
        // Light bordered button on paper
        secondary: "border border-line-strong bg-paper-raised text-ink hover:border-ink hover:-translate-y-0.5",
        // For dark sections
        outline: "border border-white/25 bg-transparent text-white hover:border-white/60 hover:bg-white/5",
        ghost: "text-ink/70 hover:bg-ink/5 hover:text-ink",
      },
      size: {
        default: "h-11 px-6 text-sm",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-[0.95rem] py-3.5",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { buttonVariants };
