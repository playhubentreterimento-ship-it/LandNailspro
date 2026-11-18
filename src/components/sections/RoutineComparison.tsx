import React, { useState } from 'react';
import { Sliders, Sparkles, ArrowRight, XCircle } from 'lucide-react';
import { COMPARISON_CONTENT, APP_LINKS } from '../../data/content';
import { SectionHeading } from '../ui/SectionHeading';
import { MagneticButton } from '../ui/MagneticButton';

export const RoutineComparison: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  return (
    <section
      className="py-24 sm:py-32 bg-ivory relative grain-overlay overflow-hidden"
      aria-label="Comparativo visual entre a rotina manual e com o sistema"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline={COMPARISON_CONTENT.overline}
          title={COMPARISON_CONTENT.title}
          subtitle={COMPARISON_CONTENT.subtitle}
        />

        {/* Pílulas de Acesso Rápido no topo para facilitar no Mobile */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setSliderPosition(85)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 border ${
              sliderPosition > 60
                ? 'bg-muted text-white border-muted shadow-sm'
                : 'bg-white/80 text-muted border-magenta/15 hover:bg-white'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Rotina Manual</span>
          </button>

          <button
            type="button"
            onClick={() => setSliderPosition(50)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              sliderPosition >= 40 && sliderPosition <= 60
                ? 'bg-magenta/10 text-magenta border-magenta font-bold'
                : 'bg-white/80 text-muted border-magenta/15 hover:bg-white'
            }`}
          >
            <span>50 / 50</span>
          </button>

          <button
            type="button"
            onClick={() => setSliderPosition(15)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 border ${
              sliderPosition < 40
                ? 'bg-cta-gradient text-white border-magenta shadow-sm'
                : 'bg-white/80 text-muted border-magenta/15 hover:bg-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-light" />
            <span>Com NailGestão PRO</span>
          </button>
        </div>

        {/* Caixa de Comparação Interativa com Slider Arrastável */}
        <div className="relative rounded-[32px] overflow-hidden border border-magenta/20 shadow-rose-card select-none bg-white">
          <div className="relative w-full aspect-[2/1] min-h-[300px] sm:min-h-[420px] md:min-h-[480px]">
            {/* LADO DIREITO: COM NAILGESTÃO PRO */}
            <div className="absolute inset-0 flex justify-end bg-gradient-to-br from-white via-rose-light/20 to-blush/30">
              <div
                className="w-full h-full flex items-center justify-end"
                style={{
                  paddingLeft: `${sliderPosition}%`,
                }}
              >
                <img
                  src="/comparativo/rotina-nailgestao.jpg"
                  alt="Com NailGestão PRO: agenda online 24h, confirmação em 1 clique, ficha técnica, caixa organizado e studio profissional"
                  className="w-full h-full object-contain md:object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>

            {/* LADO ESQUERDO: ROTINA MANUAL (Cortada pela largura do slider) */}
            <div
              className="absolute inset-0 overflow-hidden border-r-2 border-white shadow-2xl bg-gradient-to-br from-[#EAE6E8] to-[#DDD5D8]"
              style={{ width: `${sliderPosition}%` }}
            >
              <div
                className="h-full flex items-center justify-start"
                style={{
                  width: `${(100 / Math.max(sliderPosition, 1)) * 100}%`,
                  maxWidth: 'none',
                }}
              >
                <div className="w-1/2 h-full">
                  <img
                    src="/comparativo/rotina-manual.jpg"
                    alt="Rotina Manual: caderno rabiscado, mensagens acumuladas no WhatsApp, horários esquecidos e fadiga diária"
                    className="w-full h-full object-contain md:object-cover object-center"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Linha Divisória e Alça Central com Ícone */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white z-20 cursor-ew-resize flex items-center justify-center shadow-lg"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-magenta shadow-xl border border-magenta/25 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform">
                <Sliders className="w-5 h-5" />
              </div>
            </div>

            {/* Input de Range Transparente em tela cheia para toque natural no mobile */}
            <input
              type="range"
              min="10"
              max="90"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(parseInt(e.target.value, 10))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              aria-label="Arrastar para comparar rotina manual e com NailGestão"
            />
          </div>
        </div>

        {/* Rodapé da seção */}
        <div className="mt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="text-xs text-muted italic">
            Toque nos botões acima ou arraste a alça central para comparar
          </span>
          <MagneticButton
            size="sm"
            variant="secondary"
            href={APP_LINKS.onboarding}
          >
            <span>Mudar minha rotina agora</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};
