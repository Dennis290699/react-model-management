import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowUpRight, Plus, Check } from 'lucide-react';
import { Model } from '../types';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';

interface ModelCardProps {
  model: Model;
  priority?: boolean;
}

export const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  const { toggleModelSelection, selectedModels, setViewingModel } = useStore();
  const isSelected = selectedModels.includes(model.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative w-full aspect-[3/4.5] overflow-hidden cursor-pointer bg-neutral-900"
      onClick={() => setViewingModel(model)}
    >
      {/* 1. Background Image with Cinematic Transition */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={model.image} 
          alt={model.name} 
          className={cn(
            "w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
            "grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105",
            isSelected && "grayscale-0 scale-105"
          )}
        />
      </div>

      {/* 2. Selection Indicator / Action Button (Top Right) */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          toggleModelSelection(model.id);
        }}
        className={cn(
          "absolute top-4 right-4 z-30 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300",
          isSelected 
            ? "bg-gold-500 border-gold-500 text-white shadow-[0_0_15px_rgba(212,163,115,0.5)]" 
            : "bg-white/10 border-white/20 text-white hover:bg-white hover:text-black hover:border-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0"
        )}
      >
        {isSelected ? <Check size={18} strokeWidth={3} /> : <Plus size={20} />}
      </button>

      {/* 3. Badges (Top Left) */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {model.badges?.map((badge, idx) => (
             <span key={idx} className="bg-neutral-900/80 backdrop-blur text-white text-[9px] uppercase tracking-widest px-3 py-1 font-medium border-l-2 border-gold-500">
                {badge}
             </span>
          ))}
      </div>

      {/* 4. Gradient Overlay */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent transition-opacity duration-500",
        isSelected ? "opacity-90" : "opacity-60 group-hover:opacity-80"
      )} />

      {/* 5. Content Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col justify-end h-full">
          
          <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
            {/* Meta Line */}
            <div className="flex items-center gap-3 mb-2 overflow-hidden">
                <div className="h-px w-6 bg-gold-500" />
                <span className="text-gold-500 text-[10px] uppercase tracking-[0.3em] font-bold">
                    {model.location}
                </span>
            </div>

            {/* Name */}
            <h3 className="text-3xl md:text-4xl font-serif text-white italic leading-none mb-1">
                {model.name}
            </h3>
            
            {/* "View Profile" Hint */}
            <div className="flex items-center gap-2 text-white/50 text-[10px] uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <span>View Portfolio</span>
                <ArrowUpRight size={12} />
            </div>
          </div>

          {/* Stats Reveal Grid - Minimalist */}
          <div className="grid grid-cols-3 border-t border-white/20 pt-4 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75 transform translate-y-4 group-hover:translate-y-0">
             <div>
                <span className="block text-[9px] text-white/40 uppercase tracking-widest mb-1">Height</span>
                <span className="block text-white font-serif text-lg">{model.stats.height}</span>
             </div>
             <div className="border-l border-white/10 pl-4">
                <span className="block text-[9px] text-white/40 uppercase tracking-widest mb-1">Bust</span>
                <span className="block text-white font-serif text-lg">{model.stats.bust}</span>
             </div>
             <div className="border-l border-white/10 pl-4">
                <span className="block text-[9px] text-white/40 uppercase tracking-widest mb-1">Waist</span>
                <span className="block text-white font-serif text-lg">{model.stats.waist}</span>
             </div>
          </div>
      </div>
      
      {/* Selected Border Effect */}
      <div className={cn(
        "absolute inset-0 border-[1px] border-gold-500/0 transition-all duration-300 pointer-events-none z-40",
        isSelected && "border-gold-500/100 inset-4"
      )} />

    </motion.div>
  );
};