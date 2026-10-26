/** Lightweight analytics helpers — works with Plausible or gtag when configured */

type EventProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: EventProps }) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, props?: EventProps) {
  if (typeof window === "undefined") return;
  try {
    window.plausible?.(name, props ? { props } : undefined);
    if (typeof window.gtag === "function") {
      window.gtag("event", name, props || {});
    }
  } catch {
    // ignore analytics failures
  }
}
