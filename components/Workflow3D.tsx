'use client';

import { useState } from 'react';
import { Cpu, ArrowRight, Layers, ShieldCheck, Zap, Server, Sliders, PlayCircle } from 'lucide-react';

export default function Workflow3D() {
  const [activeTab, setActiveTab] = useState<'input' | 'core' | 'output'>('core');

  return (
    <section id="workflow" aria-label="3D Workflow Visualization" className="py-24 px-6 relative overflow-hidden bg-[#070D1B]">
      {/* Aurora mesh background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(0,240,255,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#00F0FF] uppercase mb-2 block">
            VISUAL PIPELINE ENGINE
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white font-mono tracking-tight mb-4">
            Next-Gen <span className="gradient-text-aurora">Workflow Orchestration</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Build, test, and scale autonomous multi-agent pipelines with zero infrastructure overhead.
          </p>
        </div>

        {/* 3D Visual Graph Layout */}
        <div className="glass-card rounded-2xl border border-[rgba(0,240,255,0.2)] p-8 relative overflow-hidden shadow-2xl">
          {/* Interactive Node Selector Pills */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab('input')}
              className={`px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all border ${
                activeTab === 'input'
                  ? 'bg-[rgba(0,240,255,0.15)] border-[#00F0FF] text-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.25)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              1. Event Triggers & Data Streams
            </button>
            <button
              onClick={() => setActiveTab('core')}
              className={`px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all border ${
                activeTab === 'core'
                  ? 'bg-[rgba(168,85,247,0.15)] border-[#A855F7] text-[#A855F7] shadow-[0_0_20px_rgba(168,85,247,0.25)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              2. Autonomous AI Core
            </button>
            <button
              onClick={() => setActiveTab('output')}
              className={`px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all border ${
                activeTab === 'output'
                  ? 'bg-[rgba(16,185,129,0.15)] border-[#10B981] text-[#10B981] shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              3. Automated Actions & Analytics
            </button>
          </div>

          {/* 3D Animated Pipeline Graphics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center py-6 relative">
            {/* Input Node Card */}
            <div
              className={`p-6 rounded-xl border transition-all duration-500 cursor-pointer ${
                activeTab === 'input'
                  ? 'bg-[rgba(0,240,255,0.1)] border-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.25)] scale-105'
                  : 'bg-slate-900/50 border-slate-800 opacity-75 hover:opacity-100'
              }`}
              onClick={() => setActiveTab('input')}
            >
              <div className="w-12 h-12 rounded-xl bg-[rgba(0,240,255,0.15)] border border-[#00F0FF] flex items-center justify-center text-[#00F0FF] mb-4">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-mono font-bold text-white mb-2">Ingestion Layer</h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Connect Webhooks, Kafka Streams, PostgreSQL CDC, or REST APIs. Data is normalized instantaneously.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-[#00F0FF]">
                <span>200+ Connectors</span>
                <span>Latency &lt; 5ms</span>
              </div>
            </div>

            {/* Neural Processing Core Node (Central Highlight) */}
            <div
              className={`p-8 rounded-2xl border transition-all duration-500 cursor-pointer text-center relative ${
                activeTab === 'core'
                  ? 'bg-[rgba(168,85,247,0.12)] border-[#A855F7] shadow-[0_0_40px_rgba(168,85,247,0.35)] scale-110'
                  : 'bg-slate-900/60 border-slate-800 opacity-75 hover:opacity-100'
              }`}
              onClick={() => setActiveTab('core')}
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#A855F7] to-[#00F0FF] p-0.5 shadow-[0_0_30px_rgba(168,85,247,0.5)] mb-4 animate-pulse">
                <div className="w-full h-full bg-[#070D1B] rounded-full flex items-center justify-center text-[#A855F7]">
                  <Cpu className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-2xl font-mono font-bold text-white mb-2">AI Neural Core</h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Autonomous reasoning, sub-agent spawning, dynamic prompt routing, and self-healing error correction.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(168,85,247,0.2)] text-[#A855F7] border border-[#A855F7] text-[11px] font-mono font-bold">
                <Zap className="w-3.5 h-3.5" /> 99.98% Accuracy
              </div>
            </div>

            {/* Output Node Card */}
            <div
              className={`p-6 rounded-xl border transition-all duration-500 cursor-pointer ${
                activeTab === 'output'
                  ? 'bg-[rgba(16,185,129,0.1)] border-[#10B981] shadow-[0_0_30px_rgba(16,185,129,0.25)] scale-105'
                  : 'bg-slate-900/50 border-slate-800 opacity-75 hover:opacity-100'
              }`}
              onClick={() => setActiveTab('output')}
            >
              <div className="w-12 h-12 rounded-xl bg-[rgba(16,185,129,0.15)] border border-[#10B981] flex items-center justify-center text-[#10B981] mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-mono font-bold text-white mb-2">Execution & Delivery</h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Trigger Slack alerts, mutate CRM records, compile PDF reports, or dispatch custom HTTP requests.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-[#10B981]">
                <span>SOC 2 Type II</span>
                <span>Sub-second Dispatch</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
