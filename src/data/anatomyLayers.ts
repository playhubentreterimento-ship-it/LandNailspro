export interface AnatomyLayer {
  number: number;
  title: string;
  description: string;
  yPercent: number; // Posição vertical da camada em % da altura do canvas
}

export const ANATOMY_LAYERS: AnatomyLayer[] = [
  {
    number: 1,
    title: 'FINISH (TOP)',
    description: 'Proporciona brilho, proteção e durabilidade.',
    yPercent: 11,
  },
  {
    number: 2,
    title: 'GEL/ESMALTE',
    description: 'Confere cor e acabamento.',
    yPercent: 20,
  },
  {
    number: 3,
    title: 'GEL CONSTRUTOR',
    description: 'Dá estrutura e resistência ao alongamento.',
    yPercent: 29,
  },
  {
    number: 4,
    title: 'F1 (ALONGAMENTO)',
    description: 'Prolonga o tamanho da unha com a técnica F1.',
    yPercent: 38,
  },
  {
    number: 5,
    title: 'EPIDERME',
    description: 'Protege a matriz da unha.',
    yPercent: 44,
  },
  {
    number: 6,
    title: 'DERME',
    description: 'Suporte da estrutura.',
    yPercent: 52,
  },
  {
    number: 7,
    title: 'VASOS SANGUÍNEOS',
    description: 'Nutrem a unha.',
    yPercent: 63,
  },
  {
    number: 8,
    title: 'TERMINAÇÕES NERVOSAS',
    description: 'Sensibilidade.',
    yPercent: 71,
  },
  {
    number: 9,
    title: 'FALANGE DISTAL',
    description: 'Osso que sustenta a unha.',
    yPercent: 83,
  },
];
