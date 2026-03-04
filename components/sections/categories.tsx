import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  { title: "Mainboard", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" },
  { title: "Curve", image: "./images/curve.jpg" },
  { title: "New Faces", image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1000&auto=format&fit=crop" },
  { title: "Men", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2670&auto=format&fit=crop" }
];

export const Categories: React.FC = () => {
  return (
    <section className="py-20 px-6 max-w-[1600px] mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-white mb-3">
          Our Divisions
        </h2>
        <p className="text-sm text-neutral-500">
          Scouting and representing the best talent across all categories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="group relative h-[400px] overflow-hidden cursor-pointer"
          >
            <img
              src={cat.image}
              alt={cat.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 md:grayscale group-hover:grayscale-0 will-change-transform"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-3xl text-white font-serif uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{cat.title}</h3>
                <p className="text-white/70 text-xs tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-2">View Board</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};