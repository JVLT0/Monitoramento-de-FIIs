import { FiiData } from './fii';

export interface Recommendation {
  fii: FiiData;
  type: 'Compra' | 'Venda' | 'Neutro';
  reason: string;
  date: string;
}