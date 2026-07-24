'use client';

import { useState } from 'react';
import { Play, CheckCircle2, Loader2, Sparkles, Terminal, ArrowRight, Database, MessageSquare, Zap, Check } from 'lucide-react';

const PRESET_PROMPTS = [
  "Automate HubSpot Lead Intake → Send Slack Notification → Update Notion DB",
  "Extract Monthly Revenue Data → Generate Executive Brief → Email CFO",
  "Monitor AWS Infrastructure → Detect Anomalies → Auto-Scale Clusters",
];

interface ExecutionStep {
  id: number;
  label: string;
  detail: string;
  status: 'idle' | 'running' | 'completed';
  latency: string;
}

export default function InteractiveAIDemo() {
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
  const [customPrompt, setCustomPrompt] = useState(PRESET_PROMPTS[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [steps, setSteps] = useState<ExecutionStep[]>([
    { id: 1, label: 'Parse & Synthesize Intent', detail: 'LLM Agent parsed workflow criteria into DAG structure', status: 'idle', latency: '12ms' },
    { id: 2, label: 'Authenticate OAuth Connectors', detail: 'Secured handshake with HubSpot, Slack, & Notion API endpoints', status: 'idle', latency: '18ms' },
    { id: 3, label: 'Execute Parallel Pipelines', detail: 'Processed 1,420 record mutations with zero data loss', status: 'idle', latency: '34ms' },
    { id: 4, label: 'Verification & State Commit', detail: 'State synchronized across all connected enterprise nodes', status: 'idle', latency: '8ms' },
  ]);

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(0);

    // Reset steps
    setSteps((prev) => prev.map((s) => ({ ...s, status: 'idle' })));

    let current = 0;
    const interval = setInterval(() => {
      if (current < 4) {
        setSteps((prev) =>
          prev.map((s, idx) => {
            if (idx < current) return { ...s, status: 'completed' };
            if (idx === current) return { ...s, status: 'running' };
            return s;
          })
        );
        setActiveStep(current);
        current++;
      } else {
        setSteps((prev) => prev.map((s) => ({ ...s, status: 'completed' })));
        setIsRunning(false);
        setActiveStep(4);
        clearInterval(interval);
      }
    }, 700);
  };

  return (
    <section id="demo" aria-label="Interactive AI Demo" className="py-24 px-6 relative overflow-hidden bg-[#030712]">
      {/* Background Glow Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[rgba(0,240,255,0.06)] to-[rgba(168,85,247,0.06)] blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Eyebrow & Section Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-[rgba(0,240,255,0.3)] mb-4">
            <Sparkles className="w-4 h-4 text-[#00F0FF] animate-pulse" />
            <span className="text-xs font-mono font-semibold text-[#00F0FF] tracking-widest uppercase">
              LIVE INTERACTIVE PLAYGROUND
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white font-mono tracking-tight mb-4">
            Experience <span className="gradient-text-cyan">Autonomous AI</span> In Action
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Test prompt execution in real time. Watch NexaFlow agents construct, authenticate, and execute multi-system pipelines in milliseconds.
          </p>
        </div>

        {/* Demo Interface Panel */}
        <div className="glass-card rounded-2xl border border-[rgba(0,240,255,0.2)] p-6 md:p-8 shadow-2xl relative overflow-hidden">
          {/* Preset Prompts Pills */}
          <div className="mb-6">
            <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
              SELECT OR ENTER A WORKFLOW PROMPT:
            </label>
            <div className="flex flex-wrap gap-2.5">
              {PRESET_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedPromptIndex(idx);
                    setCustomPrompt(prompt);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 text-left border ${
                    selectedPromptIndex === idx
                      ? 'bg-[rgba(0,240,255,0.15)] border-[#00F0FF] text-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.25)]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Bar Input */}
          <div className="relative flex items-center mb-8">
            <div className="absolute left-4 text-[#00F0FF]">
              <Terminal className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="w-full bg-slate-950/80 border border-[rgba(0,240,255,0.25)] rounded-xl py-4 pl-12 pr-36 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] shadow-inner"
              placeholder="Describe your workflow..."
            />
            <button
              onClick={runSimulation}
              disabled={isRunning}
              className="absolute right-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#00F0FF] to-[#00B8D4] text-[#030712] font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#030712]" />
                  Executing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-[#030712]" />
                  Run Agent
                </>
              )}
            </button>
          </div>

          {/* Execution Pipeline Visual Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Steps Timeline Column */}
            <div className="lg:col-span-7 space-y-3">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#00F0FF]" /> LIVE EXECUTION TRACE
              </h4>

              {steps.map((step, idx) => {
                const isCurrent = activeStep === idx && isRunning;
                const isDone = step.status === 'completed';
                return (
                  <div
                    key={step.id}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      isDone
                        ? 'bg-[rgba(16,185,129,0.06)] border-[rgba(16,185,129,0.3)]'
                        : isCurrent
                        ? 'bg-[rgba(0,240,255,0.1)] border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                        : 'bg-slate-900/40 border-slate-800 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-3">
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                        ) : isCurrent ? (
                          <Loader2 className="w-5 h-5 text-[#00F0FF] animate-spin" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px] font-mono text-slate-500">
                            0{step.id}
                          </div>
                        )}
                        <span className={`font-mono text-sm font-bold ${isDone ? 'text-white' : isCurrent ? 'text-[#00F0FF]' : 'text-slate-400'}`}>
                          {step.label}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {step.latency}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 pl-8 font-sans">{step.detail}</p>
                  </div>
                );
              })}
            </div>

            {/* Output Stream Node Column */}
            <div className="lg:col-span-5 bg-slate-950/90 rounded-xl p-5 border border-slate-800 font-mono text-xs text-slate-300 flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <span className="text-[#00F0FF] font-bold tracking-wider text-[11px] flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5" /> STREAMING AGENT STATE
                  </span>
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[rgba(16,185,129,0.15)] text-[#10B981] text-[10px] font-bold border border-[rgba(16,185,129,0.3)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" /> ACTIVE
                  </span>
                </div>

                <div className="space-y-2 text-slate-400 text-[11px] leading-relaxed">
                  <p><span className="text-[#A855F7]">&gt; agent_id:</span> &quot;nexa_v4_prod_99&quot;</p>
                  <p><span className="text-[#A855F7]">&gt; target_pipeline:</span> &quot;HubSpot -&gt; Slack -&gt; Notion&quot;</p>
                  <p><span className="text-[#A855F7]">&gt; execution_status:</span> {isRunning ? <span className="text-[#00F0FF] animate-pulse">&quot;RUNNING&quot;</span> : activeStep === 4 ? <span className="text-[#10B981]">&quot;COMPLETED (0.072s)&quot;</span> : <span className="text-slate-500">&quot;IDLE&quot;</span>}</p>
                  <p><span className="text-[#A855F7]">&gt; memory_allocated:</span> &quot;128MB isolated V8 thread&quot;</p>
                  
                  {activeStep === 4 && (
                    <div className="mt-4 p-3 rounded bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.3)] text-[#10B981]">
                      ✓ Pipeline executed successfully. 1,420 records synchronized.
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                <span>NexaFlow AI Runtime v4.2.0</span>
                <span>Latency: 72ms SLA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
