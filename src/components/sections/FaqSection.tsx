import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MessageCircle } from 'lucide-react';
import { FAQ_ITEMS, FaqItem } from '../../data/faq';
import { APP_LINKS } from '../../data/content';

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['o-que-e']);

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="duvidas"
      className="py-24 sm:py-36 bg-blush/30 relative grain-overlay overflow-hidden"
      aria-label="Perguntas frequentes e respostas rápidas"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Coluna Esquerda: Título Fixo no Desktop + Suporte */}
          <div className="lg:col-span-5 flex flex-col items-start text-left lg:sticky lg:top-32 self-start">
            <span className="text-xs uppercase tracking-[0.18em] font-bold text-magenta mb-3">
              DÚVIDAS FREQUENTES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-plum leading-tight mb-4">
              Respostas diretas para quem tem pressa.
            </h2>
            <p className="text-muted text-base leading-relaxed mb-8">
              Criamos o NailGestão pensando na sua rotina na mesa de atendimento. Se ainda tiver qualquer dúvida, nosso suporte responde você.
            </p>

            <div className="p-6 bg-white rounded-card border border-magenta/15 shadow-rose-soft w-full">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-plum text-base">
                  Prefere tirar dúvidas no WhatsApp?
                </h4>
              </div>
              <p className="text-xs text-muted leading-relaxed mb-4">
                Fale com nossa equipe de atendimento especializada em estúdios de beleza.
              </p>
              <a
                href={APP_LINKS.onboarding}
                className="text-xs font-bold text-magenta hover:underline flex items-center gap-1"
              >
                <span>Chamar suporte técnico</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Coluna Direita: Accordion Animado com ícone + que gira para × */}
          <div className="lg:col-span-7 space-y-3.5">
            {FAQ_ITEMS.map((item: FaqItem) => {
              const isOpen = openIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-magenta/15 shadow-rose-soft overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.id)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="font-serif text-base sm:text-lg font-bold text-plum leading-snug">
                      {item.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? 'rotate-45 bg-magenta text-white shadow-sm'
                          : 'bg-ivory text-plum hover:bg-magenta/10'
                      }`}
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-muted leading-relaxed border-t border-magenta/5">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
