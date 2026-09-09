"use client";

import { useState } from "react";
import { Mail, MessageSquare, Send, Check } from "lucide-react";
import { Github, Linkedin, Facebook, Instagram } from "./SocialIcons";
import Magnetic from "./Magnetic";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [handoffStage, setHandoffStage] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setHandoffStage(1);

    // Stage 1 -> 2
    setTimeout(() => {
      setHandoffStage(2);
    }, 600);

    // Stage 2 -> 3
    setTimeout(() => {
      setHandoffStage(3);
    }, 1200);

    // Stage 3 -> 4
    setTimeout(() => {
      setHandoffStage(4);
    }, 1900);

    // Send and finish
    setTimeout(async () => {
      try {
        const res = await fetch("/api/v1/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setStatus("success");
          setFormData({ name: "", email: "", subject: "", message: "" });
        } else {
          setStatus("error");
        }
      } catch (err) {
        setStatus("error");
      }
    }, 2500);
  };

  return (
    <footer id="contact" className="relative pt-24 pb-12 overflow-hidden bg-bg">
      {/* Background neon glows */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.06),transparent_60%)] blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(0,255,242,0.06),transparent_60%)] blur-2xl" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16 2xl:px-20">
        <div className="grid grid-cols-1 gap-12 lg:gap-16 lg:grid-cols-12 lg:items-start">
          
          {/* Info Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between reveal space-y-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan font-semibold">
                // 05. Get In Touch
              </p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl text-fg leading-tight">
                Let&apos;s build <span className="text-gradient">something epic</span> together
              </h2>
              <p className="mt-6 text-base text-fg-muted leading-relaxed sm:text-lg">
                I am currently open to full-time backend/full-stack opportunities, enterprise engineering roles, or consulting contracts. Whether you have a project to build or want to chat about Laravel &amp; MySQL database optimization, drop a message.
              </p>

              {/* Contact info card */}
              <div className="mt-8 space-y-4">
                <a
                  href="mailto:shakhawat.sakib9@gmail.com"
                  className="flex items-center gap-4 rounded-2xl border border-border bg-bg-card p-4.5 hover:border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.1)] transition-all group w-full sm:w-auto"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-bg border border-border text-neon-cyan group-hover:scale-105 transition-transform">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-fg-dim font-medium">
                      Direct Email
                    </span>
                    <span className="block text-sm font-semibold text-fg group-hover:text-neon-cyan transition-colors">
                      shakhawat.sakib9@gmail.com
                    </span>
                  </div>
                </a>

                <a
                  href="tel:+8801753431206"
                  className="flex items-center gap-4 rounded-2xl border border-border bg-bg-card p-4.5 hover:border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.1)] transition-all group w-full sm:w-auto"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-bg border border-border text-neon-cyan group-hover:scale-105 transition-transform">
                    <span className="font-mono text-xs font-bold">BD</span>
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-fg-dim font-medium">
                      Phone &amp; Location
                    </span>
                    <span className="block text-sm font-semibold text-fg group-hover:text-neon-cyan transition-colors">
                      +880 1753-431206 | Mirpur-1, Dhaka
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Social Links for footer context */}
            <div>
              <span className="block font-mono text-[11px] uppercase tracking-widest text-fg-dim mb-4 font-semibold">
                Find me on
              </span>
              <div className="flex items-center gap-3.5">
                {[
                  { icon: Github, href: "https://github.com/ShakhawatSakib9", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/md-shakhawathossain-0a8ba0352", label: "LinkedIn" },
                  { icon: Facebook, href: "https://www.facebook.com/md.shakhawat.hossain.987218/", label: "Facebook" },
                  { icon: Instagram, href: "https://www.instagram.com/shakhawat_sa_kib/?hl=en", label: "Instagram" },
                ].map(({ icon: Icon, href, label }) => (
                  <Magnetic key={label} strength={0.4}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-card/80 text-fg-muted transition-all hover:border-neon-cyan hover:text-neon-cyan hover:shadow-[0_0_15px_rgba(14,165,233,0.2)] hover:scale-105"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>
          </div>

          {/* Form Panel (7 cols) */}
          <div className="lg:col-span-7 reveal">
            <div className="rounded-3xl border border-border bg-bg-card p-8 sm:p-10 backdrop-blur-md shadow-2xl">
              {status === "success" ? (
                <div className="space-y-4 font-mono text-center py-8 animate-fade-in">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <Check className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-emerald-400 font-bold text-xs uppercase block tracking-wider">
                      ✓ HANDSHAKE SUCCESSFULLY ESTABLISHED
                    </span>
                    <p className="text-[11px] text-fg-muted leading-relaxed px-4">
                      "A strong system starts with a clear conversation. Handshake established — ready to build."
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 text-[10px] text-neon-cyan border border-neon-cyan/40 px-4 py-1.5 rounded-lg hover:bg-neon-cyan/5 transition-all uppercase tracking-wider font-bold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : status === "sending" ? (
                <div className="space-y-4 font-mono text-xs text-neon-cyan p-4 border border-neon-cyan/20 bg-bg-soft rounded-2xl animate-fade-in leading-relaxed">
                  <div className="flex justify-between items-center border-b border-neon-cyan/15 pb-2">
                    <span className="font-bold text-[10px] tracking-wider uppercase">[ HANDOFF PROTOCOL ACTIVE ]</span>
                    <span className="animate-pulse">● PROCESSING</span>
                  </div>
                  <div className="space-y-2">
                    <div>&gt; INITIATING HANDOFF PROTOCOL ROUTER...</div>
                    {handoffStage >= 1 && <div className="text-neon-cyan font-light">&gt; [STAGE 1/4] REQUEST RECEIVED - Handshake request buffered.</div>}
                    {handoffStage >= 2 && <div className="text-neon-cyan font-light">&gt; [STAGE 2/4] VALIDATING INPUTS - CSRF tokens and message syntax checking.</div>}
                    {handoffStage >= 3 && <div className="text-neon-cyan font-light">&gt; [STAGE 3/4] ESTABLISHING COLLABORATION CHANNEL - Connecting mail services socket.</div>}
                    {handoffStage >= 4 && <div className="text-emerald-400 font-bold">&gt; [STAGE 4/4] HANDSHAKE COMPLETE - Secure communication initialized.</div>}
                  </div>
                  <div className="pt-2 flex items-center justify-between text-[10px] text-fg-dim">
                    <span>Target Route: POST /api/v1/contact</span>
                    <span>Status: Pending</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="font-mono text-xs text-fg-dim uppercase tracking-wider font-semibold">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-border bg-bg-soft/80 p-4 font-mono text-sm text-fg outline-none transition-all focus:border-neon-cyan/80 focus:bg-bg focus:ring-2 focus:ring-neon-cyan/20"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="font-mono text-xs text-fg-dim uppercase tracking-wider font-semibold">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-border bg-bg-soft/80 p-4 font-mono text-sm text-fg outline-none transition-all focus:border-neon-cyan/80 focus:bg-bg focus:ring-2 focus:ring-neon-cyan/20"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="font-mono text-xs text-fg-dim uppercase tracking-wider font-semibold">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-xl border border-border bg-bg-soft/80 p-4 font-mono text-sm text-fg outline-none transition-all focus:border-neon-cyan/80 focus:bg-bg focus:ring-2 focus:ring-neon-cyan/20"
                      placeholder="Project Inquiry"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="font-mono text-xs text-fg-dim uppercase tracking-wider font-semibold">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-border bg-bg-soft/80 p-4 font-mono text-sm text-fg outline-none transition-all focus:border-neon-cyan/80 focus:bg-bg focus:ring-2 focus:ring-neon-cyan/20 resize-none leading-relaxed"
                      placeholder="Hello Shakhawat, let's collaborate on..."
                    />
                  </div>

                  <Magnetic strength={0.2}>
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-2.5 rounded-full bg-neon-cyan px-8 py-4 font-mono text-xs uppercase tracking-widest text-slate-950 font-bold transition-all hover:shadow-[0_0_25px_var(--neon-cyan)] hover:scale-105 active:scale-95"
                    >
                      Send Message
                      <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </Magnetic>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer bottom meta info */}
        <div className="mt-20 pt-8 border-t border-border/60 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-12 sm:pb-16">
          <div className="font-mono text-[10px] text-fg-dim uppercase tracking-wider">
            &copy; {new Date().getFullYear()} Md. Shakhawat Hossain. All rights reserved.
          </div>
          <div className="font-mono text-[10px] text-fg-dim flex flex-wrap gap-x-2 gap-y-1">
            <span>DESIGNED &amp; ENGINEERED BY SAKIB</span>
            <span>·</span>
            <span>NEXT.JS</span>
            <span>·</span>
            <span>LARAVEL</span>
            <span>·</span>
            <span className="text-neon-cyan font-bold">[DEMO BUILD METADATA: HASH-4b7e9f]</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
