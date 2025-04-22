import React, { useState, useEffect } from 'react';
import { Search, DownloadCloud } from 'lucide-react';
import ChartContainer from '../components/ChartContainer';
import { fetchForecasts } from '../services/api';

const Forecasts: React.FC = () => {
  const [forecasts, setForecasts] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadForecasts = async () => {
      try {
        const data = await fetchForecasts();
        setForecasts(data);
      } catch (error) {
        console.error('Error loading forecasts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadForecasts();
  }, []);

  const marketTrendData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'IFIX (Previsão)',
        data: [3050, 3120, 3190, 3240, 3300, 3380],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Cenário Otimista',
        data: [3050, 3140, 3230, 3330, 3430, 3540],
        borderColor: 'rgba(16, 185, 129, 0.7)',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Cenário Pessimista',
        data: [3050, 3080, 3100, 3130, 3150, 3180],
        borderColor: 'rgba(239, 68, 68, 0.7)',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
      }
    ],
  };

  const marketSegmentForecastData = {
    labels: ['Lajes Corporativas', 'Shoppings', 'Logística', 'Recebíveis', 'Híbrido', 'Outros'],
    datasets: [
      {
        label: 'Previsão de Valorização nos Próximos 6 Meses (%)',
        data: [5.2, 7.8, 9.5, 4.3, 6.1, 3.7],
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

  const dividendTrendData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Dividendo Médio (R$)',
        data: [0.70, 0.71, 0.72, 0.73, 0.75, 0.77],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ],
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="h-80 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          ))}
        </div>
        <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"></div>
        <div className="h-60 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Previsões de Mercado</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Análises preditivas para o mercado de FIIs nos próximos meses
          </p>
        </div>
        
        <div className="flex items-center mt-4 md:mt-0">
          <div className="relative mr-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar FII específico"
              className="input pl-10 py-1 text-sm"
            />
          </div>
          
          <button className="btn px-3 py-1 text-sm flex items-center bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
            <DownloadCloud className="h-4 w-4 mr-1" /> Exportar
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartContainer 
          title="Previsão do IFIX para os Próximos 6 Meses" 
          type="line" 
          data={marketTrendData}
        />
        <ChartContainer 
          title="Previsão por Segmento (%)" 
          type="bar" 
          data={marketSegmentForecastData}
        />
      </div>
      
      <div className="mb-6">
        <ChartContainer 
          title="Tendência de Dividendos Médios para os Próximos 6 Meses" 
          type="line" 
          data={dividendTrendData}
        />
      </div>
      
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">FIIs com Maior Potencial de Valorização</h2>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            Ver todos
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  FII
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Segmento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Preço Atual
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Preço Alvo (6m)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Potencial
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Confiança
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {forecasts?.topPotential?.map((fii: any, idx: number) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{fii.symbol}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{fii.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {fii.segment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    R$ {fii.currentPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    R$ {fii.targetPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-success-500 font-medium">
                    +{fii.potential}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-primary-600 h-2.5 rounded-full" 
                        style={{ width: `${fii.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{fii.confidence}%</span>
                  </td>
                </tr>
              )) || [...Array(5)].map((_, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{`XPTO${11+idx}`}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{`FII ${idx+1}`}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {['Logística', 'Shoppings', 'Lajes Corporativas', 'Recebíveis', 'Híbrido'][idx]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    R$ {100 + idx * 5}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    R$ {116 + idx * 6}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-success-500 font-medium">
                    +{16 - idx}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-primary-600 h-2.5 rounded-full" 
                        style={{ width: `${85 - idx * 5}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{85 - idx * 5}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Forecasts;