'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Zap, Lock } from 'lucide-react';

const FAQS = [
  {
    q: 'How does NexaFlow AI connect with our existing tools?',
    a: 'NexaFlow AI provides 200+ pre-built OAuth 2.0 connectors for tools like HubSpot, Salesforce, Slack, Notion, Jira, PostgreSQL, and AWS. You can also connect any custom REST or GraphQL API by pasting your OpenAPI specification.',
  },
  {
    q: 'Is our data secure and GDPR / SOC 2 compliant?',
    a: 'Yes. All data processing occurs inside isolated ephemeral execution threads with Zero-Knowledge encryption. We are SOC 2 Type II and GDPR compliant, and your proprietary data is never used for foundation model training.',
  },
  {
    q: 'What happens if a third-party API goes down or rate limits?',
    a: 'NexaFlow agents feature autonomous self-healing execution loops. If an upstream API returns 429 or 503, the agent automatically applies exponential backoff, switches to alternate mirrors, or alerts your designated fallback channel.',
  },
  {
    q: 'Can non-technical team members build AI workflows?',
    a: 'Absolutely. Non-technical users can describe workflows in plain natural language (e.g. "When a new lead arrives in HubSpot, send a Slack message and create a Notion task"). Engineers can also use our TypeScript SDK for custom agent code.',
  },
  {
    q: 'What are the execution latency SLAs?',
    a: 'Our edge runtime processes event triggers in under 15 milliseconds average latency, with a guaranteed 99.98% uptime SLA on Pro and Enterprise tiers.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" aria-label="Frequently Asked Questions" className="py-24 px-6 relative overflow-hidden bg-[#070D1B]">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[350px] bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(0,240,255,0.06),transparent)] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-[rgba(0,240,255,0.3)] mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="text-[11px] font-mono font-bold text-[#00F0FF] uppercase tracking-wider">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white font-mono tracking-tight mb-4">
            Everything You Need <span className="gradient-text-cyan">To Know</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Got questions about security, setup, or pricing? We&apos;ve got answers.
          </p>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`glass-card rounded-2xl transition-all duration-300 border overflow-hidden ${
                  isOpen
                    ? 'border-[#00F0FF] bg-[rgba(0,240,255,0.04)] shadow-[0_0_25px_rgba(0,240,255,0.15)]'
                    : 'border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-mono font-bold text-base text-white"
                >
                  <span className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]' : 'bg-slate-700'}`} />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#00F0FF] transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-sm font-sans text-slate-300 leading-relaxed border-t border-[rgba(0,240,255,0.1)] mt-2">
                    <p className="pt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
