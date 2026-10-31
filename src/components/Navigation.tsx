import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface NavigationProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onReplayIntro: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  soundEnabled,
  onToggleSound,
  onReplayIntro,
  activeSection,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#120409]/85 border-b border-rose-950/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('hero');
          }}
          className="text-lg font-bold tracking-tight text-stone-100 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 group font-display"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-rose-600 to-amber-400 group-hover:scale-125 transition-transform" />
          <span>ZUHAIB HASSAN</span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-300">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('hero');
            }}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 ${
              activeSection === 'hero' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Motion Reel
            {activeSection === 'hero' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNavigate('skills');
            }}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 ${
              activeSection === 'skills' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Technical Skills
            {activeSection === 'skills' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNavigate('projects');
            }}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 ${
              activeSection === 'projects' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            ERP Architecture
            {activeSection === 'projects' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNavigate('codelab');
            }}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 ${
              activeSection === 'codelab' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Code Lab
            {activeSection === 'codelab' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNavigate('contact');
            }}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 ${
              activeSection === 'contact' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Contact
            {activeSection === 'contact' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: 1 primary action (plus sound & replay affordances) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleSound}
            title={soundEnabled ? "Mute audio" : "Enable cinematic sound design"}
            className="p-2 rounded-lg bg-rose-950/40 border border-rose-900/50 text-stone-300 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
            aria-label="Toggle cinematic sound"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-stone-400" />
            )}
          </button>

          <button
            onClick={onReplayIntro}
            title="Replay cinematic intro animation"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-300 bg-rose-950/30 border border-rose-900/40 rounded-lg hover:text-white hover:border-rose-700/60 transition-all whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Replay Intro
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNavigate('contact');
            }}
            className="px-4 py-2 text-xs font-semibold text-stone-900 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 rounded-lg shadow-lg shadow-amber-500/10 hover:shadow-amber-500/25 transition-all whitespace-nowrap shrink-0"
          >
            Hire / Consult
          </button>
        </div>
      </div>
    </header>
  );
};
