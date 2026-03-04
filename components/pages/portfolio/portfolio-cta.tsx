import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Briefcase, Download } from 'lucide-react';
import { Model } from '../../../types';
import { Button } from '../../ui/button';
import { useStore } from '../../../store/useStore';
import { cn } from '../../../lib/utils';

interface PortfolioCTAProps {
  model: Model;
}

export const PortfolioCTA: React.FC<PortfolioCTAProps> = ({ model }) => {
  const { toggleModelSelection, selectedModels } = useStore();
  const isSelected = selectedModels.includes(model.id);

  return (
    <section className="relative py-32 bg-neutral-950 overflow-hidden">
         {/* Abstract Background Elements */}
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>
         <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}></div>
         
         {/* Large Background Typography */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none">
             <span className="text-[18vw] font-serif font-bold text-white/[0.03] leading-none whitespace-nowrap blur-sm">
                 BOOKING
             </span>
         </div>

         <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto bg-neutral-900/40 backdrop-blur-xl border border-white/10 p-8 md:p-20 rounded-3xl text-center shadow-2xl relative overflow-hidden">
                {/* Decorative sheen */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold-500/20 rounded-full blur-[80px]"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px]"></div>

                <motion.div
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.8 }}
                   className="relative z-10"
                >
                    <span className="inline-flex items-center gap-2 text-gold-500 text-xs md:text-sm uppercase tracking-[0.4em] font-bold mb-8 border border-gold-500/30 px-4 py-2 rounded-full bg-gold-500/5">
                        <Sparkles size={14} />
                        Official Representation
                    </span>
                    
                    <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight">
                        Create something iconic with <br/>
                        <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">{model.name}</span>
                    </h2>

                    <p className="text-neutral-400 mb-12 max-w-lg mx-auto leading-relaxed font-light text-base md:text-lg">
                        Our booking team is ready to assist with casting availability, rates, and travel logistics for your next campaign.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Button 
                           onClick={() => toggleModelSelection(model.id)}
                           className={cn(
                               "h-14 px-10 text-xs uppercase tracking-[0.2em] font-bold transition-all duration-500 w-full md:w-auto rounded-full",
                               isSelected 
                                   ? "bg-white text-black hover:bg-neutral-200" 
                                   : "bg-gold-500 hover:bg-gold-600 text-white hover:shadow-[0_0_40px_rgba(212,163,115,0.4)] hover:scale-105"
                           )}
                        >
                            <Briefcase className="mr-2 w-4 h-4" />
                            {isSelected ? "Remove from List" : "Request Booking"}
                        </Button>
                        
                        <Button 
                            variant="outline" 
                            className="h-14 px-10 text-xs uppercase tracking-[0.2em] font-bold border-white/20 text-white hover:bg-white hover:text-black w-full md:w-auto rounded-full group"
                        >
                            <Download className="mr-2 w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                            Comp Card
                        </Button>
                    </div>

                    <div className="mt-16 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-8 text-neutral-500 text-xs uppercase tracking-widest">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-gold-500">
                                <span className="font-serif italic font-bold text-lg">A</span>
                            </div>
                            <div className="text-left">
                                <span className="block text-gold-500 mb-0.5 font-bold">Direct Agent</span>
                                <span className="text-neutral-300">Sarah Miller</span>
                            </div>
                         </div>
                         <div className="hidden md:block w-px h-10 bg-white/10 mx-4"></div>
                         <div className="text-left">
                            <span className="block text-gold-500 mb-0.5 font-bold">Inquiries</span>
                            <span className="text-neutral-300">bookings@la-angels.com</span>
                         </div>
                    </div>
                </motion.div>
            </div>
         </div>
      </section>
  );
};