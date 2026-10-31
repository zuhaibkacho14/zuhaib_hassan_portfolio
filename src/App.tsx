/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { CinematicHero } from './components/CinematicHero';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { CodeLab } from './components/CodeLab';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SkillModal } from './components/SkillModal';
import { SkillItem } from './data/portfolioData';
import { sound } from './utils/soundEffects';

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [activeNav, setActiveNav] = useState<string>('hero');
  const [heroKey, setHeroKey] = useState<number>(0);

  const handleToggleSound = () => {
    const newState = sound.toggleSound();
    setSoundEnabled(newState);
  };

  const handleReplayIntro = () => {
    setHeroKey(prev => prev + 1);
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = (sectionId: string) => {
    setActiveNav(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#120409] text-stone-100 flex flex-col font-body selection:bg-rose-900 selection:text-white">
      {/* Top Bar Navigation */}
      <Navigation
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onReplayIntro={handleReplayIntro}
        activeSection={activeNav}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col">
        {/* Cinematic Motion Hero */}
        <section id="hero" className="w-full">
          <CinematicHero
            key={heroKey}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            onSelectSkill={(skill) => setSelectedSkill(skill)}
            onExploreMore={() => handleNavigate('projects')}
          />
        </section>

        {/* Technical Skills Section */}
        <SkillsSection
          onSelectSkill={(skill) => setSelectedSkill(skill)}
        />

        {/* Enterprise ERP Projects Showcase */}
        <ProjectsShowcase
          onOpenCodeLab={() => handleNavigate('codelab')}
        />

        {/* Interactive Odoo Code Lab */}
        <CodeLab />

        {/* Contact & Consultation Inquiries */}
        <ContactSection />
      </main>

      {/* Clean Editorial Footer */}
      <Footer />

      {/* Interactive Technical Skill Inspector Modal */}
      <SkillModal
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
        onSelectProject={() => handleNavigate('projects')}
      />
    </div>
  );
}
