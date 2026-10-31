import React, { useState } from 'react';
import { CORE_SKILLS, SkillItem } from '../data/portfolioData';
import { Code2, Layers, Database, Cpu, Globe2, Server, Zap, BarChart3, ChevronRight, Terminal } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface SkillsSectionProps {
  onSelectSkill: (skill: SkillItem) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onSelectSkill }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Complete Matrix' },
    { id: 'backend', label: 'Python & ORM' },
    { id: 'frontend', label: 'OWL Framework' },
    { id: 'database', label: 'PostgreSQL' },
    { id: 'core', label: 'ERP Core Modules' },
    { id: 'devops', label: 'Odoo.sh & CI/CD' },
  ];

  const filteredSkills = activeCategory === 'all'
    ? CORE_SKILLS
    : CORE_SKILLS.filter(s => s.category === activeCategory);

  const getIcon = (name: string) => {
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
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-rose-950/60 pb-8">
        <div>
          <div className="text-xs font-mono-code uppercase tracking-widest text-amber-400 mb-2">
            Technical Competencies & Systems Engineering
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Odoo Technical Architecture
          </h2>
          <div className="text-sm text-stone-300 mt-2 max-w-xl">
            Specialized engineering across all architectural layers of Odoo: from raw PostgreSQL query execution plans to reactive OWL client components.
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#1b0610] border border-rose-950/60">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClick();
                setActiveCategory(cat.id);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-stone-100 hover:bg-rose-950/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            onClick={() => {
              sound.playClick();
              onSelectSkill(skill);
            }}
            className="group cursor-pointer rounded-2xl bg-gradient-to-b from-[#1e0713] to-[#16040e] border border-rose-900/40 hover:border-amber-400/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-950/40 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-rose-950/70 border border-rose-900/50 group-hover:scale-110 transition-transform">
                  {getIcon(skill.iconName)}
                </div>
                <div className="text-[11px] font-mono-code text-amber-400 font-semibold px-2 py-0.5 rounded bg-rose-950/50 border border-rose-900/40">
                  {skill.level}
                </div>
              </div>

              <h3 className="text-base font-bold text-stone-100 group-hover:text-amber-300 transition-colors mb-2 font-display">
                {skill.name}
              </h3>

              <p className="text-xs text-stone-300 leading-relaxed mb-4">
                {skill.description}
              </p>
            </div>

            <div className="pt-3 border-t border-rose-950/60">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {skill.tags.slice(0, 2).map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] text-stone-400 font-mono-code"
                  >
                    {tag} {i === 0 ? '·' : ''}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-stone-400 group-hover:text-amber-300 transition-colors">
                <span className="font-mono-code text-[11px]">Inspect Architecture</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust & Architecture Banner */}
      <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#240817] via-[#1a0510] to-[#240817] border border-rose-900/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 shrink-0">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-100 font-display">
              Enterprise Upgrade & Migration Readiness
            </h4>
            <div className="text-xs text-stone-400 mt-0.5">
              Experienced in upgrading bespoke custom modules across breaking Odoo API shifts (e.g., Odoo 14 -&gt; 16 -&gt; 17 -&gt; 18 OWL transitions).
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono-code text-stone-300 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Zero-Downtime DB Upgrades</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Odoo.sh & Self-Hosted</span>
          </div>
        </div>
      </div>
    </section>
  );
};
