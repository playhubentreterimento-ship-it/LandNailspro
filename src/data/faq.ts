// Perguntas frequentes e respostas diretas

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'o-que-e',
    question: 'O que é o NailGestão PRO?',
    answer:
      'É um sistema de gestão simples, elegante e feito especialmente para nail designers, manicures e salões de unhas. Ele reúne sua agenda online 24h, ficha técnica das clientes, controle financeiro, comissões de equipe e um botão de lembrete no WhatsApp com 1 clique para reduzir faltas.',
  },
  {
    id: 'para-quem',
    question: 'Para quem foi criado?',
    answer:
      'Para nail designers autônomas que atendem sozinhas, manicures com espaço próprio e donas de salões com equipe. Se você ainda usa caderno de papel ou perde tempo trocando mensagens manuais no WhatsApp, o NailGestão foi feito para sua rotina.',
  },
  {
    id: 'teste-gratis',
    question: 'Posso testar de graça?',
    answer:
      'Sim! Você tem 7 dias grátis para usar todos os recursos do plano escolhido, cadastrar suas clientes e ver como a rotina fica mais leve.',
  },
  {
    id: 'cartao-credito',
    question: 'Preciso de cartão de crédito para começar?',
    answer:
      'Não. O cadastro inicial é feito sem pedir dados de cartão. Você só decide assinar se o sistema realmente fizer diferença no seu estúdio.',
  },
  {
    id: 'instalacao',
    question: 'Preciso instalar algum aplicativo pesado?',
    answer:
      'Não precisa baixar nada na loja. O sistema é 100% web, leve e abre direto no navegador do celular, tablet ou computador. Você pode adicionar um ícone na tela inicial como se fosse um app.',
  },
  {
    id: 'funciona-celular',
    question: 'Funciona bem no celular?',
    answer:
      'Perfeitamente. Ele foi desenhado primeiro para celular (mobile-first), pensando em quem está na mesa de atendimento com uma mão livre.',
  },
  {
    id: 'cliente-precisa-conta',
    question: 'Minhas clientes precisam criar conta ou baixar app para agendar?',
    answer:
      'Não! A cliente clica no seu link, escolhe o serviço, seleciona a data e o horário livre, e informa apenas o nome e o WhatsApp. O processo leva menos de 1 minuto.',
  },
  {
    id: 'como-funciona-lembrete',
    question: 'Como funciona o lembrete com um clique?',
    answer:
      'Ao abrir o agendamento no seu painel, você clica no botão "Enviar Lembrete". O sistema abre o WhatsApp com a mensagem pronta contendo os dados do horário, serviço e local. Você só aperta enviar.',
  },
  {
    id: 'como-funcionam-pacotes',
    question: 'Como funcionam os pacotes personalizados?',
    answer:
      'Você cria até 6 combos de serviços (por exemplo: Aplicação Fibra + 2 Manutenções + Esmaltação em Gel), define o desconto desejado e vincula diretamente ao cadastro da cliente.',
  },
  {
    id: 'controle-financeiro',
    question: 'Posso controlar meu financeiro pelo sistema?',
    answer:
      'Sim. O sistema registra entradas de atendimentos, despesas diárias, saldo líquido real, ticket médio e calcula automaticamente a comissão de cada profissional da equipe.',
  },
  {
    id: 'cancelamento',
    question: 'Posso mudar de plano ou cancelar quando quiser?',
    answer:
      'Sim, sem fidelidade e sem multas. Você pode fazer upgrade, downgrade ou cancelar sua assinatura com apenas um clique a qualquer momento.',
  },
  {
    id: 'suporte',
    question: 'Tenho suporte para configurar meus horários?',
    answer:
      'Sim. Nossa equipe atende diretamente por WhatsApp em horário comercial para tirar dúvidas e ajudar você a deixar sua agenda pronta.',
  },
];
