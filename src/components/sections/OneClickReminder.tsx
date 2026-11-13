import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { ONE_CLICK_REMINDER_CONTENT, APP_LINKS } from '../../data/content';
import { SectionHeading } from '../ui/SectionHeading';
import { PhoneFrame } from '../ui/PhoneFrame';
import { MagneticButton } from '../ui/MagneticButton';

export const OneClickReminder: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <section
      className="py-24 sm:py-36 bg-plum-dark text-white relative grain-overlay overflow-hidden"
      aria-label="Demonstração do lembrete de confirmação no WhatsApp com um clique"
    >
      {/* Glow magenta cinematográfico e partículas douradas sutis */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-magenta/25 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-gold/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline={ONE_CLICK_REMINDER_CONTENT.overline}
          title={ONE_CLICK_REMINDER_CONTENT.title}
          subtitle={ONE_CLICK_REMINDER_CONTENT.subtitle}
          dark
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mt-12 sm:mt-16">
          {/* Coluna Esquerda: Seletor Interativo dos 3 Passos */}
          <div className="lg:col-span-6 flex flex-col gap-6 order-2 lg:order-1">
            {ONE_CLICK_REMINDER_CONTENT.steps.map((step, idx) => {
              const stepIndex = idx + 1;
              const isActive = activeStep === stepIndex;

              return (
                <div
                  key={step.stepNumber}
                  onClick={() => setActiveStep(stepIndex)}
                  className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-plum-light/80 border-magenta/60 shadow-magenta-glow/30 translate-x-2'
                      : 'bg-plum/40 border-white/10 hover:border-white/20 opacity-70 hover:opacity-90'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-magenta text-white shadow-sm'
                          : 'bg-white/10 text-rose-light'
                      }`}
                    >
                      PASSO {step.stepNumber}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-rose-light/80 leading-relaxed pl-1">
                    {step.description}
                  </p>
                </div>
              );
            })}

            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <MagneticButton
                size="lg"
                variant="primary"
                href={APP_LINKS.onboarding}
                className="w-full sm:w-auto"
              >
                <span>{ONE_CLICK_REMINDER_CONTENT.ctaText}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </MagneticButton>
              <span className="text-xs text-rose-light/70 italic">
                * Disponível nos planos Pro e Gold.
              </span>
            </div>
          </div>

          {/* Coluna Direita: Mockup do iPhone Cinematográfico com os 3 Passos Simulados */}
          <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-[340px]">
              {/* Moldura do iPhone em tema escuro */}
              <PhoneFrame dark currentTime="10:15">
                <AnimatePresence mode="wait">
                  {/* PASSO 1: Agenda com o botão pulsando */}
                  {activeStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35 }}
                      className="p-4 flex flex-col h-full bg-[#1A0713]"
                    >
                      <div className="border-b border-white/10 pb-3 mb-3">
                        <span className="text-[10px] text-magenta uppercase font-bold tracking-wider">
                          Agenda de Hoje
                        </span>
                        <h4 className="font-serif text-base font-bold text-white">
                          Atendimentos da Tarde
                        </h4>
                      </div>

                      {/* Card do agendamento */}
                      <div className="bg-plum/90 rounded-2xl p-4 border border-magenta/40 shadow-rose-soft">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-magenta/20 text-magenta font-bold text-xs flex items-center justify-center">
                              LM
                            </div>
                            <div>
                              <p className="font-bold text-xs text-white">Larissa Mendes</p>
                              <span className="text-[10px] text-rose-light/70">
                                15:00 · Manutenção Fibra
                              </span>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-white">R$ 120</span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/10">
                          <button
                            type="button"
                            onClick={() => setActiveStep(2)}
                            className="w-full py-2.5 px-3 rounded-xl bg-cta-gradient text-white text-xs font-bold flex items-center justify-center gap-2 shadow-magenta-glow animate-pulse-subtle active:scale-95 transition-transform"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>Enviar lembrete (1 toque)</span>
                          </button>
                        </div>
                      </div>

                      <div className="mt-auto pt-4 text-center">
                        <span className="text-[10px] text-white/50 italic">
                          Toque no botão para simular o disparo
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* PASSO 2: WhatsApp com a mensagem se digitando */}
                  {activeStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35 }}
                      className="p-3 flex flex-col h-full bg-[#0B141A]"
                    >
                      {/* Top bar WhatsApp */}
                      <div className="bg-[#1F2C34] -mx-3 -mt-3 p-3 flex items-center gap-2.5 border-b border-[#2A3942] mb-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                          LM
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-white leading-tight">
                            Larissa Mendes
                          </p>
                          <span className="text-[10px] text-emerald-400">online</span>
                        </div>
                      </div>

                      {/* Bolha de mensagem enviada */}
                      <div className="space-y-3 flex-1 overflow-y-auto">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="bg-[#005C4B] text-white p-3 rounded-2xl rounded-tr-none text-xs leading-relaxed max-w-[90%] ml-auto shadow-sm"
                        >
                          <p className="font-semibold text-[11px] mb-1">
                            Olá, Larissa! Tudo bem? 💅
                          </p>
                          <p className="text-[11px] opacity-90">
                            Passando para confirmar seu horário amanhã no{' '}
                            <strong>Studio Nails Luxo</strong>:
                          </p>
                          <div className="bg-[#024437] p-2 rounded-lg my-1.5 text-[10px] space-y-0.5">
                            <p>📅 Quinta-feira, às 15:00</p>
                            <p>💅 Manutenção Fibra de Vidro</p>
                            <p>📍 Av. Paulista, 1200 - Sala 42</p>
                          </div>
                          <p className="text-[10px] opacity-90">
                            Podemos confirmar seu atendimento?
                          </p>
                          <span className="text-[9px] text-white/60 block text-right mt-1">
                            10:16 ✓✓
                          </span>
                        </motion.div>

                        <div className="text-center pt-2">
                          <button
                            type="button"
                            onClick={() => setActiveStep(3)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium border border-white/20 transition-all"
                          >
                            <span>Simular resposta da cliente</span>
                            <ArrowRight className="w-3 h-3 text-gold" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* PASSO 3: Cliente respondeu Confirmado 💗 */}
                  {activeStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35 }}
                      className="p-4 flex flex-col h-full bg-[#1A0713]"
                    >
                      <div className="border-b border-white/10 pb-3 mb-4">
                        <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">
                          Status Atualizado
                        </span>
                        <h4 className="font-serif text-base font-bold text-white">
                          Atendimento Confirmado
                        </h4>
                      </div>

                      {/* Notificação de sucesso */}
                      <div className="bg-emerald-950/70 border border-emerald-500/40 rounded-2xl p-4 text-center shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/20 rounded-full blur-xl -z-10" />

                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2.5">
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        </div>

                        <span className="text-[11px] font-semibold text-emerald-300 block mb-1">
                          Cliente respondeu:
                        </span>
                        <p className="font-serif text-base font-bold text-white italic mb-3">
                          "Confirmadíssimo! Até amanhã 💗"
                        </p>

                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-200 text-[10px] font-bold border border-emerald-400/40">
                          <Sparkles className="w-3 h-3 text-gold" />
                          <span>Horário 100% Protegido</span>
                        </div>
                      </div>

                      <div className="mt-auto pt-4 text-center">
                        <button
                          type="button"
                          onClick={() => setActiveStep(1)}
                          className="text-[10px] text-rose-light hover:underline"
                        >
                          Reiniciar demonstração
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Aviso legal obrigatório */}
                <div className="p-2 text-center bg-black/40 border-t border-white/5">
                  <span className="text-[9px] text-rose-light/50 italic">
                    {ONE_CLICK_REMINDER_CONTENT.disclaimer}
                  </span>
                </div>
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
