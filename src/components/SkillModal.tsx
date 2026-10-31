import React from 'react';
import { X, Code2, Check, ArrowRight, ShieldCheck, Database, Layers, Cpu, Globe2, Server, Zap, BarChart3 } from 'lucide-react';
import { SkillItem } from '../data/portfolioData';
import { sound } from '../utils/soundEffects';

interface SkillModalProps {
  skill: SkillItem | null;
  onClose: () => void;
  onSelectProject: (projectId: string) => void;
}

export const SkillModal: React.FC<SkillModalProps> = ({ skill, onClose, onSelectProject }) => {
  if (!skill) return null;

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Code2': return <Code2 className="w-5 h-5 text-amber-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-amber-400" />;
      case 'Database': return <Database className="w-5 h-5 text-amber-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-amber-400" />;
      case 'Globe2': return <Globe2 className="w-5 h-5 text-amber-400" />;
      case 'Server': return <Server className="w-5 h-5 text-amber-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      default: return <BarChart3 className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div
        className="relative w-full max-w-2xl bg-[#1a050f] border border-rose-800/60 rounded-2xl shadow-2xl overflow-hidden text-stone-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between p-6 border-b border-rose-900/40 bg-[#250716]/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-800/60">
              {renderIcon(skill.iconName)}
            </div>
            <div>
              <h3 className="text-xl font-bold font-display text-white">{skill.name}</h3>
              <div className="flex items-center gap-2 text-xs text-stone-400 font-mono-code mt-0.5">
                <span className="text-amber-400 font-semibold">{skill.level}</span>
                <span>·</span>
                <span className="capitalize">{skill.category} Stack</span>
                <span>·</span>
                <span>Odoo 14 — 18</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-rose-900/40 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Architecture description */}
          <div>
            <h4 className="text-xs font-mono-code uppercase tracking-wider text-amber-400 mb-2">
              Architecture & Technical Scope
            </h4>
            <p className="text-sm text-stone-300 leading-relaxed">
              {skill.description}
            </p>
          </div>

          {/* Specific competencies */}
          <div>
            <h4 className="text-xs font-mono-code uppercase tracking-wider text-amber-400 mb-2.5">
              Key Technical Invariants & Patterns
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {skill.tags.map((tag, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-[#220715] border border-rose-900/40 text-xs text-stone-200"
                >
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Applied Enterprise Implementation */}
          <div className="p-4 rounded-xl bg-[#2b081a]/50 border border-rose-800/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-stone-200">Production Experience</div>
                <div className="text-[11px] text-stone-400">Deployed across large-scale multi-company ERP environments.</div>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
                onSelectProject('multi-tier-manufacturing');
              }}
              className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-white font-semibold font-mono-code whitespace-nowrap"
            >
              <span>View Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-rose-900/40 bg-[#16040d] flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
