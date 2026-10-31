import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, ChevronRight, Terminal, CheckCircle2, ArrowDown } from 'lucide-react';
import { ZUHAIB_PROFILE, CORE_SKILLS, SkillItem } from '../data/portfolioData';
import { sound } from '../utils/soundEffects';

interface CinematicHeroProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onSelectSkill: (skill: SkillItem) => void;
  onExploreMore: () => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  soundEnabled,
  onToggleSound,
  onSelectSkill,
  onExploreMore,
}) => {
  // Animation timeline state
  // Step 0: Initial Burgundy Void with massive PORTFOLIO center
  // Step 1: PORTFOLIO moves into position, Zuhaib Hassan emerges smoothly from bottom
  // Step 2: Name reveals (HELLO, I'M / ZUHAIB HASSAN / ODOO TECHNICAL DEVELOPER)
  // Step 3: Staggered Technical Skills reveal
  // Step 4: Fully interactive settled state
  const [timelineStep, setTimelineStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const maxDuration = 7.0; // 7 seconds sequence

  // Parallax mouse position
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse move handler for realistic 3D parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Replay sequence from beginning
  const replaySequence = () => {
    sound.playClick();
    setCurrentTime(0);
    setTimelineStep(0);
    setIsPlaying(true);
    if (soundEnabled) {
      sound.playDeepBoom();
    }
  };

  // Main animation timer loop
  useEffect(() => {
    if (!isPlaying) return;

    const intervalMs = 50;
    const timer = setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + (intervalMs / 1000) * playbackSpeed;
        if (next >= maxDuration) {
          setIsPlaying(false);
          return maxDuration;
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed, maxDuration]);

  // Sync timelineStep with currentTime and trigger sounds at keyframes
  useEffect(() => {
    if (currentTime < 1.6) {
      if (timelineStep !== 0) setTimelineStep(0);
    } else if (currentTime < 2.8) {
      if (timelineStep !== 1) {
        setTimelineStep(1);
        if (soundEnabled) sound.playWhoosh();
      }
    } else if (currentTime < 4.2) {
      if (timelineStep !== 2) {
        setTimelineStep(2);
        if (soundEnabled) sound.playChime(520, 0.2);
      }
    } else if (currentTime < 6.0) {
      if (timelineStep !== 3) {
        setTimelineStep(3);
        if (soundEnabled) sound.playChime(780, 0.25);
      }
    } else {
      if (timelineStep !== 4) setTimelineStep(4);
    }
  }, [currentTime, timelineStep, soundEnabled]);

  // Jump to specific timestamp
  const seekTo = (seconds: number) => {
    sound.playClick();
    setCurrentTime(seconds);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[94vh] lg:min-h-screen w-full bg-[#120409] overflow-hidden flex flex-col justify-between select-none"
      style={{
        backgroundImage: `
          radial-gradient(circle at 75% 45%, rgba(131, 24, 67, 0.28) 0%, transparent 60%),
          radial-gradient(circle at 25% 65%, rgba(80, 7, 36, 0.35) 0%, transparent 65%),
          radial-gradient(circle at 50% 15%, rgba(245, 158, 11, 0.08) 0%, transparent 50%)
        `
      }}
    >
      {/* Subtle film grain & cinematic vignette overlay */}
      <div className="absolute inset-0 pointer-events-none film-grain z-10" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,2,6,0.85)_100%)] z-10" />

      {/* Anamorphic horizontal lens flare */}
      <AnimatePresence>
        {timelineStep >= 1 && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0.2 }}
            animate={{ opacity: [0, 0.7, 0.3], scaleX: [0.3, 1.2, 1] }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute top-[28%] left-0 right-0 h-[2px] lens-flare-streak z-15 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Ambient glowing dust/light particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <motion.div
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.45, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/3 w-96 h-96 rounded-full bg-rose-700/10 blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 25, 0],
            opacity: [0.15, 0.35, 0.15]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl"
        />
      </div>

      {/* ============================================================ */}
      {/* MASSIVE ANIMATED TITLE: "PORTFOLIO"                          */}
      {/* Initially massive & centered, then smoothly moves to horizon */}
      {/* ============================================================ */}
      <div className="absolute inset-x-0 top-0 pointer-events-none z-15 flex justify-center">
        <motion.div
          style={{
            transform: `translate3d(${mousePos.x * -14}px, ${mousePos.y * -8}px, 0)`,
          }}
          animate={
            timelineStep === 0
              ? {
                  y: "36vh",
                  scale: 1.35,
                  opacity: 0.95,
                  letterSpacing: "0.22em",
                  filter: "blur(0px)",
                }
              : {
                  y: "4.5rem",
                  scale: 0.98,
                  opacity: 0.82,
                  letterSpacing: "0.28em",
                  filter: "blur(0px)",
                }
          }
          transition={{
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-center w-full px-4"
        >
          <h1 className="font-display font-black text-[13vw] sm:text-[11vw] md:text-[9.5vw] lg:text-[8vw] leading-none tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-stone-100 via-rose-200/80 to-rose-950/40 drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] select-none">
            PORTFOLIO
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: timelineStep === 0 ? 0.7 : 0 }}
            className="text-xs uppercase tracking-[0.4em] text-rose-300/80 font-mono-code mt-3"
          >
            Zuhaib Hassan · Senior Odoo Technical Developer
          </motion.div>
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* MAIN HERO SPLIT: Left Column (Text & Skills) / Right (Zuhaib) */}
      {/* ============================================================ */}
      <div className="relative max-w-7xl mx-auto w-full px-6 pt-24 sm:pt-28 lg:pt-32 pb-24 z-20 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[600px]">

          {/* ---------------------------------------------------------- */}
          {/* LEFT SIDE: HELLO, I'M / ZUHAIB HASSAN / ODOO TECHNICAL...  */}
          {/* ---------------------------------------------------------- */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 pt-4 lg:pt-0">
            <AnimatePresence>
              {timelineStep >= 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  {/* "HELLO, I'M" Kicker */}
                  <div className="flex items-center gap-3">
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: 44 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-[2px] bg-gradient-to-r from-amber-400 to-rose-500 rounded-full"
                    />
                    <span className="font-mono-code text-xs sm:text-sm tracking-[0.25em] text-amber-300 font-semibold uppercase">
                      HELLO, I'M
                    </span>
                  </div>

                  {/* "ZUHAIB HASSAN" */}
                  <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none text-glow">
                    ZUHAIB HASSAN
                  </h2>

                  {/* "ODOO TECHNICAL DEVELOPER" */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <div className="text-xl sm:text-2xl md:text-3xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-200 to-stone-100">
                      ODOO TECHNICAL DEVELOPER
                    </div>
                  </div>

                  {/* Editorial Summary */}
                  <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal pt-1">
                    Senior ERP systems architect engineering custom backend Python ORM workflows, high-speed OWL reactive dashboards, and mission-critical PostgreSQL database optimizations across Odoo 14 to 18.
                  </p>

                  {/* ------------------------------------------------------ */}
                  {/* TECHNICAL SKILLS STAGGERED REVEAL                      */}
                  {/* ------------------------------------------------------ */}
                  <AnimatePresence>
                    {timelineStep >= 3 && (
                      <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="pt-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs uppercase tracking-widest text-stone-400 font-mono-code">
                            Core Technical Stack & Competencies
                          </span>
                          <span className="text-xs text-amber-400/90 font-mono-code">
                            Odoo 14 – 18 Enterprise
                          </span>
                        </div>

                        {/* Staggered Grid of Technical Skills */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                          {CORE_SKILLS.slice(0, 6).map((skill, index) => (
                            <motion.button
                              key={skill.id}
                              onClick={() => {
                                sound.playClick();
                                onSelectSkill(skill);
                              }}
                              initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
                              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                              transition={{
                                duration: 0.6,
                                delay: 0.1 * index,
                                ease: "easeOut",
                              }}
                              whileHover={{ scale: 1.02, x: 4 }}
                              className="group text-left p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-[#210915]/90 to-[#2f0d1e]/80 border border-rose-900/40 hover:border-amber-400/60 transition-all shadow-md hover:shadow-rose-900/30 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-2 h-2 rounded-full bg-rose-500 group-hover:bg-amber-400 group-hover:scale-125 transition-all shrink-0" />
                                <div className="truncate">
                                  <div className="text-xs sm:text-sm font-semibold text-stone-100 group-hover:text-amber-300 transition-colors truncate">
                                    {skill.name}
                                  </div>
                                  <div className="text-[11px] text-stone-400 font-mono-code truncate">
                                    {skill.level} · {skill.tags[0]}
                                  </div>
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 shrink-0 ml-1 transition-transform group-hover:translate-x-1" />
                            </motion.button>
                          ))}
                        </div>

                        {/* Action buttons below skills */}
                        <div className="flex flex-wrap items-center gap-3 pt-3">
                          <button
                            onClick={() => {
                              sound.playClick();
                              onExploreMore();
                            }}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs tracking-wide transition-all shadow-lg shadow-amber-500/15 hover:shadow-amber-500/30 whitespace-nowrap"
                          >
                            <span>Explore ERP Architecture & Projects</span>
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>

                          <a
                            href={`mailto:${ZUHAIB_PROFILE.email}`}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/60 text-stone-200 hover:text-white font-medium text-xs transition-colors whitespace-nowrap"
                          >
                            <Terminal className="w-3.5 h-3.5 text-amber-400" />
                            <span>{ZUHAIB_PROFILE.email}</span>
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* RIGHT SIDE: ZUHAIB HASSAN PORTRAIT EMERGENCE               */}
          {/* Preserves the exact photograph, face, clothes & hairstyle */}
          {/* ---------------------------------------------------------- */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-end order-1 lg:order-2">
            <AnimatePresence>
              {timelineStep >= 1 && (
                <motion.div
                  initial={{
                    y: 260,
                    opacity: 0,
                    scale: 0.92,
                    filter: "blur(12px)",
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 1.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    transform: `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${
                      mousePos.y * -10
                    }deg)`,
                    transformStyle: "preserve-3d",
                  }}
                  className="relative w-full max-w-[380px] sm:max-w-[430px] lg:max-w-[460px] group transition-transform duration-200"
                >
                  {/* Subtle Cinematic Studio Rim Light Glow */}
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-t from-rose-900/40 via-amber-600/20 to-transparent blur-2xl opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  {/* Elegant framing container for waist-up portrait */}
                  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-rose-800/40 bg-gradient-to-b from-[#2a0b19] via-[#1a050f] to-[#120409] shadow-2xl portrait-glow">
                    
                    {/* Top lighting sheen */}
                    <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-rose-500/15 via-transparent to-transparent pointer-events-none z-10" />

                    {/* Exact photographic portrait of Zuhaib Hassan */}
                    <img
                      src={ZUHAIB_PROFILE.portraitUrl}
                      alt="Zuhaib Hassan - Professional Odoo Technical Developer"
                      className="w-full h-auto object-cover object-top aspect-[4/4.4] sm:aspect-[4/4.5] transform transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="eager"
                    />

                    {/* Subtle bottom gradient vignette to blend with dark burgundy interface */}
                    <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#120409] via-[#120409]/65 to-transparent pointer-events-none" />

                    {/* Cinematic Badge Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#1b0610]/85 backdrop-blur-md border border-rose-900/50 flex items-center justify-between z-20">
                      <div>
                        <div className="text-xs font-bold text-stone-100 font-display flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>ZUHAIB HASSAN</span>
                        </div>
                        <div className="text-[11px] text-amber-300 font-mono-code">
                          Senior Odoo ERP Engineer
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-stone-400 font-mono-code uppercase">
                          Verification
                        </div>
                        <div className="text-xs text-rose-300 font-semibold flex items-center gap-1 justify-end">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                          <span>Official Portrait</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* INTERACTIVE MOTION DESIGN VIDEO TIMELINE & SCRUBBER BAR      */}
      {/* Lets the user pause, scrub, replay, or adjust speed          */}
      {/* ============================================================ */}
      <div className="relative z-30 max-w-7xl mx-auto w-full px-6 pb-6">
        <div className="bg-[#1b0610]/90 backdrop-blur-md border border-rose-950/60 rounded-2xl p-3.5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Controls: Play/Pause, Replay, Timestamp */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setIsPlaying(!isPlaying);
                }}
                className="w-9 h-9 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 flex items-center justify-center transition-transform hover:scale-105 shadow-md shadow-amber-500/20"
                aria-label={isPlaying ? "Pause timeline" : "Play timeline"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <button
                onClick={replaySequence}
                className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/40 text-stone-300 hover:text-white transition-colors"
                title="Replay from 00:00"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={onToggleSound}
                className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/40 text-stone-300 hover:text-amber-400 transition-colors"
                title={soundEnabled ? "Mute audio" : "Enable sound design"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>

            <div className="font-mono-code text-xs text-stone-300 px-2.5 py-1 rounded-lg bg-black/40 border border-rose-950/60">
              <span className="text-amber-400">{currentTime.toFixed(1)}s</span>
              <span className="text-stone-500"> / {maxDuration.toFixed(1)}s</span>
            </div>
          </div>

          {/* Timeline Scrubber Bar with Keyframe Markers */}
          <div className="flex-1 w-full flex flex-col gap-1.5 px-0 md:px-4">
            <div className="relative w-full h-2.5 bg-rose-950/60 rounded-full overflow-hidden cursor-pointer group">
              {/* Progress bar */}
              <div
                className="h-full bg-gradient-to-r from-rose-600 via-rose-500 to-amber-400 rounded-full transition-all duration-75"
                style={{ width: `${(currentTime / maxDuration) * 100}%` }}
              />
              <input
                type="range"
                min="0"
                max={maxDuration}
                step="0.1"
                value={currentTime}
                onChange={(e) => seekTo(parseFloat(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                aria-label="Seek animation time"
              />
            </div>

            {/* Keyframe Jump Markers */}
            <div className="flex items-center justify-between text-[10px] font-mono-code text-stone-400">
              <button
                onClick={() => seekTo(0)}
                className={`hover:text-amber-300 transition-colors ${
                  currentTime < 1.6 ? 'text-amber-400 font-bold' : ''
                }`}
              >
                0.0s Title
              </button>
              <button
                onClick={() => seekTo(1.8)}
                className={`hover:text-amber-300 transition-colors ${
                  currentTime >= 1.6 && currentTime < 2.8 ? 'text-amber-400 font-bold' : ''
                }`}
              >
                1.8s Zuhaib Emergence
              </button>
              <button
                onClick={() => seekTo(3.0)}
                className={`hover:text-amber-300 transition-colors ${
                  currentTime >= 2.8 && currentTime < 4.2 ? 'text-amber-400 font-bold' : ''
                }`}
              >
                3.0s Name Reveal
              </button>
              <button
                onClick={() => seekTo(4.5)}
                className={`hover:text-amber-300 transition-colors ${
                  currentTime >= 4.2 ? 'text-amber-400 font-bold' : ''
                }`}
              >
                4.5s Skills Matrix
              </button>
            </div>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-1.5 text-xs text-stone-300 w-full md:w-auto justify-end">
            <span className="text-[11px] text-stone-400 font-mono-code mr-1">Speed:</span>
            {[0.5, 1.0, 1.5].map((speed) => (
              <button
                key={speed}
                onClick={() => {
                  sound.playClick();
                  setPlaybackSpeed(speed);
                }}
                className={`px-2 py-1 rounded-md font-mono-code text-xs transition-colors ${
                  playbackSpeed === speed
                    ? 'bg-amber-400 text-stone-950 font-bold'
                    : 'bg-rose-950/40 hover:bg-rose-900/60 text-stone-300'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
