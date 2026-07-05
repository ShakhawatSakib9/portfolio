"use client";

const ITEMS = [
  "LARAVEL 11",
  "PHP 8.3",
  "MYSQL OPTIMIZATION",
  "RESTFUL APIs",
  "REDIS CACHING",
  "NEXT.JS 16",
  "SYSTEM ARCHITECTURE",
  "HIGH CONCURRENCY",
  "FINTECH RECONCILIATION",
];

export default function Marquee() {
  return (
    <div className="relative w-full overflow-hidden border-y border-border/80 bg-bg-soft/60 py-4 backdrop-blur-sm select-none">
      {/* Side gradient masks for smooth fade edges */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute top-0 bottom-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />

      <div className="flex w-max animate-marquee space-x-12">
        {/* Repeat list twice to create infinite seamless loop */}
        {[...ITEMS, ...ITEMS, ...ITEMS].map((item, index) => (
          <div key={index} className="flex items-center space-x-12 shrink-0">
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-fg-muted transition-colors hover:text-neon-cyan">
              {item}
            </span>
            <span className="text-neon-violet text-xs font-bold shadow-[0_0_8px_var(--neon-violet)]">
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
