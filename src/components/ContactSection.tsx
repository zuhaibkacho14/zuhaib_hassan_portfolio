import React, { useState } from 'react';
import { ZUHAIB_PROFILE } from '../data/portfolioData';
import { Mail, Copy, Check, Send, CheckCircle2, Calendar, MapPin, Briefcase } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'custom-module',
    odooVersion: '17',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(ZUHAIB_PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    setSubmitted(true);
    if (sound) sound.playChime(640, 0.3);
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Direct Info & Availability */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="text-xs font-mono-code uppercase tracking-widest text-amber-400 mb-2">
              Engagement & Technical Consultation
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              Start an Odoo Project
            </h2>
            <p className="text-sm text-stone-300 mt-3 leading-relaxed">
              Available for enterprise architecture consulting, custom module engineering, performance audits, and full-cycle ERP deployments.
            </p>
          </div>

          {/* Quick info cards */}
          <div className="space-y-3 font-mono-code text-xs">
            {/* Email card */}
            <div className="p-4 rounded-2xl bg-[#1b0610] border border-rose-900/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-950/60 text-amber-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-stone-400">Direct Email</div>
                  <div className="text-stone-200 font-semibold">{ZUHAIB_PROFILE.email}</div>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-rose-950/50 hover:bg-rose-900/60 text-stone-300 hover:text-white transition-colors"
                title="Copy email to clipboard"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Location card */}
            <div className="p-4 rounded-2xl bg-[#1b0610] border border-rose-900/40 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-950/60 text-amber-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase text-stone-400">Location & Availability</div>
                <div className="text-stone-200">{ZUHAIB_PROFILE.location}</div>
              </div>
            </div>

            {/* Versions card */}
            <div className="p-4 rounded-2xl bg-[#1b0610] border border-rose-900/40 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-950/60 text-amber-400">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase text-stone-400">Specialization</div>
                <div className="text-stone-200">{ZUHAIB_PROFILE.odooVersions}</div>
              </div>
            </div>
          </div>

          {/* Direct mailto link */}
          <div>
            <a
              href={`mailto:${ZUHAIB_PROFILE.email}?subject=Odoo%20Technical%20Consultation%20Inquiry`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 font-mono-code transition-colors"
            >
              <span>Or compose direct email client</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="lg:col-span-7 bg-gradient-to-b from-[#200815] to-[#16040e] border border-rose-900/50 rounded-3xl p-6 sm:p-8 shadow-2xl">
          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">Inquiry Received</h3>
              <p className="text-sm text-stone-300 max-w-md mx-auto">
                Thank you for reaching out. Zuhaib will review your architecture requirements and reply to <span className="text-amber-400">{formData.email}</span> within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-bold font-display text-white mb-2">
                Project Consultation Request
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-code text-stone-300 mb-1.5">
                    Your Name / Company
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova, Apex Tech"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#14030a] border border-rose-950/80 focus:border-amber-400 text-stone-100 text-xs font-mono-code outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-stone-300 mb-1.5">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="elena@apextech.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#14030a] border border-rose-950/80 focus:border-amber-400 text-stone-100 text-xs font-mono-code outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-code text-stone-300 mb-1.5">
                    Project Scope
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#14030a] border border-rose-950/80 focus:border-amber-400 text-stone-100 text-xs font-mono-code outline-none transition-colors"
                  >
                    <option value="custom-module">Custom Odoo Module Development</option>
                    <option value="migration">Version Migration (14 -&gt; 17/18)</option>
                    <option value="optimization">PostgreSQL / ORM Performance Audit</option>
                    <option value="owl-frontend">OWL Frontend Widget / POS Customization</option>
                    <option value="api-integration">External REST / XML-RPC Integration</option>
                    <option value="advisory">Fractional ERP Architecture Advisory</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-stone-300 mb-1.5">
                    Target Odoo Version
                  </label>
                  <select
                    value={formData.odooVersion}
                    onChange={(e) => setFormData({ ...formData, odooVersion: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#14030a] border border-rose-950/80 focus:border-amber-400 text-stone-100 text-xs font-mono-code outline-none transition-colors"
                  >
                    <option value="18">Odoo 18 (Enterprise / Community)</option>
                    <option value="17">Odoo 17 (Enterprise / Community)</option>
                    <option value="16">Odoo 16 (Enterprise / Community)</option>
                    <option value="15">Odoo 15</option>
                    <option value="14">Odoo 14</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-code text-stone-300 mb-1.5">
                  Technical Requirements & Project Goals
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your current ERP bottlenecks, custom workflows, or architecture timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#14030a] border border-rose-950/80 focus:border-amber-400 text-stone-100 text-xs font-mono-code outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-stone-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-amber-500/15 hover:shadow-amber-500/30 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Technical Consultation Request</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
