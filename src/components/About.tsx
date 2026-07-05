"use client";

import Image from "next/image";
import Magnetic from "./Magnetic";
import { Award, Code2, Cpu, Zap } from "lucide-react";

const STATS = [
  { icon: Award, value: "4+", label: "Years Experience" },
  { icon: Code2, value: "25+", label: "Projects Completed" },
  { icon: Zap, value: "85%", label: "Query Optimization" },
  { icon: Cpu, value: "99.9%", label: "System Uptime" },
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
              Architecting solid <span className="text-gradient">backends</span>{" & "}elegant APIs
            </h2>
            
            <div className="mt-6 space-y-4 text-fg-muted text-base leading-relaxed sm:text-lg">
              <p>
                I am a dedicated Full-Stack Web Developer with a strong specialization in backend
                engineering. My primary toolkit consists of Laravel, PHP, and MySQL/PostgreSQL. I focus
                on building applications that are not just functional, but highly optimized, secure,
                and scalable.
              </p>
              <p>
                Whether it is designing complex database schemas, integrating third-party services,
                writing RESTful APIs, or optimizing SQL queries for milliseconds of performance, I
                approach every task with a focus on code quality and clean architecture.
              </p>
            </div>

            {/* Stats grid */}
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="relative overflow-hidden rounded-2xl border border-border bg-bg-card/40 p-5 backdrop-blur-sm glow-hover"
                >
                  {/* Subtle top indicator bar */}
                  <span className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />
                  
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-neon-violet" />
                    <span className="font-mono text-xs uppercase tracking-wider text-fg-dim">
                      {label.split(" ")[0]}
                    </span>
                  </div>
                  <div className="mt-3 font-mono text-3xl font-bold tracking-tight text-fg">
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
