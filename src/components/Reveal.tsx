"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export default function Reveal({
  children,
  width = "100%",
  delay = 0,
  direction = "up",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let x = 0;
    let y = 0;

    switch (direction) {
      case "up":
        y = 40;
        break;
      case "down":
        y = -40;
        break;
      case "left":
        x = 40;
        break;
      case "right":
        x = -40;
        break;
    }

    // Set initial state
    gsap.set(el, { opacity: 0, x, y });

    // Create the animation
    const tl = gsap.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 1,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tl.kill();
    };
  }, [delay, direction]);

  return (
    <div ref={ref} style={{ width }} className={className}>
      {children}
    </div>
  );
}
