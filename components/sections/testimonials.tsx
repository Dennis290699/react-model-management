import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { cn } from '../../lib/utils';

const TESTIMONIALS = [
  {
    id: 1,
    text: "My daughter has been with LA Angels for a few years now. The professionalism and opportunities provided are unmatched. They genuinely care about model development.",
    author: "Tati Khachatryan",
    role: "Model Parent"
  },
  {
    id: 2,
    text: "Working with this agency transformed our campaign. Their talent roster is impeccably curated, and the booking process was seamless from start to finish.",
    author: "Elena Vostrikova",
    role: "Creative Director, Vogue UA"
  },
  {
    id: 3,
    text: "La Angels doesn't just manage models; they build icons. Their attention to detail and strategic career planning is what sets them apart in this industry.",
    author: "Marcus Chen",
    role: "Fashion Photographer"
  }
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000); // Rotate every 6 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-32 md:py-48 bg-neutral-950 overflow-hidden border-t border-white/5">
      
      {/* Background Texture (Noise) */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* Giant Background Quote Mark for Depth */}
      <div className="absolute top-0 left-4 md:left-20 text-[15rem] md:text-[25rem] font-serif leading-none text-white/[0.02] pointer-events-none select-none font-bold -translate-y-1/2">
        &ldquo;
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          <div className="flex flex-col items-center">
             {/* Editorial Label */}
             <div className="flex items-center gap-4 mb-10 md:mb-14">
                <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-gold-500/50"></div>
                <span className="text-gold-500 uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold">Endorsements</span>
                <div className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-gold-500/50"></div>
             </div>

             {/* Rating Stars - Static */}
             <div className="flex gap-2 mb-12 text-gold-500">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" className="opacity-80" />
                ))}
             </div>

             {/* Dynamic Content Container */}
             <div className="relative min-h-[300px] md:min-h-[250px] flex flex-col justify-center items-center w-full">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={currentIndex}
                   initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                   animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                   exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                   transition={{ duration: 0.8, ease: "easeInOut" }}
                   className="flex flex-col items-center"
                 >
                   {/* The Quote */}
                   <div className="relative mb-12 md:mb-16 max-w-4xl">
                      <span className="absolute -top-6 -left-4 md:-top-10 md:-left-12 text-gold-500/30 hidden md:block">
                          <Quote size={24} className="rotate-180" />
                      </span>
                      
                      <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-white/90 leading-[1.4] italic font-light tracking-wide">
                         "{TESTIMONIALS[currentIndex].text}"
                      </h2>

                      <span className="absolute -bottom-6 -right-4 md:-bottom-10 md:-right-12 text-gold-500/30 hidden md:block">
                          <Quote size={24} />
                      </span>
                   </div>

                   {/* Author Signature */}
                   <div className="flex flex-col items-center gap-2 relative">
                      <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent absolute -top-10 left-1/2 -translate-x-1/2"></div>
                      
                      <span className="text-white font-sans font-bold uppercase tracking-[0.2em] text-sm md:text-base">
                        {TESTIMONIALS[currentIndex].author}
                      </span>
                      <span className="text-gold-500/80 font-serif italic text-sm">
                        {TESTIMONIALS[currentIndex].role}
                      </span>
                   </div>
                 </motion.div>
               </AnimatePresence>
             </div>

             {/* Progress Indicators */}
             <div className="flex gap-3 mt-16">
               {TESTIMONIALS.map((_, idx) => (
                 <button
                   key={idx}
                   onClick={() => setCurrentIndex(idx)}
                   className={cn(
                     "h-1 rounded-full transition-all duration-500",
                     idx === currentIndex ? "w-12 bg-gold-500" : "w-4 bg-white/10 hover:bg-white/30"
                   )}
                   aria-label={`Go to testimonial ${idx + 1}`}
                 />
               ))}
             </div>

          </div>

        </div>
      </div>
    </section>
  );
};