import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, AlertCircle } from 'lucide-react';
import { PAIN_POINTS_CONTENT } from '../../data/content';
import { SectionHeading } from '../ui/SectionHeading';

export const PainPoints: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="py-24 sm:py-32 bg-ivory relative grain-overlay overflow-hidden"
      aria-label="Desafios da rotina de nail design"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline={PAIN_POINTS_CONTENT.overline}
          title={PAIN_POINTS_CONTENT.title}
          subtitle="A rotina de atender e gerenciar ao mesmo tempo cobra um preço alto todo final de mês."
          align="left"
        />

        {/* Lista Editorial com Numeração Fina */}
        <div className="relative mt-8 sm:mt-12 space-y-6 sm:space-y-8">
          {PAIN_POINTS_CONTENT.phrases.map((phrase, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex items-baseline gap-4 sm:gap-8 pb-6 sm:pb-8 border-b border-magenta/10 transition-all duration-300 hover:border-magenta/30"
              >
                {/* Numeração fina em Fraunces */}
                <span className="font-serif text-xl sm:text-3xl text-magenta/40 font-light select-none tabular-nums group-hover:text-magenta transition-colors">
                  0{idx + 1}
                </span>

                {/* Frase em serifada grande */}
                <div className="flex-1">
                  <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-plum/90 leading-tight group-hover:text-plum transition-colors">
                    {phrase}
                  </p>
                </div>

                <div className="hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity text-loss">
                  <AlertCircle className="w-5 h-5 text-loss/60" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Resolução: Filete dourado e transição para calculadora */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-14 sm:mt-18 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative"
        >
          {/* Filete dourado decorativo */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-gold-dark via-gold-light to-transparent" />

          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-gold-dark block mb-1">
              A virada de chave
            </span>
            <p className="font-serif text-2xl sm:text-3xl font-semibold text-plum">
              {PAIN_POINTS_CONTENT.resolution}
            </p>
          </div>

          <a
            href="#calculadora"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-pill bg-white text-magenta border border-magenta/20 shadow-rose-soft hover:shadow-rose-hover hover:border-magenta text-sm font-bold transition-all group"
          >
            <span>{PAIN_POINTS_CONTENT.ctaText}</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
