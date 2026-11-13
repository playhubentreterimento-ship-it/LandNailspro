import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, ArrowRight, Minus } from 'lucide-react';
import { PRICING_PLANS, COMPARISON_TABLE, Plan } from '../../data/plans';
import { SectionHeading } from '../ui/SectionHeading';
import { MagneticButton } from '../ui/MagneticButton';

export const PricingSection: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section
      id="planos"
      className="py-24 sm:py-36 bg-ivory relative grain-overlay overflow-hidden"
      aria-label="Tabela de planos e preços"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="PLANOS E PREÇOS"
          title="Escolha o plano do seu momento."
          subtitle="Todos os planos incluem 7 dias grátis com acesso a tudo, suporte especializado e cancelamento quando você quiser, sem multa."
        />

        {/* Toggle Mensal / Anual com Selo Dourado Economize 20% */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="bg-blush/60 p-1.5 rounded-full border border-magenta/15 flex items-center relative">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all relative z-10 ${
                billingCycle === 'monthly'
                  ? 'bg-white text-plum shadow-rose-soft'
                  : 'text-muted hover:text-plum'
              }`}
            >
              Cobrança Mensal
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all relative z-10 flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-cta-gradient text-white shadow-magenta-glow'
                  : 'text-muted hover:text-plum'
              }`}
            >
              <span>Cobrança Anual</span>
            </button>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-950 border border-gold/40 shadow-xs animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Economize 20%</span>
          </span>
        </div>

        {/* Três Cards de Preço: Pro Studio no Meio Elevado */}
        <div className="flex lg:grid lg:grid-cols-3 gap-8 items-stretch overflow-x-auto pb-8 pt-4 snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {PRICING_PLANS.map((plan: Plan, idx: number) => {
            const isPro = plan.popular;
            const isGold = plan.goldAccent;
            const currentPrice =
              billingCycle === 'monthly' ? plan.priceMonthly : plan.priceAnnualMonthly;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={`snap-center flex-shrink-0 w-[300px] sm:w-[360px] lg:w-auto rounded-[32px] p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 relative ${
                  isPro
                    ? 'bg-white border-2 border-magenta shadow-rose-hover lg:-translate-y-4 z-20 ring-4 ring-magenta/10'
                    : isGold
                    ? 'bg-gradient-to-b from-white via-amber-50/30 to-white border-2 border-gold/50 shadow-rose-card z-10'
                    : 'bg-white/90 border border-magenta/15 shadow-rose-card z-10'
                }`}
              >
                {/* Selo Destaque no Topo */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className={`px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 ${
                        isPro
                          ? 'bg-cta-gradient text-white shadow-magenta-glow'
                          : 'bg-gold-gradient text-plum shadow-gold-glow'
                      }`}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{plan.badge}</span>
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="font-serif text-2xl font-bold text-plum mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed min-h-[36px] mb-6">
                    {plan.tagline}
                  </p>

                  {/* Preço com Animação ao Alternar Ciclo */}
                  <div className="mb-6 pb-6 border-b border-magenta/10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-muted">R$</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={currentPrice}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.25 }}
                          className="font-serif text-4xl sm:text-5xl font-bold text-plum tabular-nums"
                        >
                          {currentPrice}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-xs text-muted font-medium">/mês</span>
                    </div>

                    <span className="text-[11px] text-muted block mt-1">
                      {billingCycle === 'annual'
                        ? `Faturado anualmente (R$ ${plan.annualTotal}/ano)`
                        : 'Cobrança mensal recorrente'}
                    </span>
                  </div>

                  {/* Lista de Recursos */}
                  <ul className="space-y-3 mb-8 text-xs text-plum/90">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isPro
                              ? 'bg-magenta text-white'
                              : isGold
                              ? 'bg-gold-dark text-white'
                              : 'bg-magenta/10 text-magenta'
                          }`}
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botão de Ação Direcionado ao Link com ?plan= */}
                <div className="pt-2">
                  <MagneticButton
                    size="lg"
                    variant={isPro ? 'primary' : isGold ? 'gold' : 'secondary'}
                    href={plan.ctaLink}
                    className="w-full text-center"
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </MagneticButton>
                  <span className="text-[10px] text-muted text-center block mt-2">
                    7 dias grátis · Cancele sem multa
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tabela Comparativa Completa */}
        <div className="mt-20">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest font-bold text-magenta">
              Transparência Total
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-plum">
              Comparativo detalhado entre os planos
            </h3>
          </div>

          <div className="bg-white rounded-card overflow-x-auto border border-magenta/15 shadow-rose-soft">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-magenta/10 bg-ivory/80 text-plum font-serif text-sm">
                  <th className="py-4 px-6 font-bold w-2/5">Recursos e Ferramentas</th>
                  <th className="py-4 px-4 font-bold text-center">Solo</th>
                  <th className="py-4 px-4 font-bold text-center text-magenta">Pro Studio</th>
                  <th className="py-4 px-4 font-bold text-center text-gold-dark">Studio Gold</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-magenta/10 text-xs sm:text-sm">
                {COMPARISON_TABLE.map((row, i) => (
                  <tr key={i} className="hover:bg-blush/20 transition-colors">
                    <td className="py-3.5 px-6 font-medium text-plum">
                      {row.feature}
                    </td>

                    {/* Solo */}
                    <td className="py-3.5 px-4 text-center">
                      {typeof row.solo === 'boolean' ? (
                        row.solo ? (
                          <Check className="w-4 h-4 text-magenta mx-auto" />
                        ) : (
                          <Minus className="w-4 h-4 text-muted/40 mx-auto" />
                        )
                      ) : (
                        <span className="font-semibold text-plum">{row.solo}</span>
                      )}
                    </td>

                    {/* Pro Studio */}
                    <td className="py-3.5 px-4 text-center bg-magenta/5">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? (
                          <Check className="w-4 h-4 text-magenta mx-auto stroke-[2.5]" />
                        ) : (
                          <Minus className="w-4 h-4 text-muted/40 mx-auto" />
                        )
                      ) : (
                        <span className="font-bold text-magenta">{row.pro}</span>
                      )}
                    </td>

                    {/* Studio Gold */}
                    <td className="py-3.5 px-4 text-center">
                      {typeof row.gold === 'boolean' ? (
                        row.gold ? (
                          <Check className="w-4 h-4 text-gold-dark mx-auto stroke-[2.5]" />
                        ) : (
                          <Minus className="w-4 h-4 text-muted/40 mx-auto" />
                        )
                      ) : (
                        <span className="font-bold text-gold-dark">{row.gold}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
