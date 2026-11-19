// Configuração de planos, preços e matriz de comparação

export interface PlanFeature {
  name: string;
  included: boolean;
  note?: string;
}

export interface Plan {
  id: 'solo' | 'pro' | 'gold';
  name: string;
  tagline: string;
  badge?: string;
  popular?: boolean;
  goldAccent?: boolean;
  priceMonthly: number;
  priceAnnualMonthly: number; // 20% off aproximado arredondado
  annualTotal: number;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

export const PRICING_PLANS: Plan[] = [
  {
    id: 'solo',
    name: 'Solo / Iniciante',
    tagline: 'Para nail designers autônomas e ateliês individuais',
    priceMonthly: 49,
    priceAnnualMonthly: 39,
    annualTotal: 468,
    description: 'Comece com organização profissional sem complicação.',
    features: [
      '1 profissional ativa',
      'Agenda online 24h para clientes',
      'CRM de clientes e ficha técnica',
      'Controle de caixa básico',
      'Pacotes personalizados',
      'Suporte direto por WhatsApp',
    ],
    ctaText: 'Começar 7 dias grátis',
    ctaLink: 'https://app.gestaoestronda.com.br/onboarding?plan=iniciante',
  },
  {
    id: 'pro',
    name: 'Pro Studio',
    tagline: 'O mais completo para quem vive de nail design e quer crescer',
    badge: 'Mais Escolhido',
    popular: true,
    priceMonthly: 89,
    priceAnnualMonthly: 71,
    annualTotal: 852,
    description: 'Tudo do Solo, com lembrete inteligente e gestão de equipe.',
    features: [
      'Até 5 profissionais',
      'Lembrete de confirmação no WhatsApp com 1 clique',
      'Agenda online 24h personalizada',
      'CRM completo com histórico e ficha técnica',
      'Galeria antes e depois de fotos',
      'Relatório de comissões por profissional',
      'Controle de caixa e financeiro completo',
      'Pacotes personalizados ilimitados',
    ],
    ctaText: 'Testar 7 dias sem compromisso',
    ctaLink: 'https://app.gestaoestronda.com.br/onboarding?plan=pro',
  },
  {
    id: 'gold',
    name: 'Studio Gold',
    tagline: 'Para grandes salões e estúdios com alto fluxo de clientes',
    badge: 'Edição Premium',
    goldAccent: true,
    priceMonthly: 149,
    priceAnnualMonthly: 119,
    annualTotal: 1428,
    description: 'Tudo do Pro, com ferramentas avançadas de marketing e gestão.',
    features: [
      'Profissionais ilimitadas',
      'Lembrete de confirmação no WhatsApp com 1 clique',
      'Disparo de campanhas promocionais',
      'Relatórios gerenciais completos em PDF',
      'Controle de estoque avançado',
      'Comissões automáticas por serviço',
      'Suporte VIP prioritário',
    ],
    ctaText: 'Escolher Studio Gold',
    ctaLink: 'https://app.gestaoestronda.com.br/onboarding?plan=gold',
  },
];

export interface ComparisonRow {
  feature: string;
  solo: string | boolean;
  pro: string | boolean;
  gold: string | boolean;
}

export const COMPARISON_TABLE: ComparisonRow[] = [
  { feature: 'Profissionais ativas', solo: '1 profissional', pro: 'Até 5 profissionais', gold: 'Ilimitadas' },
  { feature: 'Agenda online 24h para clientes', solo: true, pro: true, gold: true },
  { feature: 'CRM e ficha técnica detalhada', solo: true, pro: true, gold: true },
  { feature: 'Pacotes personalizados com desconto', solo: true, pro: true, gold: true },
  { feature: 'Galeria antes e depois de fotos', solo: false, pro: true, gold: true },
  { feature: 'Lembrete de confirmação (1 clique)', solo: false, pro: true, gold: true },
  { feature: 'Comissões de equipe automáticas', solo: false, pro: true, gold: true },
  { feature: 'Caixa e financeiro', solo: 'Básico', pro: 'Completo', gold: 'Avançado' },
  { feature: 'Campanhas promocionais', solo: false, pro: false, gold: true },
  { feature: 'Relatórios gerenciais em PDF', solo: false, pro: false, gold: true },
];
