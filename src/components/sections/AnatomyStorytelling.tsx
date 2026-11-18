import React, { useRef, useState, useEffect, useMemo } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  MotionValue,
} from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';

const TOTAL_FRAMES = 10;

interface FrameLayerProps {
  index: number;
  smoothProgress: MotionValue<number>;
  imageSrc: string;
  isFirst: boolean;
  onLoaded?: () => void;
}

const FrameLayer: React.FC<FrameLayerProps> = ({
  index,
  smoothProgress,
  imageSrc,
  isFirst,
  onLoaded,
}) => {
  // Crossfade contínuo: para f = p * 9, opacidade = max(0, 1 - |f - index|)
  const opacity = useTransform(smoothProgress, (p) => {
    const f = p * (TOTAL_FRAMES - 1);
    const diff = Math.abs(f - index);
    return Math.max(0, 1 - diff);
  });

  return (
    <motion.img
      src={imageSrc}
      alt={
        index === 0
          ? 'Anatomia da unha com alongamento F1, mostrando as camadas do atendimento'
          : ''
      }
      aria-hidden={index !== 0}
      loading={isFirst || index === 1 ? 'eager' : 'lazy'}
      fetchPriority={isFirst ? 'high' : 'low'}
      onLoad={onLoaded}
      style={{
        opacity,
        willChange: 'opacity',
      }}
      className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
    />
  );
};

export const AnatomyStorytelling: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isNear, setIsNear] = useState(false);
  const [firstLoaded, setFirstLoaded] = useState(false);

  // Detecção de largura mobile (< 768px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // IntersectionObserver para lazy loading inteligente do conjunto de frames
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Lista de caminhos dos frames (desktop e mobile)
  const framePaths = useMemo(() => {
    const folder = isMobile ? '/frames/anatomia/mobile' : '/frames/anatomia';
    return Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const num = String(i + 1).padStart(2, '0');
      return `${folder}/frame-01.webp`.replace('01', num);
    });
  }, [isMobile]);

  // Pré-carregamento progressivo com new Image() e img.decode()
  useEffect(() => {
    if (!isNear || shouldReduceMotion) return;

    let isCancelled = false;

    const preloadSequential = async () => {
      for (let i = 0; i < framePaths.length; i++) {
        if (isCancelled) break;
        const img = new Image();
        img.src = framePaths[i];
        if (img.decode) {
          try {
            await img.decode();
          } catch {
            // Continua mesmo se decode assíncrono falhar
          }
        }
      }
    };

    preloadSequential();

    return () => {
      isCancelled = true;
    };
  }, [isNear, framePaths, shouldReduceMotion]);

  // Framer Motion Scroll & Easing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Leve zoom (câmera lenta de 1.00 a 1.04)
  const scale = useTransform(smoothProgress, [0, 1], [1.0, 1.04]);

  // Brilho dourado atrás da imagem (cresce entre p = 0.3 e 0.6)
  const glowOpacity = useTransform(
    smoothProgress,
    [0.2, 0.35, 0.58, 0.75],
    [0, 0.65, 0.65, 0.2]
  );
  const glowScale = useTransform(smoothProgress, [0.2, 0.5, 0.8], [0.85, 1.15, 0.95]);

  // Sincronia de texto das 3 etapas (apenas um visível por vez)
  // Etapa 1: 0 a 0.22
  const text1Opacity = useTransform(smoothProgress, [0, 0.02, 0.18, 0.22], [1, 1, 1, 0]);
  const text1Y = useTransform(smoothProgress, [0, 0.18, 0.22], [0, 0, -16]);

  // Etapa 2: 0.22 a 0.62
  const text2Opacity = useTransform(
    smoothProgress,
    [0.21, 0.27, 0.57, 0.62],
    [0, 1, 1, 0]
  );
  const text2Y = useTransform(
    smoothProgress,
    [0.21, 0.27, 0.57, 0.62],
    [16, 0, 0, -16]
  );

  // Etapa 3: 0.62 a 1.0
  const text3Opacity = useTransform(smoothProgress, [0.61, 0.68, 1], [0, 1, 1]);
  const text3Y = useTransform(smoothProgress, [0.61, 0.68, 1], [16, 0, 0]);

  // Barra de progresso vertical
  const barScaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

  const scrollToBento = () => {
    const el = document.getElementById('ficha-tecnica');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Suporte a prefers-reduced-motion: exibe o estado final estático (frame 10) sem sticky
  if (shouldReduceMotion) {
    return (
      <section
        className="py-20 bg-gradient-to-b from-ivory via-[#F3E6DA] to-ivory grain-overlay"
        aria-label="Anatomia de um atendimento"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.18em] font-bold text-magenta mb-3 inline-block">
            ANATOMIA DE UM ATENDIMENTO
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-plum leading-tight mb-8">
            Cada <span className="italic text-magenta font-semibold">camada</span> importa.
            Registre todas.
          </h2>

          <div className="relative max-w-sm mx-auto aspect-[9/16] rounded-2xl overflow-hidden shadow-rose-card my-8">
            <img
              src={framePaths[TOTAL_FRAMES - 1]}
              alt="Anatomia da unha com alongamento F1, mostrando as camadas do atendimento"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="max-w-xl mx-auto space-y-4 text-left mt-8">
            <p className="text-sm sm:text-base text-plum font-semibold">
              1. Uma unha. Várias decisões.
            </p>
            <p className="text-sm sm:text-base text-muted">
              2. Material, gel construtor, alongamento, esmalte e finish. Cada camada muda o
              resultado.
            </p>
            <p className="text-sm sm:text-base text-plum font-medium">
              3. Na ficha técnica do NailGestão, você registra tudo isso e encontra no próximo
              atendimento.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToBento}
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-magenta hover:text-magenta-dark"
          >
            <span>Ver a ficha técnica</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative h-[350vh] md:h-[450vh] bg-gradient-to-b from-ivory via-[#F3E6DA] to-ivory grain-overlay"
      aria-label="Scroll Storytelling da Anatomia da Unha"
    >
      {/* Título principal que rola normalmente acima da sequência sticky */}
      <div className="pt-20 pb-10 sm:pt-28 sm:pb-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center relative z-10">
        <span className="text-xs uppercase tracking-[0.18em] font-bold text-magenta mb-3 inline-block">
          ANATOMIA DE UM ATENDIMENTO
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-plum leading-[1.1] tracking-tight">
          Cada <span className="italic text-magenta font-semibold">camada</span> importa.
          Registre todas.
        </h2>
      </div>

      {/* Elemento Sticky: mantém a composição centralizada durante o scroll */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center z-20">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center h-full max-h-[92vh]">
            {/* COLUNA ESQUERDA: Textos sincronizados por etapa e CTA (Desktop) */}
            <div className="hidden lg:flex lg:col-span-5 flex-col justify-center relative min-h-[320px] pl-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-gold-dark mb-4 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Prontuário de Aplicação F1</span>
              </span>

              {/* Contêiner de textos sobrepostos */}
              <div className="relative min-h-[170px]">
                {/* ETAPA 1 (p: 0 -> 0.22) */}
                <motion.div
                  style={{ opacity: text1Opacity, y: text1Y }}
                  className="absolute inset-0 flex flex-col justify-start pointer-events-none"
                >
                  <span className="text-xs font-bold text-magenta/70 uppercase tracking-wider mb-2">
                    ETAPA 01 · DIAGNÓSTICO
                  </span>
                  <p className="font-serif text-3xl xl:text-4xl font-semibold text-plum leading-snug">
                    Uma unha. Várias decisões.
                  </p>
                  <p className="text-sm text-muted mt-3 leading-relaxed">
                    Da lâmina natural à borda livre, cada técnica exige produtos e tempos de
                    cura específicos.
                  </p>
                </motion.div>

                {/* ETAPA 2 (p: 0.22 -> 0.62) */}
                <motion.div
                  style={{ opacity: text2Opacity, y: text2Y }}
                  className="absolute inset-0 flex flex-col justify-start pointer-events-none"
                >
                  <span className="text-xs font-bold text-magenta/70 uppercase tracking-wider mb-2">
                    ETAPA 02 · ESTRUTURAÇÃO
                  </span>
                  <p className="font-serif text-2xl xl:text-3xl font-semibold text-plum leading-snug">
                    Material, gel construtor, alongamento, esmalte e finish. Cada camada muda o
                    resultado.
                  </p>
                  <p className="text-sm text-muted mt-3 leading-relaxed">
                    Quando a cliente retorna em 21 dias, você precisa lembrar com exatidão o que
                    usou.
                  </p>
                </motion.div>

                {/* ETAPA 3 (p: 0.62 -> 1.0) */}
                <motion.div
                  style={{ opacity: text3Opacity, y: text3Y }}
                  className="absolute inset-0 flex flex-col justify-start"
                >
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
                    ETAPA 03 · REGISTRO DEFINITIVO
                  </span>
                  <p className="font-serif text-2xl xl:text-3xl font-semibold text-plum leading-snug">
                    Na ficha técnica do NailGestão, você registra tudo isso e encontra no
                    próximo atendimento.
                  </p>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={scrollToBento}
                      className="inline-flex items-center gap-2 text-sm font-bold text-magenta hover:text-magenta-dark group transition-colors focus:outline-none"
                    >
                      <span className="border-b-2 border-magenta/40 group-hover:border-magenta pb-0.5">
                        Ver a ficha técnica
                      </span>
                      <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Mini indicador de etapas com marcadores dourados */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-magenta/10">
                <span className="text-[11px] font-semibold text-muted">Abertura de camadas</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold" />
                  <span className="w-8 h-[1px] bg-gold/40" />
                  <span className="w-2 h-2 rounded-full bg-gold" />
                  <span className="w-8 h-[1px] bg-gold/40" />
                  <span className="w-2 h-2 rounded-full bg-gold" />
                </div>
              </div>
            </div>

            {/* COLUNA DIREITA: Composição da Imagem 9:16 + Glow Dourado + Barra Lateral */}
            <div className="col-span-1 lg:col-span-7 flex items-center justify-center relative h-full">
              {/* Brilho dourado/rosé dinâmico no fundo que reage à abertura das camadas */}
              <motion.div
                style={{
                  opacity: glowOpacity,
                  scale: glowScale,
                }}
                className="absolute w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] rounded-full bg-gradient-to-tr from-gold/30 via-rose/30 to-magenta/25 blur-[90px] pointer-events-none -z-10"
              />

              {/* Barra de progresso vertical fina (2px) ao lado da imagem */}
              <div className="hidden sm:flex flex-col items-center justify-between h-[60vh] max-h-[560px] mr-4 relative">
                <div className="w-2 h-2 rounded-full bg-gold shadow-sm" />
                <div className="relative w-[2px] flex-1 my-2 bg-magenta/15 rounded-full overflow-hidden">
                  <motion.div
                    style={{ scaleY: barScaleY }}
                    className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-magenta via-rose to-gold origin-top"
                  />
                </div>
                <div className="w-2 h-2 rounded-full bg-gold shadow-sm" />
              </div>

              {/* Wrapper da sequência de 10 frames */}
              <motion.div
                style={{ scale }}
                className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[400px] aspect-[9/16] max-h-[86vh] flex items-center justify-center overflow-hidden"
              >
                {/* Efeito de Máscara Suave e Vinheta para fundir as bordas ao fundo sem corte reto */}
                <div
                  className="relative w-full h-full flex items-center justify-center"
                  style={{
                    WebkitMaskImage:
                      'radial-gradient(ellipse at center, black 68%, rgba(0,0,0,0.85) 82%, transparent 98%)',
                    maskImage:
                      'radial-gradient(ellipse at center, black 68%, rgba(0,0,0,0.85) 82%, transparent 98%)',
                  }}
                >
                  {/* Shimmer suave enquanto o primeiro frame carrega */}
                  {!firstLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  )}

                  {/* 10 Frames empilhados em absolute */}
                  {framePaths.map((src, idx) => (
                    <FrameLayer
                      key={src}
                      index={idx}
                      smoothProgress={smoothProgress}
                      imageSrc={src}
                      isFirst={idx === 0}
                      onLoaded={idx === 0 ? () => setFirstLoaded(true) : undefined}
                    />
                  ))}
                </div>

                {/* Cartão de Vidro Fosco sobreposto no Mobile (< 768px) */}
                <div className="lg:hidden absolute bottom-3 left-3 right-3 z-30 pointer-events-auto">
                  <div className="glass-card p-4 rounded-2xl border border-magenta/20 shadow-rose-soft bg-white/80 backdrop-blur-md">
                    {/* Texto alternado dinamicamente no mobile */}
                    <div className="relative min-h-[64px] flex items-center">
                      <motion.div
                        style={{ opacity: text1Opacity }}
                        className="absolute inset-0 flex flex-col justify-center"
                      >
                        <p className="font-serif text-base font-bold text-plum leading-snug">
                          Uma unha. Várias decisões.
                        </p>
                        <span className="text-[11px] text-muted">
                          Cada camada muda o resultado final.
                        </span>
                      </motion.div>

                      <motion.div
                        style={{ opacity: text2Opacity }}
                        className="absolute inset-0 flex flex-col justify-center"
                      >
                        <p className="font-serif text-sm font-bold text-plum leading-snug">
                          Material, gel, alongamento e finish.
                        </p>
                        <span className="text-[11px] text-muted">
                          Cada detalhe influencia a durabilidade.
                        </span>
                      </motion.div>

                      <motion.div
                        style={{ opacity: text3Opacity }}
                        className="absolute inset-0 flex flex-col justify-center"
                      >
                        <p className="font-serif text-sm font-bold text-plum leading-snug">
                          Registre na ficha técnica do NailGestão.
                        </p>
                        <button
                          type="button"
                          onClick={scrollToBento}
                          className="text-[11px] font-bold text-magenta inline-flex items-center gap-1 mt-1"
                        >
                          <span>Ver a ficha técnica</span>
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
