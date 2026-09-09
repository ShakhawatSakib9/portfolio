"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Download } from "lucide-react";
import { Github, Linkedin, Facebook, Instagram, Twitter } from "./SocialIcons";
import Magnetic from "./Magnetic";
import HeroPortrait from "./HeroPortrait";
import { useMode } from "@/context/ModeContext";
import { playClick } from "@/utils/audio";

const ROLES = [
  "Full-Stack Developer",
  "Laravel Specialist",
  "Backend Engineer",
  "API Architect",
];

function useTypingRole() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    const speed = deleting ? 45 : 90;
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1400);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) {
          setDeleting(false);
          setRoleIndex((i) => (i + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex]);

  return text;
}

const socials = [
  { icon: Github, href: "https://github.com/ShakhawatSakib9", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/md-shakhawat-hossain-0a8ba0352/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/shakhawat9sakib", label: "X (Twitter)" },
  { icon: Facebook, href: "https://www.facebook.com/shakhawatsakib99/", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/shakhawat_sa_kib/?hl=en", label: "Instagram" },
];

interface HeroProps {
  onUnlockResume: () => void;
}

export default function Hero({ onUnlockResume }: HeroProps) {
  const role = useTypingRole();
  const { mode } = useMode();

  const handleResumeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (mode === "engineer") {
      e.preventDefault();
      playClick();
      onUnlockResume();
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-grid flex items-center pt-16 sm:pt-20 pb-12"
    >
      {/* Ambient neon glows — Water Blue & Cyan */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.16),transparent_60%)] blur-2xl" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(0,255,242,0.14),transparent_60%)] blur-2xl" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 sm:px-10 lg:px-16 2xl:px-20 -mt-6 sm:-mt-10 lg:-mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 2xl:gap-16">
          {/* Left Column: Bio & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-bg-card/60 px-4 py-1.5 font-mono text-xs text-neon-cyan backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-neon-cyan shadow-[0_0_10px_var(--neon-cyan)] animate-pulse" />
              Available for work
            </div>

            <h1 className="mt-5 text-3xl sm:text-6xl lg:text-7xl font-bold leading-[1.06] tracking-tight">
              <span className="block text-fg-muted text-xl sm:text-2xl lg:text-3xl font-light mb-1 sm:mb-2">
                Hi, I&apos;m
              </span>
              <span className="text-gradient text-glow">Md. Shakhawat</span>
              <br />
              <span className="text-fg">Hossain</span>
            </h1>

            <div className="mt-5 flex h-8 items-center font-mono text-base sm:text-xl text-fg-muted">
              <span className="text-neon-cyan mr-2">&gt;</span>
              <span>{role}</span>
              <span className="ml-1 inline-block h-5 w-[2px] bg-neon-cyan animate-pulse" />
            </div>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
              I build scalable backend systems and REST APIs with Laravel, PHP &amp; MySQL
              — focused on performance, clean architecture, and reliable production-ready systems.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 rounded-full bg-neon-cyan px-7 py-3 font-medium text-black transition-shadow hover:shadow-[0_0_30px_-4px_var(--neon-cyan)]"
                >
                  View my work
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="/resume/Md.-Shakhawat-Hossain-R-L.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-label="[ DOWNLOAD CV · PDF ]"
                  className="inline-flex items-center gap-2 rounded-full border border-border-glow px-7 py-3 font-medium text-fg glow-hover"
                >
                  <Download className="h-4 w-4" />
                  Resume
                </a>
              </Magnetic>
            </div>

            <div className="mt-8 flex items-center gap-5">
              {socials.map(({ icon: Icon, href, label }) => (
                <Magnetic key={label} strength={0.5}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-neon-cyan hover:text-neon-cyan"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </Magnetic>
              ))}
            </div>

            {/* Quick Metrics Bar — Fills the lower gap & highlights real credentials */}
            <div className="mt-10 pt-6 border-t border-border/50 grid grid-cols-3 gap-4 sm:gap-6 max-w-xl">
              <div>
                <p className="font-mono text-xl sm:text-2xl font-bold text-fg">1.5+ <span className="text-neon-cyan text-sm font-semibold">Yrs</span></p>
                <p className="text-[11px] text-fg-muted font-medium mt-0.5">Industry Exp (IISBD)</p>
              </div>
              <div>
                <p className="font-mono text-xl sm:text-2xl font-bold text-fg">5+ <span className="text-neon-cyan text-sm font-semibold">Apps</span></p>
                <p className="text-[11px] text-fg-muted font-medium mt-0.5">Production Systems</p>
              </div>
              <div>
                <p className="font-mono text-xl sm:text-2xl font-bold text-fg">3.40 <span className="text-neon-cyan text-sm font-semibold">CGPA</span></p>
                <p className="text-[11px] text-fg-muted font-medium mt-0.5">B.Sc in CSE (DIU)</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Tech Portrait */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <HeroPortrait />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-fg-dim">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-8 w-[1px] bg-gradient-to-b from-neon-cyan to-transparent" />
      </div>
    </section>
  );
}
