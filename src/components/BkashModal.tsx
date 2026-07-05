"use client";

import { useState } from "react";
import { X, ShieldAlert, CheckCircle, Loader } from "lucide-react";
import { playClick, playChime, playTick } from "@/utils/audio";

interface BkashModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BkashModal({ isOpen, onClose }: BkashModalProps) {
  const [step, setStep] = useState(1); // 1: Number input, 2: OTP, 3: PIN, 4: Executing, 5: Success
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [pin, setPin] = useState("");

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    if (step === 1) {
      if (phoneNumber.length >= 11) setStep(2);
    } else if (step === 2) {
      if (otp.length >= 4) setStep(3);
    } else if (step === 3) {
      if (pin.length >= 4) {
        setStep(4);
        setTimeout(() => {
          setStep(5);
          playChime();
          // Trigger resume download automatically
          const link = document.createElement("a");
          link.href = "/resume/Md.-Shakhawat-Hossain-R-L.pdf";
          link.download = "Md.-Shakhawat-Hossain-Resume.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, 2200);
      }
    }
  };

  const handleReset = () => {
    setStep(1);
    setPhoneNumber("");
    setOtp("");
    setPin("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      {/* Container Card */}
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-pink-500/30 bg-[#e2125d] text-white shadow-2xl">
        {/* Header Branding */}
        <div className="flex items-center justify-between bg-white px-5 py-3 text-[#e2125d]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xl font-black italic tracking-tighter">bKash</span>
            <span className="text-[10px] font-mono border border-[#e2125d]/40 px-1.5 py-0.2 rounded font-bold uppercase">
              Sandbox
            </span>
          </div>
          <button
            onClick={handleReset}
            className="rounded-full p-1 hover:bg-[#e2125d]/10 transition-colors"
          >
            <X className="h-5 w-5 text-[#e2125d]" />
          </button>
        </div>

        {/* Dynamic Step Panel */}
        <div className="p-6 text-center">
          {step <= 3 && (
            <div className="mb-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-pink-200">
                Merchant: Md. Shakhawat Hossain
              </span>
              <h3 className="text-xl font-bold mt-1">Unlock Premium CV</h3>
              <p className="text-xs text-pink-100 mt-1 font-mono">Amount: 1.00 BDT (Simulation)</p>
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-4">
              <p className="text-xs text-pink-100">Enter your bKash Account number (11 digits)</p>
              <input
                type="text"
                placeholder="e.g. 01753431206"
                value={phoneNumber}
                onChange={(e) => {
                  playTick();
                  setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 11));
                }}
                className="w-full rounded-lg border border-pink-400 bg-white/10 px-4 py-2.5 text-center font-mono text-sm tracking-widest text-white placeholder:text-pink-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                required
              />
              <button
                type="submit"
                disabled={phoneNumber.length < 11}
                className="w-full rounded-lg bg-white py-2 text-sm font-bold text-[#e2125d] shadow-lg hover:bg-pink-100 transition-colors disabled:opacity-50"
              >
                PROCEED
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNext} className="space-y-4">
              <p className="text-xs text-pink-100">Enter 6-Digit OTP verification code sent to phone</p>
              <input
                type="text"
                placeholder="e.g. 123456"
                value={otp}
                onChange={(e) => {
                  playTick();
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                }}
                className="w-full rounded-lg border border-pink-400 bg-white/10 px-4 py-2.5 text-center font-mono text-sm tracking-widest text-white placeholder:text-pink-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                required
              />
              <button
                type="submit"
                disabled={otp.length < 4}
                className="w-full rounded-lg bg-white py-2 text-sm font-bold text-[#e2125d] shadow-lg hover:bg-pink-100 transition-colors disabled:opacity-50"
              >
                VERIFY OTP
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleNext} className="space-y-4">
              <p className="text-xs text-pink-100">Enter your 5-Digit PIN code to execute checkout</p>
              <input
                type="password"
                placeholder="•••••"
                value={pin}
                onChange={(e) => {
                  playTick();
                  setPin(e.target.value.replace(/\D/g, "").slice(0, 5));
                }}
                className="w-full rounded-lg border border-pink-400 bg-white/10 px-4 py-2.5 text-center font-mono text-sm tracking-widest text-white placeholder:text-pink-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                required
              />
              <button
                type="submit"
                disabled={pin.length < 4}
                className="w-full rounded-lg bg-white py-2 text-sm font-bold text-[#e2125d] shadow-lg hover:bg-pink-100 transition-colors disabled:opacity-50"
              >
                CONFIRM PAYMENT
              </button>
            </form>
          )}

          {step === 4 && (
            <div className="py-8 flex flex-col items-center justify-center">
              <Loader className="h-10 w-10 animate-spin text-white" />
              <p className="mt-4 text-sm font-mono tracking-wider">EXECUTING PAYMENT WEBHOOK...</p>
              <span className="text-[10px] text-pink-200 mt-1 font-mono">POST /api/v1/payment/bkash-verify</span>
            </div>
          )}

          {step === 5 && (
            <div className="py-4 space-y-4">
              <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto animate-bounce" />
              <h3 className="text-xl font-bold">Payment Successful</h3>
              <p className="text-xs text-pink-100 leading-relaxed font-mono">
                TrxID: BKASH_SIM_98A41<br/>
                Verification Status: Completed<br/>
                CV Download Started automatically.
              </p>
              <button
                onClick={handleReset}
                className="w-full rounded-lg bg-white py-2 text-sm font-bold text-[#e2125d] hover:bg-pink-100 transition-colors"
              >
                CLOSE SANDBOX
              </button>
            </div>
          )}
        </div>

        {/* Footer Support Info */}
        <div className="bg-[#b10d48] px-5 py-2.5 text-center text-[9px] font-mono text-pink-200 flex items-center justify-center gap-1.5">
          <ShieldAlert className="h-3 w-3" />
          <span>This is a simulated secure bKash API testing suite.</span>
        </div>
      </div>
    </div>
  );
}
