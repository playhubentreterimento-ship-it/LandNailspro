import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Copy,
  Check,
  Instagram,
  MessageCircle,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { PUBLIC_BOOKING_CONTENT, APP_LINKS } from '../../data/content';
import { AVAILABLE_SERVICES } from '../../data/mockData';
import { SectionHeading } from '../ui/SectionHeading';
import { PhoneFrame } from '../ui/PhoneFrame';
import { MagneticButton } from '../ui/MagneticButton';

export const PublicBooking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [copied, setCopied] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('manutencao');
  const [selectedTime, setSelectedTime] = useState<string>('14:30');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${PUBLIC_BOOKING_CONTENT.sampleUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stepsList = [
    { num: 1, label: 'Acesso ao link' },
    { num: 2, label: 'Escolha do serviço' },
    { num: 3, label: 'Data e horário' },
    { num: 4, label: 'Confirmação' },
  ];

  return (
    <section
      className="py-24 sm:py-32 bg-ivory relative grain-overlay overflow-hidden"
      aria-label="Agenda pública e agendamento online 24h"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Coluna Esquerda: Texto + Lista + Pílula de Copiar Link */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <SectionHeading
              overline={PUBLIC_BOOKING_CONTENT.overline}
              title={PUBLIC_BOOKING_CONTENT.title}
              align="left"
              className="mb-8"
            />

            {/* Pílula com o Link Exclusivo e Botão Copiar */}
            <div className="w-full max-w-md p-2 pl-4 mb-8 bg-white rounded-pill border border-magenta/20 shadow-rose-soft flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-semibold text-plum truncate font-mono">
                {PUBLIC_BOOKING_CONTENT.sampleUrl}
              </span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3.5 py-1.5 rounded-pill bg-magenta/10 hover:bg-magenta text-magenta hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 flex-shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar link</span>
                  </>
                )}
              </button>
            </div>

            {/* Lista curta de benefícios */}
            <ul className="space-y-4 mb-8">
              {PUBLIC_BOOKING_CONTENT.bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-magenta/10 text-magenta flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-sm sm:text-base text-plum/90 font-medium leading-snug">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <MagneticButton
                size="lg"
                variant="primary"
                href={APP_LINKS.onboarding}
              >
                <span>{PUBLIC_BOOKING_CONTENT.ctaText}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </MagneticButton>
            </div>
          </div>

          {/* Coluna Direita: Mockup Interativo com 4 Passos e Ícones Orbitando */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            {/* Ícones de Instagram e WhatsApp orbitando levemente */}
            <div className="absolute -top-4 -left-4 sm:left-12 z-20 w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-lg animate-float-slow">
              <Instagram className="w-5 h-5" />
            </div>
            <div className="absolute top-1/3 -right-2 sm:right-10 z-20 w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg animate-float-delayed">
              <MessageCircle className="w-5 h-5 fill-white" />
            </div>

            {/* Barra de progresso dos 4 passos no topo do mockup */}
            <div className="w-full max-w-[320px] mb-4 flex items-center justify-between gap-1.5 px-2">
              {stepsList.map((step) => (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => setActiveTab(step.num)}
                  className={`flex-1 py-1 px-2 rounded-full text-[10px] font-bold text-center transition-all ${
                    activeTab === step.num
                      ? 'bg-magenta text-white shadow-sm'
                      : 'bg-white/80 text-muted hover:bg-white border border-magenta/10'
                  }`}
                >
                  {step.num}. {step.label}
                </button>
              ))}
            </div>

            {/* Mockup do Celular com a Simulação da Agenda Pública */}
            <PhoneFrame currentTime="14:00">
              <AnimatePresence mode="wait">
                {/* Passo 1: Acesso ao link / Capa do Studio */}
                {activeTab === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 flex flex-col h-full"
                  >
                    <div className="text-center pb-4 border-b border-magenta/10">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-magenta via-rose to-gold mx-auto mb-2 flex items-center justify-center text-white shadow-md">
                        <Sparkles className="w-8 h-8" />
                      </div>
                      <h4 className="font-serif text-lg font-bold text-plum">
                        Studio Elisandra Nails
                      </h4>
                      <p className="text-xs text-muted">Especialista em Fibra e Gel</p>
                      <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Agenda Aberta · Novembro
                      </span>
                    </div>

                    <div className="mt-6 space-y-3 flex-1 flex flex-col justify-center">
                      <div className="p-3 bg-white rounded-xl border border-magenta/10 shadow-xs text-center">
                        <p className="text-xs font-semibold text-plum">
                          Agende seu horário online em menos de 1 minuto
                        </p>
                        <span className="text-[10px] text-muted block mt-1">
                          Sem cadastro e sem baixar aplicativo
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveTab(2)}
                        className="w-full py-3 rounded-xl bg-cta-gradient text-white text-xs font-bold shadow-rose-soft flex items-center justify-center gap-2"
                      >
                        <span>Escolher serviço</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Passo 2: Escolha do Serviço */}
                {activeTab === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3.5 flex flex-col h-full overflow-y-auto no-scrollbar"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-magenta mb-1">
                      Etapa 1 de 3
                    </span>
                    <h4 className="font-serif text-base font-bold text-plum mb-3">
                      Selecione o serviço
                    </h4>

                    <div className="space-y-2 flex-1">
                      {AVAILABLE_SERVICES.slice(0, 4).map((s) => {
                        const isSelected = selectedService === s.id;
                        return (
                          <div
                            key={s.id}
                            onClick={() => setSelectedService(s.id)}
                            className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-magenta/10 border-magenta shadow-xs'
                                : 'bg-white border-magenta/10 hover:border-magenta/30'
                            }`}
                          >
                            <div>
                              <p className="text-xs font-bold text-plum">{s.name}</p>
                              <span className="text-[10px] text-muted flex items-center gap-1 mt-0.5">
                                <Clock className="w-3 h-3" /> {s.duration}
                              </span>
                            </div>
                            <span className="text-xs font-bold text-plum">
                              R$ {s.price}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={() => setActiveTab(3)}
                        className="w-full py-2.5 rounded-xl bg-cta-gradient text-white text-xs font-bold shadow-sm flex items-center justify-center gap-2"
                      >
                        <span>Avançar para horário</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Passo 3: Data e Horário em Stagger */}
                {activeTab === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3.5 flex flex-col h-full"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-magenta mb-1">
                      Etapa 2 de 3
                    </span>
                    <h4 className="font-serif text-base font-bold text-plum mb-2">
                      Escolha data e horário
                    </h4>

                    {/* Mini seletor de dias */}
                    <div className="grid grid-cols-4 gap-1.5 mb-3 text-center">
                      <div className="p-1.5 rounded-lg bg-magenta text-white text-[10px] font-bold">
                        <span>Qui</span>
                        <span className="block font-serif text-xs">16</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-white border border-magenta/10 text-plum text-[10px]">
                        <span>Sex</span>
                        <span className="block font-serif text-xs">17</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-white border border-magenta/10 text-plum text-[10px]">
                        <span>Sáb</span>
                        <span className="block font-serif text-xs">18</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-white border border-magenta/10 text-plum text-[10px]">
                        <span>Seg</span>
                        <span className="block font-serif text-xs">20</span>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold text-muted mb-1.5 block">
                      Horários livres calculados:
                    </span>
                    <div className="grid grid-cols-3 gap-2 flex-1">
                      {['09:00', '10:30', '14:30', '16:00', '17:30', '19:00'].map(
                        (time, i) => {
                          const isSelected = selectedTime === time;
                          return (
                            <motion.button
                              key={time}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                              type="button"
                              onClick={() => setSelectedTime(time)}
                              className={`py-2 rounded-lg text-xs font-bold transition-all border ${
                                isSelected
                                  ? 'bg-magenta text-white border-magenta shadow-xs'
                                  : 'bg-white text-plum border-magenta/15 hover:border-magenta'
                              }`}
                            >
                              {time}
                            </motion.button>
                          );
                        }
                      )}
                    </div>

                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={() => setActiveTab(4)}
                        className="w-full py-2.5 rounded-xl bg-cta-gradient text-white text-xs font-bold shadow-sm flex items-center justify-center gap-2"
                      >
                        <span>Confirmar dados</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Passo 4: Nome, WhatsApp e Confirmação */}
                {activeTab === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 flex flex-col h-full text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>

                    <h4 className="font-serif text-base font-bold text-plum">
                      Horário Agendado!
                    </h4>
                    <p className="text-[11px] text-muted mb-3">
                      Você receberá o lembrete de confirmação no WhatsApp.
                    </p>

                    <div className="p-3 bg-blush/50 rounded-xl border border-magenta/10 text-left text-xs space-y-1 my-auto">
                      <div className="flex justify-between">
                        <span className="text-muted">Cliente:</span>
                        <span className="font-bold text-plum">Camila R.</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Serviço:</span>
                        <span className="font-bold text-plum">Manutenção Fibra</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Data/Hora:</span>
                        <span className="font-bold text-plum">Qui 16, às 14:30</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveTab(1)}
                        className="text-[10px] text-magenta font-semibold hover:underline"
                      >
                        Fazer outro teste de agendamento
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Aviso legal obrigatório */}
              <div className="p-2 text-center bg-ivory/80 border-t border-magenta/5">
                <span className="text-[9px] text-muted/70 italic">
                  Exemplo ilustrativo da tela da cliente
                </span>
              </div>
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  );
};
