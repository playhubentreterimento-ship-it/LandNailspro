import React, { useState } from 'react';
import {
  XCircle,
  CheckCircle2,
  Sliders,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
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

        {/* Caixa de Comparação Interativa com Slider Arrastável */}
        <div className="relative rounded-[32px] overflow-hidden border border-magenta/20 shadow-rose-card select-none min-h-[420px] sm:min-h-[380px] bg-white">
          {/* LADO DIREITO: COM NAILGESTÃO (Cores vivas, rosé, magenta, florescendo) */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-blush/60 to-rose-light/50 p-6 sm:p-12 flex flex-col justify-between">
            <div className="max-w-sm ml-auto text-right">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cta-gradient text-white shadow-rose-soft mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{COMPARISON_CONTENT.after.tag}</span>
              </span>

              <ul className="space-y-3 mt-4 text-xs sm:text-sm text-plum font-semibold text-right">
                {COMPARISON_CONTENT.after.items.map((item, i) => (
                  <li key={i} className="flex items-center justify-end gap-2.5">
                    <span>{item}</span>
                    <CheckCircle2 className="w-4 h-4 text-magenta flex-shrink-0" />
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-right pt-6">
              <span className="text-xs font-serif font-bold text-magenta">
                Studio organizado e profissional
              </span>
            </div>
          </div>

          {/* LADO ESQUERDO: ROTINA MANUAL (Dessaturado, cinza, rasuras) */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#EAE6E8] to-[#DDD5D8] p-6 sm:p-12 flex flex-col justify-between overflow-hidden border-r-2 border-white/80 shadow-2xl"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="max-w-sm">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-muted text-white mb-4">
                <XCircle className="w-3.5 h-3.5" />
                <span>{COMPARISON_CONTENT.before.tag}</span>
              </span>

              <ul className="space-y-3 mt-4 text-xs sm:text-sm text-plum/70 font-medium">
                {COMPARISON_CONTENT.before.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 whitespace-nowrap">
                    <XCircle className="w-4 h-4 text-loss/80 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6">
              <span className="text-xs text-muted italic whitespace-nowrap">
                Fadiga diária e perda constante de faturamento
              </span>
            </div>
          </div>

          {/* Linha Divisória e Alça Central com Ícone */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white z-20 cursor-ew-resize flex items-center justify-center"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="w-10 h-10 rounded-full bg-white text-magenta shadow-xl border border-magenta/25 flex items-center justify-center">
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

        {/* Rodapé da seção */}
        <div className="mt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="text-xs text-muted italic">
            Toque ou arraste a barra para visualizar a transformação
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
