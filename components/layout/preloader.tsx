import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface PreloaderProps {
  onComplete: () => void;
}

const WORDS = ["Talent", "Vision", "Beauty", "Angels"];

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // 1. SCROLL LOCK MANAGEMENT
  useEffect(() => {
    // Disable scroll on mount
    document.body.style.overflow = 'hidden';
    // Ensure we start at the top
    window.scrollTo(0, 0);

    return () => {
      // Re-enable scroll on unmount
      document.body.style.overflow = 'unset';
    };
  }, []);

  // 2. Text Sequence Logic
  useEffect(() => {
    if (index < WORDS.length - 1) {
      const timeout = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 1200); // Slightly slower for impact
      return () => clearTimeout(timeout);
    }
  }, [index]);

  // 3. Progress Counter
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50); // ~5 seconds total load time

    return () => clearInterval(interval);
  }, []);

  // 4. Trigger Exit Animation
  useEffect(() => {
    // Wait for text sequence AND progress to finish
    if (progress === 100 && index === WORDS.length - 1) {
       const timer = setTimeout(() => {
          setIsExiting(true);
          // Wait for the slide-up animation to finish before unmounting parent
          setTimeout(onComplete, 1200); 
       }, 1000); // Pause at 100% to let the user absorb the final state
       return () => clearTimeout(timer);
    }
  }, [progress, index, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white overflow-hidden"
      initial={{ y: 0 }}
      animate={{ y: isExiting ? "-100%" : 0 }}
      transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }} // Cinematic easing
    >
        {/* Cinematic Background with Slow Zoom (Ken Burns Effect) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div 
                className="w-full h-full bg-cover bg-center grayscale contrast-[1.15] brightness-75"
                initial={{ scale: 1.25, opacity: 0 }}
                animate={{ scale: 1.05, opacity: 0.6 }}
                transition={{ duration: 7, ease: "easeOut" }}
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop')" }}
            />
            {/* Cinematic Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)]" />
            <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Film Grain Texture */}
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none z-0 mix-blend-overlay" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />

        {/* Center Typography Sequence with Blur Effect */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center h-full pb-20">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    className="flex flex-col items-center"
                    initial={{ y: 30, opacity: 0, filter: "blur(12px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -30, opacity: 0, filter: "blur(12px)" }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                >
                    <span className="text-[9px] md:text-xs uppercase tracking-[0.6em] text-gold-500 mb-6 font-medium shadow-black drop-shadow-lg">
                        La Angels Management
                    </span>
                    <h1 className={cn(
                        "text-6xl md:text-[9rem] font-serif font-bold tracking-tight uppercase leading-none text-center drop-shadow-2xl",
                        index === WORDS.length - 1 ? "text-white italic" : "text-white/95"
                    )}>
                        {WORDS[index]}
                    </h1>
                </motion.div>
            </AnimatePresence>
        </div>

        {/* Bottom Metadata & Progress */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 flex justify-between items-end">
            
            {/* Technical Data Left */}
            <div className="hidden md:flex flex-col gap-1 text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">
                <span>COORD: 34.0522° N, 118.2437° W</span>
                <span>EST. MMXXIV — LOS ANGELES</span>
            </div>

            {/* Progress Counter Right */}
            <div className="flex flex-col items-end">
                <div className="flex items-baseline gap-3">
                    <span className="text-xs font-mono text-gold-500 uppercase tracking-widest mb-1">Loading Assets</span>
                    <span className="text-7xl md:text-8xl font-serif italic text-white leading-none tracking-tighter">
                        {progress}
                    </span>
                    <span className="text-lg font-serif text-white/50 italic">%</span>
                </div>
            </div>
        </div>

        {/* Loading Bar Line */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-white/5 w-full z-20">
            <motion.div 
                className="h-full bg-gold-500 shadow-[0_0_25px_rgba(212,163,115,1)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
            />
        </div>

    </motion.div>
  );
};
