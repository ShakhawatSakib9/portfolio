"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Mode = "recruiter" | "engineer";

interface ModeContextType {
  mode: Mode;
  toggleMode: () => void;
  setMode: (mode: Mode) => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>("recruiter");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolioMode") as Mode;
      if (saved === "recruiter" || saved === "engineer") {
        setModeState(saved);
      }
    }
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

  return (
    <ModeContext.Provider value={{ mode, toggleMode, setMode }}>
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
