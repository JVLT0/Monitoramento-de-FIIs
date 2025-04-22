import { FiiData, FiiDetails, FiiHistory } from '../types/fii';
import { MarketOverview } from '../types/market';
import { Recommendation } from '../types/recommendation';

// Mock data for development
const MOCK_FIIS: FiiData[] = [
  {
    symbol: 'HGLG11',
    name: 'CSHG Logística',
    segment: 'Logística',
    price: '178.65',
    dy: '8.2',
    pvp: '0.96',
    liquidity: '2.500.000',
    vacancy: '2.3',
    lastDividend: '0.85',
  },
  {
    symbol: 'KNRI11',
    name: 'Kinea Renda Imobiliária',
    segment: 'Lajes Corporativas',
    price: '134.20',
    dy: '7.9',
    pvp: '0.92',
    liquidity: '3.100.000',
    vacancy: '4.1',
    lastDividend: '0.88',
  },
  {
    symbol: 'XPLG11',
    name: 'XP Log',
    segment: 'Logística',
    price: '114.80',
    dy: '8.7',
    pvp: '0.88',
    liquidity: '2.900.000',
    vacancy: '1.9',
    lastDividend: '0.82',
  },
  {
    symbol: 'VISC11',
    name: 'Vinci Shopping Centers',
    segment: 'Shoppings',
    price: '109.50',
    dy: '7.6',
    pvp: '0.95',
    liquidity: '2.200.000',
    vacancy: '5.2',
    lastDividend: '0.68',
  },
  {
    symbol: 'BTLG11',
    name: 'BTG Logística',
    segment: 'Logística',
    price: '98.70',
    dy: '9.1',
    pvp: '0.91',
    liquidity: '1.800.000',
    vacancy: '1.5',
    lastDividend: '0.75',
  },
  {
    symbol: 'HGRE11',
    name: 'CSHG Real Estate',
    segment: 'Lajes Corporativas',
    price: '135.30',
    dy: '7.8',
    pvp: '0.94',
    liquidity: '2.400.000',
    vacancy: '6.2',
    lastDividend: '0.87',
  },
  {
    symbol: 'HSML11',
    name: 'HSI Mall',
    segment: 'Shoppings',
    price: '86.25',
    dy: '8.3',
    pvp: '0.87',
    liquidity: '1.500.000',
    vacancy: '4.8',
    lastDividend: '0.60',
  },
  {
    symbol: 'RBRP11',
    name: 'RBR Properties',
    segment: 'Híbrido',
    price: '72.45',
    dy: '8.6',
    pvp: '0.85',
    liquidity: '980.000',
    vacancy: '7.5',
    lastDividend: '0.52',
  },
  {
    symbol: 'VILG11',
    name: 'Vinci Logística',
    segment: 'Logística',
    price: '112.30',
    dy: '8.9',
    pvp: '0.93',
    liquidity: '1.950.000',
    vacancy: '2.2',
    lastDividend: '0.83',
  },
  {
    symbol: 'MALL11',
    name: 'Malls Brasil Plural',
    segment: 'Shoppings',
    price: '91.60',
    dy: '8.0',
    pvp: '0.89',
    liquidity: '1.200.000',
    vacancy: '6.1',
    lastDividend: '0.61',
  },
];

const MOCK_MARKET_OVERVIEW: MarketOverview = {
  ifix: '2.982,35',
  ifixChange: 0.87,
  averageDY: '8.73',
  averageDYChange: 0.22,
  averagePVP: '0.96',
  averagePVPChange: -0.03,
  totalDividends: '1.45',
  totalDividendsChange: 4.3,
};

const MOCK_RECOMMENDATIONS: Recommendation[] = [
  {
    fii: MOCK_FIIS[0],
    type: 'Compra',
    reason: 'Excelente dividend yield e baixa vacância. Ativos bem localizados e contratos de longo prazo garantem estabilidade nos rendimentos.',
    date: '05/08/2025',
  },
  {
    fii: MOCK_FIIS[1],
    type: 'Neutro',
    reason: 'Bons fundamentos, mas valorização recente deixa o ativo próximo do preço justo. Recomendamos manter posições existentes.',
    date: '03/08/2025',
  },
  {
    fii: MOCK_FIIS[2],
    type: 'Compra',
    reason: 'Forte desempenho operacional e excelentes localizações. P/VP atrativo e potencial de valorização significativo.',
    date: '01/08/2025',
  },
  {
    fii: MOCK_FIIS[3],
    type: 'Venda',
    reason: 'Impacto da tendência de e-commerce sobre shoppings e aumento de vacância representam riscos elevados. P/VP acima do justificável.',
    date: '30/07/2025',
  },
  {
    fii: MOCK_FIIS[4],
    type: 'Compra',
    reason: 'Excelente gestão e ativos premium. Logística continua sendo um dos setores mais resilientes e com perspectivas positivas.',
    date: '28/07/2025',
  },
  {
    fii: MOCK_FIIS[5],
    type: 'Neutro',
    reason: 'Vacância acima da média do setor é preocupante, mas gestão competente e qualidade dos ativos equilibram a recomendação.',
    date: '25/07/2025',
  },
  {
    fii: MOCK_FIIS[6],
    type: 'Venda',
    reason: 'Crescente concorrência no segmento e mudanças nos hábitos de consumo impactam negativamente as perspectivas de longo prazo.',
    date: '22/07/2025',
  },
  {
    fii: MOCK_FIIS[7],
    type: 'Compra',
    reason: 'Diversificação de ativos e P/VP atrativo. Gestão ativa tem demonstrado capacidade de gerar valor mesmo em cenários adversos.',
    date: '20/07/2025',
  },
  {
    fii: MOCK_FIIS[8],
    type: 'Compra',
    reason: 'Potencial de crescimento expressivo no setor logístico, impulsionado pelo e-commerce. Vacância baixa e contratos longos.',
    date: '18/07/2025',
  },
];

// Mock API functions
export const fetchFiis = async (): Promise<FiiData[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_FIIS);
    }, 800);
  });
};

export const fetchMarketOverview = async (): Promise<MarketOverview> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_MARKET_OVERVIEW);
    }, 600);
  });
};

export const fetchFiiDetails = async (symbol: string): Promise<FiiDetails> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const fii = MOCK_FIIS.find(f => f.symbol === symbol);
      
      if (!fii) {
        reject(new Error(`FII with symbol ${symbol} not found`));
        return;
      }
      
      const details: FiiDetails = {
        ...fii,
        priceChange: Math.random() * 2 - 1, // Random between -1 and 1
        lastDividendDate: '10/07/2025',
        recommendation: Math.random() > 0.7 ? 'Compra' : Math.random() > 0.4 ? 'Neutro' : 'Venda',
        strengths: [
          'Dividend Yield consistente ao longo dos últimos 12 meses',
          'Baixa taxa de vacância comparada à média do setor',
          'Ativos bem localizados com contratos de longo prazo',
          'Gestão experiente com histórico comprovado',
        ],
        weaknesses: [
          'Liquidez diária abaixo da média de FIIs comparáveis',
          'Concentração de ativos em uma única região',
          'Potencial impacto de novas regulamentações do setor',
        ],
      };
      
      resolve(details);
    }, 1000);
  });
};

export const fetchFiiHistory = async (symbol: string): Promise<FiiHistory> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate mock historical data
      const basePrice = parseFloat(
        MOCK_FIIS.find(f => f.symbol === symbol)?.price || '100'
      );
      
      const priceHistory = Array.from({ length: 12 }, (_, i) => {
        // Create a somewhat realistic price history with some volatility
        return basePrice * (0.85 + 0.3 * (i / 11)) * (1 + (Math.random() * 0.1 - 0.05));
      });
      
      const dividendHistory = Array.from({ length: 12 }, (_, i) => {
        // Create dividend history loosely based on price
        const baseDividend = basePrice * 0.007;
        return baseDividend * (0.9 + Math.random() * 0.2);
      });
      
      resolve({
        price: priceHistory,
        dividends: dividendHistory,
      });
    }, 800);
  });
};

export const fetchRecommendations = async (): Promise<Recommendation[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_RECOMMENDATIONS);
    }, 800);
  });
};

export const fetchForecasts = async (): Promise<any> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        topPotential: [
          {
            symbol: 'XPLG11',
            name: 'XP Log',
            segment: 'Logística',
            currentPrice: '114.80',
            targetPrice: '133.17',
            potential: '16.0',
            confidence: '85',
          },
          {
            symbol: 'BTLG11',
            name: 'BTG Logística',
            segment: 'Logística',
            currentPrice: '98.70',
            targetPrice: '113.51',
            potential: '15.0',
            confidence: '80',
          },
          {
            symbol: 'VILG11',
            name: 'Vinci Logística',
            segment: 'Logística',
            currentPrice: '112.30',
            targetPrice: '127.51',
            potential: '13.5',
            confidence: '75',
          },
          {
            symbol: 'RBRP11',
            name: 'RBR Properties',
            segment: 'Híbrido',
            currentPrice: '72.45',
            targetPrice: '81.63',
            potential: '12.7',
            confidence: '70',
          },
          {
            symbol: 'HGLG11',
            name: 'CSHG Logística',
            segment: 'Logística',
            currentPrice: '178.65',
            targetPrice: '200.88',
            potential: '12.4',
            confidence: '65',
          },
        ]
      });
    }, 1000);
  });
};

// In a real application, these functions would actually call a backend API
export const fetchDataFromPythonBackend = async (endpoint: string, params?: any) => {
  try {
    // This is just a placeholder - in a real app, you would use fetch or axios to call your Python backend
    console.log(`Fetching data from ${endpoint} with params:`, params);
    
    // Simulating backend call - in a real app, replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: MOCK_FIIS });
      }, 500);
    });
  } catch (error) {
    console.error('Error fetching data from backend:', error);
    throw error;
  }
};