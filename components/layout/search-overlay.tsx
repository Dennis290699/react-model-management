import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ArrowRight, MapPin } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { models } from '../../data/mock-models';
import { cn } from '../../lib/utils';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setViewingModel } = useStore();
  const [query,QD] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus input when opened
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSearchOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setIsSearchOpen]);

  // Filter models based on query
  const filteredModels = query.trim() === '' 
    ? [] 
    : models.filter(model => 
        model.name.toLowerCase().includes(query.toLowerCase()) || 
        model.location.toLowerCase().includes(query.toLowerCase())
      );

  const handleModelClick = (model: typeof models[0]) => {
    setViewingModel(model);
    setIsSearchOpen(false);
    QD('');
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-neutral-950/95 backdrop-blur-xl flex flex-col"
        >
          {/* Background Branding */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
            <span className="text-[25vw] font-serif font-bold text-white leading-none whitespace-nowrap">
              SEARCH
            </span>
          </div>

          {/* Close Button */}
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-8 right-8 z-50 text-white/50 hover:text-white transition-colors p-4 hover:rotate-90 duration-500"
          >
            <X size={40} strokeWidth={1} />
          </button>

          <div className="container mx-auto px-6 h-full flex flex-col pt-32 pb-12 relative z-10">
            
            {/* Search Input Area */}
            <div className="max-w-4xl mx-auto w-full mb-16">
              <div className="relative group">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-gold-500 transition-colors duration-300" size={32} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => QD(e.target.value)}
                  placeholder="Type to search talent..."
                  className="w-full bg-transparent border-b border-white/10 py-6 pl-16 pr-4 text-3xl md:text-5xl lg:text-6xl font-serif text-white placeholder:text-white/20 focus:outline-none focus:border-gold-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* Results Area */}
            <div className="flex-1 overflow-y-auto max-w-6xl mx-auto w-full no-scrollbar">
              
              {query === '' ? (
                 /* Empty State / Suggestions */
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center justify-center h-1/2 text-white/40"
                 >
                    <p className="uppercase tracking-[0.2em] text-sm mb-8">Popular Searches</p>
                    <div className="flex flex-wrap justify-center gap-4">
                       {['New Faces', 'Editorial', 'Runway', 'Los Angeles', 'Paris'].map((tag) => (
                          <button 
                            key={tag} 
                            onClick={() => QD(tag)}
                            className="px-6 py-3 border border-white/10 rounded-full hover:border-gold-500 hover:text-gold-500 transition-all duration-300 text-lg font-light"
                          >
                            {tag}
                          </button>
                       ))}
                    </div>
                 </motion.div>
              ) : (
                 /* Results Grid */
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredModels.length > 0 ? (
                      filteredModels.map((model, idx) => (
                        <motion.div
                          key={model.id}
                          layoutId={`search-result-${model.id}`}
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05, duration: 0.5 }}
                          onClick={() => handleModelClick(model)}
                          className="group cursor-pointer bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-gold-500/30 transition-all duration-500 p-4 flex gap-6 items-center rounded-lg"
                        >
                          <div className="w-24 h-24 overflow-hidden rounded-md flex-shrink-0">
                             <img src={model.image} alt={model.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" />
                          </div>
                          <div className="flex-1">
                             <h4 className="text-2xl font-serif text-white italic group-hover:text-gold-500 transition-colors">{model.name}</h4>
                             <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest mt-1">
                                <MapPin size={12} />
                                <span>{model.location}</span>
                             </div>
                          </div>
                          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
                             <ArrowRight size={16} className="text-gold-500" />
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-20">
                         <p className="text-2xl text-white/30 font-serif italic">No models found for "{query}"</p>
                      </div>
                    )}
                 </div>
              )}
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};