import React, { useState } from 'react';
import { Sliders, Sparkles, ArrowRight, XCircle, CheckCircle2 } from 'lucide-react';
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

        {/* Pílulas de Acesso Rápido no topo para alternar com um clique */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setSliderPosition(85)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 border ${
              sliderPosition > 60
                ? 'bg-muted text-white border-muted shadow-sm'
                : 'bg-white/90 text-muted border-magenta/15 hover:bg-white'
            }`}
          >
            <XCircle className="w-3.5 h-3.5 text-loss/80" />
            <span>Com Agenda à Mão</span>
          </button>

          <button
            type="button"
            onClick={() => setSliderPosition(50)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              sliderPosition >= 40 && sliderPosition <= 60
                ? 'bg-magenta/15 text-magenta border-magenta font-bold shadow-xs'
                : 'bg-white/90 text-muted border-magenta/15 hover:bg-white'
            }`}
          >
            <span>50 / 50</span>
          </button>

          <button
            type="button"
            onClick={() => setSliderPosition(15)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 border ${
              sliderPosition < 40
                ? 'bg-cta-gradient text-white border-magenta shadow-magenta-glow'
                : 'bg-white/90 text-muted border-magenta/15 hover:bg-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-light" />
            <span>Com Agenda PRO</span>
          </button>
        </div>

        {/* Caixa de Comparação Interativa com Slider Arrastável */}
        <div className="relative rounded-[32px] overflow-hidden border border-magenta/25 shadow-rose-card select-none bg-white">
          <div className="relative w-full h-[520px] sm:h-[560px] md:h-[600px] overflow-hidden">
            {/* LADO DIREITO (CAMADA BASE): COM AGEDA PRO (Sorridente, tecnológica, pink neon) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src="/comparativo/rotina-nailgestao.jpg"
                alt="Com Agenda PRO: Studio organizado e profissional com sistema NailGestão PRO"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />

              {/* Degradê sutil para garantir legibilidade dos textos sobre a foto */}
              <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-white/50 to-white/90 pointer-events-none" />

              {/* Card de Informações - Com Agenda PRO */}
              <div className="absolute top-6 right-4 sm:top-10 sm:right-10 md:top-12 md:right-12 z-10 max-w-[310px] sm:max-w-[340px] p-5 sm:p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-magenta/20 shadow-rose-hover">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cta-gradient text-white shadow-magenta-glow mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-gold-light" />
                  <span>Com NailGestão PRO</span>
                </span>

                <ul className="space-y-2.5 mt-2 text-xs sm:text-sm text-plum font-semibold">
                  {COMPARISON_CONTENT.after.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 stroke-[3]" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 pt-3 border-t border-magenta/15 flex items-center gap-1.5 text-[11px] font-bold text-magenta">
                  <span>📈 Studio organizado e profissional</span>
                </div>
              </div>
            </div>

            {/* LADO ESQUERDO (CAMADA SOBREPOSTA): COM AGENDA À MÃO (Estressada com papéis e caderno) */}
            <div
              className="absolute inset-0 h-full overflow-hidden border-r-2 border-white shadow-2xl z-20"
              style={{ width: `${sliderPosition}%` }}
            >
              {/* Foto alinhada em largura total para não distorcer ao arrastar a cortina */}
              <div className="absolute inset-0 w-[100vw] max-w-[1152px] h-full">
                <img
                  src="/comparativo/rotina-manual.jpg"
                  alt="Com Agenda à Mão: Papéis acumulados, caderno rabiscado e estresse no atendimento"
                  className="w-full h-full object-cover object-center filter grayscale-[20%]"
                  loading="lazy"
                />

                {/* Degradê sutil para garantir legibilidade dos textos sobre a foto */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-black/20 pointer-events-none" />

                {/* Card de Informações - Com Agenda à Mão */}
                <div className="absolute top-6 left-4 sm:top-10 sm:left-10 md:top-12 md:left-12 z-10 max-w-[310px] sm:max-w-[340px] p-5 sm:p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-muted/20 shadow-md">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-muted text-white mb-3">
                    <XCircle className="w-3.5 h-3.5 text-loss/70" />
                    <span>Rotina com Agenda à Mão</span>
                  </span>

                  <ul className="space-y-2.5 mt-2 text-xs sm:text-sm text-plum/80 font-medium">
                    {COMPARISON_CONTENT.before.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-rose-light/50 text-loss flex items-center justify-center flex-shrink-0">
                          <XCircle className="w-3 h-3 text-loss stroke-[2.5]" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 pt-3 border-t border-muted/15 flex items-center gap-1.5 text-[11px] font-semibold text-loss">
                    <span>⚠️ Fadiga diária e perda constante de faturamento</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Linha Divisória e Alça Central Arrastável */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white z-30 cursor-ew-resize flex items-center justify-center shadow-2xl pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-11 h-11 rounded-full bg-white text-magenta shadow-xl border-2 border-magenta/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform pointer-events-auto">
                <Sliders className="w-5 h-5 text-magenta" />
              </div>
            </div>

            {/* Input de Range Transparente em tela cheia para toque natural no mobile e mouse no desktop */}
            <input
              type="range"
              min="5"
              max="95"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(parseInt(e.target.value, 10))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40"
              aria-label="Arrastar para comparar agenda a mão com agenda PRO"
            />
          </div>
        </div>

        {/* Rodapé da seção */}
        <div className="mt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="text-xs text-muted italic">
            Arraste a linha branca para ver os dois lados ou clique nas opções acima
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
