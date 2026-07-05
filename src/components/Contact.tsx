"use client";

import { useState } from "react";
import { Mail, MessageSquare, Send, Check } from "lucide-react";
import { Github, Linkedin, Facebook, Instagram } from "./SocialIcons";
import Magnetic from "./Magnetic";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Simulating form submission (connected to Server Actions or Formspree later)
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <footer id="contact" className="relative pt-24 pb-12 overflow-hidden bg-bg">
      {/* Background neon glows */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.06),transparent_60%)] blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(0,255,242,0.06),transparent_60%)] blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          
          {/* Info Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between reveal">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">// 05. Get In Touch</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl text-fg">
                Let&apos;s build <span className="text-gradient">something epic</span> together
              </h2>
              <p className="mt-6 text-base text-fg-muted leading-relaxed sm:text-lg">
                I am currently open to full-time remote backend/full-stack opportunities or consulting contracts. Whether you have a project to build or just want to chat about Laravel database performance, drop a message.
              </p>

              {/* Contact info card */}
              <div className="mt-8 space-y-4">
                <a
                  href="mailto:shakhawat.sakib9@gmail.com"
                  className="flex items-center gap-4 rounded-2xl border border-border bg-bg-card/40 p-4 hover:border-neon-cyan/40 transition-colors w-fit"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg border border-border-glow text-neon-cyan">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-fg-dim">
                      Direct Email
                    </span>
                    <span className="block text-sm font-semibold text-fg">
                      shakhawat.sakib9@gmail.com
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-4 rounded-2xl border border-border bg-bg-card/40 p-4 w-fit">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg border border-border-glow text-neon-violet">
                    <span className="font-mono text-xs font-bold">BD</span>
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-fg-dim">
                      Phone &amp; Location
                    </span>
                    <span className="block text-sm font-semibold text-fg">
                      +880 1753-431206 | Mirpur-1, Dhaka
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links for footer context */}
            <div className="mt-12 lg:mt-0">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-fg-dim mb-4">
                Find me on
              </span>
              <div className="flex items-center gap-4">
                {[
                  { icon: Github, href: "https://github.com/ShakhawatSakib9", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/md-shakhawat-hossain-0a8ba0352/", label: "LinkedIn" },
                  { icon: Facebook, href: "https://www.facebook.com/md.shakhawat.hossain.987218/", label: "Facebook" },
                  { icon: Instagram, href: "https://www.instagram.com/shakhawat_sa_kib/?hl=en", label: "Instagram" },
                ].map(({ icon: Icon, href, label }) => (
                  <Magnetic key={label} strength={0.4}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-neon-cyan hover:text-neon-cyan"
                    >
                      <Icon className="h-5.5 w-5.5" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>
          </div>

          {/* Form Panel (7 cols) */}
          <div className="lg:col-span-7 reveal">
            <div className="rounded-3xl border border-border bg-bg-card/40 p-8 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="font-mono text-xs text-fg-dim uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-border bg-bg/40 p-4 font-mono text-sm text-fg outline-none transition-all focus:border-neon-cyan/70 focus:ring-1 focus:ring-neon-cyan/20"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="font-mono text-xs text-fg-dim uppercase tracking-wider">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-border bg-bg/40 p-4 font-mono text-sm text-fg outline-none transition-all focus:border-neon-cyan/70 focus:ring-1 focus:ring-neon-cyan/20"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="font-mono text-xs text-fg-dim uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-xl border border-border bg-bg/40 p-4 font-mono text-sm text-fg outline-none transition-all focus:border-neon-cyan/70 focus:ring-1 focus:ring-neon-cyan/20"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="font-mono text-xs text-fg-dim uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-border bg-bg/40 p-4 font-mono text-sm text-fg outline-none transition-all focus:border-neon-cyan/70 focus:ring-1 focus:ring-neon-cyan/20 resize-none"
                    placeholder="Hello Shakhawat, let's collaborate on..."
                  />
                </div>

                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    disabled={status === "sending" || status === "success"}
                    className="group inline-flex items-center gap-2 rounded-full bg-neon-cyan px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-black transition-shadow hover:shadow-[0_0_20px_var(--neon-cyan)] disabled:opacity-50"
                  >
                    {status === "sending" ? (
                      <>
                        Sending...
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                      </>
                    ) : status === "success" ? (
                      <>
                        Message Sent
                        <Check className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </Magnetic>
              </form>
            </div>
          </div>
        </div>

        {/* Footer bottom meta info */}
        <div className="mt-20 pt-8 border-t border-border/60 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-mono text-[10px] text-fg-dim uppercase tracking-wider">
            &copy; {new Date().getFullYear()} Md. Shakhawat Hossain. All rights reserved.
          </div>
          <div className="font-mono text-[10px] text-fg-dim">
            Designed &amp; Developed with <span className="text-neon-pink">♥</span> using Next.js &amp; Tailwind CSS
          </div>
        </div>

      </div>
    </footer>
  );
}
