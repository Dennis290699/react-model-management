import React, { useState, useEffect } from 'react';
import { Menu, Search, Sun, Moon, X, Briefcase } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { CategoryType } from '../../types';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, selectedModels, setIsSearchOpen, setIsCastingOpen } = useStore();
  const location = useLocation();

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body scroll locking when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks: { name: string; view: CategoryType }[] = [
    { name: 'Women', view: 'women' },
    { name: 'Men', view: 'men' },
    { name: 'New Faces', view: 'new-faces' },
    { name: 'Direct', view: 'direct' },
    { name: 'Curve', view: 'curve' },
    { name: 'Creatives', view: 'creatives' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out border-b border-transparent",
          isScrolled
            ? "bg-white/95 md:bg-white/80 dark:bg-neutral-950/95 md:dark:bg-neutral-950/80 md:backdrop-blur-md py-4 border-neutral-200/50 dark:border-white/5"
            : "bg-transparent py-6 md:py-8"
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* Logo */}
          <div className="flex-shrink-0 z-50 relative">
            <Link to="/" onClick={handleLogoClick} className="group flex flex-col items-center justify-center relative">
              <span className={cn(
                "font-serif text-2xl md:text-3xl leading-none italic tracking-tight transition-colors duration-300",
                isScrolled ? "text-neutral-900 dark:text-white" : "text-white"
              )}>
                La Angels
              </span>
              {/* Micro subtext animation */}
              <span className={cn(
                "absolute -bottom-3 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-[0.35em] font-medium transition-all duration-500 opacity-0 group-hover:opacity-100 whitespace-nowrap",
                isScrolled ? "text-gold-500" : "text-gold-400"
              )}>
                Management
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-12 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={`/${link.view}`}
                onClick={() => handleNavClick()}
                className={cn(
                  "relative text-[10px] uppercase tracking-[0.25em] font-medium transition-colors duration-300 group py-2",
                  isScrolled ? "text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white" : "text-white/80 hover:text-white",
                  location.pathname === `/${link.view}` && "text-gold-500 dark:text-gold-500"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-[1px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center",
                  isScrolled ? "bg-gold-500" : "bg-white"
                )} />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-6 z-50">
            <button onClick={toggleTheme} className={cn("hidden md:block transition-colors duration-300 hover:text-gold-500", isScrolled ? "text-neutral-900 dark:text-white" : "text-white")}>
              {theme === 'dark' ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
            </button>

            <button
              onClick={() => setIsSearchOpen(true)}
              className={cn("transition-colors duration-300 hover:text-gold-500", isScrolled ? "text-neutral-900 dark:text-white" : "text-white")}
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            <div
              className="relative group cursor-pointer pl-4 md:border-l border-white/20"
              onClick={() => setIsCastingOpen(true)}
            >
              <div className="flex items-center gap-3">
                <span className={cn("text-[10px] uppercase tracking-widest font-medium hidden xl:block", isScrolled ? "text-neutral-900 dark:text-white" : "text-white")}>
                  Casting
                </span>
                <div className="relative">
                  <Briefcase size={18} strokeWidth={1.5} className={cn("transition-colors group-hover:text-gold-500", isScrolled ? "text-neutral-900 dark:text-white" : "text-white")} />
                  {selectedModels.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(212,163,115,0.8)]" />
                  )}
                </div>
              </div>
            </div>

            <button
              className={cn("lg:hidden transition-colors ml-2", isScrolled ? "text-neutral-900 dark:text-white" : "text-white")}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] bg-neutral-950 flex flex-col overflow-hidden"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8 border-b border-white/5">
              {/* Logo in Mobile Menu */}
              <div className="flex flex-col items-start justify-center" onClick={handleLogoClick}>
                <span className="font-serif text-2xl text-white italic">La Angels</span>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/80 hover:text-gold-500 transition-colors p-2"
                aria-label="Close menu"
              >
                <X size={28} strokeWidth={1.5} />
              </button>
            </div>

            {/* Background Branding Decor */}
            <div className="absolute bottom-0 right-0 p-8 opacity-[0.03] pointer-events-none select-none">
              <span className="text-[25vh] font-serif leading-none text-white font-bold">LA</span>
            </div>

            {/* Menu Content */}
            <div className="flex-1 flex flex-col px-8 md:px-20 relative z-10 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="py-8 mt-auto mb-auto">
                <nav className="flex flex-col gap-6 md:gap-8 mb-10">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (i * 0.05), duration: 0.5 }}
                    >
                      <Link
                        to={`/${link.view}`}
                        onClick={() => handleNavClick()}
                        className="text-4xl md:text-6xl font-serif text-white/80 hover:text-gold-500 transition-colors tracking-wide italic group flex items-center gap-4 text-left block w-full"
                      >
                        <span className="w-0 group-hover:w-8 h-px bg-gold-500 transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-white/10 pt-10 text-white/60">
                  <div>
                    <h4 className="text-gold-500 text-xs uppercase tracking-widest mb-4">Contact</h4>
                    <p className="text-base font-light mb-1 text-white">info@laangels.com</p>
                    <p className="text-base font-light text-white">+1 (555) 000-0000</p>
                  </div>
                  <div>
                    <h4 className="text-gold-500 text-xs uppercase tracking-widest mb-4">Follow Us</h4>
                    <div className="flex gap-8 text-base font-light">
                      <a href="#" className="text-white hover:text-gold-500 transition-colors">Instagram</a>
                      <a href="#" className="text-white hover:text-gold-500 transition-colors">Twitter</a>
                      <a href="#" className="text-white hover:text-gold-500 transition-colors">LinkedIn</a>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <button
                      onClick={toggleTheme}
                      className="flex items-center gap-3 text-white hover:text-gold-500 transition-colors"
                    >
                      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                      <span className="text-xs uppercase tracking-widest">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
