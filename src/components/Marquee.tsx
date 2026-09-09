"use client";

const ITEMS = [
  "LARAVEL",
  "PHP (OOP)",
  "MYSQL & QUERY OPTIMIZATION",
  "RESTFUL API DEVELOPMENT",
  "MVC ARCHITECTURE",
  "RBAC & AUTHENTICATION",
  "DATABASE DESIGN",
  "JAVASCRIPT & AJAX",
  "BLADE TEMPLATING",
  "QUEUE & JOBS",
  "GIT & POSTMAN",
  "SYSTEM MAINTENANCE",
];

export default function Marquee() {
  return (
    <div className="relative w-full overflow-hidden border-y border-border/70 bg-bg-soft/50 py-3.5 backdrop-blur-sm select-none">
      {/* Side gradient masks for smooth fade edges */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute top-0 bottom-0 right-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-bg to-transparent" />

      {/* Hardware-accelerated continuous track */}
      <div className="animate-marquee">
        {/* Track A */}
        <div className="flex items-center gap-10 sm:gap-14 pr-10 sm:pr-14 shrink-0">
          {ITEMS.map((item, index) => (
            <div key={`a-${index}`} className="flex items-center gap-10 sm:gap-14 shrink-0">
              <span className="font-mono text-xs uppercase tracking-[0.3em] font-medium text-fg-muted transition-colors hover:text-neon-cyan">
                {item}
              </span>
              <span className="text-neon-cyan text-xs font-bold shadow-[0_0_8px_var(--neon-cyan)]">
                ✦
              </span>
            </div>
          ))}
        </div>

        {/* Track B (Exact clone for 100% seamless zero-jerk infinite loop) */}
        <div className="flex items-center gap-10 sm:gap-14 pr-10 sm:pr-14 shrink-0" aria-hidden="true">
          {ITEMS.map((item, index) => (
            <div key={`b-${index}`} className="flex items-center gap-10 sm:gap-14 shrink-0">
              <span className="font-mono text-xs uppercase tracking-[0.3em] font-medium text-fg-muted transition-colors hover:text-neon-cyan">
                {item}
              </span>
              <span className="text-neon-cyan text-xs font-bold shadow-[0_0_8px_var(--neon-cyan)]">
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
