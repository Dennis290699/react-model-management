import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();

  // Advanced Parallax Configuration
  // Background moves slower and zooms in
  const yBg = useTransform(scrollY, [0, 1000], [0, 400]);
  const scaleBg = useTransform(scrollY, [0, 1000], [1, 1.25]);

  // Card moves slightly down but fades out quickly
  const yCard = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacityCard = useTransform(scrollY, [0, 400], [1, 0]);

  // Inner text moves slightly faster than the card for a 3D feel
  const yText = useTransform(scrollY, [0, 1000], [0, 50]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-neutral-900 flex items-center justify-center">
      {/* Background Image - Cinematic Parallax */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ y: yBg, scale: scaleBg }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2664&auto=format&fit=crop')" }}
        >
          {/* Vignette & Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20" />
        </div>
      </motion.div>

      {/* Subtle Grain Texture - Uncoupled from animating DOM layer */}
      <div className="absolute inset-0 z-[5] opacity-[0.05] pointer-events-none mix-blend-overlay hidden md:block"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Floating Elements (Desktop) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
        className="absolute inset-0 z-0 pointer-events-none hidden md:block"
      >
        <div className="absolute top-1/2 left-8 -translate-y-1/2 text-white text-[10px] tracking-[0.4em] uppercase [writing-mode:vertical-rl] rotate-180 font-bold shadow-black/50 drop-shadow-lg">
          Collection 2025
        </div>
        <div className="absolute top-1/2 right-8 -translate-y-1/2 text-white text-[10px] tracking-[0.4em] uppercase [writing-mode:vertical-rl] font-bold shadow-black/50 drop-shadow-lg">
          Official Roster
        </div>
      </motion.div>

      {/* Central Box - Refined Size & Typography */}
      <motion.div
        style={{ y: yCard, opacity: opacityCard }}
        initial={{ opacity: 0, scale: 0.9, clipPath: "inset(40% 0 40% 0)" }}
        animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0 0)" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="relative z-10 bg-white shadow-2xl w-[90%] md:w-auto max-w-4xl mx-auto will-change-transform"
      >
        {/* Decorative Frame */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-neutral-900/30" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-neutral-900/30" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-neutral-900/30" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-neutral-900/30" />

        <div className="px-8 py-16 md:px-20 md:py-20 flex flex-col items-center justify-center text-center">

          <motion.div style={{ y: yText }} className="will-change-transform">
            <span className="inline-block text-gold-600 text-[9px] md:text-[10px] tracking-[0.5em] uppercase font-bold mb-8 border-b border-gold-200 pb-2">
              The Roster
            </span>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-black font-bold tracking-[0.1em] uppercase leading-tight mb-8">
              Savage X Fenty
            </h1>

            <div className="flex items-center justify-center gap-4 mb-4 opacity-60">
              <div className="h-[1px] w-12 bg-black"></div>
              <span className="text-[9px] uppercase tracking-[0.3em] font-sans font-semibold text-black">Model Management</span>
              <div className="h-[1px] w-12 bg-black"></div>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        style={{ opacity: opacityCard }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white text-[9px] uppercase tracking-[0.3em] font-medium drop-shadow-md">Explore</span>
        <div className="h-10 w-[1px] bg-white/30 overflow-hidden relative shadow-sm">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 w-full h-1/2 bg-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]"
          />
        </div>
      </motion.div>
    </section>
  );
};