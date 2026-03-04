import React, { useState } from 'react';
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Link as LinkIcon, FileDown, Loader2 } from 'lucide-react';
import { useStore } from '../../../store/useStore';
import { cn } from '../../../lib/utils';
import { Model } from '../../../types';

export const PortfolioHeader: React.FC = () => {
  const { setViewingModel, viewingModel } = useStore();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareTooltip(true);
    setTimeout(() => setShowShareTooltip(false), 2000);
  };

  /**
   * Generates a cinematic, high-fashion comp card on the fly using HTML5 Canvas.
   * This adds branding, stats, and a luxury overlay to the clean image.
   */
  const generateCinematicCompCard = async (model: Model): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject('Canvas not supported');
        return;
      }

      // Set High Resolution Dimensions (Standard Comp Card Ratio 2:3)
      const width = 1200;
      const height = 1800;
      canvas.width = width;
      canvas.height = height;

      const img = new Image();
      img.crossOrigin = "anonymous"; // Important for CORS
      // Use compCard if available, else clean image
      img.src = model.compCard || model.image;

      img.onload = () => {
        // 1. Draw Image (Simulate object-cover)
        const scale = Math.max(width / img.width, height / img.height);
        const x = (width / 2) - (img.width / 2) * scale;
        const y = (height / 2) - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

        // 2. Cinematic Filters (Vignette & Gradient)
        // Global darkened overlay for "mood"
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; 
        ctx.fillRect(0, 0, width, height);

        // Bottom Gradient for Text Legibility
        const gradient = ctx.createLinearGradient(0, height * 0.6, 0, height);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(1, "rgba(0,0,0,0.95)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, height * 0.6, width, height * 0.4);

        // Top Vignette for Logo
        const topGradient = ctx.createLinearGradient(0, 0, 0, height * 0.2);
        topGradient.addColorStop(0, "rgba(0,0,0,0.6)");
        topGradient.addColorStop(1, "transparent");
        ctx.fillStyle = topGradient;
        ctx.fillRect(0, 0, width, height * 0.2);

        // 3. Editorial Frame (Thin border)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 2;
        ctx.strokeRect(40, 40, width - 80, height - 80);

        // 4. Branding (Top Center)
        ctx.textAlign = "center";
        ctx.fillStyle = "#D4A373"; // Gold color
        ctx.font = "bold 24px 'Manrope', sans-serif";
        ctx.letterSpacing = "10px"; 
        ctx.fillText("LA ANGELS", width / 2, 90);
        
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.font = "14px 'Manrope', sans-serif";
        ctx.fillText("MODEL MANAGEMENT", width / 2, 115);

        // 5. Typography (Bottom Left)
        ctx.textAlign = "left";
        
        // Model Name - Big Serif
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 20;
        ctx.fillStyle = "#ffffff";
        ctx.font = "italic bold 120px 'Playfair Display', serif";
        ctx.letterSpacing = "0px";
        ctx.fillText(model.name, 60, height - 250);

        // Separator Line - Slim Gold
        ctx.fillStyle = "#D4A373"; 
        ctx.fillRect(60, height - 215, 80, 3);

        // Category & Location - Clean Aesthetic Sans
        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.font = "300 36px 'Manrope', sans-serif"; // Light weight for elegance
        ctx.letterSpacing = "8px"; // Wide cinematic spacing
        
        const categoryDisplay = (model.category || '').replace(/-/g, ' ').toUpperCase();
        const locationDisplay = (model.location || '').toUpperCase();
        const infoLine = `${categoryDisplay}   •   ${locationDisplay}`;
        
        ctx.fillText(infoLine, 60, height - 150);

        // Contact / Footer - Discreet
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.font = "400 22px 'Manrope', sans-serif";
        ctx.letterSpacing = "3px";
        ctx.fillText("BOOKINGS@LAANGELS.COM  |  LOS ANGELES  |  PARIS", 60, height - 80);

        resolve(canvas.toDataURL('image/jpeg', 0.95));
      };

      img.onerror = (err) => {
        reject(err);
      };
    });
  };

  const handleDownload = async () => {
    if (!viewingModel) return;

    setIsDownloading(true);

    try {
      // Generate the styled image
      const dataUrl = await generateCinematicCompCard(viewingModel);
      
      const filename = `La-Angels-${viewingModel.name.replace(/\s+/g, '-')}-Comp-Card.jpg`;
      
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to generate comp card:', error);
      // Fallback to raw image if canvas fails (e.g. strict CORS on image)
      const link = document.createElement('a');
      link.href = viewingModel.compCard || viewingModel.image;
      link.download = `La-Angels-${viewingModel.name}-Raw.jpg`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <motion.div 
        className={cn(
          "fixed top-0 left-0 right-0 z-[60] flex justify-between items-center transition-all duration-500 ease-out",
          isScrolled 
            ? "py-4 px-6 md:px-12 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200/50 dark:border-white/5 shadow-sm" 
            : "py-6 px-6 md:px-12 bg-transparent"
        )}
      >
        {/* Left: Back Navigation */}
        <button 
          onClick={() => setViewingModel(null)}
          className="group flex items-center gap-3 relative z-10 focus:outline-none"
        >
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border",
            isScrolled 
              ? "border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800" 
              : "border-white/20 text-white bg-black/10 backdrop-blur-sm group-hover:bg-white group-hover:text-black group-hover:border-white"
          )}>
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          </div>
          <div className={cn(
            "flex flex-col items-start transition-opacity duration-300",
            isScrolled ? "text-neutral-900 dark:text-white" : "text-white"
          )}>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-50 group-hover:opacity-100 transition-opacity">
              Return
            </span>
            <span className={cn(
               "text-xs font-serif italic hidden md:block opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75",
               isScrolled ? "text-neutral-600 dark:text-neutral-400" : "text-white/80"
            )}>
               To Casting Board
            </span>
          </div>
        </button>

        {/* Center: Brand (Visible only on scroll for context) */}
        <div className={cn(
            "absolute left-1/2 -translate-x-1/2 transition-all duration-500 flex flex-col items-center pointer-events-none",
            isScrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}>
           <span className="font-serif italic text-xl text-neutral-900 dark:text-white">La Angels</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 relative z-10">
          
          {/* Share Button */}
          <div className="relative">
             <button 
               onClick={handleShare}
               className={cn(
                 "flex items-center gap-2 px-4 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-300 border focus:outline-none",
                 isScrolled
                    ? "border-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                    : "border-white/20 bg-black/10 backdrop-blur-sm text-white hover:bg-white hover:text-black hover:border-white"
               )}
             >
               <span className="hidden md:inline">Share</span>
               {showShareTooltip ? <Check size={14} /> : <LinkIcon size={14} />}
             </button>
             
             {/* Tooltip */}
             <AnimatePresence>
                {showShareTooltip && (
                    <motion.div
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: 10 }}
                       className="absolute top-full right-0 mt-3 px-3 py-1.5 bg-neutral-900 text-white text-[10px] uppercase tracking-wider rounded shadow-lg whitespace-nowrap"
                    >
                       Link Copied
                    </motion.div>
                )}
             </AnimatePresence>
          </div>

          {/* Download Button */}
          <button 
             onClick={handleDownload}
             disabled={isDownloading}
             className={cn(
                 "flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-300 border focus:outline-none shadow-sm hover:shadow-md",
                 isScrolled
                    ? "bg-neutral-900 text-white border-neutral-900 hover:bg-gold-500 hover:border-gold-500 dark:bg-white dark:text-black dark:hover:bg-gold-500"
                    : "bg-white text-black border-white hover:bg-gold-500 hover:border-gold-500 hover:text-white",
                 isDownloading && "opacity-80 cursor-wait"
             )}
          >
             <span className="hidden md:inline">{isDownloading ? "Generating..." : "Comp Card"}</span>
             {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <FileDown size={14} />}
          </button>
        </div>
      </motion.div>
    </>
  );
};