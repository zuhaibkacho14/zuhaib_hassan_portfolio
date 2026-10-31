import React from 'react';
import { ZUHAIB_PROFILE } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-rose-950/60 bg-[#0e0307] py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-stone-400 font-mono-code">
        <div className="flex items-center gap-3">
          <span className="font-bold text-stone-200 font-display text-sm tracking-tight">
            {ZUHAIB_PROFILE.name}
          </span>
          <span className="text-stone-600">·</span>
          <span>{ZUHAIB_PROFILE.role}</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={`mailto:${ZUHAIB_PROFILE.email}`}
            className="hover:text-amber-400 transition-colors"
          >
            {ZUHAIB_PROFILE.email}
          </a>
          <span className="text-stone-600">·</span>
          <span>Odoo 14 — 18 Enterprise</span>
        </div>

        <div className="text-stone-500">
          © {new Date().getFullYear()} Zuhaib Hassan. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
