import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Calendar,
  Clock,
  Sparkles,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { HERO_CONTENT, APP_LINKS } from '../../data/content';
import { Badge } from '../ui/Badge';
import { MagneticButton } from '../ui/MagneticButton';
import { PhoneFrame } from '../ui/PhoneFrame';
import { FloatingCard } from '../ui/FloatingCard';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const phoneScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const blobRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] lg:min-h-screen pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden grain-overlay flex items-center"
      aria-label="Apresentação NailGestão PRO"
    >
      {/* Formas orgânicas abstratas desfocadas e arco dourado */}
      <motion.div
        style={{ rotate: blobRotate }}
        className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-blush/70 filter blur-[90px] pointer-events-none -z-10 animate-float-slow"
      />
      <motion.div
        style={{ rotate: blobRotate }}
        className="absolute top-1/3 right-[-100px] lg:right-10 w-[450px] h-[450px] rounded-full bg-rose-light/50 filter blur-[110px] pointer-events-none -z-10 animate-float-delayed"
      />

      {/* Arco dourado sutil no fundo */}
      <svg
        className="absolute top-20 right-10 lg:right-48 w-80 h-80 opacity-25 pointer-events-none -z-10"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="100"
          cy="100"
          r="90"
          stroke="url(#goldGradientHero)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />
        <defs>
          <linearGradient id="goldGradientHero" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
            <stop stopColor="#B98A2F" />
            <stop offset="0.5" stopColor="#E3C176" />
            <stop offset="1" stopColor="#B98A2F" />
          </linearGradient>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Coluna de Texto (55% desktop) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-20">
            {/* Pílula / Etiqueta com ponto pulsante */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Badge variant="pill" hasPulse className="mb-6">
                {HERO_CONTENT.badge}
              </Badge>
            </motion.div>

            {/* Headline com Text Reveal por palavras */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[68px] xl:text-[76px] leading-[1.06] tracking-tight font-medium text-plum mb-6">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {HERO_CONTENT.headline.prefix}{' '}
                </motion.span>{' '}
                <motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block italic text-magenta font-semibold"
                >
                  {HERO_CONTENT.headline.word1}
                </motion.span>{' '}
                <motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {HERO_CONTENT.headline.connector}
                </motion.span>{' '}
                <motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block italic gold-text-gradient font-semibold"
                >
                  {HERO_CONTENT.headline.word2}
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {HERO_CONTENT.headline.suffix}
                </motion.span>
              </span>
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg lg:text-xl text-muted leading-relaxed max-w-xl mb-8"
            >
              {HERO_CONTENT.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8"
            >
              <MagneticButton
                size="lg"
                variant="primary"
                href={APP_LINKS.onboarding}
                className="w-full sm:w-auto"
              >
                <span>{HERO_CONTENT.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </MagneticButton>

              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-plum hover:text-magenta py-3 px-4 transition-colors group"
              >
                <span>{HERO_CONTENT.ctaSecondary}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>

            {/* Linha de Confiança */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-muted/90 pt-2 border-t border-magenta/10 w-full max-w-lg"
            >
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>{HERO_CONTENT.trustLine[0]}</span>
              </div>
              <span className="text-magenta/30">•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-magenta" />
                <span>{HERO_CONTENT.trustLine[1]}</span>
              </div>
              <span className="text-magenta/30">•</span>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                <span>{HERO_CONTENT.trustLine[2]}</span>
              </div>
            </motion.div>
          </div>

          {/* Coluna Visual: iPhone + Cartões Flutuantes (45% desktop) */}
          <div className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0">
            {/* Celular com Scroll-Linked animation e leve inclinação 3D */}
            <motion.div
              style={{ y: phoneY, scale: phoneScale }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full flex justify-center"
            >
              <PhoneFrame>
                {/* Cabeçalho da Agenda no Celular */}
                <div className="p-4 bg-white/90 border-b border-magenta/10">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-magenta tracking-wider">
                        Terça-feira, Hoje
                      </p>
                      <h3 className="font-serif text-lg font-bold text-plum">
                        Studio Nails Luxo
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-magenta/10 text-magenta">
                      4 agendamentos
                    </span>
                  </div>

                  {/* Resumo do dia */}
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-blush/60 p-2 rounded-xl">
                      <span className="text-[10px] text-muted block">Previsto hoje</span>
                      <span className="font-serif text-sm font-bold text-plum">R$ 530,00</span>
                    </div>
                    <div className="bg-emerald-50 p-2 rounded-xl border border-emerald-100">
                      <span className="text-[10px] text-emerald-700 block">Confirmados</span>
                      <span className="font-serif text-sm font-bold text-emerald-800">3 de 4</span>
                    </div>
                  </div>
                </div>

                {/* Lista da Agenda no Celular */}
                <div className="p-3 space-y-2.5 flex-1 overflow-y-auto no-scrollbar">
                  {/* Item 1 - Confirmado */}
                  <div className="p-3 bg-white rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-emerald-100/70 text-emerald-700 flex items-center justify-center font-bold text-xs">
                        CR
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-xs text-plum">Camila R.</span>
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-bold">
                            Confirmado
                          </span>
                        </div>
                        <p className="text-[10px] text-muted">Manutenção Fibra · 09:30</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-plum">R$ 110</span>
                  </div>

                  {/* Item 2 - Aguardando Lembrete (Destaque interativo) */}
                  <div className="p-3 bg-gradient-to-r from-white to-blush/40 rounded-2xl border border-magenta/20 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-magenta/10 text-magenta flex items-center justify-center font-bold text-xs">
                          JA
                        </div>
                        <div>
                          <span className="font-semibold text-xs text-plum">Juliana A.</span>
                          <p className="text-[10px] text-muted">Aplicação em Gel · 14:00</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-plum">R$ 180</span>
                    </div>

                    {/* Botão de Lembrete dentro do celular */}
                    <div className="pt-1.5 border-t border-magenta/10 flex items-center justify-between">
                      <span className="text-[10px] text-magenta font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Falta confirmar
                      </span>
                      <button className="px-2.5 py-1 rounded-full bg-cta-gradient text-white text-[10px] font-bold shadow-sm flex items-center gap-1 animate-pulse-subtle">
                        <MessageCircle className="w-3 h-3" /> Enviar lembrete
                      </button>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="p-3 bg-white rounded-2xl border border-magenta/5 shadow-sm flex items-center justify-between opacity-85">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                        FB
                      </div>
                      <div>
                        <span className="font-semibold text-xs text-plum">Fernanda B.</span>
                        <p className="text-[10px] text-muted">Spa dos Pés · 16:30</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-plum">R$ 65</span>
                  </div>
                </div>

                {/* Rodapé do celular com aviso */}
                <div className="p-2 text-center bg-ivory/80 border-t border-magenta/5">
                  <span className="text-[9px] text-muted/80 italic tracking-wide">
                    Exemplo ilustrativo da agenda
                  </span>
                </div>
              </PhoneFrame>
            </motion.div>

            {/* Cartão Flutuante 1: Lembrete pronto com WhatsApp (desktop e mobile) */}
            <div className="absolute -left-6 sm:-left-10 top-16 z-20 max-w-[210px]">
              <FloatingCard delay={0.6} duration={5} initialY={0}>
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <MessageCircle className="w-4 h-4 fill-white" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-plum block">
                      Lembrete Pronto
                    </span>
                    <p className="text-[10px] text-muted leading-tight mt-0.5">
                      "Olá Juliana! Confirmamos seu horário hoje às 14h?"
                    </p>
                  </div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-magenta/10 flex items-center justify-between">
                  <span className="text-[9px] text-muted font-medium">1 clique</span>
                  <span className="text-[9px] text-magenta font-bold bg-magenta/10 px-1.5 py-0.5 rounded">
                    Disparar
                  </span>
                </div>
              </FloatingCard>
            </div>

            {/* Cartão Flutuante 2: Notificação de Novo Agendamento (desktop e mobile) */}
            <div className="absolute -right-4 sm:-right-8 bottom-28 z-20 max-w-[220px]">
              <FloatingCard delay={0.8} duration={6.5} initialY={0}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-magenta text-white flex items-center justify-center flex-shrink-0 shadow-rose-soft">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] font-bold text-plum">Novo agendamento</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-magenta animate-ping" />
                    </div>
                    <p className="text-[10px] text-muted leading-tight mt-0.5">
                      Pelo link na bio do Instagram
                    </p>
                  </div>
                </div>
                <div className="mt-2 bg-blush/60 rounded-lg p-1.5 text-[10px] flex justify-between font-semibold text-plum">
                  <span>Sexta · 15h00</span>
                  <span className="text-magenta">R$ 140</span>
                </div>
              </FloatingCard>
            </div>

            {/* Cartão Flutuante 3: Selo Dourado Pacote Mensal (oculto no mobile muito pequeno) */}
            <div className="hidden sm:block absolute -left-8 bottom-8 z-20">
              <FloatingCard delay={1.0} duration={5.5} initialY={0}>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gold-gradient text-plum flex items-center justify-center shadow-gold-glow">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-plum block">
                      Pacote Mensal Studio
                    </span>
                    <span className="text-[10px] font-bold text-gold-dark">
                      Economia de 20%
                    </span>
                  </div>
                </div>
              </FloatingCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
