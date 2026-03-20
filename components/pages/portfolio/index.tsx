import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Model } from '../../../types';
import { PortfolioHeader } from './portfolio-header';
import { PortfolioHero } from './portfolio-hero';
import { PortfolioBio } from './portfolio-bio';
import { PortfolioGallery } from './portfolio-gallery';
import { PortfolioCTA } from './portfolio-cta';

export const ModelPortfolio: React.FC<{ model: Model }> = ({ model }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-neutral-50 dark:bg-neutral-950 min-h-screen relative z-[60]"
    >
      <PortfolioHeader model={model} />
      <PortfolioHero model={model} />
      <PortfolioBio model={model} />
      <PortfolioGallery model={model} />
      <PortfolioCTA model={model} />
    </motion.div>
  );
};