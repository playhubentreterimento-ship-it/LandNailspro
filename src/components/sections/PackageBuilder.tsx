import React, { useState } from 'react';
import { Sparkles, Check, Plus, Tag, ArrowRight } from 'lucide-react';
import { PACKAGES_CONTENT, APP_LINKS } from '../../data/content';
import { AVAILABLE_SERVICES, PRESET_PACKAGES } from '../../data/mockData';
import { SectionHeading } from '../ui/SectionHeading';
import { MagneticButton } from '../ui/MagneticButton';

export const PackageBuilder: React.FC = () => {
  // Serviços selecionados para o pacote interativo
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([
    'manutencao',
    'gel',
  ]);
  const [discountPercent, setDiscountPercent] = useState<number>(15);
  const [linkedPackages, setLinkedPackages] = useState<{ [key: string]: boolean }>({});

  const toggleService = (id: string) => {
    if (selectedServiceIds.includes(id)) {
      if (selectedServiceIds.length > 1) {
        setSelectedServiceIds(selectedServiceIds.filter((item) => item !== id));
      }
    } else {
      if (selectedServiceIds.length < 4) {
        setSelectedServiceIds([...selectedServiceIds, id]);
      }
    }
  };

  const handleLinkClient = (pkgId: string) => {
    setLinkedPackages((prev) => ({ ...prev, [pkgId]: true }));
    setTimeout(() => {
      setLinkedPackages((prev) => ({ ...prev, [pkgId]: false }));
    }, 2500);
  };

  // Cálculo ao vivo
  const rawTotal = selectedServiceIds.reduce((sum, id) => {
    const service = AVAILABLE_SERVICES.find((s) => s.id === id);
    return sum + (service?.price || 0);
  }, 0);

  const discountValue = Math.round((rawTotal * discountPercent) / 100);
  const finalPrice = rawTotal - discountValue;

  return (
    <section
      id="pacotes"
      className="py-24 sm:py-32 bg-blush/40 relative grain-overlay overflow-hidden"
      aria-label="Construtor de pacotes personalizados"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline={PACKAGES_CONTENT.overline}
          title={PACKAGES_CONTENT.title}
          subtitle={PACKAGES_CONTENT.description}
        />

        {/* Construtor Visual Interativo */}
        <div className="max-w-4xl mx-auto bg-white/95 rounded-[32px] p-6 sm:p-10 border border-magenta/15 shadow-rose-card backdrop-blur-xl mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-magenta/10 gap-3">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-magenta">
                Laboratório Interativo
              </span>
              <h3 className="font-serif text-2xl font-bold text-plum">
                Simule seu Combo Especial
              </h3>
            </div>
            <span className="text-xs font-semibold text-muted bg-ivory px-3 py-1.5 rounded-full border border-magenta/10 self-start sm:self-auto">
              Selecione de 1 a 4 serviços
            </span>
          </div>

          {/* Chips de Serviços Clicáveis */}
          <div className="py-6">
            <span className="text-xs font-bold text-muted uppercase tracking-wider block mb-3">
              Toque nos serviços para incluir no pacote:
            </span>
            <div className="flex flex-wrap gap-2.5">
              {AVAILABLE_SERVICES.map((s) => {
                const isSelected = selectedServiceIds.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleService(s.id)}
                    className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-2 border ${
                      isSelected
                        ? 'bg-magenta text-white border-magenta shadow-sm scale-102'
                        : 'bg-ivory text-plum border-magenta/15 hover:border-magenta hover:bg-white'
                    }`}
                  >
                    <span>{s.name}</span>
                    <span className={isSelected ? 'text-white/80' : 'text-magenta font-bold'}>
                      R$ {s.price}
                    </span>
                    {isSelected ? (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-muted" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slider de Desconto ao Vivo */}
          <div className="py-6 border-t border-magenta/10">
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="discount-slider" className="text-sm font-bold text-plum">
                Desconto concedido à cliente:
              </label>
              <span className="text-sm font-bold text-gold-dark bg-amber-50 px-3 py-1 rounded-full border border-gold/30">
                {discountPercent}% OFF (Economia de R$ {discountValue})
              </span>
            </div>
            <input
              id="discount-slider"
              type="range"
              min="5"
              max="40"
              step="5"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(parseInt(e.target.value, 10))}
              className="w-full h-2.5 bg-rose-light rounded-lg appearance-none cursor-pointer accent-magenta"
            />
          </div>

          {/* Resumo do Preço Final Calculado */}
          <div className="mt-4 p-6 bg-ivory/80 rounded-2xl border border-magenta/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-muted block mb-0.5">
                Valor cheio sem pacote:{' '}
                <s className="font-semibold text-plum/60">R$ {rawTotal}</s>
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-bold text-magenta uppercase tracking-wider">
                  Preço final do combo:
                </span>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-plum tabular-nums">
                  R$ {finalPrice}
                </span>
              </div>
            </div>

            <MagneticButton
              size="md"
              variant="primary"
              href={APP_LINKS.onboarding}
            >
              <span>Criar esse pacote</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </MagneticButton>
          </div>
        </div>

        {/* Carrossel Horizontal com Snap e Cards com Leve Rotação */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-gold-dark">
                Exemplos Prontos
              </span>
              <h3 className="font-serif text-2xl font-bold text-plum">
                Como os pacotes aparecem no seu sistema
              </h3>
            </div>
            <span className="text-xs text-muted italic hidden sm:inline-block">
              {PACKAGES_CONTENT.disclaimer}
            </span>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {PRESET_PACKAGES.map((pkg, idx) => {
              const isLinked = linkedPackages[pkg.id];
              // Leve rotação alternada para sensação editorial
              const rotations = ['rotate-[-1deg]', 'rotate-[0.5deg]', 'rotate-[-0.5deg]'];

              return (
                <div
                  key={pkg.id}
                  className={`snap-center flex-shrink-0 w-[290px] sm:w-[320px] bg-white rounded-card p-6 border border-magenta/15 shadow-rose-card transition-all duration-300 hover:shadow-rose-hover hover:rotate-0 ${rotations[idx]}`}
                >
                  {/* Selo Dourado Pacote */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-950 border border-gold/40">
                      <Sparkles className="w-3 h-3 text-gold" />
                      <span>{pkg.tag}</span>
                    </span>
                    <span className="text-xs font-bold text-magenta bg-magenta/10 px-2 py-0.5 rounded-full">
                      -{pkg.discountPercentage}%
                    </span>
                  </div>

                  <h4 className="font-serif text-xl font-bold text-plum mb-3">
                    {pkg.name}
                  </h4>

                  {/* Lista de serviços do pacote */}
                  <ul className="space-y-1.5 mb-6 text-xs text-muted">
                    {pkg.services.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-magenta flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Preços */}
                  <div className="pt-4 border-t border-magenta/10 mb-4 flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] text-muted block line-through">
                        De R$ {pkg.originalPrice}
                      </span>
                      <span className="font-serif text-2xl font-bold text-plum">
                        R$ {pkg.finalPrice}
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded-md">
                      Economia de R$ {pkg.originalPrice - pkg.finalPrice}
                    </span>
                  </div>

                  {/* Botão Vincular à Cliente com Check Animado */}
                  <button
                    type="button"
                    onClick={() => handleLinkClient(pkg.id)}
                    className={`w-full py-2.5 rounded-pill text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      isLinked
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-ivory hover:bg-magenta text-plum hover:text-white border border-magenta/20'
                    }`}
                  >
                    {isLinked ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Vinculado à cliente!</span>
                      </>
                    ) : (
                      <>
                        <Tag className="w-3.5 h-3.5" />
                        <span>Vincular à cliente (simular)</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-center text-muted/70 italic mt-2 sm:hidden">
            * {PACKAGES_CONTENT.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
};
