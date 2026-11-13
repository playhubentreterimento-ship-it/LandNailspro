import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { FINAL_CTA_CONTENT, APP_LINKS } from '../../data/content';
import { MagneticButton } from '../ui/MagneticButton';

export const FinalCta: React.FC = () => {
  return (
    <section
      className="py-28 sm:py-36 bg-gradient-to-b from-ivory via-blush/80 to-rose-light/50 relative grain-overlay overflow-hidden text-center"
      aria-label="Chamada final para começar o teste grátis"
    >
      {/* Blobs orgânicos decorativos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-rose-light/40 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Filete dourado fino em arco */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/90 text-magenta border border-magenta/20 shadow-sm mb-6">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
            <span>Comece Hoje Mesmo</span>
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-plum leading-[1.08] tracking-tight mb-6 max-w-3xl mx-auto">
            {FINAL_CTA_CONTENT.title}
          </h2>

          <p className="text-base sm:text-xl text-muted leading-relaxed max-w-xl mx-auto mb-10">
            {FINAL_CTA_CONTENT.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <MagneticButton
              size="lg"
              variant="primary"
              href={APP_LINKS.onboarding}
              className="text-base sm:text-lg px-10 py-5 shadow-rose-hover ring-4 ring-magenta/20 min-h-[58px]"
            >
              <span>{FINAL_CTA_CONTENT.ctaText}</span>
              <ArrowRight className="w-5 h-5 ml-1.5" />
            </MagneticButton>
          </div>

          {/* Linha de Confiança */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-muted/90 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-magenta" />
              <span>{FINAL_CTA_CONTENT.trustBadges[0]}</span>
            </div>
            <span className="text-magenta/30">•</span>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-600" />
              <span>{FINAL_CTA_CONTENT.trustBadges[1]}</span>
            </div>
            <span className="text-magenta/30">•</span>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-gold-dark" />
              <span>{FINAL_CTA_CONTENT.trustBadges[2]}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
