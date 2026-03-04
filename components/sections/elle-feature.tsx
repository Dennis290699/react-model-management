import React from 'react';
import { motion } from 'framer-motion';

export const ElleFeature: React.FC = () => {
  return (
    <section className="relative w-full h-[60vh] overflow-hidden my-20">
      <div
        className="absolute inset-0 bg-cover bg-center bg-scroll md:bg-fixed"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=2670&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-neutral-900/20" />
      </div>

      <div className="relative z-10 h-full flex items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, scale: 1.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-[120px] md:text-[200px] font-serif text-white font-bold tracking-tighter mix-blend-overlay"
        >
          ELLE
        </motion.h2>
      </div>
    </section>
  );
};