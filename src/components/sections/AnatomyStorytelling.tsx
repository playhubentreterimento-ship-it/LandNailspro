import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';

const TOTAL_FRAMES = 120;

/**
 * Ritmo: mapa por faixas não linear
 * p 0–0.12    → fração dos frames 0–0.15 (dedo fechado inicial)
 * p 0.12–0.55 → fração dos frames 0.15–0.50 (desmonte e abertura das camadas)
 * p 0.55–0.80 → fração dos frames 0.50–0.75 (pilha aberta, tempo de leitura das legendas e selo)
 * p 0.80–1.00 → fração dos frames 0.75–1.00 (pilha em repouso final)
 */
const RHYTHM_BANDS = [
  { pStart: 0, pEnd: 0.12, fStart: 0, fEnd: 0.15 },
  { pStart: 0.12, pEnd: 0.55, fStart: 0.15, fEnd: 0.5 },
  { pStart: 0.55, pEnd: 0.8, fStart: 0.5, fEnd: 0.75 },
  { pStart: 0.8, pEnd: 1.0, fStart: 0.75, fEnd: 1.0 },
] as const;

function mapProgressToFrame(p: number, totalFrames: number = TOTAL_FRAMES): number {
  const clampedP = Math.max(0, Math.min(1, p));
  let frameFraction = clampedP;
  for (const band of RHYTHM_BANDS) {
    if (clampedP >= band.pStart && clampedP <= band.pEnd) {
      const bandRange = band.pEnd - band.pStart;
      const t = bandRange === 0 ? 0 : (clampedP - band.pStart) / bandRange;
      frameFraction = band.fStart + t * (band.fEnd - band.fStart);
      break;
    }
  }
  return Math.max(0, Math.min(totalFrames - 1, frameFraction * (totalFrames - 1)));
}

function getFrameUrl(index: number, isMobile: boolean): string {
  const folder = isMobile ? '/frames/anatomia/mobile' : '/frames/anatomia';
  const num = String(index + 1).padStart(3, '0');
  return `${folder}/frame-${num}.webp`;
}

export const AnatomyStorytelling: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [isMobile, setIsMobile] = useState(false);
  const [isNear, setIsNear] = useState(false);

  // Cache em memória das imagens decodificadas
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const rafRef = useRef<number | null>(null);

  // Detecção responsiva (< 768px para mobile)
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile((prev) => {
        if (prev !== mobile) {
          imagesRef.current = new Array(TOTAL_FRAMES).fill(null);
        }
        return mobile;
      });
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // IntersectionObserver e verificação inicial para carregamento inteligente ao se aproximar (~1 tela)
  useEffect(() => {
    if (!containerRef.current) return;

    const checkProximity = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 2 && rect.bottom >= -window.innerHeight) {
        setIsNear(true);
      }
    };

    checkProximity();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100% 0px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Busca a imagem carregada mais próxima do índice desejado
  const getNearestImage = useCallback((index: number): HTMLImageElement | null => {
    const images = imagesRef.current;
    if (images[index]) return images[index];
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      if (index - offset >= 0 && images[index - offset]) return images[index - offset];
      if (index + offset < TOTAL_FRAMES && images[index + offset]) return images[index + offset];
    }
    return null;
  }, []);

  // Framer Motion useScroll no container (550vh desktop / 420vh mobile)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.0005,
  });

  // Função central de renderização no Canvas
  const renderCanvas = useCallback(
    (progress: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: true });
      if (!ctx) return;

      const framePos = mapProgressToFrame(progress, TOTAL_FRAMES);
      const floorIdx = Math.floor(framePos);
      const ceilIdx = Math.min(TOTAL_FRAMES - 1, floorIdx + 1);
      const frac = framePos - floorIdx;

      const img1 = getNearestImage(floorIdx);
      const img2 = getNearestImage(ceilIdx);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (img1) {
        ctx.globalAlpha = 1.0;
        ctx.drawImage(img1, 0, 0, canvas.width, canvas.height);
      }

      // Interpolação contínua entre frames vizinhos com globalAlpha
      if (img2 && img2 !== img1 && frac > 0.002) {
        ctx.globalAlpha = frac;
        ctx.drawImage(img2, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1.0;
      }
    },
    [getNearestImage]
  );

  // Redimensionamento do Canvas respeitando devicePixelRatio (mantendo 9:16 nítido)
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(rect.height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
    renderCanvas(smoothProgress.get());
  }, [renderCanvas, smoothProgress]);

  useEffect(() => {
    updateCanvasDimensions();
    window.addEventListener('resize', updateCanvasDimensions, { passive: true });
    return () => window.removeEventListener('resize', updateCanvasDimensions);
  }, [updateCanvasDimensions]);

  // Carregamento progressivo de frames
  useEffect(() => {
    if (!isNear || shouldReduceMotion) return;

    let isCancelled = false;

    const loadSingleImage = async (index: number): Promise<HTMLImageElement | null> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFrameUrl(index, isMobile);
        if (img.decode) {
          img
            .decode()
            .then(() => {
              if (isCancelled) return resolve(null);
              imagesRef.current[index] = img;
              resolve(img);
            })
            .catch(() => {
              img.onload = () => {
                if (isCancelled) return resolve(null);
                imagesRef.current[index] = img;
                resolve(img);
              };
              img.onerror = () => resolve(null);
            });
        } else {
          img.onload = () => {
            if (isCancelled) return resolve(null);
            imagesRef.current[index] = img;
            resolve(img);
          };
          img.onerror = () => resolve(null);
        }
      });
    };

    const runProgressiveLoad = async () => {
      // 1. Carrega o primeiro frame imediatamente para desenhar a cena
      const first = await loadSingleImage(0);
      if (first && !isCancelled) {
        updateCanvasDimensions();
        renderCanvas(smoothProgress.get());
      }

      // 2. Carrega os primeiros 25% (frames 1 a 29) em lotes
      const firstQuarterPromises: Promise<HTMLImageElement | null>[] = [];
      for (let i = 1; i < 30; i++) {
        firstQuarterPromises.push(loadSingleImage(i));
      }
      await Promise.allSettled(firstQuarterPromises);
      if (isCancelled) return;
      renderCanvas(smoothProgress.get());

      // 3. Carrega o restante (frames 30 a 119) em segundo plano
      for (let i = 30; i < TOTAL_FRAMES; i++) {
        if (isCancelled) break;
        await loadSingleImage(i);
        if (i % 12 === 0) {
          renderCanvas(smoothProgress.get());
        }
      }
      if (!isCancelled) {
        renderCanvas(smoothProgress.get());
      }
    };

    runProgressiveLoad();

    return () => {
      isCancelled = true;
    };
  }, [isNear, isMobile, shouldReduceMotion, renderCanvas, smoothProgress, updateCanvasDimensions]);

  // Listener para redesenhar o canvas no requestAnimationFrame sempre que smoothProgress mudar
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        renderCanvas(latest);
      });
    });
    return () => {
      unsubscribe();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [smoothProgress, renderCanvas]);

  // Glow dourado sutil: cresce entre 15% e 50% do progresso
  const glowOpacity = useTransform(smoothProgress, [0, 0.15, 0.5, 0.85], [0, 0, 0.55, 0.4]);
  const glowScale = useTransform(smoothProgress, [0.15, 0.5, 0.85], [0.9, 1.15, 1.0]);

  // Barra de progresso vertical
  const barScaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

  // Sincronia dos 3 textos de etapa (janelas p: 0–0.30, 0.30–0.72 e 0.72–1.0)
  // Fade + 16px de deslocamento vertical; apenas um visível por vez
  const text1Opacity = useTransform(smoothProgress, [0, 0.02, 0.25, 0.3], [1, 1, 1, 0]);
  const text1Y = useTransform(smoothProgress, [0, 0.25, 0.3], [0, 0, -16]);

  const text2Opacity = useTransform(
    smoothProgress,
    [0.29, 0.34, 0.67, 0.72],
    [0, 1, 1, 0]
  );
  const text2Y = useTransform(
    smoothProgress,
    [0.29, 0.34, 0.67, 0.72],
    [16, 0, 0, -16]
  );

  const text3Opacity = useTransform(smoothProgress, [0.71, 0.76, 1], [0, 1, 1]);
  const text3Y = useTransform(smoothProgress, [0.71, 0.76, 1], [16, 0, 0]);

  const scrollToBento = () => {
    const el = document.getElementById('ficha-tecnica');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Suporte a prefers-reduced-motion: exibe imagem estática (frame-090) com textos em sequência normal
  if (shouldReduceMotion) {
    const staticFramePath = isMobile
      ? '/frames/anatomia/mobile/frame-090.webp'
      : '/frames/anatomia/frame-090.webp';

    return (
      <section
        id="anatomia"
        className="py-20 relative grain-overlay"
        style={{
          background:
            'linear-gradient(to bottom, #FBF6F2 0px, #C9BDB2 140px, #D8CDC2 calc(100% - 140px), #FBF6F2 100%)',
        }}
        aria-label="Anatomia de um atendimento"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#A97C25] mb-3 inline-block">
            ANATOMIA DE UM ATENDIMENTO
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#2B1220] leading-tight mb-8">
            Cada <span className="italic text-magenta font-semibold">camada</span> importa.
            Registre todas.
          </h2>

          <div className="relative max-w-sm mx-auto aspect-[9/16] rounded-2xl overflow-hidden shadow-rose-card my-8">
            <img
              src={staticFramePath}
              alt="Anatomia da unha com alongamento F1, mostrando as camadas do atendimento"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="max-w-xl mx-auto space-y-4 text-left mt-8">
            <p className="text-base text-[#2B1220] font-semibold">
              1. Uma unha. Várias decisões.
            </p>
            <p className="text-base text-[#5E4A53]">
              2. Material, gel construtor, alongamento, esmalte e finish. Cada camada muda o
              resultado.
            </p>
            <p className="text-base text-[#2B1220] font-medium">
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
      id="anatomia"
      className="relative grain-overlay"
      style={{
        background:
          'linear-gradient(to bottom, #FBF6F2 0px, #C9BDB2 140px, #D8CDC2 calc(100% - 140px), #FBF6F2 100%)',
      }}
      aria-label="Scroll Storytelling da Anatomia da Unha"
    >
      {/* Título principal que fica fora do sticky e rola normalmente acima da sequência */}
      <div className="pt-20 pb-10 sm:pt-28 sm:pb-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center relative z-10">
        <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#A97C25] mb-3 inline-block">
          ANATOMIA DE UM ATENDIMENTO
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#2B1220] leading-[1.1] tracking-tight">
          Cada <span className="italic text-magenta font-semibold">camada</span> importa.
          Registre todas.
        </h2>
        <p className="mt-4 text-sm sm:text-base md:text-lg text-[#5E4A53] max-w-2xl mx-auto font-normal">
          Do diagnóstico inicial ao acabamento final: cada etapa salva em detalhes para o próximo atendimento.
        </p>
      </div>

      {/* Container de scroll storytelling (550vh desktop / 420vh mobile) */}
      <div ref={containerRef} className="relative h-[420vh] lg:h-[550vh]">
        {/* Elemento Sticky 100svh que fixa a composição durante a rolagem */}
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center z-20">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
            {/* Estrutura responsiva única (Desktop em 2 colunas, Tablet/Mobile vertical) */}
            <div className="w-full h-full flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-12 items-center justify-between lg:justify-center py-2 sm:py-4 lg:py-0 max-h-[96vh]">
              
              {/* COLUNA DE TEXTO NO DESKTOP (>= 1024px) */}
              <div className="hidden lg:flex lg:col-span-5 flex-col justify-center relative min-h-[340px] pl-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#A97C25] mb-4 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#A97C25]" />
                  <span>Prontuário de Aplicação F1</span>
                </span>

                <div className="relative min-h-[190px]">
                  {/* ETAPA 1 (p: 0 -> 0.30) */}
                  <motion.div
                    style={{ opacity: text1Opacity, y: text1Y }}
                    className="absolute inset-0 flex flex-col justify-start pointer-events-none"
                  >
                    <span className="text-xs font-bold text-magenta/80 uppercase tracking-wider mb-2">
                      ETAPA 01 · DIAGNÓSTICO
                    </span>
                    <p className="font-serif text-3xl xl:text-4xl font-semibold text-[#2B1220] leading-snug">
                      Uma unha. Várias decisões.
                    </p>
                    <p className="text-sm text-[#5E4A53] mt-3 leading-relaxed">
                      Da lâmina natural à borda livre, cada técnica exige produtos, nivelamento e
                      tempos de cura específicos.
                    </p>
                  </motion.div>

                  {/* ETAPA 2 (p: 0.30 -> 0.72) */}
                  <motion.div
                    style={{ opacity: text2Opacity, y: text2Y }}
                    className="absolute inset-0 flex flex-col justify-start pointer-events-none"
                  >
                    <span className="text-xs font-bold text-magenta/80 uppercase tracking-wider mb-2">
                      ETAPA 02 · ESTRUTURAÇÃO
                    </span>
                    <p className="font-serif text-2xl xl:text-3xl font-semibold text-[#2B1220] leading-snug">
                      Material, gel construtor, alongamento, esmalte e finish. Cada camada muda o
                      resultado.
                    </p>
                    <p className="text-sm text-[#5E4A53] mt-3 leading-relaxed">
                      Quando a cliente retorna em 21 dias, você precisa lembrar com exatidão tudo
                      o que usou para manter o mesmo padrão.
                    </p>
                  </motion.div>

                  {/* ETAPA 3 (p: 0.72 -> 1.0) */}
                  <motion.div
                    style={{ opacity: text3Opacity, y: text3Y }}
                    className="absolute inset-0 flex flex-col justify-start"
                  >
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                      ETAPA 03 · REGISTRO DEFINITIVO
                    </span>
                    <p className="font-serif text-2xl xl:text-3xl font-semibold text-[#2B1220] leading-snug">
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

                {/* Marcadores de etapa com pontos dourados */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#2B1220]/10">
                  <span className="text-[11px] font-semibold text-[#5E4A53]">
                    Abertura contínua de camadas
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#A97C25]" />
                    <span className="w-8 h-[1px] bg-[#A97C25]/40" />
                    <span className="w-2 h-2 rounded-full bg-[#A97C25]" />
                    <span className="w-8 h-[1px] bg-[#A97C25]/40" />
                    <span className="w-2 h-2 rounded-full bg-[#A97C25]" />
                  </div>
                </div>
              </div>

              {/* CONTAINER DO CANVAS (ÚNICO NO DOM) + BARRA E GLOW */}
              <div className="relative flex items-center justify-center lg:col-span-7 w-full flex-1 lg:flex-initial overflow-hidden sm:overflow-visible">
                {/* Glow dourado muito sutil atrás da imagem */}
                <motion.div
                  style={{
                    opacity: glowOpacity,
                    scale: glowScale,
                  }}
                  className="absolute w-[280px] sm:w-[380px] lg:w-[440px] h-[280px] sm:h-[380px] lg:h-[440px] rounded-full bg-gradient-to-tr from-[#A97C25]/30 via-[#E8A3B5]/25 to-magenta/20 blur-[80px] pointer-events-none -z-10"
                />

                {/* Barra de progresso vertical fina (2px) com gradiente magenta -> dourado (em telas sm e maiores) */}
                <div className="hidden sm:flex flex-col items-center justify-between h-[60vh] sm:h-[64vh] lg:h-[65vh] max-h-[580px] mr-4 lg:mr-6 relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#A97C25] shadow-sm z-10" />
                  <div className="relative w-[2px] flex-1 my-2 bg-[#2B1220]/15 rounded-full overflow-hidden">
                    <motion.div
                      style={{ scaleY: barScaleY }}
                      className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-magenta via-[#E8A3B5] to-[#A97C25] origin-top"
                    />
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#A97C25] shadow-sm z-10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#A97C25] shadow-sm z-10" />
                </div>

                {/* Canvas único com máscara de degradê de 8% nas quatro bordas */}
                <div className="relative flex items-center justify-center">
                  <canvas
                    ref={canvasRef}
                    role="img"
                    aria-label="Anatomia da unha com alongamento F1, mostrando as camadas do atendimento"
                    style={{
                      WebkitMaskImage:
                        'linear-gradient(to right, transparent, black 8%, black 92%, transparent), linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)',
                      WebkitMaskComposite: 'source-in',
                      maskImage:
                        'linear-gradient(to right, transparent, black 8%, black 92%, transparent), linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)',
                      maskComposite: 'intersect',
                    }}
                    className="w-full max-w-[100vw] sm:max-w-[340px] lg:max-w-[420px] aspect-[9/16] max-h-[calc(100svh-230px)] sm:max-h-[64vh] lg:max-h-[88vh] object-contain block select-none pointer-events-none"
                  />
                </div>
              </div>

              {/* TEXTO DA ETAPA NO TABLET E MOBILE (< 1024px) */}
              <div className="lg:hidden w-full px-4 shrink-0 z-30 mb-20 sm:mb-6">
                {/* Mobile: Cartão de Vidro Fosco claro com texto >= 16px */}
                <div className="glass-card p-4 rounded-2xl border border-magenta/20 shadow-rose-soft bg-white/85 backdrop-blur-md max-w-md mx-auto">
                  <div className="relative min-h-[64px] flex items-center justify-center text-center">
                    <motion.div
                      style={{ opacity: text1Opacity, y: text1Y }}
                      className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none"
                    >
                      <p className="font-serif text-base font-bold text-[#2B1220] leading-snug">
                        Uma unha. Várias decisões.
                      </p>
                      <span className="text-xs text-[#5E4A53] mt-0.5">
                        Cada camada muda o resultado final.
                      </span>
                    </motion.div>

                    <motion.div
                      style={{ opacity: text2Opacity, y: text2Y }}
                      className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none"
                    >
                      <p className="font-serif text-base font-bold text-[#2B1220] leading-snug">
                        Material, gel construtor, esmalte e finish.
                      </p>
                      <span className="text-xs text-[#5E4A53] mt-0.5">
                        Cada detalhe salvo para a manutenção de 21 dias.
                      </span>
                    </motion.div>

                    <motion.div
                      style={{ opacity: text3Opacity, y: text3Y }}
                      className="absolute inset-0 flex flex-col justify-center items-center"
                    >
                      <p className="font-serif text-base font-bold text-[#2B1220] leading-snug">
                        Ficha técnica do NailGestão PRO.
                      </p>
                      <button
                        type="button"
                        onClick={scrollToBento}
                        className="text-xs font-bold text-magenta inline-flex items-center gap-1 mt-1"
                      >
                        <span>Ver a ficha técnica</span>
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
