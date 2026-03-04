import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ArrowRight } from 'lucide-react';
import { Model } from '../../../types';
import { useStore } from '../../../store/useStore';
import { Button } from '../../ui/button';
import { cn } from '../../../lib/utils';

interface PortfolioBioProps {
  model: Model;
}

export const PortfolioBio: React.FC<PortfolioBioProps> = ({ model }) => {
  const { toggleModelSelection, selectedModels } = useStore();
  const isSelected = selectedModels.includes(model.id);

  // Stats data structure for the technical grid
  const statsList = [
    { label: "Height", value: model.stats.height },
    { label: "Bust", value: model.stats.bust },
    { label: "Waist", value: model.stats.waist },
    { label: "Hips", value: model.stats.hips },
    { label: "Shoe", value: model.stats.shoe },
    { label: "Dress", value: model.stats.dress },
    { label: "Hair", value: model.stats.hair },
    { label: "Eyes", value: model.stats.eyes },
  ];

  // Default text fallback
  const defaultBio = `Professional fashion model with a unique look and versatile style. ${model.name} has graced the runways of Paris and Milan, bringing a fresh energy to every campaign.`;
  const defaultQuote = "I believe fashion is more than just clothing; it's a form of expression without words. Every shoot is a new story to tell.";

  return (
    <section className="relative z-20 py-24 md:py-32 bg-neutral-950 text-white overflow-hidden">
      
      {/* Decorative Background Text */}
      <div className="absolute top-20 right-0 translate-x-1/3 opacity-[0.02] pointer-events-none select-none">
         <span className="text-[25vw] font-serif font-bold leading-none">PROFILE</span>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col lg:flex-row gap-16 md:gap-24 items-start">
            
            {/* Left Column: Narrative & Bio */}
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="lg:w-1/2 pt-10"
            >
               <div className="flex items-center gap-4 mb-8">
                  <div className="h-px w-16 bg-gold-500"></div>
                  <span className="text-gold-500 uppercase tracking-[0.3em] text-xs font-bold">The Talent</span>
               </div>

               <h2 className="text-5xl md:text-8xl font-serif font-bold mb-10 leading-[0.9]">
                  <span className="block text-neutral-500 text-3xl md:text-4xl mb-4 font-light italic font-serif">Introducing</span>
                  {model.name}
               </h2>

               <div className="space-y-8 text-lg text-neutral-400 font-light leading-relaxed max-w-xl">
                  <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-white first-letter:mr-3 first-letter:float-left">
                     {model.bio || defaultBio}
                  </p>
                  
                  <div className="border-l border-white/20 pl-6 py-2">
                     <p className="text-sm md:text-base text-neutral-500 italic">
                        "{model.quote || defaultQuote}"
                     </p>
                  </div>

                  <p className="text-sm">
                     With proven experience in high fashion, commercial print, and runway, she is known for her professionalism and ability to adapt to any creative vision. Currently available for bookings worldwide through La Angels mainboard.
                  </p>
               </div>

               {/* Badges as Tags */}
               <div className="mt-10 flex flex-wrap gap-3">
                  {model.badges?.map((badge, idx) => (
                    <span key={idx} className="px-5 py-2 border border-white/10 text-xs uppercase tracking-widest text-white/60 hover:border-gold-500/50 hover:text-gold-500 transition-colors cursor-default">
                        {badge}
                    </span>
                  ))}
               </div>
               
               {/* Action Button */}
               <div className="mt-14">
                 <Button 
                   onClick={() => toggleModelSelection(model.id)}
                   className={cn(
                       "h-14 px-8 rounded-none border border-gold-500/50 text-white hover:bg-gold-500 hover:text-black transition-all duration-300 uppercase tracking-[0.2em] text-xs group relative overflow-hidden",
                       isSelected && "bg-white text-black border-white"
                   )}
                 >
                   <span className="relative z-10 flex items-center gap-3">
                     {isSelected ? "Remove from Selection" : "Add to Casting Shortlist"}
                     {!isSelected && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                   </span>
                 </Button>
               </div>
            </motion.div>

            {/* Right Column: Technical Stats Sheet */}
            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="lg:w-1/2 w-full mt-10 lg:mt-0"
            >
               {/* Glass Effect Container */}
               <div className="bg-neutral-900/40 border border-white/10 p-8 md:p-14 relative backdrop-blur-md">
                  {/* Accent Line */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold-500 via-white/20 to-transparent"></div>
                  
                  <div className="flex justify-between items-end mb-12">
                     <h3 className="font-serif text-4xl text-white italic">Measurements</h3>
                     <span className="text-xs text-white/30 font-mono tracking-widest uppercase">Spec Sheet 2024</span>
                  </div>
                  
                  {/* Grid Layout */}
                  <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                     {statsList.map((stat, idx) => (
                        <div key={idx} className="flex flex-col border-b border-white/10 pb-4 group hover:border-gold-500/50 transition-colors duration-500">
                           <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2 group-hover:text-gold-500 transition-colors">{stat.label}</span>
                           <span className="text-2xl md:text-3xl font-serif text-white font-medium">{stat.value}</span>
                        </div>
                     ))}
                  </div>

                  {/* Footer Info */}
                  <div className="mt-12 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between text-xs text-neutral-500 border-t border-white/5 gap-4">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/5 rounded-full">
                           <Globe size={14} className="text-gold-500" />
                        </div>
                        <div className="flex flex-col">
                           <span className="uppercase tracking-widest text-white/70">Global Representation</span>
                           <span>Paris • Milan • New York</span>
                        </div>
                     </div>
                     <span className="font-mono text-white/20 text-[10px]">REF: {model.id}</span>
                  </div>
               </div>
            </motion.div>

        </div>
      </div>
    </section>
  );
};