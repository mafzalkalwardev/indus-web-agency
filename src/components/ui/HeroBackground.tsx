import { HeroHackerScene } from "./HeroHackerScene";

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Deep cyber base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(6,182,212,0.15)_0%,transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(16,185,129,0.08)_0%,transparent_45%)]" />

      {/* Animated canvas — rolling wireframe spheres + network */}
      <HeroHackerScene />

      {/* CRT scanlines */}
      <div
        className="hero-scanlines absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)",
        }}
      />

      {/* Matrix-style code rain columns (CSS) */}
      <div className="hero-matrix absolute inset-0 overflow-hidden opacity-[0.07]">
        {["010110", "INDUS", "0x7F", "AUTO", "DIAL", "SMTP", "API", "NODE", "PYQT", "GO"].map(
          (code, i) => (
            <span
              key={code}
              className="hero-matrix-col absolute font-mono text-[10px] leading-none text-cyan-300"
              style={{
                left: `${8 + i * 10}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${6 + (i % 4) * 2}s`,
              }}
            >
              {Array.from({ length: 24 }, (_, j) => (
                <br key={j} />
              ))}
              {code}
              <br />
              {i % 2 ? "10101" : "VERIFY"}
              <br />
              SCRAPE
              <br />
              {code}
            </span>
          )
        )}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(12,35,64,0.7)_100%)]" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.6) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glitch accent bar */}
      <div className="hero-glitch-bar absolute left-0 top-1/3 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="hero-glitch-bar absolute left-0 top-2/3 h-px w-full bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent" style={{ animationDelay: "1.5s" }} />

      {/* Corner brackets — hacker HUD */}
      <svg className="absolute left-4 top-4 h-12 w-12 text-cyan-400/25" viewBox="0 0 48 48" fill="none">
        <path d="M4 16V4h12M44 16V4H32M4 32v12h12M44 32v12H32" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg className="absolute bottom-4 right-4 h-12 w-12 text-cyan-400/25" viewBox="0 0 48 48" fill="none">
        <path d="M4 16V4h12M44 16V4H32M4 32v12h12M44 32v12H32" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0c2340] to-transparent" />
    </div>
  );
}
