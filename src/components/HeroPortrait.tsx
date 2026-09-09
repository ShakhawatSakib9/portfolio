"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useMode } from "@/context/ModeContext";
import { Code2, ShieldCheck, Sparkles, Cpu, Layers } from "lucide-react";

export default function HeroPortrait() {
  const { mode } = useMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activePhoto, setActivePhoto] = useState<"portrait" | "halfbody">("portrait");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Smooth tilt angles (-8deg to +8deg)
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const imgSrc =
    activePhoto === "portrait"
      ? "/img/avatar-portrait.png"
      : "/img/avatar-halfbody.png";

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none py-4 sm:py-8">
      {/* 3D Interactive Stage */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-[500px] sm:max-w-[560px] 2xl:max-w-[620px] h-[520px] sm:h-[600px] 2xl:h-[660px] flex items-center justify-center transition-transform duration-300 ease-out cursor-pointer"
        style={{
          perspective: "1200px",
        }}
      >
        {/* Parallax Group with 3D transform */}
        <div
          className="relative w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${
              isHovered ? "1.02" : "1"
            }, ${isHovered ? "1.02" : "1"}, 1)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* 1. Cyber Ambient Backdrop Aura (Layer 0 - Far back) */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            style={{ transform: "translateZ(-30px)" }}
          >
            {/* Glowing radial core */}
            <div className="h-[320px] w-[320px] sm:h-[420px] sm:w-[420px] rounded-full bg-gradient-to-tr from-neon-violet/30 via-neon-cyan/20 to-transparent blur-3xl animate-pulse" />
            
            {/* Outer concentric cyber ring */}
            <div className="absolute h-[380px] w-[380px] sm:h-[480px] sm:w-[480px] rounded-full border border-neon-cyan/20 border-dashed animate-[spin_45s_linear_infinite]" />
            
            {/* Inner dotted cyber ring */}
            <div className="absolute h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] rounded-full border border-neon-violet/20 border-dotted animate-[spin_30s_linear_infinite_reverse]" />

            {/* Glowing background aperture behind head */}
            <div className="absolute top-10 h-60 w-60 sm:h-72 sm:w-72 rounded-full bg-gradient-to-b from-neon-cyan/15 via-neon-violet/10 to-transparent blur-2xl" />
          </div>

          {/* 2. Engineer Mode HUD Elements (Floating around the stage) */}
          {mode === "engineer" && (
            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{ transform: "translateZ(10px)" }}
            >
              {/* Corner tech brackets */}
              <span className="absolute top-4 left-6 font-mono text-[10px] text-neon-cyan/80">
                ┌─ [SYS.CORE] ─┐
              </span>
              <span className="absolute top-4 right-6 font-mono text-[10px] text-neon-violet/80">
                ┌─ [STATUS: 200 OK] ─┐
              </span>
              <span className="absolute bottom-8 left-6 font-mono text-[9px] text-fg-dim">
                LAT: 23.8103° N // 90.4125° E
              </span>
              <span className="absolute bottom-8 right-6 font-mono text-[9px] text-fg-dim">
                FPS: 60 // PING: 18ms
              </span>
            </div>
          )}

          {/* 3. Floating Cutout Portrait (Layer 1 - Standing freely, NO white passport box!) */}
          <div
            className="relative z-20 w-full h-full flex items-end justify-center pointer-events-none"
            style={{ transform: "translateZ(25px)" }}
          >
            <Image
              src={imgSrc}
              alt="Md. Shakhawat Hossain"
              width={600}
              height={720}
              priority
              className="object-contain object-bottom max-h-[96%] sm:max-h-[98%] 2xl:max-h-[100%] w-auto transition-all duration-300 drop-shadow-[0_20px_40px_rgba(0,0,0,0.65)] drop-shadow-[0_0_30px_rgba(0,255,242,0.22)]"
              style={{
                // Smooth mask fade at bottom so legs/waist blend gracefully into page background
                maskImage:
                  "linear-gradient(to bottom, black 0%, black 84%, transparent 99%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 0%, black 84%, transparent 99%)",
              }}
            />
          </div>

          {/* 4. Sleek Floating Badges (Only 2 Focused Badges — Clean & Non-Cluttered) */}

          {/* Badge 1: Top-Right - Tech Specialty (Floats beside head) */}
          <div
            className="absolute top-14 -right-2 sm:-right-6 z-30 flex items-center gap-2.5 rounded-2xl border border-neon-cyan/35 bg-slate-950/90 p-2.5 sm:p-3 shadow-[0_15px_30px_rgba(0,0,0,0.5)] backdrop-blur-md transition-transform duration-300"
            style={{ transform: "translateZ(50px)" }}
          >
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/40">
              <Code2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <p className="font-mono text-xs font-bold text-white leading-tight">
                Laravel Specialist
              </p>
              <p className="font-mono text-[10px] text-neon-cyan font-medium">
                Backend Architecture
              </p>
            </div>
          </div>

          {/* Badge 2: Bottom-Left - Real Experience & Company (Floats beside waist) */}
          <div
            className="absolute bottom-16 -left-2 sm:-left-6 z-30 flex items-center gap-2.5 rounded-2xl border border-neon-violet/35 bg-slate-950/90 p-2.5 sm:p-3 shadow-[0_15px_30px_rgba(0,0,0,0.5)] backdrop-blur-md transition-transform duration-300"
            style={{ transform: "translateZ(45px)" }}
          >
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-neon-violet/20 text-neon-violet border border-neon-violet/40">
              <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <p className="font-mono text-xs font-bold text-white leading-tight">
                1.5+ Yrs Exp.
              </p>
              <p className="font-mono text-[10px] text-zinc-300">
                Software Dev @ IISBD
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Photo Switcher Pills */}
      <div className="mt-3 flex items-center justify-center gap-2 z-30">
        <button
          type="button"
          onClick={() => setActivePhoto("portrait")}
          className={`px-3 py-1 rounded-full font-mono text-xs transition-all flex items-center gap-1.5 ${
            activePhoto === "portrait"
              ? "bg-neon-cyan/20 border border-neon-cyan text-neon-cyan font-semibold shadow-[0_0_12px_rgba(0,255,242,0.3)]"
              : "text-fg-muted hover:text-fg border border-border/50 bg-bg-card/40"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${activePhoto === "portrait" ? "bg-neon-cyan" : "bg-fg-dim"}`} />
          Portrait View
        </button>
        <span className="text-fg-dim text-xs">•</span>
        <button
          type="button"
          onClick={() => setActivePhoto("halfbody")}
          className={`px-3 py-1 rounded-full font-mono text-xs transition-all flex items-center gap-1.5 ${
            activePhoto === "halfbody"
              ? "bg-neon-violet/20 border border-neon-violet text-neon-violet font-semibold shadow-[0_0_12px_rgba(14,165,233,0.3)]"
              : "text-fg-muted hover:text-fg border border-border/50 bg-bg-card/40"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${activePhoto === "halfbody" ? "bg-neon-violet" : "bg-fg-dim"}`} />
          Half-Body View
        </button>
      </div>
    </div>
  );
}
