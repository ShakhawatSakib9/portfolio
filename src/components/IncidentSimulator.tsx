"use client";

import { useState } from "react";
import { Terminal, ShieldAlert, CheckCircle2, AlertTriangle, Play, Check } from "lucide-react";
import { playClick, playChime, playTick } from "@/utils/audio";
import ChaosLab from "./ChaosLab";

interface Incident {
  id: string;
  title: string;
  system: string;
  description: string;
  logs: string[];
  options: { key: string; text: string; correct: boolean }[];
  solution: string;
}

const INCIDENTS: Incident[] = [
  {
    id: "n-plus-one",
    title: "ERP dashboard taking 12 seconds to load",
    system: "Construction Operations ERP",
    description: "Recruiters and admins report that loading the Comparative Statement (CS) print dashboard takes up to 12s when active site contractor lists are retrieved.",
    logs: [
      "[INFO] Route GET /bPack/sub-contractor-price-list",
      "[QUERY] SELECT * FROM `sub_contractor_agreement` WHERE `id` = 1 (0.8ms)",
      "[QUERY] SELECT * FROM `ct_projects` WHERE `id` = 4 (0.6ms)",
      "[QUERY] SELECT * FROM `ct_sub_contractor` WHERE `id` = 12 (0.9ms)",
      "[QUERY] SELECT * FROM `ct_projects` WHERE `id` = 5 (0.5ms)",
      "[QUERY] SELECT * FROM `ct_sub_contractor` WHERE `id` = 13 (0.7ms)",
      "... [98 identical queries omitted for brevity] ...",
      "[INFO] Execution completed in 12.04 seconds."
    ],
    options: [
      { key: "A", text: "Database index is broken on 'ct_projects' primary key", correct: false },
      { key: "B", text: "An N+1 query loop is executing sub-relations (Project, Subcontractor) inside a foreach loop without Eager Loading", correct: true },
      { key: "C", text: "Server CPU is bottlenecked due to complex PHP regex processing", correct: false }
    ],
    solution: "We refactored raw Eloquent iterations inside SubContractorContractPriceController.php into optimized MySQL subqueries and used Laravel's eager loading ('with(['project', 'subContractor'])'), collapsing 100+ separate DB queries into a single transaction query. Response time fell to 1.8s."
  },
  {
    id: "bkash-webhook",
    title: "bKash checkout succeeded but course enrollment missing",
    system: "Eduvess LMS",
    description: "A student purchased a course via bKash. The money was deducted, but the student was not enrolled. bKash webhook reported a success status code.",
    logs: [
      "[INFO] POST /api/v1/payment/bkash-verify",
      "[INFO] Verifying tokenized signature... [PASSED]",
      "[INFO] Executing payment status: Completed",
      "[ERROR] SQLSTATE[23000]: Integrity constraint violation: 1452 Cannot add or update a child row: a foreign key constraint fails (`eduvess`.`enrollments`, CONSTRAINT `user_id_foreign` FOREIGN KEY (`user_id`))",
      "[WARNING] Transaction rolled back. Verification response sent with 500 error."
    ],
    options: [
      { key: "A", text: "The bKash webhook IP was blocked by the firewall", correct: false },
      { key: "B", text: "The webhook execution failed to wrap student creation and payment status updates inside an ACID database transaction, leaving state mismatched", correct: false },
      { key: "C", text: "The payment verified successfully but the webhook was executed under a guest session context where 'user_id' was null or missing in the DB insertion", correct: true }
    ],
    solution: "We refactored the webhook handler in BkashTokenizePaymentController.php to use strict payload validation, verified active authenticated sessions before executing database insertions, and wrapped the complete enrollment allocation in a database transaction block."
  },
  {
    id: "stock-race",
    title: "Duplicate inventory deduction on concurrent checkouts",
    system: "Restaurant POS",
    description: "Two cashiers clicked 'Checkout' simultaneously for different tables ordering the same recipe items, causing ingredient stock quantities to double-deduct incorrectly below zero.",
    logs: [
      "[THREAD 1] POS Checkout processing... current stock = 5",
      "[THREAD 2] POS Checkout processing... current stock = 5",
      "[THREAD 1] Decrementing stock by 4 (New stock = 1)",
      "[THREAD 2] Decrementing stock by 4 (New stock = -3 [CRITICAL OUT OF STOCK])",
      "[WARNING] DB state inconsistency detected on item 'Beef Burger Patty'"
    ],
    options: [
      { key: "A", text: "Use client-side CSS to disable buttons on first click", correct: false },
      { key: "B", text: "Implement database transactions with pessimistic lock ('sharedLock()' / 'lockForUpdate()') to serialize concurrent stock decrements", correct: true },
      { key: "C", text: "Increase database pooling size to bypass threading issues", correct: false }
    ],
    solution: "We solved this race condition by utilizing MySQL's pessimistic write locks ('sharedLock' / 'lockForUpdate') on the inventory record during transactions, ensuring that Thread 2 blocks until Thread 1 completes its transaction and releases the lock."
  }
];

export default function IncidentSimulator() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [activeTab, setActiveTab] = useState<"incidents" | "chaos">("incidents");

  const activeIncident = INCIDENTS[selectedIdx];

  const handleSelectOption = (key: string, correct: boolean) => {
    if (showSolution) return;
    playClick();
    setUserChoice(key);
    setIsCorrect(correct);
    if (correct) {
      playChime();
    }
  };

  const handleNextIncident = () => {
    playClick();
    setSelectedIdx((prev) => (prev + 1) % INCIDENTS.length);
    setUserChoice(null);
    setIsCorrect(null);
    setShowSolution(false);
  };

  return (
    <section className="py-20 bg-bg relative overflow-hidden border-t border-border/80">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(139,92,246,0.04),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-neon-violet">
            // INTERACTIVE DEBUG MISSION
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            Production <span className="text-gradient">Incident Simulator</span>
          </h2>
          <p className="mt-3 text-sm text-fg-muted">
            Step into the shoes of a lead developer. Choose a real production-inspired server error, diagnose the logs, and select the correct architectural fix.
          </p>
        </div>

        {/* Tab Selectors */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => {
              playClick();
              setActiveTab("incidents");
            }}
            className={`px-4 py-2 rounded-full font-mono text-xs border transition-all ${
              activeTab === "incidents"
                ? "border-neon-violet bg-neon-violet/10 text-neon-violet shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                : "border-border/60 bg-bg/40 text-fg-dim hover:border-fg"
            }`}
          >
            [ DEBUG INCIDENTS ]
          </button>
          <button
            onClick={() => {
              playClick();
              setActiveTab("chaos");
            }}
            className={`px-4 py-2 rounded-full font-mono text-xs border transition-all ${
              activeTab === "chaos"
                ? "border-neon-cyan bg-neon-cyan/10 text-neon-cyan shadow-[0_0_12px_rgba(0,255,242,0.15)]"
                : "border-border/60 bg-bg/40 text-fg-dim hover:border-fg"
            }`}
          >
            [ CHAOS RESILIENCE LAB ]
          </button>
        </div>

        {activeTab === "incidents" ? (
          /* Mission Desk */
          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* List of Incidents (4 cols) */}
            <div className="md:col-span-4 space-y-3">
              {INCIDENTS.map((inc, idx) => (
                <button
                  key={inc.id}
                  onClick={() => {
                    playClick();
                    setSelectedIdx(idx);
                    setUserChoice(null);
                    setIsCorrect(null);
                    setShowSolution(false);
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedIdx === idx
                      ? "border-neon-violet/50 bg-bg-card/80 text-neon-violet shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                      : "border-border/60 bg-bg-card/20 hover:border-border hover:bg-bg-card/40 text-fg-muted"
                  }`}
                >
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-fg-dim">
                    {inc.system}
                  </span>
                  <span className="block text-xs font-semibold mt-1 text-fg">{inc.title}</span>
                </button>
              ))}
            </div>

            {/* Console Interface (8 cols) */}
            <div className="md:col-span-8">
              <div className="rounded-2xl border border-border/80 bg-bg-card/60 overflow-hidden shadow-2xl backdrop-blur-md">
                {/* Console Tab Header */}
                <div className="bg-bg/80 border-b border-border/80 px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-neon-violet" />
                    <span className="font-mono text-xs text-fg font-semibold">Incident: {activeIncident.id}.log</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                  </div>
                </div>

                {/* Console Body */}
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-neon-violet tracking-wider">
                      [System Environment Report]
                    </span>
                    <p className="text-xs text-fg-muted leading-relaxed mt-1">
                      {activeIncident.description}
                    </p>
                  </div>

                  {/* Server Logs Output */}
                  <div className="rounded-xl bg-[#090b11] p-4 font-mono text-[10px] space-y-1.5 border border-border/60 max-h-[160px] overflow-y-auto">
                    {activeIncident.logs.map((log, i) => (
                      <div
                        key={i}
                        className={
                          log.startsWith("[ERROR]")
                            ? "text-red-400"
                            : log.startsWith("[WARNING]")
                            ? "text-yellow-400"
                            : log.startsWith("[QUERY]")
                            ? "text-neon-cyan"
                            : "text-slate-400"
                        }
                      >
                        {log}
                      </div>
                    ))}
                  </div>

                  {/* Diagnosis Multiple Choice */}
                  <div className="space-y-3">
                    <span className="font-mono text-[10px] uppercase text-fg-dim block">
                      Choose Your Diagnosis:
                    </span>
                    <div className="space-y-2">
                      {activeIncident.options.map((opt) => {
                        const isSelected = userChoice === opt.key;
                        return (
                          <button
                            key={opt.key}
                            onClick={() => handleSelectOption(opt.key, opt.correct)}
                            disabled={showSolution}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs font-mono transition-all flex items-start gap-3 ${
                              isSelected
                                ? opt.correct
                                  ? "border-emerald-500/50 bg-emerald-500/5 text-emerald-400"
                                  : "border-red-500/50 bg-red-500/5 text-red-400"
                                : "border-border/60 bg-bg/40 hover:border-border hover:bg-bg/60 text-fg-muted"
                            }`}
                          >
                            <span className={`h-5 w-5 rounded border flex items-center justify-center font-bold shrink-0 ${
                              isSelected
                                ? opt.correct
                                  ? "border-emerald-400 bg-emerald-500/20"
                                  : "border-red-400 bg-red-500/20"
                                : "border-border bg-bg"
                            }`}>
                              {opt.key}
                            </span>
                            <span>{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Result Message & Solution Link */}
                  {userChoice && (
                    <div className="border-t border-border/60 pt-5 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                            <span className="text-xs font-semibold text-emerald-400 font-mono">
                              Diagnosis Correct! Press button below to view code architecture.
                            </span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="h-5 w-5 text-red-400" />
                            <span className="text-xs font-semibold text-red-400 font-mono">
                              Incorrect diagnosis. Re-analyze trace logs.
                            </span>
                          </>
                        )}
                      </div>

                      {isCorrect && (
                        <button
                          onClick={() => {
                            playClick();
                            setShowSolution(true);
                          }}
                          className="rounded-lg bg-neon-violet px-4 py-2 font-mono text-[10px] font-bold text-white shadow-lg hover:bg-neon-violet/80 transition-colors"
                        >
                          VIEW CODE FIX
                        </button>
                      )}
                    </div>
                  )}

                  {/* Solution Drawer */}
                  {showSolution && (
                    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 animate-fade-in">
                      <span className="font-mono text-[10px] uppercase text-emerald-700 dark:text-emerald-400 font-bold block">
                        [Production Solution Implemented]
                      </span>
                      <p className="text-xs text-fg-muted leading-relaxed mt-2 font-mono">
                        {activeIncident.solution}
                      </p>
                      <button
                        onClick={handleNextIncident}
                        className="mt-4 flex items-center gap-1 text-[10px] font-mono text-neon-cyan hover:text-white transition-colors"
                      >
                        Load Next Incident <Play className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-12 max-w-4xl mx-auto animate-fade-in">
            <ChaosLab />
          </div>
        )}
      </div>
    </section>
  );
}
