import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Model } from '../../../types';

interface PortfolioHeroProps {
  model: Model;
}

export const PortfolioHero: React.FC<PortfolioHeroProps> = ({ model }) => {
  const { scrollY } = useScroll();
  
  // Parallax effects
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]); 
  const scaleBg = useTransform(scrollY, [0, 1000], [1.1, 1.3]);
  const textY = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  // Split name for styling
  const firstName = model.name.split(' ')[0];
  const lastName = model.name.split(' ').slice(1).join(' ');

  return (
    <section className="relative h-screen w-full overflow-hidden bg-neutral-950">
      
      {/* Background Layer */}
      <motion.div 
        className="absolute inset-0 z-0 will-change-transform"
        style={{ y: yBg, scale: scaleBg }}
      >
         <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${model.image})` }}
         />
         {/* Cinematic Overlays */}
         <div className="absolute inset-0 bg-neutral-950/20 mix-blend-multiply" />
         <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/40 opacity-80" />
      </motion.div>

      {/* Film Grain Texture - Uncoupled from Parallax for Performance */}
      <div className="absolute inset-0 z-[5] opacity-[0.07] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* Editorial Grid / Lines */}
      <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="h-full w-px bg-white/10 absolute left-6 md:left-12" />
          <div className="h-full w-px bg-white/10 absolute right-6 md:right-12" />
          <div className="w-full h-px bg-white/10 absolute top-24" />
          <div className="w-full h-px bg-white/10 absolute bottom-24" />
      </div>

      {/* Meta Data Top Left */}
      <motion.div 
        style={{ opacity: opacityText }}
        className="absolute top-32 left-10 md:left-16 z-20 flex flex-col gap-1 text-[10px] tracking-[0.3em] uppercase text-white/70 font-medium"
      >
         <span className="text-gold-500">Model ID</span>
         <span>{model.id.padStart(3, '0')} — 24</span>
      </motion.div>

      {/* Meta Data Top Right - Location */}
      <motion.div 
         style={{ opacity: opacityText }}
         className="absolute top-32 right-10 md:right-16 z-20 flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-white/70"
      >
         <MapPin size={12} className="text-gold-500" />
         <span>{model.location}</span>
      </motion.div>

      {/* Main Typography Content */}
      <div className="absolute bottom-0 left-0 w-full z-20 px-6 md:px-12 pb-32 md:pb-40">
        <motion.div 
           style={{ y: textY, opacity: opacityText }}
           className="container mx-auto will-change-transform"
        >
          <motion.div
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.2 }}
          >
             {/* Small Label */}
             <div className="flex items-center gap-4 mb-4 md:mb-6 pl-2">
                <div className="w-8 h-[2px] bg-gold-500" />
                <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-white/80 font-light">
                    Representation
                </span>
             </div>

             {/* Huge Cinematic Name */}
             <h1 className="text-white leading-[0.85] flex flex-col">
                <span className="font-serif font-medium text-[15vw] md:text-[13vw] tracking-tighter mix-blend-overlay text-white/90">
                    {firstName}
                </span>
                <span className="font-sans font-thin text-[8vw] md:text-[6vw] tracking-[0.15em] ml-2 md:ml-4 text-white">
                    {lastName}
                </span>
             </h1>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div 
         style={{ opacity: opacityText }}
         className="absolute bottom-0 right-12 z-20 h-24 w-px bg-white/20 hidden md:block"
      >
         <motion.div 
            animate={{ y: [0, 100] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-full h-1/2 bg-gold-500"
         />
      </motion.div>

    </section>
  );
};