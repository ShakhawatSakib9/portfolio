"use client";

import { useEffect, useState, useRef } from "react";
import { Terminal, Search, ArrowRight, HelpCircle, Code, Volume2, VolumeX, Download, Eye } from "lucide-react";
import { playClick, playChime, playTick, toggleSound, isSoundEnabled } from "@/utils/audio";
import { useMode } from "@/context/ModeContext";

interface Command {
  id: string;
  category: "Navigation" | "Developer" | "Actions";
  name: string;
  description: string;
  shortcut?: string;
  icon: any;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);
  const { isHackerMode, setHackerMode } = useMode();

  useEffect(() => {
    // Sync sound state from localStorage
    setMuted(!isSoundEnabled());

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => {
          const next = !prev;
          if (next) playChime();
          return next;
        });
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const runCommand = (command: Command) => {
    playChime();
    command.action();
    setIsOpen(false);
    setSearch("");
  };

  const handleToggleSound = () => {
    const nextMute = !muted;
    setMuted(nextMute);
    toggleSound(!nextMute);
    if (!nextMute) {
      setTimeout(() => playChime(), 100);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const commands: Command[] = [
    {
      id: "go-hero",
      category: "Navigation",
      name: "Go to Home / Hero",
      description: "Scroll to top home core scene",
      shortcut: "G H",
      icon: Eye,
      action: () => scrollToSection("hero"),
    },
    {
      id: "go-about",
      category: "Navigation",
      name: "Go to About Me",
      description: "Scroll to biography & stats section",
      shortcut: "G A",
      icon: Eye,
      action: () => scrollToSection("about"),
    },
    {
      id: "go-skills",
      category: "Navigation",
      name: "Go to Technical Skills",
      description: "Scroll to neon cursor tracking skills card grid",
      shortcut: "G S",
      icon: Eye,
      action: () => scrollToSection("skills"),
    },
    {
      id: "go-work",
      category: "Navigation",
      name: "Go to Case Studies",
      description: "Scroll to 5 enterprise Laravel portfolio projects",
      shortcut: "G W",
      icon: Eye,
      action: () => scrollToSection("work"),
    },
    {
      id: "go-contact",
      category: "Navigation",
      name: "Go to Contact Form",
      description: "Scroll to live email submission panel",
      shortcut: "G C",
      icon: Eye,
      action: () => scrollToSection("contact"),
    },
    {
      id: "run-status",
      category: "Developer",
      name: "Run API Status Check",
      description: "Trigger GET request for server system diagnostics",
      shortcut: "C S",
      icon: Code,
      action: () => {
        scrollToSection("api-playground");
        const btn = document.querySelector("#api-playground button") as HTMLButtonElement;
        if (btn) btn.click();
      },
    },
    {
      id: "artisan-inspire",
      category: "Developer",
      name: "php artisan inspire",
      description: "Run Laravel Artisan inspiration generator",
      shortcut: "P A I",
      icon: Code,
      action: () => {
        alert("Laravel Artisan Inspire:\n\n\"Complexity is easy; simplicity is hard. Good architecture is about making hard things look simple.\"");
      },
    },
    {
      id: "artisan-hire",
      category: "Developer",
      name: "php artisan hire:me",
      description: "Jump to direct hire and contact portal",
      shortcut: "P A H",
      icon: Code,
      action: () => scrollToSection("contact"),
    },
    {
      id: "tinker-users",
      category: "Developer",
      name: "User::count()",
      description: "Tinker simulation: fetch live active visitor count",
      shortcut: "U C",
      icon: Code,
      action: () => {
        alert(`Laravel Tinker Response:\n\n>>> User::count()\n=> ${Math.floor(Math.random() * 4) + 3} active live connections via Laravel Reverb.`);
      },
    },
    {
      id: "download-cv",
      category: "Actions",
      name: "Download Resume PDF",
      description: "Open and download the professional software developer CV",
      shortcut: "D C",
      icon: Download,
      action: () => {
        window.open("/resume/Md.-Shakhawat-Hossain-R-L.pdf", "_blank");
      },
    },
    {
      id: "toggle-mute",
      category: "Actions",
      name: muted ? "Unmute Sci-Fi Clicks" : "Mute Sound Effects",
      description: muted ? "Enable synthesized Web Audio clicks & chime sounds" : "Disable interface keyboard hums",
      shortcut: "S M",
      icon: muted ? Volume2 : VolumeX,
      action: handleToggleSound,
    },
  ];

  const filtered = commands.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleNavigationKeys = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      playTick();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      playTick();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cleanSearch = search.trim().toLowerCase();
      if (cleanSearch === "sudo su" || cleanSearch === "root" || cleanSearch === "hacker" || cleanSearch === "matrix") {
        setHackerMode(!isHackerMode);
        playChime();
        setIsOpen(false);
        setSearch("");
        return;
      }
      if (filtered[selectedIndex]) {
        runCommand(filtered[selectedIndex]);
      }
    }
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          setIsOpen(true);
          playChime();
        }}
        data-cursor-label="[ CLI TERMINAL ]"
        className="fixed bottom-6 right-24 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-neon-cyan/40 bg-bg/80 text-neon-cyan shadow-[0_0_15px_rgba(0,255,242,0.2)] transition-all hover:scale-110 hover:border-neon-cyan hover:shadow-[0_0_25px_var(--neon-cyan)]"
        title="Open Command Palette (Ctrl + K)"
      >
        <Terminal className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/70 backdrop-blur-md">
      {/* Backdrop close */}
      <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

      {/* Main glass panel */}
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-neon-cyan/50 bg-bg-card/90 p-4 shadow-[0_0_50px_rgba(0,255,242,0.15)] backdrop-blur-2xl"
        onKeyDown={handleNavigationKeys}
      >
        {/* Search header */}
        <div className="relative flex items-center border-b border-border/80 pb-3">
          <Search className="absolute left-3 h-5 w-5 text-fg-dim" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent pl-11 pr-4 font-mono text-sm tracking-wide text-fg placeholder:text-fg-dim focus:outline-none"
          />
          <span className="rounded bg-bg px-2 py-0.5 font-mono text-[9px] text-fg-dim border border-border">
            ESC
          </span>
        </div>

        {/* Command list */}
        <div ref={listRef} className="mt-4 max-h-[300px] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <HelpCircle className="h-8 w-8 text-fg-dim animate-pulse" />
              <p className="mt-2 font-mono text-xs text-fg-dim">No matching commands found.</p>
            </div>
          ) : (
            filtered.map((cmd, idx) => {
              const isSelected = selectedIndex === idx;
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={() => runCommand(cmd)}
                  onMouseEnter={() => {
                    playTick();
                    setSelectedIndex(idx);
                  }}
                  className={`w-full text-left flex items-center justify-between p-3 rounded-xl transition-all font-mono ${
                    isSelected
                      ? "bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan"
                      : "border border-transparent text-fg-muted hover:text-fg"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${isSelected ? "text-neon-cyan" : "text-neon-violet"}`} />
                    <div>
                      <span className="block text-xs font-semibold">{cmd.name}</span>
                      <span className="block text-[10px] text-fg-dim mt-0.5">{cmd.description}</span>
                    </div>
                  </div>

                  {cmd.shortcut && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded border ${
                      isSelected ? "border-neon-cyan/40 bg-neon-cyan/5 text-neon-cyan" : "border-border bg-bg text-fg-dim"
                    }`}>
                      {cmd.shortcut}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="mt-4 border-t border-border/80 pt-3 flex items-center justify-between font-mono text-[9px] text-fg-dim">
          <div className="flex gap-4">
            <span>↑↓ to navigate</span>
            <span>ENTER to select</span>
          </div>
          <button
            onClick={handleToggleSound}
            className="flex items-center gap-1 hover:text-neon-cyan transition-colors"
          >
            {muted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
            <span>{muted ? "SOUND OFF" : "SOUND ON"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
