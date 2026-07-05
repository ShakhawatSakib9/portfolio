"use client";

let audioCtx: AudioContext | null = null;
let soundEnabled = false;
let currentPan = 0.0; // range: -1.0 (left) to 1.0 (right)

export function toggleSound(enabled: boolean) {
  soundEnabled = enabled;
  if (typeof window !== "undefined") {
    localStorage.setItem("soundEnabled", enabled ? "true" : "false");
  }
}

export function isSoundEnabled() {
  if (typeof window !== "undefined") {
    if (audioCtx === null) {
      soundEnabled = localStorage.getItem("soundEnabled") === "true";
    }
  }
  return soundEnabled;
}

export function updateAudioPan(panValue: number) {
  currentPan = Math.max(-1.0, Math.min(1.0, panValue));
}

function getAudioContext() {
  if (!audioCtx && typeof window !== "undefined") {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

export function playTick() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const panner = ctx.createStereoPanner();

  osc.type = "sine";
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.05);

  gain.gain.setValueAtTime(0.015, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
  panner.pan.setValueAtTime(currentPan, ctx.currentTime);

  osc.connect(gain);
  gain.connect(panner);
  panner.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.05);
}

export function playClick() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const panner = ctx.createStereoPanner();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);

  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
  panner.pan.setValueAtTime(currentPan, ctx.currentTime);

  osc.connect(gain);
  gain.connect(panner);
  panner.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.12);
}

export function playChime() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  // Note 1
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  const panner1 = ctx.createStereoPanner();
  osc1.type = "sine";
  osc1.frequency.setValueAtTime(523.25, now); // C5
  gain1.gain.setValueAtTime(0.05, now);
  gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
  panner1.pan.setValueAtTime(currentPan, now);
  osc1.connect(gain1);
  gain1.connect(panner1);
  panner1.connect(ctx.destination);
  osc1.start(now);
  osc1.stop(now + 0.3);

  // Note 2
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  const panner2 = ctx.createStereoPanner();
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(659.25, now + 0.08); // E5
  gain2.gain.setValueAtTime(0.05, now + 0.08);
  gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);
  panner2.pan.setValueAtTime(currentPan, now + 0.08);
  osc2.connect(gain2);
  gain2.connect(panner2);
  panner2.connect(ctx.destination);
  osc2.start(now + 0.08);
  osc2.stop(now + 0.38);

  // Note 3
  const osc3 = ctx.createOscillator();
  const gain3 = ctx.createGain();
  const panner3 = ctx.createStereoPanner();
  osc3.type = "sine";
  osc3.frequency.setValueAtTime(783.99, now + 0.16); // G5
  gain3.gain.setValueAtTime(0.07, now + 0.16);
  gain3.gain.exponentialRampToValueAtTime(0.0001, now + 0.46);
  panner3.pan.setValueAtTime(currentPan, now + 0.16);
  osc3.connect(gain3);
  gain3.connect(panner3);
  panner3.connect(ctx.destination);
  osc3.start(now + 0.16);
  osc3.stop(now + 0.46);
}
