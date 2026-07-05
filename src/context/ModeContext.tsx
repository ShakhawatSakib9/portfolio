"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Mode = "recruiter" | "engineer";

interface ModeContextType {
  mode: Mode;
  toggleMode: () => void;
  setMode: (mode: Mode) => void;
  isHackerMode: boolean;
  setHackerMode: (active: boolean) => void;
  isGlitchActive: boolean;
  triggerGlitch: () => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>("recruiter");
  const [isHackerMode, setHackerMode] = useState(false);
  const [isGlitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolioMode") as Mode;
      if (saved === "recruiter" || saved === "engineer") {
        setModeState(saved);
      }
    }
  }, []);

  // Global hotkeys handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + D -> Dev Mode
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        e.preventDefault();
        setMode("engineer");
      }
      // Ctrl + Shift + H -> HR Mode
      if (e.ctrlKey && e.shiftKey && e.key === "H") {
        e.preventDefault();
        setMode("recruiter");
      }
      // Ctrl + Shift + I -> Go to incidents
      if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
        const el = document.getElementById("work");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const setMode = (newMode: Mode) => {
    setModeState(newMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolioMode", newMode);
    }
  };

  const toggleMode = () => {
    setMode(mode === "recruiter" ? "engineer" : "recruiter");
  };

  const triggerGlitch = () => {
    if (isGlitchActive) return;
    setGlitchActive(true);
    setTimeout(() => {
      setGlitchActive(false);
    }, 3800); // 3.8s total duration for error + recovery log
  };

  return (
    <ModeContext.Provider
      value={{
        mode,
        toggleMode,
        setMode,
        isHackerMode,
        setHackerMode,
        isGlitchActive,
        triggerGlitch,
      }}
    >
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
}
