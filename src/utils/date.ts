const MONTHS_SHORT = [
  'jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.',
  'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.',
];

const MONTHS_LONG = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

export function formatDateShort(timestamp: number): string {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  return `${day} de ${MONTHS_SHORT[date.getMonth()]} de ${date.getFullYear()}`;
}

export function formatDateLong(timestamp: number): string {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  return `${day} de ${MONTHS_LONG[date.getMonth()]} de ${date.getFullYear()}`;
}
