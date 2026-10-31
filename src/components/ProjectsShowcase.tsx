import React, { useState } from 'react';
import { ENTERPRISE_PROJECTS, ProjectItem } from '../data/portfolioData';
import { Layers, CheckCircle2, Code2, ExternalLink, Sparkles, Copy, Check } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface ProjectsShowcaseProps {
  onOpenCodeLab: () => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ onOpenCodeLab }) => {
  const [activeProject, setActiveProject] = useState<ProjectItem>(ENTERPRISE_PROJECTS[0]);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const handleCopyCode = (code: string) => {
    sound.playClick();
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-rose-950/60 pb-8">
        <div>
          <div className="text-xs font-mono-code uppercase tracking-widest text-amber-400 mb-2">
            Production Case Studies & Enterprise Systems
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            High-Impact ERP Architecture
          </h2>
          <div className="text-sm text-stone-300 mt-2 max-w-xl">
            Real-world implementations solving complex manufacturing, financial automation, and high-frequency retail challenges.
          </div>
        </div>

        {/* Project Selector Segmented Control */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#1b0610] border border-rose-950/60">
          {ENTERPRISE_PROJECTS.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => {
                sound.playClick();
                setActiveProject(proj);
              }}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeProject.id === proj.id
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-stone-100 hover:bg-rose-950/40'
              }`}
            >
              0{idx + 1}. {proj.subtitle.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Project Feature Card */}
      <div className="rounded-3xl bg-gradient-to-b from-[#200815] to-[#16040e] border border-rose-900/50 p-6 sm:p-8 lg:p-10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Scope, Architecture, Impact */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-3 text-xs font-mono-code text-stone-400 mb-2">
                <span className="text-amber-400 font-semibold">{activeProject.odooVersion}</span>
                <span>·</span>
                <span>{activeProject.role}</span>
                <span>·</span>
                <span>{activeProject.timeline}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight leading-snug">
                {activeProject.title}
              </h3>
              <p className="text-sm text-amber-300/90 font-mono-code mt-1">
                {activeProject.subtitle}
              </p>
            </div>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              {activeProject.description}
            </p>

            {/* Impact Metric Strip */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {activeProject.impactMetrics.map((metric, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-[#290a1a]/70 border border-rose-900/50"
                >
                  <div className="text-xl sm:text-2xl font-black font-display text-amber-400 tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-[11px] text-stone-400 font-mono-code mt-0.5">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Architecture Highlights */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs uppercase font-mono-code tracking-widest text-stone-300 font-semibold">
                Technical Solutions & Innovations
              </h4>
              <div className="space-y-2.5">
                {activeProject.architectureHighlights.map((hl, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-3">
              {activeProject.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs font-mono-code rounded-md bg-rose-950/70 border border-rose-900/40 text-stone-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Code Snippet / Technical Inspector */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full bg-[#14030a] rounded-2xl border border-rose-950/80 p-5 font-mono-code text-xs">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-rose-950/70">
                <div className="flex items-center gap-2 text-stone-300">
                  <Code2 className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold text-[11px] truncate">
                    {activeProject.codeSample?.filename || 'Module Architecture'}
                  </span>
                </div>

                {activeProject.codeSample && (
                  <button
                    onClick={() => handleCopyCode(activeProject.codeSample!.code)}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] rounded bg-rose-950/60 hover:bg-rose-900/60 border border-rose-900/40 text-stone-300 hover:text-white transition-colors"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
              </div>

              {activeProject.codeSample ? (
                <pre className="overflow-x-auto text-[11px] leading-relaxed text-stone-300 p-2 max-h-[360px] select-all">
                  <code>{activeProject.codeSample.code}</code>
                </pre>
              ) : (
                <div className="py-12 text-center text-stone-500">
                  <p>Client NDA Protected Module Architecture.</p>
                  <p className="text-[11px] text-stone-400 mt-2">See open-source prototypes in the Interactive Code Lab.</p>
                </div>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-rose-950/70 flex items-center justify-between">
              <span className="text-[11px] text-stone-400">
                Live interactive code workbench available
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenCodeLab();
                }}
                className="flex items-center gap-1 text-xs text-amber-300 hover:text-amber-200 font-semibold"
              >
                <span>Open Code Lab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
