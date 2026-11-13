import React, { useState } from 'react';
import {
  TrendingUp,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';
import { FINANCES_CONTENT, APP_LINKS } from '../../data/content';
import { MOCK_FINANCIAL_DATA } from '../../data/mockData';
import { SectionHeading } from '../ui/SectionHeading';
import { MagneticButton } from '../ui/MagneticButton';

export const FinancesTeam: React.FC = () => {
  const [viewMode, setViewMode] = useState<'solo' | 'team'>('solo');

  const currentData =
    viewMode === 'solo' ? MOCK_FINANCIAL_DATA.solo : MOCK_FINANCIAL_DATA.team;

  return (
    <section
      className="py-24 sm:py-32 bg-ivory relative grain-overlay overflow-hidden"
      aria-label="Gestão financeira e comissões da equipe"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Coluna Esquerda: Texto Explicativo + Tabs + Destaques */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <SectionHeading
              overline={FINANCES_CONTENT.overline}
              title={FINANCES_CONTENT.title}
              subtitle={FINANCES_CONTENT.subtitle}
              align="left"
              className="mb-6"
            />

            {/* Tabs Animadas: Autônoma | Salão com equipe */}
            <div className="p-1 bg-blush/60 rounded-full border border-magenta/15 flex items-center gap-1 mb-8">
              <button
                type="button"
                onClick={() => setViewMode('solo')}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  viewMode === 'solo'
                    ? 'bg-magenta text-white shadow-sm'
                    : 'text-plum hover:text-magenta'
                }`}
              >
                Visão Autônoma
              </button>
              <button
                type="button"
                onClick={() => setViewMode('team')}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  viewMode === 'team'
                    ? 'bg-magenta text-white shadow-sm'
                    : 'text-plum hover:text-magenta'
                }`}
              >
                Salão com Equipe
              </button>
            </div>

            <div className="space-y-4 mb-8 text-sm text-plum/90">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-plum">Separação de faturamento e lucro</p>
                  <p className="text-xs text-muted">
                    Veja na hora o que é receita bruta e o que sobra no bolso após custos de produtos e espaço.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-magenta/10 text-magenta flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-plum">Comissões calculadas sem estresse</p>
                  <p className="text-xs text-muted">
                    Defina porcentagens fixas por profissional e emita o extrato de pagamento sem contas no caderno.
                  </p>
                </div>
              </div>
            </div>

            <MagneticButton
              size="md"
              variant="primary"
              href={APP_LINKS.onboarding}
            >
              <span>Ver no meu studio</span>
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </MagneticButton>
          </div>

          {/* Coluna Direita: Dashboard Financeiro Interativo com Gráfico SVG */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-magenta/15 shadow-rose-card backdrop-blur-xl relative">
              {/* Top bar do card */}
              <div className="flex items-center justify-between pb-6 border-b border-magenta/10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                    Fluxo de Caixa Mensal
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-plum">
                    {viewMode === 'solo' ? 'Studio Individual' : 'Studio & Equipe (3 profissionais)'}
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +24% este mês
                </span>
              </div>

              {/* 4 Indicadores Principais */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
                <div className="p-3.5 bg-ivory rounded-2xl border border-magenta/5">
                  <span className="text-[10px] text-muted block uppercase font-semibold">
                    Faturamento
                  </span>
                  <span className="font-serif text-lg sm:text-xl font-bold text-plum tabular-nums">
                    R$ {currentData.grossRevenue.toLocaleString('pt-BR')}
                  </span>
                </div>

                <div className="p-3.5 bg-ivory rounded-2xl border border-magenta/5">
                  <span className="text-[10px] text-loss block uppercase font-semibold">
                    Despesas
                  </span>
                  <span className="font-serif text-lg sm:text-xl font-bold text-loss tabular-nums">
                    R$ {currentData.expenses.toLocaleString('pt-BR')}
                  </span>
                </div>

                <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <span className="text-[10px] text-emerald-800 block uppercase font-semibold">
                    Lucro Líquido
                  </span>
                  <span className="font-serif text-lg sm:text-xl font-bold text-emerald-900 tabular-nums">
                    R$ {currentData.netProfit.toLocaleString('pt-BR')}
                  </span>
                </div>

                <div className="p-3.5 bg-ivory rounded-2xl border border-magenta/5">
                  <span className="text-[10px] text-muted block uppercase font-semibold">
                    Ticket Médio
                  </span>
                  <span className="font-serif text-lg sm:text-xl font-bold text-plum tabular-nums">
                    R$ {currentData.averageTicket}
                  </span>
                </div>
              </div>

              {/* Mini Gráfico SVG com Linha Traçada */}
              <div className="p-4 bg-gradient-to-b from-blush/30 to-ivory rounded-2xl border border-magenta/10 mb-6">
                <div className="flex items-center justify-between text-xs font-semibold text-muted mb-2">
                  <span>Evolução das últimas semanas</span>
                  <span className="text-magenta font-bold">R$ {currentData.grossRevenue} total</span>
                </div>

                <div className="h-28 w-full flex items-end">
                  <svg
                    className="w-full h-full overflow-visible"
                    viewBox="0 0 300 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Linha de grade suave */}
                    <line x1="0" y1="40" x2="300" y2="40" stroke="rgba(214, 36, 110, 0.1)" strokeDasharray="3 3" />

                    {/* Área sombreada */}
                    <path
                      d="M 10 70 Q 60 40, 110 50 T 210 25 T 290 10 L 290 80 L 10 80 Z"
                      fill="url(#financeGradient)"
                      opacity="0.25"
                    />

                    {/* Linha principal */}
                    <path
                      d="M 10 70 Q 60 40, 110 50 T 210 25 T 290 10"
                      stroke="#D6246E"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    <defs>
                      <linearGradient id="financeGradient" x1="0" y1="0" x2="0" y2="80" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#D6246E" />
                        <stop offset="1" stopColor="#E8A3B5" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Seção de Comissões por Profissional (aparece no modo Equipe) */}
              {viewMode === 'team' && (
                <div
                  className="space-y-2.5 pt-2 border-t border-magenta/10"
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-plum block mb-2">
                    Comissões Fechadas por Profissional:
                  </span>
                  {MOCK_FINANCIAL_DATA.team.professionals.map((prof, i) => (
                    <div
                      key={i}
                      className="p-2.5 bg-ivory rounded-xl border border-magenta/5 flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-plum">{prof.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-muted">{prof.appointments} atendimentos</span>
                        <span className="font-serif font-bold text-magenta">
                          {prof.commission}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Selo Obrigatório de Exemplo Ilustrativo */}
              <div className="pt-4 border-t border-magenta/10 flex items-center justify-between text-[10px] text-muted">
                <span>Relatórios exportáveis em PDF no plano Gold</span>
                <span className="italic font-medium">{FINANCES_CONTENT.disclaimer}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
