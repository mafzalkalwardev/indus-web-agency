import type { ReactNode } from "react";

/**
 * Layout wrapper. Content stays visible in the server HTML.
 * Opacity-0 entrance animations were delaying LCP until hydration finished.
 */
export function FadeIn({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "none";
}) {
  return <div className={className}>{children}</div>;
}
