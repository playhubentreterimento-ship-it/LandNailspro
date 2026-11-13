// Arquivo central de textos e links editáveis do NailGestão PRO 1.1

export const APP_LINKS = {
  onboarding: 'https://gestaoparameusalao.vercel.app/onboarding',
  login: 'https://gestaoparameusalao.vercel.app/login',
  publicBooking: 'https://gestaoparameusalao.vercel.app/agendar',
  plans: {
    solo: 'https://gestaoparameusalao.vercel.app/onboarding?plan=iniciante',
    pro: 'https://gestaoparameusalao.vercel.app/onboarding?plan=pro',
    gold: 'https://gestaoparameusalao.vercel.app/onboarding?plan=gold',
  },
  youtubeVideoId: 'gwLrje8vuVU',
};

export const HERO_CONTENT = {
  badge: 'Feito para nail designers e salões',
  headline: {
    prefix: 'Pare de perder',
    word1: 'horários',
    connector: 'e',
    word2: 'dinheiro',
    suffix: 'com faltas.',
  },
  subheadline:
    'Agenda, clientes, financeiro e um lembrete de confirmação no WhatsApp com um clique. Tudo no celular, sem complicação.',
  ctaPrimary: 'Começar 7 dias grátis',
  ctaSecondary: 'Ver como funciona',
  trustLine: [
    '7 dias grátis',
    'Sem cartão de crédito',
    'Configuração em 2 minutos',
  ],
};

export const PAIN_POINTS_CONTENT = {
  overline: 'O PROBLEMA',
  title: 'Cada horário perdido é dinheiro que não volta.',
  phrases: [
    'Cliente esqueceu o horário.',
    'Você parou o atendimento para responder no WhatsApp.',
    'Agenda espalhada entre caderno e conversas.',
    'No fim do mês, você não sabe quanto realmente ganhou.',
  ],
  resolution: 'Existe um jeito mais simples.',
  ctaText: 'Calcular quanto você pode recuperar',
};

export const CALCULATOR_CONTENT = {
  overline: 'CALCULADORA DE PERDA',
  title: 'Quanto as faltas custam para você?',
  subtitle: 'Informe a sua realidade abaixo para visualizar o impacto no seu faturamento.',
  fieldPriceLabel: 'Valor médio do seu atendimento (R$)',
  fieldPricePlaceholder: 'Ex: 120',
  fieldMissesLabel: 'Faltas ou horários vazios por semana',
  emptyStateText: 'Preencha o valor e o número de faltas para calcular o valor recuperável.',
  monthlyLabel: 'Por mês, você deixa de faturar',
  yearlyLabel: 'Por ano:',
  solutionCallout: 'Um lembrete com um clique ajuda você a confirmar com antecedência.',
  ctaText: 'Começar a recuperar meus horários',
  disclaimer: 'Estimativa baseada nos valores que você informou.',
};

export const ONE_CLICK_REMINDER_CONTENT = {
  overline: 'LEMBRETE COM 1 CLIQUE',
  title: 'Confirme o horário em um clique.',
  subtitle:
    'A mensagem já vai pronta para a cliente, com serviços, horário e local. Sem digitar nada.',
  steps: [
    {
      stepNumber: '01',
      title: 'Agenda do dia no celular',
      description: 'Veja seus atendimentos organizados em sequência clara e toque no botão de lembrete com pulso magenta.',
    },
    {
      stepNumber: '02',
      title: 'WhatsApp abre com mensagem pronta',
      description: 'O texto personalizado é gerado instantaneamente com nome, data, horário e serviços agendados.',
    },
    {
      stepNumber: '03',
      title: 'Confirmação com selo de tranquilidade',
      description: 'A cliente confirma com um toque e seu horário fica garantido no painel.',
    },
  ],
  ctaText: 'Quero esse lembrete',
  disclaimer: 'Exemplo ilustrativo de conversa.',
};

export const PUBLIC_BOOKING_CONTENT = {
  overline: 'AGENDA PÚBLICA 24H',
  title: 'Sua cliente agenda sozinha. Sem você parar o atendimento.',
  bulletPoints: [
    'Sem criar conta: sua cliente só precisa informar nome e WhatsApp.',
    'Horários livres em tempo real calculados com a duração de cada serviço.',
    'Funciona 24 horas por dia, inclusive enquanto você está atendendo.',
    'Link exclusivo para colocar na bio do Instagram e no recado do WhatsApp.',
  ],
  sampleUrl: 'nailgestao.com.br/studio-elisandra',
  ctaText: 'Criar minha agenda',
};

export const PACKAGES_CONTENT = {
  overline: 'PACOTES PERSONALIZADOS',
  title: 'Monte seus pacotes. Venda mais, com desconto que você define.',
  description:
    'Crie até 6 combos de serviços, defina o preço e o desconto, e vincule à cliente.',
  disclaimer: 'Valores de exemplo ilustrativo.',
};

export const BENTO_CONTENT = {
  overline: 'FICHA TÉCNICA E CLIENTES',
  title: 'Cada unha tem uma história. Guarde cada detalhe.',
  subtitle: 'Ficha completa de formato, materiais, alergias e histórico para nunca esquecer a preferência de quem senta na sua mesa.',
  disclaimer: 'Exemplo ilustrativo.',
};

export const FINANCES_CONTENT = {
  overline: 'FINANCEIRO E EQUIPE',
  title: 'Saiba quanto você realmente ganhou.',
  subtitle:
    'Faturamento, despesas, saldo líquido, ticket médio e controle de comissões por profissional em uma tela limpa.',
  disclaimer: 'Exemplo ilustrativo.',
};

export const TIMELINE_CONTENT = {
  overline: 'COMO FUNCIONA',
  title: 'Pronta para usar em 3 passos rápidos.',
  steps: [
    {
      number: '01',
      title: 'Cadastre seu studio em 2 minutos',
      description: 'Apenas nome, serviços principais e valores. Sem complicação nem manual técnico.',
    },
    {
      number: '02',
      title: 'Configure serviços, horários e pacotes',
      description: 'Defina a duração dos atendimentos e os combos especiais com descontos.',
    },
    {
      number: '03',
      title: 'Compartilhe seu link e envie lembretes com um clique',
      description: 'Coloque o link na sua bio do Instagram e reduza as faltas logo na primeira semana.',
    },
  ],
};

export const COMPARISON_CONTENT = {
  overline: 'TRANSFORMAÇÃO DA ROTINA',
  title: 'A diferença entre o improviso e o controle total.',
  subtitle: 'Arraste a barra para comparar a rotina manual com o dia a dia no NailGestão PRO.',
  before: {
    tag: 'Rotina Manual',
    items: [
      'Caderno rabiscado com rasuras',
      'Mensagens acumuladas no WhatsApp',
      'Horários esquecidos e faltas sem aviso',
      'Dinheiro pessoal e do studio misturados',
    ],
  },
  after: {
    tag: 'Com NailGestão PRO',
    items: [
      'Agenda online limpa no celular 24h',
      'Lembrete automático com 1 clique',
      'Ficha técnica com formatos e alergias',
      'Caixa organizado e lucro real na tela',
    ],
  },
};

export const SOCIAL_PROOF_CONTENT = {
  overline: 'PROVA REAL',
  title: 'Em uso real, todos os dias.',
  context: 'Usado há mais de 3 meses por profissionais de verdade.',
  caption: 'Agendamento real feito pelo link',
  // Array de depoimentos preparado para expansão futura com clientes reais
  testimonials: [],
};

export const VIDEO_CONTENT = {
  overline: 'DEMONSTRAÇÃO EM VÍDEO',
  title: 'Veja funcionando na prática.',
  subtitle: 'Um tour guiado de 2 minutos pelas principais telas e pelo fluxo de agendamento.',
};

export const FINAL_CTA_CONTENT = {
  title: 'Seu próximo horário não precisa ser perdido.',
  subtitle: 'Comece hoje a proteger seu faturamento e passe a imagem de um studio de alto padrão.',
  ctaText: 'Começar 7 dias grátis',
  trustBadges: [
    'Sem cartão de crédito',
    'Configuração em 2 minutos',
    'Cancele quando quiser',
  ],
};
