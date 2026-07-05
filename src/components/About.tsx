"use client";

import Image from "next/image";
import Magnetic from "./Magnetic";
import { Award, Code2, Cpu, Zap } from "lucide-react";

const STATS = [
  { icon: Award, value: "1+ Yr", label: "Industry Exp (IISL)" },
  { icon: Code2, value: "5+", label: "Production Apps" },
  { icon: Zap, value: "3.40", label: "B.Sc CSE CGPA (DIU)" },
  { icon: Cpu, value: "100%", label: "Clean Code & Security" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden bg-bg">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.08),transparent_70%)] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
          
          {/* Profile Image Column (5 cols) */}
          <div className="lg:col-span-5 flex justify-center reveal">
            <div className="relative group max-w-sm w-full aspect-square">
              {/* Decorative neon borders */}
              <div className="absolute inset-0 rounded-3xl border border-neon-cyan/40 scale-105 transition-transform duration-500 group-hover:scale-110 group-hover:border-neon-cyan" />
              <div className="absolute inset-0 rounded-3xl border border-neon-violet/30 -rotate-3 scale-102 transition-transform duration-500 group-hover:rotate-0" />
              
              {/* Main image container */}
              <div className="relative h-full w-full overflow-hidden rounded-3xl border border-border bg-bg-card shadow-2xl">
                <Image
                  src="/img/my-profile-img.jpg"
                  alt="Md. Shakhawat Hossain"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
                  priority
                />
                {/* Dark overlay that fades on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-20" />
              </div>
            </div>
          </div>

          {/* Biography Column (7 cols) */}
          <div className="lg:col-span-7 reveal">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">// 01. About Me</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-fg">
              Software Developer at <span className="text-gradient">IISL</span> &amp; Laravel Engineer
            </h2>
            
            <div className="mt-6 space-y-4 text-fg-muted text-base leading-relaxed sm:text-lg">
              <p>
                I am a professional Full-Stack Web Developer currently working at{" "}
                <strong className="text-fg font-semibold">Innovation and Information System Limited (IISL)</strong>.
                With a B.Sc in Computer Science &amp; Engineering from Daffodil International University (CGPA 3.40),
                I specialize in building production-grade, scalable web applications using Laravel, PHP (OOP), MySQL, and RESTful APIs.
              </p>
              <p>
                My expertise spans enterprise system architecture, role-based access control (RBAC), database query optimization,
                and server-side performance. Whether designing multi-level approval workflows for construction logistics
                or engineering E-Learning, Restaurant, and E-Commerce platforms, I focus on clean code, security, and reliability.
              </p>
            </div>

            {/* Stats grid */}
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="relative overflow-hidden rounded-2xl border border-border bg-bg-card p-5 backdrop-blur-sm glow-hover"
                >
                  {/* Subtle top indicator bar */}
                  <span className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />
                  
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-neon-violet" />
                    <span className="font-mono text-xs uppercase tracking-wider text-fg-dim">
                      {label.split(" ")[0]}
                    </span>
                  </div>
                  <div className="mt-3 font-mono text-2xl font-bold tracking-tight text-fg">
                    {value}
                  </div>
                  <div className="text-xs text-fg-muted mt-1 leading-snug">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
