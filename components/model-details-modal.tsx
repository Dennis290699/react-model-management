import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Share2, Download, Ruler, Shirt, Footprints, Eye, Scissors, Activity, Star } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';

export const ModelDetailsModal: React.FC = () => {
  const { viewingModel, setViewingModel, toggleModelSelection, selectedModels } = useStore();

  if (!viewingModel) return null;

  const isSelected = selectedModels.includes(viewingModel.id);

  const stats = [
    { icon: <Ruler size={18} />, label: "Height", value: viewingModel.stats.height },
    { icon: <Shirt size={18} />, label: "Dress", value: viewingModel.stats.dress },
    { icon: <Activity size={18} />, label: "Bust", value: viewingModel.stats.bust },
    { icon: <Activity size={18} className="rotate-90" />, label: "Waist", value: viewingModel.stats.waist },
    { icon: <Activity size={18} />, label: "Hips", value: viewingModel.stats.hips },
    { icon: <Footprints size={18} />, label: "Shoe", value: viewingModel.stats.shoe },
    { icon: <Scissors size={18} />, label: "Hair", value: viewingModel.stats.hair },
    { icon: <Eye size={18} />, label: "Eyes", value: viewingModel.stats.eyes },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setViewingModel(null)}
          className="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-6xl h-full md:h-auto max-h-[90vh] bg-white dark:bg-neutral-900 overflow-hidden shadow-2xl flex flex-col md:flex-row rounded-xl"
        >
          {/* Close Button */}
          <button 
            onClick={() => setViewingModel(null)}
            className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors"
          >
            <X size={24} />
          </button>

          {/* Left: Image */}
          <div className="w-full md:w-1/2 h-[40vh] md:h-auto relative bg-neutral-200">
            <img 
              src={viewingModel.image} 
              alt={viewingModel.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
               {viewingModel.badges?.map((badge, idx) => (
                  <Badge key={idx} icon={<Star size={12}/>}>{badge}</Badge>
               ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
            
            <div className="flex flex-col h-full">
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-2">{viewingModel.name}</h2>
                <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                  <MapPin size={16} />
                  <span className="uppercase tracking-wider text-sm">{viewingModel.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 hover:border-gold-500/50 transition-colors group">
                    <div className="text-gold-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">{stat.label}</span>
                    <span className="font-semibold text-sm">{stat.value}</span>
                  </div>
                ))}
              </div>

              <div className="prose dark:prose-invert max-w-none mb-10">
                <h3 className="text-lg font-serif font-bold mb-4">About</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Professional fashion model with over 5 years of experience in runway and print. 
                  Known for versatility and high-energy performance. Available for international bookings.
                  Represented exclusively by La Angels Model Management.
                </p>
              </div>

              <div className="mt-auto flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="primary" 
                  size="lg"
                  className={cn("flex-1", isSelected ? "bg-neutral-800 dark:bg-neutral-700" : "")}
                  onClick={() => toggleModelSelection(viewingModel.id)}
                >
                  {isSelected ? "Remove from Selection" : "Add to Selection"}
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="lg" className="px-4">
                    <Share2 size={20} />
                  </Button>
                   <Button variant="outline" size="lg" className="px-4">
                    <Download size={20} />
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};