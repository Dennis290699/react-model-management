import React from 'react';
import { ModelCard } from '../model-card';
import { models } from '../../data/mock-models';

export const PopularModels: React.FC = () => {
  return (
    <section className="py-20 px-6 max-w-[1600px] mx-auto">
      <div className="mb-12 border-l-2 border-gold-500 pl-6">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 dark:text-white mb-2">
          Featured Talent
        </h2>
        <p className="text-sm text-neutral-500 max-w-lg font-medium uppercase tracking-wide">
          Mainboard • Development • Direct
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {models.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
    </section>
  );
};