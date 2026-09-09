"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Briefcase, Terminal as TerminalIcon } from "lucide-react";
import Magnetic from "./Magnetic";
import { useMode } from "@/context/ModeContext";
import { playChime } from "@/utils/audio";

const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { mode, toggleMode } = useMode();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ["hero", "about", "skills", "work", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggle = () => {
    playChime();
    toggleMode();
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-5xl xl:max-w-6xl px-4 sm:px-6">
        <div
          className={`flex items-center justify-between px-5 sm:px-7 py-2.5 sm:py-3 rounded-full transition-all duration-300 ${
            scrolled
              ? "glass border-border-glow shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
              : "bg-transparent border-transparent"
          } border`}
        >
          {/* Left: Logo & Mode Capsule grouped comfortably */}
          <div className="flex items-center gap-3 sm:gap-5">
            <a href="#hero" className="flex items-center gap-2 group">
              <span className="font-mono text-base sm:text-lg font-bold tracking-wider text-gradient group-hover:text-glow">
                &lt;MSH /&gt;
              </span>
            </a>

            {/* Mode Toggle Capsule */}
            <button
              onClick={handleToggle}
              data-cursor-label={mode === "recruiter" ? "[ DEV MODE ]" : "[ RECRUITER MODE ]"}
              className="relative flex items-center justify-between gap-1 p-0.5 sm:p-1 rounded-full bg-bg border border-border cursor-pointer select-none w-[150px] sm:w-[165px] h-[32px] sm:h-[36px] overflow-hidden"
            >
              {/* Slider highlight */}
              <span
                className={`absolute top-0.5 sm:top-1 bottom-0.5 sm:bottom-1 w-[70px] sm:w-[78px] rounded-full transition-all duration-300 ${
                  mode === "engineer"
                    ? "left-[76px] sm:left-[82px] bg-neon-violet/15 border border-neon-violet/30 shadow-[0_0_12px_rgba(14,165,233,0.2)]"
                    : "left-0.5 sm:left-1 bg-neon-cyan/15 border border-neon-cyan/30 shadow-[0_0_12px_rgba(0,255,242,0.2)]"
                }`}
              />

              {/* Recruiter button option */}
              <span className={`relative z-10 w-[70px] sm:w-[78px] text-center font-mono text-[9px] font-bold tracking-wider flex items-center justify-center gap-1 transition-colors ${
                mode === "recruiter" ? "text-neon-cyan font-bold" : "text-fg-dim"
              }`}>
                <Briefcase className="h-2.5 w-2.5" />
                HR Mode
              </span>

              {/* Dev button option */}
              <span className={`relative z-10 w-[70px] sm:w-[78px] text-center font-mono text-[9px] font-bold tracking-wider flex items-center justify-center gap-1 transition-colors ${
                mode === "engineer" ? "text-neon-violet font-bold" : "text-fg-dim"
              }`}>
                <TerminalIcon className="h-2.5 w-2.5" />
                Dev Mode
              </span>
            </button>
          </div>

          {/* Desktop Navigation — Well-spaced, high contrast & clear */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_ITEMS.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative font-mono text-xs uppercase tracking-wider font-semibold transition-colors hover:text-neon-cyan ${
                    isActive ? "text-neon-cyan font-bold" : "text-fg-muted hover:text-fg"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-gradient-to-r from-neon-cyan to-neon-violet shadow-[0_0_8px_var(--neon-cyan)]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Call to Action Button */}
          <div className="hidden md:block">
            <Magnetic strength={0.3}>
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-border px-5 py-2 font-mono text-xs uppercase tracking-wider font-semibold text-fg transition-colors hover:border-neon-cyan hover:text-black"
              >
                {/* Hover slide background */}
                <span className="absolute inset-0 z-0 translate-y-full bg-neon-cyan transition-transform duration-300 ease-out group-hover:translate-y-0" />
                <span className="relative z-10 flex items-center gap-1.5">
                  Let&apos;s talk
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </Magnetic>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg-muted md:hidden hover:text-neon-cyan"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Glass Menu */}
      <div
        className={`fixed inset-x-0 top-[88px] mx-6 z-40 rounded-3xl border border-border-glow glass p-8 shadow-[0_10px_40px_rgba(0,0,0,0.6)] transition-all duration-300 md:hidden ${
          mobileOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-6">
          {NAV_ITEMS.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`font-mono text-sm uppercase tracking-widest transition-colors hover:text-neon-cyan ${
                  isActive ? "text-neon-cyan" : "text-fg-muted"
                }`}
              >
                &gt; {item.label}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-neon-cyan py-3 text-center font-mono text-sm uppercase tracking-widest text-black"
          >
            Let&apos;s Talk
            <ArrowRight className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  );
}
