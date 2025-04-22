import React, { useState, useEffect } from 'react';
import { BarChart2, TrendingUp, BadgeDollarSign, Building, Wallet, DollarSign } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import FiiCard from '../components/FiiCard';
import ChartContainer from '../components/ChartContainer';
import DataTable from '../components/DataTable';
import { fetchFiis, fetchMarketOverview } from '../services/api';
import { FiiData } from '../types/fii';
import { MarketOverview } from '../types/market';

const Dashboard: React.FC = () => {
  const [fiis, setFiis] = useState<FiiData[]>([]);
  const [marketOverview, setMarketOverview] = useState<MarketOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fiisData, marketData] = await Promise.all([
          fetchFiis(),
          fetchMarketOverview()
        ]);
        
        setFiis(fiisData);
        setMarketOverview(marketData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const performanceChartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'IFIX',
        data: [2.3, 1.8, -0.5, 1.2, 0.9, 1.7, 3.1, 2.5, 0.8, 1.5, 2.2, 1.9],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Média FIIs',
        data: [1.8, 1.2, -0.9, 0.8, 0.5, 1.3, 2.6, 2.0, 0.3, 1.0, 1.7, 1.4],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ],
  };

  const segmentDistributionData = {
    labels: ['Lajes Corporativas', 'Shoppings', 'Logística', 'Recebíveis', 'Híbrido', 'Outros'],
    datasets: [
      {
        label: 'Distribuição por Segmento',
        data: [25, 18, 22, 15, 12, 8],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(107, 114, 128, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="h-28 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="h-80 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          ))}
        </div>
        <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="h-60 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard 
          title="Índice IFIX" 
          value={marketOverview?.ifix || "2.982,35"} 
          icon={BarChart2}
          change="+0.87% (hoje)" 
          isPositive={true}
          tooltip="Índice que representa o desempenho médio das cotações dos FIIs"
        />
        <MetricCard 
          title="Média DY (12m)" 
          value={`${marketOverview?.averageDY || "8.73"}%`}
          icon={TrendingUp}
          change="+0.22% (mês)" 
          isPositive={true}
          tooltip="Dividend Yield médio dos FIIs nos últimos 12 meses"
        />
        <MetricCard 
          title="Média P/VP" 
          value={marketOverview?.averagePVP || "0.96"}
          icon={Building}
          change="-0.03 (mês)" 
          isPositive={true}
          tooltip="Price to Book Value médio dos FIIs"
        />
        <MetricCard 
          title="Dividendos Total" 
          value={`R$ ${marketOverview?.totalDividends || "1.45"} bi`}
          icon={BadgeDollarSign}
          change="+4.3% (ano)" 
          isPositive={true}
          tooltip="Valor total de dividendos distribuídos pelos FIIs"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartContainer 
          title="Desempenho Anual (%)" 
          type="line" 
          data={performanceChartData} 
        />
        <ChartContainer 
          title="Distribuição por Segmento (%)" 
          type="bar" 
          data={segmentDistributionData} 
        />
      </div>
      
      <div className="mb-6">
        <DataTable data={fiis} title="FIIs em Destaque" />
      </div>
      
      <h2 className="text-xl font-bold mb-4">FIIs Recomendados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fiis.slice(0, 6).map((fii) => (
          <FiiCard key={fii.symbol} fii={fii} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;