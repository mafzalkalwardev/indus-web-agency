/**
 * Static stand-in for the homepage WebGL sculpture.
 * Same navy/cyan geometry, animated with transform only so it never blocks LCP.
 */
export function AgencySculpture() {
  return (
    <div className="agency-sculpture h-full w-full" aria-hidden>
      <div className="agency-sculpture-spin h-full w-full">
        <svg viewBox="0 0 400 400" className="h-full w-full overflow-visible">
          <defs>
            <radialGradient id="sculpture-glow" cx="50%" cy="46%" r="48%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.28" />
              <stop offset="55%" stopColor="#0891b2" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="sculpture-core" x1="30%" y1="20%" x2="80%" y2="90%">
              <stop offset="0%" stopColor="#1a3a5c" />
              <stop offset="100%" stopColor="#0c2340" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="196" r="150" fill="url(#sculpture-glow)" />
          <g className="agency-ring" fill="none" stroke="#22d3ee">
            <ellipse cx="200" cy="200" rx="168" ry="58" strokeOpacity="0.75" strokeWidth="1.25" transform="rotate(28 200 200)" />
            <ellipse cx="200" cy="200" rx="148" ry="46" strokeOpacity="0.35" strokeWidth="1" transform="rotate(-38 200 200)" />
          </g>
          <polygon
            points="200,118 262,156 248,232 152,232 138,156"
            fill="url(#sculpture-core)"
            stroke="#22d3ee"
            strokeOpacity="0.45"
            strokeWidth="1"
          />
          <g fill="none" strokeLinecap="round">
            <line x1="151.5" y1="190.4" x2="244.6" y2="221.3" stroke="#22d3ee" strokeOpacity="0.28" />
            <line x1="225.4" y1="123.7" x2="244.6" y2="221.3" stroke="#22d3ee" strokeOpacity="0.28" />
            <line x1="225.4" y1="123.7" x2="151.5" y2="190.4" stroke="#22d3ee" strokeOpacity="0.28" />
            <line x1="171" y1="287.1" x2="244.6" y2="221.3" stroke="#22d3ee" strokeOpacity="0.28" />
            <line x1="151.5" y1="190.4" x2="171" y2="287.1" stroke="#22d3ee" strokeOpacity="0.28" />
            <line x1="244.6" y1="221.3" x2="313.3" y2="173.4" stroke="#22d3ee" strokeOpacity="0.28" />
            <line x1="125.2" y1="110.7" x2="151.5" y2="190.4" stroke="#22d3ee" strokeOpacity="0.28" />
            <line x1="276.7" y1="291.5" x2="244.6" y2="221.3" stroke="#22d3ee" strokeOpacity="0.28" />
            <line x1="151.5" y1="190.4" x2="83.7" y2="227.3" stroke="#22d3ee" strokeOpacity="0.28" />
            <line x1="225.4" y1="123.7" x2="313.3" y2="173.4" stroke="#22d3ee" strokeOpacity="0.28" />
            <line x1="125.2" y1="110.7" x2="225.4" y2="123.7" stroke="#22d3ee" strokeOpacity="0.28" />
            <line x1="276.7" y1="291.5" x2="171" y2="287.1" stroke="#22d3ee" strokeOpacity="0.28" />
            <line x1="171" y1="287.1" x2="83.7" y2="227.3" stroke="#22d3ee" strokeOpacity="0.28" />
            <line x1="225.4" y1="123.7" x2="238.7" y2="83.9" stroke="#22d3ee" strokeOpacity="0.35" />
            <line x1="276.7" y1="291.5" x2="313.3" y2="173.4" stroke="#22d3ee" strokeOpacity="0.55" />
            <line x1="125.2" y1="110.7" x2="83.7" y2="227.3" stroke="#22d3ee" strokeOpacity="0.55" />
            <line x1="163.1" y1="310.8" x2="171" y2="287.1" stroke="#22d3ee" strokeOpacity="0.55" />
            <line x1="238.7" y1="83.9" x2="313.3" y2="173.4" stroke="#22d3ee" strokeOpacity="0.9" strokeWidth="1.4" />
            <line x1="125.2" y1="110.7" x2="238.7" y2="83.9" stroke="#22d3ee" strokeOpacity="0.9" strokeWidth="1.4" />
            <line x1="163.1" y1="310.8" x2="276.7" y2="291.5" stroke="#22d3ee" strokeOpacity="0.9" strokeWidth="1.4" />
            <line x1="163.1" y1="310.8" x2="83.7" y2="227.3" stroke="#22d3ee" strokeOpacity="0.9" strokeWidth="1.4" />
            <line x1="283.5" y1="216.6" x2="313.3" y2="173.4" stroke="#22d3ee" strokeOpacity="0.9" strokeWidth="1.4" />
            <line x1="125.2" y1="110.7" x2="123.3" y2="163.3" stroke="#22d3ee" strokeOpacity="0.9" strokeWidth="1.4" />
            <line x1="276.7" y1="291.5" x2="283.5" y2="216.6" stroke="#22d3ee" strokeOpacity="0.9" strokeWidth="1.4" />
            <line x1="83.7" y1="227.3" x2="123.3" y2="163.3" stroke="#22d3ee" strokeOpacity="0.9" strokeWidth="1.4" />
            <line x1="238.7" y1="83.9" x2="283.5" y2="216.6" stroke="#22d3ee" strokeOpacity="0.9" strokeWidth="1.4" />
            <line x1="238.7" y1="83.9" x2="123.3" y2="163.3" stroke="#22d3ee" strokeOpacity="0.9" strokeWidth="1.4" />
            <line x1="163.1" y1="310.8" x2="283.5" y2="216.6" stroke="#22d3ee" strokeOpacity="0.9" strokeWidth="1.4" />
            <line x1="163.1" y1="310.8" x2="123.3" y2="163.3" stroke="#22d3ee" strokeOpacity="0.9" strokeWidth="1.4" />
            <line x1="283.5" y1="216.6" x2="123.3" y2="163.3" stroke="#22d3ee" strokeOpacity="0.9" strokeWidth="1.4" />
          </g>
        </svg>
      </div>
    </div>
  );
}
