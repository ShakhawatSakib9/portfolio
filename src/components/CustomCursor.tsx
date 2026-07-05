"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    // Ring follows with easing
    let rafId: number;
    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // Grow ring over interactive elements & handle labels
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hoverTarget = t.closest<HTMLElement>("a, button, [data-cursor='hover'], input, textarea, [data-cursor-label]");
      
      if (hoverTarget) {
        ring.classList.add("hovering");
        const label = hoverTarget.getAttribute("data-cursor-label");
        if (label && labelRef.current) {
          labelRef.current.innerText = label;
          labelRef.current.style.opacity = "1";
        }
      }
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hoverTarget = t.closest<HTMLElement>("a, button, [data-cursor='hover'], input, textarea, [data-cursor-label]");
      
      if (hoverTarget) {
        ring.classList.remove("hovering");
        if (labelRef.current) {
          labelRef.current.style.opacity = "0";
        }
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring flex items-center justify-center" aria-hidden>
        <span
          ref={labelRef}
          className="pointer-events-none opacity-0 transition-opacity duration-200 font-mono text-[9px] uppercase tracking-wider text-neon-cyan whitespace-nowrap bg-bg/90 px-2 py-0.5 rounded border border-neon-cyan/40 shadow-[0_0_10px_var(--neon-cyan)] translate-y-8"
        />
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
