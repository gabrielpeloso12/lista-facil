import { Category } from '../types';

export const CATEGORIES: Category[] = [
  'Hortifruti',
  'Padaria',
  'Laticínios',
  'Carnes',
  'Mantimentos',
  'Bebidas',
  'Limpeza',
  'Higiene',
  'Outros',
];

export const CATEGORY_COLORS: Record<Category, { bg: string; text: string }> = {
  Hortifruti: { bg: '#DCFCE7', text: '#16A34A' },
  Padaria: { bg: '#FEF3C7', text: '#B45309' },
  'Laticínios': { bg: '#FEF9C3', text: '#A16207' },
  Carnes: { bg: '#FEE2E2', text: '#DC2626' },
  Mantimentos: { bg: '#FFEDD5', text: '#EA580C' },
  Bebidas: { bg: '#EDE9FE', text: '#7C3AED' },
  Limpeza: { bg: '#DBEAFE', text: '#2563EB' },
  Higiene: { bg: '#FCE7F3', text: '#DB2777' },
  Outros: { bg: '#F1F5F9', text: '#475569' },
};
