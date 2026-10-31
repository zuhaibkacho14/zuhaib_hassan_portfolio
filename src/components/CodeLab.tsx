import React, { useState } from 'react';
import { CODE_PLAYGROUND } from '../data/portfolioData';
import { Terminal, Copy, Check, Play, CheckCircle2, FileCode, Sparkles } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export const CodeLab: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [isRunningCheck, setIsRunningCheck] = useState<boolean>(false);
  const [lintStatus, setLintStatus] = useState<string | null>(null);

  const activeSnippet = CODE_PLAYGROUND[selectedIndex];

  const handleCopy = () => {
    sound.playClick();
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunLint = () => {
    sound.playClick();
    setIsRunningCheck(true);
    setLintStatus(null);

    setTimeout(() => {
      setIsRunningCheck(false);
      setLintStatus('All Odoo Invariants Passed: Zero N+1 Queries · Strict ACL Scopes Verified · Type Hints Sound');
      sound.playChime(880, 0.2);
    }, 700);
  };

  return (
    <section id="codelab" className="py-24 px-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-rose-950/60 pb-8">
        <div>
          <div className="text-xs font-mono-code uppercase tracking-widest text-amber-400 mb-2">
            Engineering Rigor & Idiomatic Patterns
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Interactive Odoo Code Lab
          </h2>
          <div className="text-sm text-stone-300 mt-2 max-w-xl">
            Examine idiomatic production code samples designed for high performance, transaction safety, and clean OWL reactivity.
          </div>
        </div>

        {/* Action button */}
        <button
          onClick={handleRunLint}
          disabled={isRunningCheck}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800/60 text-stone-200 hover:text-white text-xs font-semibold font-mono-code transition-all shadow-md shrink-0 disabled:opacity-50"
        >
          <Play className={`w-3.5 h-3.5 text-amber-400 ${isRunningCheck ? 'animate-spin' : ''}`} />
          <span>{isRunningCheck ? 'Verifying Architecture...' : 'Analyze Architecture'}</span>
        </button>
      </div>

      {/* Code Editor Frame */}
      <div className="rounded-3xl bg-[#14030a] border border-rose-900/50 overflow-hidden shadow-2xl">
        {/* Editor Top Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 border-b border-rose-950/80 bg-[#1b0610]/80">
          <div className="flex flex-wrap items-center gap-1.5">
            {CODE_PLAYGROUND.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  sound.playClick();
                  setSelectedIndex(idx);
                  setLintStatus(null);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono-code rounded-lg transition-colors ${
                  selectedIndex === idx
                    ? 'bg-[#290a1a] text-amber-400 border border-rose-800/60 font-semibold'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-rose-950/40'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-rose-400" />
                <span className="truncate max-w-[200px] sm:max-w-none">{item.title.split(' ')[0]} {item.title.split(' ')[1]}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-code rounded-lg bg-rose-950/40 hover:bg-rose-900/50 border border-rose-900/40 text-stone-300 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Snippet Context Bar */}
        <div className="px-6 py-3 bg-[#1e0713]/60 border-b border-rose-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div>
            <span className="font-semibold text-stone-200">{activeSnippet.title}</span>
            <span className="hidden sm:inline text-stone-500 mx-2">·</span>
            <span className="text-stone-400 text-[11px] block sm:inline">{activeSnippet.description}</span>
          </div>
          <span className="text-[11px] font-mono-code text-amber-400/90 capitalize shrink-0">
            {activeSnippet.language}
          </span>
        </div>

        {/* Code Content */}
        <div className="p-6 overflow-x-auto font-mono-code text-xs sm:text-[13px] leading-relaxed text-stone-200 max-h-[500px]">
          <pre className="select-all">
            <code>{activeSnippet.code}</code>
          </pre>
        </div>

        {/* Lint feedback message if triggered */}
        {lintStatus && (
          <div className="p-4 bg-emerald-950/30 border-t border-emerald-800/40 flex items-center gap-3 text-xs text-emerald-300 font-mono-code">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{lintStatus}</span>
          </div>
        )}
      </div>
    </section>
  );
};
