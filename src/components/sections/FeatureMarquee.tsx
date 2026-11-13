import React from 'react';
import { MARQUEE_ITEMS } from '../../data/features';

export const FeatureMarquee: React.FC = () => {
  // Duplicar a lista para permitir efeito de loop contínuo
  const displayItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      id="recursos"
      className="relative py-4 bg-blush/60 border-y border-magenta/15 overflow-hidden select-none group"
      aria-label="Destaques dos recursos do sistema"
    >
      {/* Sombreamento lateral para fade suave */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-ivory to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-ivory to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {displayItems.map((item, index) => (
          <div key={index} className="flex items-center mx-5 sm:mx-8">
            <span className="text-sm sm:text-base font-semibold text-plum tracking-wide whitespace-nowrap">
              {item}
            </span>
            {/* Separador em losango dourado */}
            <span
              className="ml-5 sm:ml-8 w-2 h-2 rotate-45 bg-gradient-to-tr from-gold-dark via-gold-light to-gold-dark shadow-sm inline-block flex-shrink-0"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
