"use client";

import Image from "next/image";
import { Layers, Database, Code2, ShieldCheck, MapPin, GraduationCap, Building2, CheckCircle2 } from "lucide-react";

const PILLARS = [
  {
    icon: Layers,
    title: "Enterprise Architecture",
    description: "Scalable MVC patterns, clean OOP structure, and complex multi-role workflows.",
    tags: ["MVC", "Clean OOP", "Modular"],
  },
  {
    icon: Database,
    title: "Database & Query Tuning",
    description: "Relational schema design, MySQL indexing, and server-side performance optimization.",
    tags: ["MySQL", "Indexing", "Query Opt"],
  },
  {
    icon: Code2,
    title: "RESTful API Systems",
    description: "Robust JSON contracts, Postman integration testing, and backend-frontend sync.",
    tags: ["REST APIs", "JSON", "Postman"],
  },
  {
    icon: ShieldCheck,
    title: "Security & RBAC",
    description: "Granular role-based access control, secure authentication, and bug fixing.",
    tags: ["RBAC", "Sanctum", "Validation"],
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 lg:py-28 overflow-hidden bg-bg">
      {/* Background ambient water-blue glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.09),transparent_70%)] blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 sm:px-10 lg:px-16 2xl:px-20">
        <div className="grid grid-cols-1 gap-12 lg:gap-16 2xl:gap-20 lg:grid-cols-12 lg:items-center">
          
          {/* Profile Image Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start reveal">
            <div className="relative group max-w-[390px] sm:max-w-[430px] 2xl:max-w-[450px] w-full">
              
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-tr from-neon-cyan/30 via-sky-500/20 to-transparent blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Main Card Container */}
              <div className="relative w-full rounded-[2.2rem] border border-border bg-bg-card/90 shadow-2xl p-5 backdrop-blur-md overflow-hidden transition-transform duration-500 group-hover:scale-[1.01]">
                
                {/* Top Terminal Bar */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/70">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono text-[10px] sm:text-xs text-fg-muted tracking-wider">
                      DEV-IDENTITY // MSH-09
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/25">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan" />
                    </span>
                    <span className="font-mono text-[10px] font-bold text-neon-cyan tracking-wider">
                      IISBD
                    </span>
                  </div>
                </div>

                {/* Portrait Canvas with Tech Background */}
                <div className="relative w-full aspect-[4/4.8] rounded-2xl overflow-hidden bg-gradient-to-b from-neon-cyan/10 via-bg-card to-bg border border-border/80 flex items-center justify-center">
                  
                  {/* Subtle Grid Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e90a_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e90a_1px,transparent_1px)] bg-[size:24px_24px]" />
                  
                  {/* Glowing Radial Core */}
                  <div className="absolute h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.22),transparent_70%)] blur-2xl" />

                  {/* Concentric Cyber Accent Rings */}
                  <div className="absolute h-72 w-72 rounded-full border border-neon-cyan/20 animate-[spin_40s_linear_infinite]" />
                  <div className="absolute h-56 w-56 rounded-full border border-dashed border-neon-cyan/25 animate-[spin_25s_linear_infinite_reverse]" />

                  {/* High-Res Cutout Image */}
                  <div className="relative z-10 h-full w-full flex items-end justify-center">
                    <Image
                      src="/img/avatar-suit.png"
                      alt="Md. Shakhawat Hossain — Software Developer at IISBD"
                      fill
                      sizes="(max-width: 768px) 100vw, 450px"
                      className="object-contain object-bottom drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                  </div>

                  {/* Floating Skill Badges over portrait */}
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neon-cyan/35 bg-bg/85 backdrop-blur-md shadow-lg">
                    <span className="text-neon-cyan text-xs font-bold font-mono">⚡ Laravel</span>
                  </div>

                  <div className="absolute top-12 left-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-bg/85 backdrop-blur-md shadow-lg">
                    <span className="font-mono text-xs font-semibold text-fg">🐬 MySQL &amp; APIs</span>
                  </div>
                </div>

                {/* Bottom Identity Block */}
                <div className="mt-4 pt-3 border-t border-border/70 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-mono text-sm font-bold text-fg">Md. Shakhawat Hossain</h4>
                      <CheckCircle2 className="h-3.5 w-3.5 text-neon-cyan" />
                    </div>
                    <p className="text-xs text-fg-muted mt-0.5">
                      Software Developer (Full-Stack)
                    </p>
                  </div>
                  <span className="font-mono text-[11px] px-2.5 py-1 rounded-lg bg-bg border border-border font-semibold text-neon-cyan">
                    1.5+ Yrs Exp
                  </span>
                </div>

              </div>

              {/* Quick Info Meta Badges below Card */}
              <div className="mt-4 grid grid-cols-3 gap-1.5 sm:gap-2 w-full">
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-xl border border-border/80 bg-bg-card/60 backdrop-blur-sm text-center">
                  <Building2 className="h-3.5 w-3.5 text-neon-cyan shrink-0" />
                  <span className="font-mono text-[10px] sm:text-[11px] text-fg font-medium truncate">IISBD</span>
                </div>
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-xl border border-border/80 bg-bg-card/60 backdrop-blur-sm text-center">
                  <GraduationCap className="h-3.5 w-3.5 text-neon-cyan shrink-0" />
                  <span className="font-mono text-[10px] sm:text-[11px] text-fg font-medium truncate">DIU 3.40</span>
                </div>
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-xl border border-border/80 bg-bg-card/60 backdrop-blur-sm text-center">
                  <MapPin className="h-3.5 w-3.5 text-neon-cyan shrink-0" />
                  <span className="font-mono text-[10px] sm:text-[11px] text-fg font-medium truncate">Dhaka, BD</span>
                </div>
              </div>

            </div>
          </div>

          {/* Biography Column (7 cols) */}
          <div className="lg:col-span-7 reveal">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan font-semibold">
              // 01. About Me · Professional Background
            </p>
            
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-fg leading-[1.2]">
              Software Developer at{" "}
              <span className="text-gradient">IISBD</span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-medium text-fg-muted mt-1.5">
                <span className="text-neon-cyan font-light mr-2">&amp;</span>
                Full-Stack Laravel Engineer
              </span>
            </h2>
            
            <div className="mt-6 space-y-4 text-fg-muted text-base leading-relaxed sm:text-lg">
              <p>
                I am a professional Full-Stack Web Developer (Laravel-focused) currently engineering production-level web applications at{" "}
                <strong className="text-fg font-semibold">Innovation and Information System Limited (IISBD)</strong> in Dhaka, Bangladesh. Holding a B.Sc. in CSE from{" "}
                <strong className="text-fg font-semibold">Daffodil International University (CGPA 3.40)</strong> and currently pursuing a Master&apos;s in CSE at{" "}
                <strong className="text-fg font-semibold">Jahangirnagar University (JU)</strong>, I combine solid computer science fundamentals with hands-on enterprise software craftsmanship.
              </p>
              <p>
                My core strength lies in building robust backends with <strong className="text-fg font-medium">Laravel &amp; PHP (OOP)</strong>, architecting relational schemas in <strong className="text-fg font-medium">MySQL</strong>, optimizing complex queries, and engineering secure <strong className="text-fg font-medium">RESTful APIs</strong>. Having delivered mission-critical systems across <span className="text-fg">Construction MIS, E-Learning (LMS), Restaurant POS, and E-Commerce</span>, I focus on clean code, role-based access security, and reliable performance.
              </p>
            </div>

            {/* 4 Core Engineering Pillars */}
            <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PILLARS.map(({ icon: Icon, title, description, tags }) => (
                <div
                  key={title}
                  className="relative overflow-hidden rounded-2xl border border-border bg-bg-card/80 p-4 sm:p-5 backdrop-blur-sm glow-hover transition-all duration-300 group hover:-translate-y-0.5"
                >
                  <span className="absolute top-0 left-4 right-4 h-[1.5px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
                  
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30 group-hover:scale-105 transition-transform">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="font-mono text-sm font-bold text-fg leading-tight">
                      {title}
                    </h3>
                  </div>
                  
                  <p className="mt-2.5 text-xs text-fg-muted leading-relaxed">
                    {description}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-border/50 flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-bg border border-border/80 text-fg-muted font-medium"
                      >
                        {tag}
                      </span>
                    ))}
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
