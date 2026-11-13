// Dados ilustrativos para as demonstrações interativas (sempre marcados com "Exemplo ilustrativo")

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  duration: string;
}

export const AVAILABLE_SERVICES: ServiceItem[] = [
  { id: 'fibra', name: 'Aplicação Fibra de Vidro', price: 180, duration: '2h00' },
  { id: 'manutencao', name: 'Manutenção Fibra', price: 110, duration: '1h30' },
  { id: 'gel', name: 'Esmaltação em Gel', price: 75, duration: '1h00' },
  { id: 'spa', name: 'Spa dos Pés Completo', price: 65, duration: '45min' },
  { id: 'banho', name: 'Banho de Gel', price: 95, duration: '1h15' },
  { id: 'russa', name: 'Cutilagem Russa', price: 50, duration: '40min' },
];

export const PRESET_PACKAGES = [
  {
    id: 'pack-1',
    name: 'Combo Manutenção + Gel',
    services: ['Manutenção Fibra', 'Esmaltação em Gel'],
    originalPrice: 185,
    discountPercentage: 15,
    finalPrice: 157,
    tag: 'Mais vendido',
    color: 'from-blush to-rose-light',
  },
  {
    id: 'pack-2',
    name: 'Pacote Mensal Studio',
    services: ['2x Manutenção Fibra', '1x Spa dos Pés', 'Decoração Livre'],
    originalPrice: 320,
    discountPercentage: 20,
    finalPrice: 256,
    tag: 'Fidelidade Ouro',
    color: 'from-rose-light to-white',
  },
  {
    id: 'pack-3',
    name: 'Trio Cuidados Essenciais',
    services: ['Banho de Gel', 'Cutilagem Russa', 'Spa dos Pés'],
    originalPrice: 210,
    discountPercentage: 18,
    finalPrice: 172,
    tag: 'Especial Mês',
    color: 'from-white to-blush',
  },
];

export const MOCK_CLIENT_PROFILE = {
  name: 'Camila Rodrigues',
  phone: '(11) 98765-4321',
  since: 'Março 2024',
  visitsCount: 14,
  totalSpent: 'R$ 1.890,00',
  technicalSheet: {
    format: 'Amendoado Médio',
    technique: 'Fibra de Vidro Slim',
    brand: 'Cuccio Pro & Volia',
    finish: 'Top Coat High Gloss',
    decoration: 'Baby Boomer sutil',
    allergies: 'Sensibilidade a monômero não-hipoalergênico',
    observations: 'Prefere cutícula sem alicate afiado, cutilagem combinada.',
  },
  nextAppointment: {
    date: '16 de Novembro, Quinta',
    time: '14:30',
    service: 'Manutenção Fibra + Esmaltação',
  },
};

export const MOCK_FINANCIAL_DATA = {
  solo: {
    grossRevenue: 9840,
    expenses: 2150,
    netProfit: 7690,
    averageTicket: 128,
    appointmentsCount: 77,
    chartPoints: [42, 58, 65, 80, 72, 90, 98],
  },
  team: {
    grossRevenue: 24650,
    expenses: 6820,
    netProfit: 17830,
    averageTicket: 135,
    appointmentsCount: 182,
    chartPoints: [110, 135, 148, 175, 190, 220, 246],
    professionals: [
      { name: 'Bruna Alves (Lash & Nails)', appointments: 72, commission: 'R$ 4.320,00', percentage: '40%' },
      { name: 'Juliana Costa (Nails Senior)', appointments: 68, commission: 'R$ 4.080,00', percentage: '40%' },
      { name: 'Letícia Martins (Estética dos Pés)', appointments: 42, commission: 'R$ 2.100,00', percentage: '35%' },
    ],
  },
};
