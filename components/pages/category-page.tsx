import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDown, SlidersHorizontal } from 'lucide-react';
import { ModelCard } from '../model-card';
import { models } from '../../data/mock-models';
import { ViewType, CategoryType, Model } from '../../types';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

interface CategoryPageProps {
  category: CategoryType;
}

// Config for each category page visual style
const CATEGORY_CONFIG: Record<CategoryType, { title: string; subtitle: string; image: string; description: string }> = {
  'women': {
    title: "WOMEN",
    subtitle: "Mainboard • Development • Icons",
    image: "https://images.unsplash.com/photo-1502323777036-f29e3972d82f?q=80&w=2670&auto=format&fit=crop",
    description: "The definitive roster of established icons and future stars defining the industry."
  },
  'men': {
    title: "MEN",
    subtitle: "Editorial • Commercial • Runway",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2670&auto=format&fit=crop",
    description: "Strength, character, and versatility. Our men's board represents the modern archetype."
  },
  'new-faces': {
    title: "NEW FACES",
    subtitle: "Scouting • Development • Future",
    image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2670&auto=format&fit=crop",
    description: "The next generation of supermodels. Freshly scouted and exclusively developed by La Angels."
  },
  'direct': {
    title: "DIRECT",
    subtitle: "Bookings • Talent • Global",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2670&auto=format&fit=crop",
    description: "High-demand talent available for direct booking and immediate campaigns worldwide."
  },
  'curve': {
    title: "CURVE",
    subtitle: "Body • Beauty • Power",
    image: "./images/curve.jpg",
    description: "Celebrating form and confidence. Redefining industry standards with unapologetic beauty."
  },
  'creatives': {
    title: "CREATIVES",
    subtitle: "Stylists • Artists • Directors",
    image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?q=80&w=2670&auto=format&fit=crop",
    description: "Visionaries behind the lens. The creative force driving the world's most compelling images."
  }
};

// Helper to parse height string "5' 8"" to number for sorting
const parseHeight = (heightStr: string): number => {
  const match = heightStr.match(/(\d+)'\s*(\d+)/);
  if (!match) return 0;
  return parseInt(match[1]) * 12 + parseInt(match[2]);
};

export const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const { scrollY } = useScroll();
  const config = CATEGORY_CONFIG[category];
  const [sortOption, setSortOption] = useState('Newest');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Parallax Header
  const yBg = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileFilterOpen(false); // Reset filter state on category change
  }, [category]);

  // 1. Filter models by category
  const filteredModels = models.filter(m => {
    if (category === 'women') return m.category === 'women' || !m.category; // Fallback for legacy
    return m.category === category;
  });

  // 2. Sort Logic
  const getSortedModels = (modelsList: Model[]) => {
    const sorted = [...modelsList];
    switch (sortOption) {
      case 'A-Z':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'Height':
        // Sort descending (taller first)
        return sorted.sort((a, b) => parseHeight(b.stats.height) - parseHeight(a.stats.height));
      case 'Newest':
      default:
         // Prioritize models with isNew flag
         return sorted.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
    }
  };

  // Ensure we display something even if mock data is sparse for a category
  const modelsToShow = filteredModels.length > 0 ? filteredModels : models.slice(0, 4);
  const displayModels = getSortedModels(modelsToShow);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: yBg }}
        >
          <div 
            className="w-full h-[120%] bg-cover bg-center"
            style={{ backgroundImage: `url(${config.image})` }}
          >
             <div className="absolute inset-0 bg-neutral-950/40 mix-blend-multiply" />
             <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/30" />
          </div>
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          style={{ opacity: opacityText }}
          className="relative z-10 text-center px-6"
        >
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="flex flex-col items-center"
           >
             <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-8 bg-gold-500"></div>
                <span className="text-gold-500 text-xs uppercase tracking-[0.4em] font-bold">{config.subtitle}</span>
                <div className="h-px w-8 bg-gold-500"></div>
             </div>

             <h1 className="text-[15vw] md:text-[12vw] font-serif font-bold leading-[0.8] tracking-tighter mix-blend-overlay text-white/90 select-none">
               {config.title}
             </h1>

             <p className="max-w-md mx-auto mt-8 text-neutral-300 font-light text-sm md:text-base leading-relaxed">
               {config.description}
             </p>
           </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1, duration: 1 }}
           className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white/50"
        >
           <span className="text-[9px] uppercase tracking-widest mb-2">Scroll</span>
           <ArrowDown size={14} className="animate-bounce" />
        </motion.div>
      </section>

      {/* 2. FILTERS & GRID */}
      <section className="relative z-20 bg-neutral-950 min-h-screen py-20 px-6 max-w-[1600px] mx-auto border-t border-white/5">
         
         <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
               <h2 className="text-3xl font-serif italic text-white mb-2">The Board</h2>
               <p className="text-neutral-500 text-sm">Showing {displayModels.length} Talents</p>
            </div>
            
            <div className="flex flex-col items-end gap-4 w-full md:w-auto">
                <div className="flex gap-4 w-full md:w-auto justify-end">
                    <Button 
                        variant="outline" 
                        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                        className={cn(
                           "border-white/10 rounded-none h-10 px-6 text-[10px] tracking-widest transition-all duration-300",
                           isMobileFilterOpen 
                             ? "bg-gold-500 text-neutral-950 border-gold-500 font-bold" 
                             : "bg-transparent text-white hover:bg-white/5 hover:border-gold-500 hover:text-gold-500"
                        )}
                    >
                       <SlidersHorizontal size={14} className="mr-2" /> Filter
                    </Button>
                    <div className="hidden md:flex gap-px border border-white/10 bg-white/5">
                       {['Newest', 'A-Z', 'Height'].map(sort => (
                          <button 
                            key={sort} 
                            onClick={() => setSortOption(sort)}
                            className={cn(
                              "px-6 py-2 text-[10px] uppercase tracking-widest transition-all duration-300 relative overflow-hidden",
                              sortOption === sort 
                                ? "bg-gold-500 text-neutral-950 font-bold shadow-[0_0_20px_rgba(212,163,115,0.4)]" 
                                : "text-white/60 hover:text-white hover:bg-white/5"
                            )}
                          >
                            {sort}
                          </button>
                       ))}
                    </div>
                </div>

                {/* Mobile Filter Options */}
                <AnimatePresence>
                    {isMobileFilterOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "circOut" }}
                            className="w-full md:hidden overflow-hidden mt-2"
                        >
                             <div className="grid grid-cols-3 gap-2">
                               {['Newest', 'A-Z', 'Height'].map(sort => (
                                  <button 
                                    key={sort} 
                                    onClick={() => setSortOption(sort)}
                                    className={cn(
                                      "py-3 text-[10px] uppercase tracking-widest transition-all duration-300 border border-white/10",
                                      sortOption === sort 
                                        ? "bg-gold-500 text-neutral-950 border-gold-500 font-bold" 
                                        : "bg-white/5 text-white/60 hover:text-white hover:border-white/30"
                                    )}
                                  >
                                    {sort}
                                  </button>
                               ))}
                             </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
         </div>

         {/* Model Grid with Layout Animation */}
         <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16"
         >
            <AnimatePresence mode='popLayout'>
              {displayModels.map((model) => (
                <motion.div
                  key={model.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <ModelCard model={model} />
                </motion.div>
              ))}
            </AnimatePresence>
         </motion.div>

         {/* Infinite Scroll / Load More Placeholder */}
         <div className="mt-32 text-center">
             <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-auto mb-6"></div>
             <span className="text-neutral-500 text-xs uppercase tracking-widest">End of Selection</span>
         </div>

      </section>
    </div>
  );
};