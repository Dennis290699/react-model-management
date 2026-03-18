import React from 'react';
import { Facebook, Twitter, Instagram, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-neutral-950 text-neutral-400 py-20 md:py-32 overflow-hidden border-t border-white/5">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none">
          <span className="text-[20vw] font-serif font-bold text-white/[0.02] leading-none whitespace-nowrap">
              ANGELS
          </span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 mb-20">
            {/* Brand Column */}
            <div className="md:col-span-6 lg:col-span-4 flex flex-col items-start">
               <div className="flex flex-col border border-white/10 p-6 bg-white/[0.02] backdrop-blur-sm mb-8 transition-colors hover:border-gold-500/30">
                  <span className="font-serif text-3xl text-white italic">La Angels</span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold-500 mt-1">Model Management</span>
               </div>
               <p className="text-neutral-500 text-sm leading-relaxed max-w-xs mb-8 font-light">
                  Defining the future of fashion through diverse talent and visionary management. Worldwide representation.
               </p>
               <div className="flex gap-4">
                  <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all duration-300 group">
                    <Facebook size={16} className="group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all duration-300 group">
                    <Twitter size={16} className="group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all duration-300 group">
                    <Instagram size={16} className="group-hover:scale-110 transition-transform" />
                  </a>
               </div>
            </div>

            {/* Links Columns */}
            <div className="md:col-span-3 lg:col-span-2">
                <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs mb-8 border-b border-white/10 pb-4 inline-block">Agency</h4>
                <ul className="space-y-4 text-sm font-light">
                   {['About Us', 'Our Team', 'Careers', 'Locations', 'Press'].map((item) => (
                      <li key={item}>
                        <a href="#" className="hover:text-gold-500 hover:translate-x-1 inline-block transition-all duration-300">{item}</a>
                      </li>
                   ))}
                </ul>
            </div>

            <div className="md:col-span-3 lg:col-span-2">
                <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs mb-8 border-b border-white/10 pb-4 inline-block">Talent</h4>
                <ul className="space-y-4 text-sm font-light">
                   {['Women', 'Men', 'New Faces', 'Direct', 'Become a Model'].map((item) => (
                      <li key={item}>
                        <a href="#" className="hover:text-gold-500 hover:translate-x-1 inline-block transition-all duration-300">{item}</a>
                      </li>
                   ))}
                </ul>
            </div>

             {/* Newsletter Column */}
             <div className="md:col-span-6 lg:col-span-4">
                <h4 className="text-white font-serif text-2xl italic mb-6">Stay in the loop</h4>
                <p className="text-neutral-500 text-sm mb-8 font-light">
                  Subscribe to receive updates, access to exclusive deals, and more.
                </p>
                <form className="relative group" onSubmit={(e) => e.preventDefault()}>
                   <input 
                     type="email" 
                     placeholder="Email Address" 
                     className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-gold-500 transition-colors pr-12 placeholder:text-neutral-600 font-light"
                   />
                   <button 
                    type="submit"
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-gold-500 transition-colors p-2"
                   >
                      <ArrowRight size={20} />
                   </button>
                </form>
             </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-neutral-600">
            <div className="flex gap-8">
               <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
               <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
            <p className="text-center md:text-right">Copyright © {currentYear} La Angels. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};