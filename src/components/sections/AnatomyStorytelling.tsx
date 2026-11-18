import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  MotionValue,
} from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { ANATOMY_LAYERS, AnatomyLayer } from '../../data/anatomyLayers';

const TOTAL_FRAMES = 120;

/**
 * Ritmo: mapa por faixas não linear
 * p 0–0.14   → fração dos frames 0–0.22 (dedo com unha alongada, início do desmonte)
 * p 0.14–0.26 → fração dos frames 0.22–0.36 (camadas sobem e se separam - movimento rápido)
 * p 0.26–0.62 → fração dos frames 0.36–0.70 (pilha aberta e parada - janela de leitura com legendas)
 * p 0.62–0.76 → fração dos frames 0.70–0.84 (recomposição rápida com brilho dourado)
 * p 0.76–1.00 → fração dos frames 0.84–1.00 (resultado final com unha pronta)
 */
const RHYTHM_BANDS = [
  { pStart: 0, pEnd: 0.14, fStart: 0, fEnd: 0.22 },
  { pStart: 0.14, pEnd: 0.26, fStart: 0.22, fEnd: 0.36 },
  { pStart: 0.26, pEnd: 0.62, fStart: 0.36, fEnd: 0.7 },
  { pStart: 0.62, pEnd: 0.76, fStart: 0.7, fEnd: 0.84 },
  { pStart: 0.76, pEnd: 1.0, fStart: 0.84, fEnd: 1.0 },
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

/**
 * Animação de entrada e saída das legendas:
 * Aparecem durante a janela de leitura (p 0.26 a 0.62) com stagger de 90ms de cima para baixo
 * Saem juntas com fade na recomposição (a partir de 0.60)
 */
function getLayerVisibility(progress: number, index: number) {
  const enterStart = 0.26 + (index / 9) * 0.08;
  const enterEnd = enterStart + 0.035;
  const exitStart = 0.6;
  const exitEnd = 0.63;

  if (progress < enterStart) {
    return { opacity: 0, x: 12 };
  }
  if (progress >= enterStart && progress < enterEnd) {
    const t = (progress - enterStart) / (enterEnd - enterStart);
    return { opacity: t, x: (1 - t) * 12 };
  }
  if (progress >= enterEnd && progress < exitStart) {
    return { opacity: 1, x: 0 };
  }
  if (progress >= exitStart && progress < exitEnd) {
    const t = (progress - exitStart) / (exitEnd - exitStart);
    return { opacity: 1 - t, x: t * 8 };
  }
  return { opacity: 0, x: 8 };
}

/**
 * Componente individual para cada etiqueta em HTML no Desktop
 */
const DesktopLayerLabel: React.FC<{
  layer: AnatomyLayer;
  index: number;
  smoothProgress: MotionValue<number>;
}> = ({ layer, index, smoothProgress }) => {
  const opacity = useTransform(smoothProgress, (p) => getLayerVisibility(p, index).opacity);
  const x = useTransform(smoothProgress, (p) => getLayerVisibility(p, index).x);

  return (
    <motion.div
      style={{
        top: `${layer.yPercent}%`,
        opacity,
        x,
      }}
      className="absolute left-0 -translate-y-1/2 flex items-center pointer-events-auto"
    >
      {/* Ponto brilhante dourado na extremidade da camada */}
      <div className="w-1.5 h-1.5 rounded-full bg-[#E3C176] shadow-[0_0_8px_#E3C176] shrink-0" />
      {/* Linha de chamada fina dourada */}
      <div className="w-5 xl:w-8 h-[1px] bg-gradient-to-r from-[#E3C176] to-[#E3C176]/30 shrink-0" />
      {/* Etiqueta em vidro fosco escuro com borda dourada 30% */}
      <div className="bg-[#181410]/90 backdrop-blur-md border border-[#E3C176]/30 rounded-full px-3 py-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.7)] flex items-center gap-2 xl:gap-2.5">
        <span className="w-5 h-5 rounded-full bg-[#E3C176]/20 border border-[#E3C176]/60 text-[#E3C176] text-[10px] font-bold flex items-center justify-center shrink-0">
          {layer.number}
        </span>
        <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#FBF6F2] font-sans shrink-0">
          {layer.title}
        </span>
        <span className="hidden xl:inline text-[13px] text-[#D9C7CE] font-normal truncate max-w-[270px]">
          — {layer.description}
        </span>
      </div>
    </motion.div>
  );
};

/**
 * Ponto numerado sobre a camada no Tablet e Mobile
 */
const MobileLayerDot: React.FC<{
  layer: AnatomyLayer;
  index: number;
  smoothProgress: MotionValue<number>;
}> = ({ layer, index, smoothProgress }) => {
  const opacity = useTransform(smoothProgress, (p) => getLayerVisibility(p, index).opacity);
  const scale = useTransform(smoothProgress, (p) =>
    getLayerVisibility(p, index).opacity > 0 ? 1 : 0.7
  );

  return (
    <motion.div
      style={{
        top: `${layer.yPercent}%`,
        opacity,
        scale,
      }}
      className="absolute left-2 sm:left-4 -translate-y-1/2 w-[22px] h-[22px] rounded-full bg-[#181410]/90 border border-[#E3C176] text-[#E3C176] text-[11px] font-bold flex items-center justify-center shadow-[0_0_10px_rgba(227,193,118,0.5)] z-20 pointer-events-none"
    >
      {layer.number}
    </motion.div>
  );
};

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

  // IntersectionObserver e proximidade inicial para carregamento inteligente (~1 tela)
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

  // Framer Motion useScroll no container (600vh desktop / 450vh mobile)
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

  // Glow radial sutil em champagne escuro (#2A2118, 40%) constante
  // Glow dourado adicional na recomposição que cresce entre 0.70 e 0.84 da fração de frames (p 0.62 a 0.76)
  const reassemblyGlowOpacity = useTransform(
    smoothProgress,
    [0.6, 0.68, 0.75, 0.82],
    [0, 0.75, 0.75, 0]
  );
  const reassemblyGlowScale = useTransform(smoothProgress, [0.6, 0.68, 0.76], [0.95, 1.25, 1.05]);

  // Barra de progresso vertical
  const barScaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

  // Sincronia dos 3 textos de etapa (janelas p: 0–0.26, 0.26–0.62 e 0.62–1.0)
  // Fade + 16px de deslocamento vertical; apenas um visível por vez
  const text1Opacity = useTransform(smoothProgress, [0, 0.02, 0.22, 0.26], [1, 1, 1, 0]);
  const text1Y = useTransform(smoothProgress, [0, 0.22, 0.26], [0, 0, -16]);

  const text2Opacity = useTransform(
    smoothProgress,
    [0.25, 0.3, 0.58, 0.62],
    [0, 1, 1, 0]
  );
  const text2Y = useTransform(
    smoothProgress,
    [0.25, 0.3, 0.58, 0.62],
    [16, 0, 0, -16]
  );

  const text3Opacity = useTransform(smoothProgress, [0.61, 0.67, 1], [0, 1, 1]);
  const text3Y = useTransform(smoothProgress, [0.61, 0.67, 1], [16, 0, 0]);

  const scrollToBento = () => {
    const el = document.getElementById('ficha-tecnica');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Suporte a prefers-reduced-motion: exibe imagem estática da pilha aberta (frame-060) com lista completa
  if (shouldReduceMotion) {
    const staticFramePath = isMobile
      ? '/frames/anatomia/mobile/frame-060.webp'
      : '/frames/anatomia/frame-060.webp';

    return (
      <section
        id="anatomia"
        className="py-20 relative grain-overlay text-[#FBF6F2]"
        style={{
          background:
            'linear-gradient(to bottom, #FBF6F2 0px, #110F0B 160px, #110F0B calc(100% - 160px), #FBF6F2 100%)',
        }}
        aria-label="Anatomia de um atendimento"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#E3C176] mb-3 inline-block">
            ANATOMIA DE UM ATENDIMENTO
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#FBF6F2] leading-tight mb-8">
            Cada <span className="italic text-[#F06CA3] font-semibold">camada</span> importa.
            Registre todas.
          </h2>

          <div className="relative max-w-sm mx-auto aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl my-8 border border-[#E3C176]/20 bg-[#110F0B]">
            <img
              src={staticFramePath}
              alt="Anatomia da unha com alongamento F1, mostrando as camadas do atendimento"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Lista completa das 9 camadas em HTML */}
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 text-left my-8">
            {ANATOMY_LAYERS.map((layer) => (
              <div
                key={layer.number}
                className="bg-[#181410] border border-[#E3C176]/30 rounded-xl p-3 flex items-start gap-3"
              >
                <span className="w-5 h-5 rounded-full bg-[#E3C176]/20 border border-[#E3C176]/60 text-[#E3C176] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {layer.number}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase text-[#FBF6F2] tracking-wider">
                    {layer.title}
                  </p>
                  <p className="text-[12px] text-[#D9C7CE] mt-0.5">{layer.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-xl mx-auto space-y-3 text-left mt-8 pt-6 border-t border-[#E3C176]/20">
            <p className="text-base text-[#FBF6F2] font-semibold">
              1. Uma unha. Várias decisões.
            </p>
            <p className="text-base text-[#D9C7CE]">
              2. Material, gel construtor, alongamento, esmalte e finish. Cada camada muda o
              resultado.
            </p>
            <p className="text-base text-[#FBF6F2] font-medium">
              3. Na ficha técnica do NailGestão, você registra tudo isso e encontra no próximo
              atendimento.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToBento}
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#F06CA3] hover:text-white transition-colors"
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
      className="relative grain-overlay text-[#FBF6F2]"
      style={{
        background:
          'linear-gradient(to bottom, #FBF6F2 0px, #110F0B 160px, #110F0B calc(100% - 160px), #FBF6F2 100%)',
      }}
      aria-label="Scroll Storytelling da Anatomia da Unha"
    >
      {/* Título principal que fica fora do sticky e rola normalmente acima da sequência */}
      <div className="pt-24 pb-10 sm:pt-32 sm:pb-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center relative z-10">
        <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#E3C176] mb-3 inline-block">
          ANATOMIA DE UM ATENDIMENTO
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#FBF6F2] leading-[1.1] tracking-tight">
          Cada <span className="italic text-[#F06CA3] font-semibold">camada</span> importa.
          Registre todas.
        </h2>
        <p className="mt-4 text-sm sm:text-base md:text-lg text-[#D9C7CE] max-w-2xl mx-auto font-normal">
          Do diagnóstico inicial ao acabamento final: visualize a estrutura completa de uma aplicação profissional.
        </p>
      </div>

      {/* Container de scroll storytelling (600vh desktop / 450vh mobile) */}
      <div ref={containerRef} className="relative h-[450vh] lg:h-[600vh]">
        {/* Elemento Sticky 100svh que fixa a composição durante a rolagem */}
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center z-20">
          <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
            {/* Estrutura Desktop (≥ 1024px): 3 ZONAS (Texto ~30%, Canvas ~36%, Legendas ~28%) */}
            <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between py-2 sm:py-4 lg:py-0 max-h-[96vh]">
              
              {/* ZONA 1 (ESQUERDA ~30%): Textos das etapas e CTA no Desktop */}
              <div className="hidden lg:flex flex-col justify-center relative w-[28%] xl:w-[30%] min-h-[340px] pl-2 xl:pl-4 shrink-0">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#E3C176] mb-4 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#E3C176]" />
                  <span>Prontuário de Aplicação F1</span>
                </span>

                <div className="relative min-h-[200px]">
                  {/* ETAPA 1 (p: 0 -> 0.26) */}
                  <motion.div
                    style={{ opacity: text1Opacity, y: text1Y }}
                    className="absolute inset-0 flex flex-col justify-start pointer-events-none"
                  >
                    <span className="text-xs font-bold text-[#F06CA3] uppercase tracking-wider mb-2">
                      ETAPA 01 · DIAGNÓSTICO
                    </span>
                    <p className="font-serif text-3xl xl:text-4xl font-semibold text-[#FBF6F2] leading-snug">
                      Uma unha. Várias decisões.
                    </p>
                    <p className="text-sm text-[#D9C7CE] mt-3 leading-relaxed">
                      Da lâmina natural à borda livre, cada técnica exige produtos, nivelamento e
                      tempos de cura específicos.
                    </p>
                  </motion.div>

                  {/* ETAPA 2 (p: 0.26 -> 0.62) — Coincide com as legendas HTML */}
                  <motion.div
                    style={{ opacity: text2Opacity, y: text2Y }}
                    className="absolute inset-0 flex flex-col justify-start pointer-events-none"
                  >
                    <span className="text-xs font-bold text-[#E3C176] uppercase tracking-wider mb-2">
                      ETAPA 02 · ESTRUTURAÇÃO
                    </span>
                    <p className="font-serif text-2xl xl:text-3xl font-semibold text-[#FBF6F2] leading-snug">
                      Material, gel construtor, alongamento, esmalte e finish. Cada camada muda o
                      resultado.
                    </p>
                    <p className="text-sm text-[#D9C7CE] mt-3 leading-relaxed">
                      Quando a cliente retorna em 21 dias, você precisa lembrar com exatidão tudo
                      o que usou para manter o mesmo padrão.
                    </p>
                  </motion.div>

                  {/* ETAPA 3 (p: 0.62 -> 1.0) — Coincide com a recomposição e resultado */}
                  <motion.div
                    style={{ opacity: text3Opacity, y: text3Y }}
                    className="absolute inset-0 flex flex-col justify-start"
                  >
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                      ETAPA 03 · REGISTRO DEFINITIVO
                    </span>
                    <p className="font-serif text-2xl xl:text-3xl font-semibold text-[#FBF6F2] leading-snug">
                      Na ficha técnica do NailGestão, você registra tudo isso e encontra no
                      próximo atendimento.
                    </p>

                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={scrollToBento}
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#F06CA3] hover:text-white group transition-colors focus:outline-none"
                      >
                        <span className="border-b-2 border-[#F06CA3]/40 group-hover:border-white pb-0.5">
                          Ver a ficha técnica
                        </span>
                        <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* Marcadores de etapa */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#E3C176]/15">
                  <span className="text-[11px] font-semibold text-[#D9C7CE]">
                    Abertura contínua de camadas
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E3C176]" />
                    <span className="w-8 h-[1px] bg-[#E3C176]/40" />
                    <span className="w-2 h-2 rounded-full bg-[#E3C176]" />
                    <span className="w-8 h-[1px] bg-[#E3C176]/40" />
                    <span className="w-2 h-2 rounded-full bg-[#E3C176]" />
                  </div>
                </div>
              </div>

              {/* ZONA 2 (CENTRO ~36%): CANVAS 9:16 + GLOWS + BARRA VERTICAL */}
              <div className="relative flex items-center justify-center w-full lg:w-[36%] flex-1 lg:flex-initial overflow-hidden sm:overflow-visible">
                {/* Glow radial sutil em champagne escuro (#2A2118, 40%) constante */}
                <div className="absolute w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] rounded-full bg-[#2A2118]/40 blur-[80px] pointer-events-none -z-20" />

                {/* Glow dourado de recomposição (cresce entre 0.70 e 0.84 do progresso) */}
                <motion.div
                  style={{
                    opacity: reassemblyGlowOpacity,
                    scale: reassemblyGlowScale,
                  }}
                  className="absolute w-[300px] sm:w-[440px] h-[300px] sm:h-[440px] rounded-full bg-gradient-to-tr from-[#E3C176]/40 via-[#F06CA3]/30 to-[#E3C176]/30 blur-[90px] pointer-events-none -z-10"
                />

                {/* Barra de progresso vertical fina (2px) com gradiente magenta -> dourado (em telas sm e maiores) */}
                <div className="hidden sm:flex flex-col items-center justify-between h-[60vh] sm:h-[64vh] lg:h-[65vh] max-h-[580px] mr-4 lg:mr-6 relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E3C176] shadow-sm z-10" />
                  <div className="relative w-[2px] flex-1 my-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      style={{ scaleY: barScaleY }}
                      className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[#F06CA3] via-[#E8A3B5] to-[#E3C176] origin-top"
                    />
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#E3C176] shadow-sm z-10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E3C176] shadow-sm z-10" />
                </div>

                {/* Canvas com máscara degradê de 4% nas quatro bordas */}
                <div className="relative flex items-center justify-center">
                  <canvas
                    ref={canvasRef}
                    role="img"
                    aria-label="Anatomia da unha com alongamento F1, mostrando as camadas do atendimento"
                    style={{
                      WebkitMaskImage:
                        'linear-gradient(to right, transparent, black 4%, black 96%, transparent), linear-gradient(to bottom, transparent, black 4%, black 96%, transparent)',
                      WebkitMaskComposite: 'source-in',
                      maskImage:
                        'linear-gradient(to right, transparent, black 4%, black 96%, transparent), linear-gradient(to bottom, transparent, black 4%, black 96%, transparent)',
                      maskComposite: 'intersect',
                    }}
                    className="w-full max-w-[100vw] sm:max-w-[340px] lg:max-w-[400px] aspect-[9/16] max-h-[calc(100svh-230px)] sm:max-h-[62vh] lg:max-h-[88vh] object-contain block select-none pointer-events-none"
                  />

                  {/* Pontos numerados sobre as camadas no Tablet e Mobile (< 1024px) */}
                  <div className="lg:hidden absolute inset-0 pointer-events-none">
                    {ANATOMY_LAYERS.map((layer, idx) => (
                      <MobileLayerDot
                        key={layer.number}
                        layer={layer}
                        index={idx}
                        smoothProgress={smoothProgress}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* ZONA 3 (DIREITA ~28%): COLUNA DE LEGENDAS EM HTML NO DESKTOP (≥ 1024px) */}
              <div className="hidden lg:block relative w-[34%] xl:w-[32%] h-[88vh] shrink-0 pl-2">
                {ANATOMY_LAYERS.map((layer, idx) => (
                  <DesktopLayerLabel
                    key={layer.number}
                    layer={layer}
                    index={idx}
                    smoothProgress={smoothProgress}
                  />
                ))}
              </div>

              {/* TEXTO DA ETAPA NO TABLET E MOBILE (< 1024px) COM CARTÃO DE VIDRO FOSCO ESCURO */}
              <div className="lg:hidden w-full px-4 shrink-0 z-30 mb-20 sm:mb-6">
                <div className="bg-[#181410]/95 backdrop-blur-md border border-[#E3C176]/35 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] max-w-md mx-auto">
                  <div className="relative min-h-[70px] flex items-center justify-center text-center">
                    {/* ETAPA 1 (Mobile) */}
                    <motion.div
                      style={{ opacity: text1Opacity, y: text1Y }}
                      className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none"
                    >
                      <p className="font-serif text-base font-bold text-[#FBF6F2] leading-snug">
                        Uma unha. Várias decisões.
                      </p>
                      <span className="text-xs text-[#D9C7CE] mt-0.5">
                        Cada camada muda o resultado final.
                      </span>
                    </motion.div>

                    {/* ETAPA 2 (Mobile): Mostra a lista resumida das 9 camadas em 2 colunas */}
                    <motion.div
                      style={{ opacity: text2Opacity, y: text2Y }}
                      className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none"
                    >
                      <div className="w-full grid grid-cols-2 gap-x-2 gap-y-1 text-left">
                        {ANATOMY_LAYERS.map((layer) => (
                          <div key={layer.number} className="flex items-center gap-1.5 truncate">
                            <span className="w-4 h-4 rounded-full bg-[#E3C176]/25 border border-[#E3C176]/70 text-[#E3C176] text-[10px] font-bold flex items-center justify-center shrink-0">
                              {layer.number}
                            </span>
                            <span className="text-[12px] font-semibold text-[#FBF6F2] truncate">
                              {layer.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* ETAPA 3 (Mobile) */}
                    <motion.div
                      style={{ opacity: text3Opacity, y: text3Y }}
                      className="absolute inset-0 flex flex-col justify-center items-center"
                    >
                      <p className="font-serif text-base font-bold text-[#FBF6F2] leading-snug">
                        Ficha técnica do NailGestão PRO.
                      </p>
                      <button
                        type="button"
                        onClick={scrollToBento}
                        className="text-xs font-bold text-[#F06CA3] inline-flex items-center gap-1 mt-1"
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
