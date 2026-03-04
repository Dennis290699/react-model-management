import React from 'react';
import { motion } from 'framer-motion';
import { Camera, TrendingUp } from 'lucide-react';
import { Model } from '../../../types';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

interface PortfolioGalleryProps {
  model: Model;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ model }) => {
  
  // Use model's portfolio if available, otherwise fallback to main image for demo purposes
  // Ideally, all models should have a portfolio array in the data.
  const galleryImages = model.portfolio && model.portfolio.length >= 3 
    ? model.portfolio 
    : [model.image, model.image, model.image];

  const hasBrands = model.brands && model.brands.length > 0;
  const isNewFace = model.isNew || !hasBrands;

  return (
    <>
      {/* LUXURY BRANDS / NEW FACE EXPERIENCE */}
      <section className="py-20 max-w-[1600px] mx-auto">
        {!isNewFace ? (
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="relative border-y border-neutral-200 dark:border-neutral-800 py-16 px-6 bg-neutral-50/50 dark:bg-neutral-900/20"
           >
              <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-8">
                 <div>
                     <span className="text-gold-500 uppercase tracking-[0.3em] text-xs font-bold mb-2 block">Career Highlights</span>
                     <h2 className="text-4xl md:text-6xl font-serif font-bold text-neutral-900 dark:text-white">Selected Clients</h2>
                 </div>
                 <p className="text-neutral-500 max-w-sm text-sm leading-relaxed">
                   A curated selection of {model.name}'s most prestigious partnerships and runway appearances across the globe.
                 </p>
              </div>

              {/* Luxury Grid Layout */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-neutral-200 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
                 {model.brands?.map((brand, idx) => (
                    <div key={idx} className="aspect-[3/2] bg-white dark:bg-neutral-950 flex items-center justify-center p-8 group relative overflow-hidden">
                        {/* Hover Effect Background */}
                        <div className="absolute inset-0 bg-neutral-900 dark:bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-in-out" />
                        
                        {/* Text / Logo Simulation */}
                        <span className="relative z-10 text-xl md:text-2xl font-serif text-neutral-400 group-hover:text-white dark:group-hover:text-neutral-900 transition-colors duration-500 tracking-wider">
                            <span className={idx % 2 === 0 ? "font-serif italic" : "font-sans font-bold"}>
                                {brand}
                            </span>
                        </span>
                    </div>
                 ))}
              </div>
           </motion.div>
        ) : (
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="relative mx-6 rounded-3xl overflow-hidden min-h-[500px] flex items-center justify-center group"
           >
              {/* Artistic Background with Blur */}
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                style={{ backgroundImage: `url(${model.image})` }}
              />
              <div className="absolute inset-0 bg-neutral-900/60 dark:bg-neutral-950/70 backdrop-blur-[2px]" />
              
              {/* Noise Texture for Film Grain */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}></div>

              <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col md:flex-row items-center gap-12">
                 
                 {/* The "Card" */}
                 <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl w-full md:w-1/2 transform rotate-[-2deg] group-hover:rotate-0 transition-transform duration-500">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex flex-col">
                            <span className="text-white/60 text-[10px] uppercase tracking-widest">Category</span>
                            <span className="text-white font-bold text-xl">New Face</span>
                        </div>
                        <Camera className="text-white/80" size={24} />
                    </div>
                    <div className="h-px w-full bg-white/20 mb-6" />
                    <h3 className="text-3xl font-serif text-white mb-4">Undiscovered Potential</h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                        {model.name} brings a raw, authentic energy that cameras love. Currently in development and ready to define the next season's aesthetic.
                    </p>
                    <div className="flex gap-2">
                        <Badge className="bg-white/20 text-white hover:bg-white/30 border-0">Runway Ready</Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30 border-0">Editorial</Badge>
                    </div>
                 </div>

                 {/* The Call to Action */}
                 <div className="w-full md:w-1/2 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 mb-6 font-serif tracking-tighter">
                            FUTURE<br/>ICON.
                        </h2>
                        <Button className="bg-gold-500 text-white hover:bg-white hover:text-black border-none px-8 py-6 text-lg rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(212,163,115,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)]">
                            Request Casting Card
                        </Button>
                        <div className="mt-6 flex items-center justify-center md:justify-start gap-2 text-white/50 text-xs uppercase tracking-widest">
                            <TrendingUp size={14} />
                            <span>High demand expected</span>
                        </div>
                    </motion.div>
                 </div>
              </div>
           </motion.div>
        )}
      </section>

      {/* PARALLAX SEPARATOR */}
      <section className="relative w-full h-[60vh] overflow-hidden my-12 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${galleryImages[2] || model.image})` }} 
        >
          <div className="absolute inset-0 bg-gold-600/20 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 p-12 border border-white/30 backdrop-blur-sm">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-serif text-white font-bold tracking-tighter uppercase text-center"
          >
            Portfolio
          </motion.h2>
          <p className="text-center text-white/80 uppercase tracking-[0.3em] mt-4 text-sm">Selected Works 2024</p>
        </div>
      </section>

      {/* MAIN GALLERY */}
      <section className="py-24 px-6 max-w-[1600px] mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="flex flex-col gap-4 md:gap-8">
               <motion.div 
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6 }}
                 className="w-full aspect-[3/4] overflow-hidden rounded-sm"
               >
                 <img src={galleryImages[0]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Portfolio 1" />
               </motion.div>
               <motion.div 
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6 }}
                 className="w-full aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center rounded-sm"
               >
                  <div className="text-center p-8">
                    <p className="font-serif italic text-2xl mb-4 text-neutral-800 dark:text-neutral-200">"Fashion is the armor to survive the reality of everyday life."</p>
                    <p className="text-xs uppercase tracking-widest text-gold-500">— Bill Cunningham</p>
                  </div>
               </motion.div>
            </div>
            <div className="flex flex-col gap-4 md:gap-8 pt-0 md:pt-20">
               <motion.div 
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.2 }}
                 className="w-full aspect-[3/4] overflow-hidden rounded-sm"
               >
                 <img src={galleryImages[1]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Portfolio 2" />
               </motion.div>
               <motion.div 
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.2 }}
                 className="w-full aspect-square overflow-hidden rounded-sm"
               >
                 <img src={galleryImages[2]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Portfolio 3" />
               </motion.div>
            </div>
         </div>
      </section>
    </>
  );
};
