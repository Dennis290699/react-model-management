import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Send, UserMinus, Check, Loader2, ArrowLeft, Building2, Mail, ArrowRight, Info } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { models } from '../../data/mock-models';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

export const CastingOverlay: React.FC = () => {
  const { isCastingOpen, setIsCastingOpen, selectedModels, toggleModelSelection, setViewingModel, clearSelection } = useStore();
  
  // State for flow management: list -> brand -> email
  const [step, setStep] = useState<'list' | 'brand' | 'email'>('list');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({ brand: '', email: '' });
  const [errors, setErrors] = useState({ brand: false, email: false });
  
  const brandInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Scroll lock
  useEffect(() => {
    if (isCastingOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isCastingOpen]);

  // Focus management
  useEffect(() => {
      if (step === 'brand' && brandInputRef.current) {
          setTimeout(() => brandInputRef.current?.focus(), 100);
      }
      if (step === 'email' && emailInputRef.current) {
          setTimeout(() => emailInputRef.current?.focus(), 100);
      }
  }, [step]);

  // Reset state when opening/closing
  useEffect(() => {
    if (!isCastingOpen) {
        // Delay reset slightly to allow exit animation to finish
        const timer = setTimeout(() => {
            setStep('list');
            setIsSuccess(false);
            setIsSending(false);
            setFormData({ brand: '', email: '' });
            setErrors({ brand: false, email: false });
        }, 500);
        return () => clearTimeout(timer);
    }
  }, [isCastingOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSending && !isSuccess) setIsCastingOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setIsCastingOpen, isSending, isSuccess]);

  // Retrieve full model objects from IDs
  const selectionList = models.filter(m => selectedModels.includes(m.id));

  // --- Navigation Handlers ---

  const handleStartInquiry = () => {
      if (selectionList.length > 0) setStep('brand');
  };

  const handleBack = () => {
      if (step === 'email') setStep('brand');
      else if (step === 'brand') setStep('list');
      else setStep('list');
  };

  const handleBrandNext = (e?: React.FormEvent) => {
      e?.preventDefault();
      if (formData.brand.trim() === '') {
          setErrors({ ...errors, brand: true });
          return;
      }
      setErrors({ ...errors, brand: false });
      setStep('email');
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    // Validate Email
    if (formData.email.trim() === '' || !formData.email.includes('@')) {
        setErrors({ ...errors, email: true });
        return;
    }
    setErrors({ ...errors, email: false });

    setIsSending(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSending(false);
    setIsSuccess(true);

    // Wait to show success message then close and clear
    setTimeout(() => {
        setIsCastingOpen(false);
        setTimeout(() => {
            clearSelection();
        }, 500); 
    }, 3000);
  };

  // Helper text logic
  const getStepTitle = () => {
      if (step === 'list') return 'Casting Board';
      return 'Inquiry Details';
  };

  const getStepSubtitle = () => {
      if (step === 'list') return 'Manage your shortlist for inquiry.';
      if (step === 'brand') return 'Step 1 of 2: Brand Identity';
      if (step === 'email') return 'Step 2 of 2: Contact Information';
      return '';
  };

  return (
    <AnimatePresence>
      {isCastingOpen && (
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
              CASTING
            </span>
          </div>

          {/* Header Controls */}
          <div className="absolute top-8 right-8 z-50 flex items-center gap-6">
             {!isSuccess && (
                 <>
                    <div className="hidden md:flex flex-col items-end text-white/50 text-xs uppercase tracking-widest font-medium">
                        <span>Current Selection</span>
                        <span className="text-white">{selectionList.length} Models</span>
                    </div>
                    <div className="h-8 w-px bg-white/10 hidden md:block"></div>
                 </>
             )}
             <button 
                onClick={() => !isSending && setIsCastingOpen(false)}
                className={cn(
                    "text-white/50 hover:text-white transition-colors p-2 hover:rotate-90 duration-500",
                    (isSending || isSuccess) && "opacity-0 pointer-events-none"
                )}
            >
                <X size={40} strokeWidth={1} />
            </button>
          </div>

          <div className="container mx-auto px-6 h-full flex flex-col pt-24 md:pt-32 pb-8 relative z-10">
            
            {/* Dynamic Content based on Steps */}
            <AnimatePresence mode="wait">
                
                {/* STATE 1: SUCCESS MESSAGE */}
                {isSuccess ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex-1 flex flex-col items-center justify-center text-center"
                    >
                        <motion.div 
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="w-24 h-24 rounded-full bg-green-500 text-black flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(34,197,94,0.4)]"
                        >
                            <Check size={48} strokeWidth={3} />
                        </motion.div>
                        <h3 className="font-serif text-3xl md:text-6xl italic text-white mb-4">Request Received</h3>
                        <p className="text-white/60 font-light max-w-lg text-base md:text-lg">
                            Thank you, <span className="text-white font-medium">{formData.brand}</span>. Our casting team has received your inquiry for {selectionList.length} talents and will contact <span className="text-white border-b border-white/20">{formData.email}</span> shortly.
                        </p>
                    </motion.div>
                ) : (
                    
                    /* STATE 2, 3, 4: LIST -> BRAND -> EMAIL */
                    <div className="flex flex-col h-full">
                        
                        {/* Header Area */}
                        <div className="mb-6 md:mb-8 border-b border-white/10 pb-4 md:pb-6 flex justify-between items-end shrink-0">
                            <div>
                                <h2 className="text-3xl md:text-6xl font-serif text-white italic">
                                    {getStepTitle()}
                                </h2>
                                <p className="text-neutral-400 mt-2 font-light text-sm md:text-base">
                                    {getStepSubtitle()}
                                </p>
                            </div>
                            
                            {step === 'list' && selectionList.length > 0 && (
                                <button 
                                    onClick={clearSelection}
                                    className="text-xs uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors flex items-center gap-2 mb-2"
                                >
                                    <Trash2 size={14} /> <span className="hidden md:inline">Clear All</span>
                                </button>
                            )}

                            {step !== 'list' && (
                                <button 
                                    onClick={handleBack}
                                    disabled={isSending}
                                    className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors flex items-center gap-2 mb-2 disabled:opacity-50"
                                >
                                    <ArrowLeft size={14} /> Back
                                </button>
                            )}
                        </div>

                        {/* Main Body */}
                        <div className="flex-1 overflow-y-auto pr-2 no-scrollbar relative flex flex-col">
                            {step === 'list' ? (
                                /* LIST VIEW */
                                <motion.div
                                    key="list-view"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="h-full"
                                >
                                    {selectionList.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-full text-white/30">
                                            <span className="text-6xl mb-6 font-serif opacity-20">00</span>
                                            <p className="uppercase tracking-[0.2em] text-sm mb-8">Your casting board is empty</p>
                                            <Button 
                                                variant="outline" 
                                                onClick={() => setIsCastingOpen(false)}
                                                className="border-white/20 text-white hover:bg-white hover:text-black"
                                            >
                                                Browse Talent
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 gap-4">
                                            {selectionList.map((model, idx) => (
                                                <div
                                                    key={model.id}
                                                    className="group flex flex-col md:flex-row items-center gap-6 bg-white/[0.02] border border-white/5 p-4 rounded-lg hover:bg-white/[0.05] transition-colors"
                                                >
                                                    <div 
                                                        className="w-full md:w-24 h-32 md:h-24 overflow-hidden rounded cursor-pointer relative flex-shrink-0"
                                                        onClick={() => {
                                                            setViewingModel(model);
                                                            setIsCastingOpen(false);
                                                        }}
                                                    >
                                                        <img src={model.image} alt={model.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                                    </div>
                                                    <div className="flex-1 text-center md:text-left">
                                                        <h3 className="text-2xl font-serif text-white italic">{model.name}</h3>
                                                        <div className="text-xs text-white/40 uppercase tracking-widest mt-1">{model.location}</div>
                                                    </div>
                                                    <button 
                                                        onClick={() => toggleModelSelection(model.id)}
                                                        className="p-3 rounded-full hover:bg-white/10 text-white/40 hover:text-red-400 transition-colors"
                                                    >
                                                        <UserMinus size={20} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ) : (
                                /* FORM WIZARD VIEWS */
                                <motion.div
                                    key="wizard-view"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="w-full max-w-3xl mx-auto flex flex-col justify-center min-h-[50vh] md:min-h-full py-4 md:py-8"
                                >
                                    <AnimatePresence mode="wait">
                                        {step === 'brand' && (
                                            <motion.div
                                                key="brand-step"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="w-full"
                                            >
                                                <form onSubmit={handleBrandNext} className="flex flex-col gap-8">
                                                    <div className="group relative">
                                                        <label className="text-gold-500 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-2 mb-4 md:mb-6">
                                                            <Building2 size={14} /> Who are we working with?
                                                        </label>
                                                        <div className="relative">
                                                            <input 
                                                                ref={brandInputRef}
                                                                type="text" 
                                                                value={formData.brand}
                                                                onChange={(e) => {
                                                                    setFormData({...formData, brand: e.target.value});
                                                                    setErrors({...errors, brand: false});
                                                                }}
                                                                placeholder="Agency or Brand Name"
                                                                className={cn(
                                                                    "w-full bg-transparent border-b py-2 md:py-4 text-3xl md:text-6xl font-serif text-white placeholder:text-white/10 focus:outline-none focus:border-gold-500 transition-all",
                                                                    errors.brand ? "border-red-500/50" : "border-white/20"
                                                                )}
                                                                autoFocus
                                                            />
                                                        </div>
                                                        {errors.brand && (
                                                            <motion.span 
                                                                initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                                                                className="text-red-400 text-xs mt-3 block font-medium"
                                                            >
                                                                Please enter a brand or agency name
                                                            </motion.span>
                                                        )}
                                                    </div>
                                                </form>
                                            </motion.div>
                                        )}

                                        {step === 'email' && (
                                            <motion.div
                                                key="email-step"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="w-full"
                                            >
                                                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                                                    <div className="group relative">
                                                        <label className="text-gold-500 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-2 mb-4 md:mb-6">
                                                            <Mail size={14} /> Where should we send the package?
                                                        </label>
                                                        <div className="relative">
                                                            <input 
                                                                ref={emailInputRef}
                                                                type="email" 
                                                                value={formData.email}
                                                                onChange={(e) => {
                                                                    setFormData({...formData, email: e.target.value});
                                                                    setErrors({...errors, email: false});
                                                                }}
                                                                placeholder="official@company.com"
                                                                className={cn(
                                                                    "w-full bg-transparent border-b py-2 md:py-4 text-3xl md:text-6xl font-serif text-white placeholder:text-white/10 focus:outline-none focus:border-gold-500 transition-all",
                                                                    errors.email ? "border-red-500/50" : "border-white/20"
                                                                )}
                                                                autoFocus
                                                            />
                                                        </div>
                                                        {errors.email && (
                                                            <motion.span 
                                                                initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                                                                className="text-red-400 text-xs mt-3 block font-medium"
                                                            >
                                                                Please enter a valid email address
                                                            </motion.span>
                                                        )}
                                                    </div>

                                                    <div className="bg-white/5 p-4 md:p-6 rounded-lg border border-white/5 flex gap-4 items-start mt-6 animate-in fade-in slide-in-from-bottom-4">
                                                        <div className="h-8 w-8 bg-gold-500/20 rounded-full items-center justify-center flex-shrink-0 text-gold-500 flex mt-1">
                                                            <Info size={16} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-white text-sm font-medium mb-1">Inquiry Summary</p>
                                                            <p className="text-white/50 text-xs font-light leading-relaxed">
                                                                <span className="text-white">{formData.brand}</span> is requesting availability for <span className="text-white">{selectionList.length} talents</span>.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </form>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )}
                        </div>

                        {/* Footer / Actions */}
                        <div className="mt-4 pt-6 md:mt-8 md:pt-8 border-t border-white/10 shrink-0">
                            {step === 'list' ? (
                                selectionList.length > 0 && (
                                    <motion.div 
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        className="flex flex-col md:flex-row justify-between items-center gap-6"
                                    >
                                        <div className="text-white/60 text-sm font-light text-center md:text-left">
                                            <p className="text-white mb-1">Ready to proceed?</p>
                                            <p className="text-xs">Start your inquiry to request rates.</p>
                                        </div>
                                        <Button 
                                            onClick={handleStartInquiry}
                                            className="h-14 md:h-16 px-8 md:px-12 bg-white text-black hover:bg-gold-500 hover:text-white text-xs uppercase tracking-[0.2em] font-bold rounded-full w-full md:w-auto transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                        >
                                            <span className="flex items-center gap-3">
                                                Start Inquiry <ArrowRight size={16} />
                                            </span>
                                        </Button>
                                    </motion.div>
                                )
                            ) : (
                                <div className="flex justify-end">
                                    {step === 'brand' ? (
                                        <Button 
                                            onClick={() => handleBrandNext()}
                                            className="h-14 md:h-16 px-8 md:px-12 bg-white text-black hover:bg-gold-500 hover:text-white text-xs uppercase tracking-[0.2em] font-bold rounded-full w-full md:w-auto transition-all duration-300"
                                        >
                                            <span className="flex items-center gap-3">
                                                Next Step <ArrowRight size={16} />
                                            </span>
                                        </Button>
                                    ) : (
                                        <Button 
                                            onClick={() => handleSubmit()}
                                            disabled={isSending}
                                            className={cn(
                                                "h-14 md:h-16 px-8 md:px-12 bg-gold-500 hover:bg-white hover:text-neutral-900 text-white text-xs uppercase tracking-[0.2em] font-bold rounded-full w-full md:w-auto transition-all duration-300 shadow-[0_0_30px_rgba(212,163,115,0.2)]",
                                                isSending && "opacity-80 cursor-not-allowed bg-neutral-800 text-white/50"
                                            )}
                                        >
                                            {isSending ? (
                                                <span className="flex items-center gap-3">
                                                    <Loader2 size={18} className="animate-spin" /> Processing...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-3">
                                                    Send Request <Send size={16} />
                                                </span>
                                            )}
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>

                    </div>
                )}
            </AnimatePresence>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};