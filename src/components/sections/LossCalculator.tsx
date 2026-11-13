import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Minus, Plus, CalendarX } from 'lucide-react';
import { CALCULATOR_CONTENT, APP_LINKS } from '../../data/content';
import { SectionHeading } from '../ui/SectionHeading';
import { MagneticButton } from '../ui/MagneticButton';

export const LossCalculator: React.FC = () => {
  const [ticketPrice, setTicketPrice] = useState<string>('');
  const [weeklyMisses, setWeeklyMisses] = useState<number | null>(null);

  const priceNumber = parseFloat(ticketPrice.replace(/\D/g, '')) || 0;
  const isFilled = priceNumber > 0 && weeklyMisses !== null && weeklyMisses > 0;

  const monthlyLoss = isFilled ? priceNumber * weeklyMisses * 4 : 0;
  const yearlyLoss = isFilled ? priceNumber * weeklyMisses * 52 : 0;

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    if (!raw) {
      setTicketPrice('');
      return;
    }
    const num = parseInt(raw, 10);
    setTicketPrice(num.toString());
  };

  const handleStepperChange = (delta: number) => {
    setWeeklyMisses((prev) => {
      const current = prev ?? 0;
      const next = Math.max(1, Math.min(25, current + delta));
      return next;
    });
  };

  return (
    <section
      id="calculadora"
      className="py-24 sm:py-32 bg-blush/40 relative grain-overlay overflow-hidden"
      aria-label="Calculadora de perdas financeiras"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline={CALCULATOR_CONTENT.overline}
          title={CALCULATOR_CONTENT.title}
          subtitle={CALCULATOR_CONTENT.subtitle}
        />

        {/* Card Grande em Branco Quente */}
        <div className="bg-white/95 rounded-[32px] p-6 sm:p-10 md:p-12 shadow-rose-card border border-magenta/15 relative overflow-hidden backdrop-blur-xl">
          {/* Brilho de fundo sutil */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-light/40 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Coluna 1: Entradas dos Dados (Inputs limpos sem pré-definidos) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Campo 1: Valor Médio do Atendimento */}
              <div>
                <label
                  htmlFor="ticket-input"
                  className="block text-sm font-semibold text-plum mb-2"
                >
                  {CALCULATOR_CONTENT.fieldPriceLabel}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-muted">
                    R$
                  </span>
                  <input
                    id="ticket-input"
                    type="text"
                    inputMode="numeric"
                    placeholder={CALCULATOR_CONTENT.fieldPricePlaceholder}
                    value={ticketPrice ? ticketPrice : ''}
                    onChange={handlePriceChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-ivory/60 border border-magenta/20 rounded-2xl text-plum font-serif text-xl focus:border-magenta focus:bg-white focus:ring-4 focus:ring-magenta/10 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Campo 2: Faltas por Semana */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="misses-slider"
                    className="text-sm font-semibold text-plum"
                  >
                    {CALCULATOR_CONTENT.fieldMissesLabel}
                  </label>
                  <span className="text-sm font-bold text-magenta bg-magenta/10 px-2.5 py-0.5 rounded-full tabular-nums">
                    {weeklyMisses !== null ? `${weeklyMisses} por semana` : 'Defina abaixo'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleStepperChange(-1)}
                    className="w-11 h-11 rounded-xl bg-ivory border border-magenta/20 text-plum flex items-center justify-center hover:bg-magenta hover:text-white transition-colors active:scale-95 flex-shrink-0"
                    aria-label="Diminuir faltas por semana"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <input
                    id="misses-slider"
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={weeklyMisses ?? 1}
                    onChange={(e) => setWeeklyMisses(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-rose-light rounded-lg appearance-none cursor-pointer accent-magenta"
                  />

                  <button
                    type="button"
                    onClick={() => handleStepperChange(1)}
                    className="w-11 h-11 rounded-xl bg-ivory border border-magenta/20 text-plum flex items-center justify-center hover:bg-magenta hover:text-white transition-colors active:scale-95 flex-shrink-0"
                    aria-label="Aumentar faltas por semana"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-muted/80 italic">
                * Preencha os campos para ver a estimativa personalizada.
              </p>
            </div>

            {/* Coluna 2: Resultado Visual Interativo */}
            <div className="lg:col-span-6 bg-ivory/80 rounded-2xl p-6 sm:p-8 border border-magenta/10 flex flex-col justify-center items-center text-center min-h-[300px]">
              <AnimatePresence mode="wait">
                {isFilled ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="w-full flex flex-col items-center"
                  >
                    <span className="text-xs uppercase tracking-wider font-bold text-loss mb-1">
                      {CALCULATOR_CONTENT.monthlyLabel}
                    </span>

                    {/* Número grande com glow sutil */}
                    <div className="relative my-2">
                      <div className="absolute inset-0 bg-gold/20 filter blur-xl rounded-full" />
                      <span className="relative font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-magenta tabular-nums tracking-tight">
                        R$ {monthlyLoss.toLocaleString('pt-BR')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2 px-3 py-1 bg-white rounded-full border border-magenta/10 shadow-xs">
                      <span className="text-xs text-muted font-medium">
                        {CALCULATOR_CONTENT.yearlyLabel}
                      </span>
                      <span className="text-sm font-serif font-bold text-plum tabular-nums">
                        R$ {yearlyLoss.toLocaleString('pt-BR')} ao ano
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-plum/80 font-medium mt-6 max-w-sm">
                      {CALCULATOR_CONTENT.solutionCallout}
                    </p>

                    <div className="mt-6 w-full sm:w-auto">
                      <MagneticButton
                        size="md"
                        variant="primary"
                        href={APP_LINKS.onboarding}
                        className="w-full sm:w-auto"
                      >
                        <span>{CALCULATOR_CONTENT.ctaText}</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </MagneticButton>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center p-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-rose-light/50 border border-magenta/15 flex items-center justify-center text-magenta mb-4">
                      <CalendarX className="w-8 h-8 text-magenta/70" />
                    </div>
                    <h4 className="font-serif text-lg font-semibold text-plum mb-2">
                      Aguardando seus números
                    </h4>
                    <p className="text-xs sm:text-sm text-muted max-w-xs">
                      {CALCULATOR_CONTENT.emptyStateText}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-magenta/10 text-center">
            <span className="text-[11px] text-muted italic">
              {CALCULATOR_CONTENT.disclaimer}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
