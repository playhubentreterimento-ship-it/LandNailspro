import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { APP_LINKS } from '../../data/content';
import { MagneticButton } from '../ui/MagneticButton';

export const MobileStickyCta: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // Aparece após a hero (> 500px) e esconde próximo ao final / seção planos
      const isPastHero = scrollY > 550;
      const isNearBottom = scrollY + windowHeight > docHeight - 900;

      setIsVisible(isPastHero && !isNearBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 z-40 md:hidden"
        >
          <div className="glass-pill p-2 pl-4 rounded-pill shadow-rose-hover border border-magenta/25 flex items-center justify-between gap-3 bg-white/95">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-magenta flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-gold" /> 7 dias grátis
              </span>
              <span className="text-xs font-bold text-plum">
                Recupere seus horários
              </span>
            </div>

            <MagneticButton
              size="sm"
              variant="primary"
              href={APP_LINKS.onboarding}
              className="py-2.5 px-4 shadow-sm"
            >
              <span>Começar</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </MagneticButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
