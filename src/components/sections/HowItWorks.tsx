import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Sliders, Share2, Check } from 'lucide-react';
import { TIMELINE_CONTENT } from '../../data/content';
import { SectionHeading } from '../ui/SectionHeading';

export const HowItWorks: React.FC = () => {
  const icons = [
    <Sparkles className="w-5 h-5 text-gold-dark" />,
    <Sliders className="w-5 h-5 text-magenta" />,
    <Share2 className="w-5 h-5 text-emerald-600" />,
  ];

  return (
    <section
      id="como-funciona"
      className="py-24 sm:py-32 bg-blush/30 relative grain-overlay overflow-hidden"
      aria-label="Como funciona o sistema em 3 passos"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline={TIMELINE_CONTENT.overline}
          title={TIMELINE_CONTENT.title}
          subtitle="Sem implantação demorada. Você começa hoje e já atende com agenda online amanhã."
        />

        {/* Linha do Tempo: Horizontal no Desktop, Vertical no Mobile */}
        <div className="relative mt-12 sm:mt-16">
          {/* Linha dourada contínua no desktop */}
          <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-[2px] bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark -translate-y-12 z-0 opacity-40" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 relative z-10">
            {TIMELINE_CONTENT.steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-card p-8 border border-magenta/15 shadow-rose-card hover:shadow-rose-hover transition-all duration-300 flex flex-col justify-between relative group"
              >
                <div>
                  {/* Topo do Card: Número grande em Fraunces com contorno dourado + Ícone fino */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-5xl font-light text-gold-dark select-none tabular-nums group-hover:scale-105 transition-transform">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-ivory border border-magenta/10 flex items-center justify-center shadow-xs">
                      {icons[idx]}
                    </div>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-plum mb-3 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-sm text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-magenta/10 flex items-center gap-1.5 text-xs font-semibold text-magenta">
                  <Check className="w-3.5 h-3.5" />
                  <span>Passo {step.number} garantido</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
