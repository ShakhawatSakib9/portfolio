"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ArrowRight, Download } from "lucide-react";
import { Github, Linkedin, Facebook, Instagram } from "./SocialIcons";
import Magnetic from "./Magnetic";

const NeonScene = dynamic(() => import("./NeonScene"), { ssr: false });

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

import { useMode } from "@/context/ModeContext";
import { playClick } from "@/utils/audio";

const socials = [
  { icon: Github, href: "https://github.com/ShakhawatSakib9", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/md-shakhawat-hossain-0a8ba0352/", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/md.shakhawat.hossain.987218/", label: "Facebook" },
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
      className="relative min-h-screen w-full overflow-hidden bg-grid flex items-center"
    >
      {/* Ambient neon glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.22),transparent_60%)] blur-2xl" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(0,255,242,0.14),transparent_60%)] blur-2xl" />

      {/* 3D scene */}
      <div className="absolute inset-0 lg:left-[45%] opacity-90">
        <NeonScene />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-bg-card/60 px-4 py-1.5 font-mono text-xs text-neon-cyan backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-neon-cyan shadow-[0_0_10px_var(--neon-cyan)] animate-pulse" />
            Available for work
          </p>

          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block text-fg-muted text-2xl font-light mb-2 sm:text-3xl">
              Hi, I&apos;m
            </span>
            <span className="text-gradient text-glow">Md. Shakhawat</span>
            <br />
            <span className="text-fg">Hossain</span>
          </h1>

          <div className="mt-6 flex h-8 items-center font-mono text-lg text-fg-muted sm:text-xl">
            <span className="text-neon-violet mr-2">&gt;</span>
            <span>{role}</span>
            <span className="ml-1 inline-block h-5 w-[2px] bg-neon-cyan animate-pulse" />
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
            I build fast, scalable backends and clean interfaces with Laravel, PHP
            &amp; MySQL — turning complex problems into reliable, elegant systems.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
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
                onClick={handleResumeClick}
                data-cursor-label={mode === "engineer" ? "[ UNLOCK VIA BKASH ]" : "[ DOWNLOAD CV ]"}
                className="inline-flex items-center gap-2 rounded-full border border-border-glow px-7 py-3 font-medium text-fg glow-hover"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
            </Magnetic>
          </div>

          <div className="mt-10 flex items-center gap-5">
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
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-fg-dim">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-10 w-[1px] bg-gradient-to-b from-neon-cyan to-transparent" />
      </div>
    </section>
  );
}
