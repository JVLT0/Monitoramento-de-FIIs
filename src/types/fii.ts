export interface FiiData {
  symbol: string;
  name: string;
  segment: string;
  price: string;
  dy: string;
  pvp: string;
  liquidity: string;
  vacancy: string;
  lastDividend: string;
}

export interface FiiHistory {
  price: number[];
  dividends: number[];
}

export interface FiiForecastMonthly {
  month: string;
  price: string;
  dividend: string;
  dy: string;
}

export interface FiiForecast {
  price: number[];
  dividends: number[];
  monthly?: FiiForecastMonthly[];
}

export interface FiiPortfolioItem {
  name: string;
  location: string;
  area: string;
  percentage: string;
}

export interface FiiEvent {
  date: string;
  type: string;
  value: string;
  notes: string;
}

export interface FiiDetails extends FiiData {
  priceChange: number;
  lastDividendDate: string;
  equity?: string;
  shares?: string;
  manager?: string;
  description?: string;
  recommendation: 'Compra' | 'Venda' | 'Neutro';
  recommendationDate?: string;
  analysis?: string;
  targetPrice?: string;
  targetPriceChange?: string;
  risks?: string;
  strengths?: string[];
  weaknesses?: string[];
  portfolio?: FiiPortfolioItem[];
  events?: FiiEvent[];
  history?: FiiHistory;
  forecast?: FiiForecast;
}