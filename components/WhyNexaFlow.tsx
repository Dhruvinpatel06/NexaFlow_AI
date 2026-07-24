'use client';

import { Check, X, ShieldAlert, Zap, Sparkles, TrendingUp, Clock, Bot } from 'lucide-react';

const COMPARISON = [
  { feature: 'Workflow Setup Time', legacy: 'Weeks of manual engineering & script maintenance', nexa: 'Instant AI prompt generation in under 60 seconds' },
  { feature: 'Error Handling', legacy: 'Fragile API breaks require engineer on-call alerts', nexa: 'Autonomous self-healing retry logic & fallback routing' },
  { feature: 'Scaling Capacity', legacy: 'Rate-limited by rigid polling scripts & worker pools', nexa: 'Infinite parallel V8 thread execution on edge nodes' },
  { feature: 'Operational Cost', legacy: '$100K+/year in custom middleware maintenance', nexa: '90% cost reduction with dynamic pay-as-you-go' },
  { feature: 'Enterprise Security', legacy: 'Dispersed secrets in environment variables', nexa: 'Vault-secured OAuth 2.0 & SOC 2 Type II certified' },
];

export default function WhyNexaFlow() {
  return (
    <section id="why" aria-label="Why NexaFlow" className="py-24 px-6 relative overflow-hidden bg-[#030712]">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(168,85,247,0.08),transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-[rgba(168,85,247,0.3)] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#A855F7]" />
            <span className="text-[11px] font-mono font-bold text-[#A855F7] uppercase tracking-wider">
              THE NEXT GENERATION
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white font-mono tracking-tight mb-4">
            Why Teams Choose <span className="gradient-text-violet">NexaFlow AI</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Traditional automation tools require constant maintenance. NexaFlow AI learns, adapts, and executes autonomously.
          </p>
        </div>

        {/* Comparison Table Grid */}
        <div className="glass-card rounded-2xl border border-[rgba(168,85,247,0.25)] overflow-hidden shadow-2xl">
          {/* Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 bg-slate-950/80 p-6 border-b border-slate-800 text-xs font-mono font-bold uppercase tracking-wider">
            <div className="md:col-span-4 text-slate-400">CAPABILITY</div>
            <div className="md:col-span-4 text-slate-500 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-slate-500" /> LEGACY AUTOMATION
            </div>
            <div className="md:col-span-4 text-[#00F0FF] flex items-center gap-2">
              <Bot className="w-4 h-4 text-[#00F0FF]" /> NEXAFLOW AI AGENTS
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="divide-y divide-slate-800/60">
            {COMPARISON.map((row, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 p-6 items-center gap-4 hover:bg-slate-900/40 transition-colors">
                <div className="md:col-span-4 font-mono text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
                  {row.feature}
                </div>
                <div className="md:col-span-4 text-xs text-slate-400 flex items-start gap-2 pr-4">
                  <X className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span>{row.legacy}</span>
                </div>
                <div className="md:col-span-4 text-xs font-medium text-slate-200 bg-[rgba(0,240,255,0.05)] border border-[rgba(0,240,255,0.2)] p-3 rounded-xl flex items-start gap-2.5 shadow-[0_0_15px_rgba(0,240,255,0.08)]">
                  <Check className="w-4 h-4 text-[#00F0FF] flex-shrink-0 mt-0.5" />
                  <span>{row.nexa}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
