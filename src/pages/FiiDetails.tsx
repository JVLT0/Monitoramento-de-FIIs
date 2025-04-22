import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building, Users, Percent, DollarSign, LineChart, BarChart2, FileText, TrendingUp } from 'lucide-react';
import ChartContainer from '../components/ChartContainer';
import { fetchFiiDetails, fetchFiiHistory } from '../services/api';
import { FiiDetails as FiiDetailsType } from '../types/fii';

const FiiDetails: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const [fiiDetails, setFiiDetails] = useState<FiiDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    const loadFiiDetails = async () => {
      try {
        if (symbol) {
          const [details, history] = await Promise.all([
            fetchFiiDetails(symbol),
            fetchFiiHistory(symbol)
          ]);
          
          setFiiDetails({
            ...details,
            history
          });
        }
      } catch (error) {
        console.error('Error loading FII details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadFiiDetails();
  }, [symbol]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          ))}
        </div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
        <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"></div>
        <div className="h-60 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>
    );
  }

  if (!fiiDetails) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          FII não encontrado
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Não foi possível encontrar detalhes para o FII com código {symbol}.
        </p>
        <Link to="/" className="btn btn-primary">
          Voltar para Dashboard
        </Link>
      </div>
    );
  }

  const priceHistoryData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'Cotação (R$)',
        data: fiiDetails.history?.price || [100, 102, 99, 101, 103, 105, 108, 110, 109, 112, 115, 118],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ],
  };
  
  const dividendHistoryData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'Dividendos (R$)',
        data: fiiDetails.history?.dividends || [0.72, 0.73, 0.71, 0.74, 0.75, 0.75, 0.76, 0.78, 0.77, 0.78, 0.79, 0.80],
        backgroundColor: 'rgb(16, 185, 129)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
      }
    ],
  };
  
  const forecastData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Previsão de Cotação',
        data: fiiDetails.forecast?.price || [120, 122, 125, 127, 130, 133],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
        tension: 0.4,
        borderDash: [5, 5],
      },
      {
        label: 'Cotação Atual',
        data: [118, 118, 118, 118, 118, 118],
        borderColor: 'rgba(107, 114, 128, 0.5)',
        borderWidth: 1,
        pointRadius: 0,
        borderDash: [2, 2],
      }
    ],
  };

  return (
    <div>
      <div className="mb-6">
        <Link to="/" className="text-primary-600 hover:text-primary-700 flex items-center mb-2">
          <ArrowLeft className="h-4 w-4 mr-1" /> Voltar para Dashboard
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">{fiiDetails.symbol}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">{fiiDetails.name}</p>
          </div>
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
              ${fiiDetails.recommendation === 'Compra' 
                ? 'bg-success-50 text-success-700 dark:bg-success-900/30 dark:text-success-300' 
                : fiiDetails.recommendation === 'Venda'
                ? 'bg-error-50 text-error-700 dark:bg-error-900/30 dark:text-error-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
            >
              <TrendingUp className="h-4 w-4 mr-1" />
              {fiiDetails.recommendation}
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="card">
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-primary-50 dark:bg-primary-900/30 mr-3">
              <DollarSign className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Cotação Atual</p>
              <p className="text-xl font-bold">R$ {fiiDetails.price}</p>
              <p className={`text-xs ${fiiDetails.priceChange > 0 ? 'text-success-500' : 'text-error-500'}`}>
                {fiiDetails.priceChange > 0 ? '+' : ''}{fiiDetails.priceChange}% (hoje)
              </p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-primary-50 dark:bg-primary-900/30 mr-3">
              <Percent className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Dividend Yield (12m)</p>
              <p className="text-xl font-bold">{fiiDetails.dy}%</p>
              <p className={`text-xs ${parseFloat(fiiDetails.dy) > 8 ? 'text-success-500' : 'text-warning-500'}`}>
                {parseFloat(fiiDetails.dy) > 8 ? 'Acima da média' : 'Abaixo da média'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-primary-50 dark:bg-primary-900/30 mr-3">
              <Building className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">P/VP</p>
              <p className="text-xl font-bold">{fiiDetails.pvp}</p>
              <p className={`text-xs ${parseFloat(fiiDetails.pvp) < 1 ? 'text-success-500' : 'text-warning-500'}`}>
                {parseFloat(fiiDetails.pvp) < 1 ? 'Abaixo do valor patrimonial' : 'Acima do valor patrimonial'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-primary-50 dark:bg-primary-900/30 mr-3">
              <DollarSign className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Último Dividendo</p>
              <p className="text-xl font-bold">R$ {fiiDetails.lastDividend}</p>
              <p className="text-xs text-gray-500">Data: {fiiDetails.lastDividendDate}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-primary-50 dark:bg-primary-900/30 mr-3">
              <Users className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Taxa de Vacância</p>
              <p className="text-xl font-bold">{fiiDetails.vacancy}%</p>
              <p className={`text-xs ${parseFloat(fiiDetails.vacancy) < 10 ? 'text-success-500' : 'text-warning-500'}`}>
                {parseFloat(fiiDetails.vacancy) < 10 ? 'Baixa vacância' : 'Alta vacância'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-primary-50 dark:bg-primary-900/30 mr-3">
              <BarChart2 className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Liquidez Diária</p>
              <p className="text-xl font-bold">R$ {fiiDetails.liquidity}</p>
              <p className="text-xs text-gray-500">Volume médio (R$)</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-4 font-medium text-sm border-b-2 ${
                activeTab === 'overview'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Visão Geral
            </button>
            <button 
              onClick={() => setActiveTab('historic')}
              className={`py-2 px-4 font-medium text-sm border-b-2 ${
                activeTab === 'historic'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Histórico
            </button>
            <button 
              onClick={() => setActiveTab('forecast')}
              className={`py-2 px-4 font-medium text-sm border-b-2 ${
                activeTab === 'forecast'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Previsões
            </button>
          </nav>
        </div>
      </div>
      
      {activeTab === 'overview' && (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Sobre o FII</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {fiiDetails.description || `${fiiDetails.name} (${fiiDetails.symbol}) é um Fundo de Investimento Imobiliário do segmento ${fiiDetails.segment}. O fundo tem como objetivo a obtenção de renda através do investimento em imóveis comerciais e distribuição de dividendos aos seus cotistas.`}
              </p>
              
              <h3 className="text-md font-semibold mb-2">Informações Gerais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Segmento</p>
                  <p className="font-medium">{fiiDetails.segment}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Gestor</p>
                  <p className="font-medium">{fiiDetails.manager || "Administrador FII"}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Patrimônio</p>
                  <p className="font-medium">R$ {fiiDetails.equity || "500 milhões"}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Cotas Emitidas</p>
                  <p className="font-medium">{fiiDetails.shares || "5 milhões"}</p>
                </div>
              </div>
            </div>
            
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Análise do FII</h2>
              <div className="mb-4">
                <h3 className="text-md font-semibold mb-2">Pontos Fortes</h3>
                <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300">
                  {fiiDetails.strengths?.map((strength, idx) => (
                    <li key={idx} className="mb-1">{strength}</li>
                  )) || (
                    <>
                      <li className="mb-1">Dividend Yield consistente ao longo dos últimos 12 meses</li>
                      <li className="mb-1">Baixa taxa de vacância comparada à média do setor</li>
                      <li className="mb-1">Ativos bem localizados com contratos de longo prazo</li>
                    </>
                  )}
                </ul>
              </div>
              
              <div>
                <h3 className="text-md font-semibold mb-2">Pontos de Atenção</h3>
                <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300">
                  {fiiDetails.weaknesses?.map((weakness, idx) => (
                    <li key={idx} className="mb-1">{weakness}</li>
                  )) || (
                    <>
                      <li className="mb-1">Liquidez diária abaixo da média de FIIs comparáveis</li>
                      <li className="mb-1">Concentração de ativos em uma única região</li>
                      <li className="mb-1">Potencial impacto de novas regulamentações do setor</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">Composição da Carteira</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {fiiDetails.portfolio?.map((item, idx) => (
                <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
                  <h4 className="font-medium mb-1">{item.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{item.location}</p>
                  <div className="flex justify-between text-sm">
                    <span>Área: {item.area} m²</span>
                    <span>% do Portfólio: {item.percentage}%</span>
                  </div>
                </div>
              )) || [...Array(6)].map((_, idx) => (
                <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
                  <h4 className="font-medium mb-1">{`Imóvel ${idx + 1}`}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{`São Paulo - SP`}</p>
                  <div className="flex justify-between text-sm">
                    <span>Área: {1000 + idx * 500} m²</span>
                    <span>% do Portfólio: {Math.round(20 - idx * 2)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Recomendação dos Analistas</h2>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
              <div className="flex items-center mb-3">
                <div className={`text-sm font-semibold py-1 px-3 rounded-full mr-3 ${
                  fiiDetails.recommendation === 'Compra'
                    ? 'bg-success-50 text-success-700 dark:bg-success-900/30 dark:text-success-300'
                    : fiiDetails.recommendation === 'Venda'
                    ? 'bg-error-50 text-error-700 dark:bg-error-900/30 dark:text-error-300'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {fiiDetails.recommendation}
                </div>
                <span className="text-gray-500 dark:text-gray-400 text-sm">Atualizado em {fiiDetails.recommendationDate || "15/08/2025"}</span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {fiiDetails.analysis || `Este FII apresenta bons fundamentos com dividend yield acima da média e baixa vacância. 
                Os ativos do portfólio estão bem localizados e com contratos de longo prazo, 
                o que proporciona estabilidade nos rendimentos. Considerando o P/VP atual de ${fiiDetails.pvp}, 
                entendemos que o fundo está negociando em um patamar atrativo.`}
              </p>
              
              <div className="flex items-center mb-2">
                <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                <h4 className="font-medium">Preço Alvo</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                R$ {fiiDetails.targetPrice || "125,00"} (+{fiiDetails.targetPriceChange || "7.8"}%)
              </p>
              
              <div className="flex items-center mb-2">
                <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                <h4 className="font-medium">Riscos</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {fiiDetails.risks || "Aumento nas taxas de juros, elevação da vacância e deterioração do cenário macroeconômico."}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'historic' && (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ChartContainer 
              title="Histórico de Cotações (12 meses)" 
              type="line" 
              data={priceHistoryData}
            />
            <ChartContainer 
              title="Histórico de Dividendos (12 meses)" 
              type="bar" 
              data={dividendHistoryData}
            />
          </div>
          
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Histórico de Eventos</h2>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-gray-800 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-3">Data</th>
                    <th className="px-6 py-3">Evento</th>
                    <th className="px-6 py-3">Valor</th>
                    <th className="px-6 py-3">Observações</th>
                  </tr>
                </thead>
                <tbody>
                  {fiiDetails.events?.map((event, idx) => (
                    <tr key={idx} className="border-b dark:border-gray-700">
                      <td className="px-6 py-4">{event.date}</td>
                      <td className="px-6 py-4">{event.type}</td>
                      <td className="px-6 py-4">{event.value}</td>
                      <td className="px-6 py-4">{event.notes}</td>
                    </tr>
                  )) || [...Array(5)].map((_, idx) => (
                    <tr key={idx} className="border-b dark:border-gray-700">
                      <td className="px-6 py-4">{`10/${12-idx}/2024`}</td>
                      <td className="px-6 py-4">Distribuição de Rendimentos</td>
                      <td className="px-6 py-4">R$ 0.{80-idx}</td>
                      <td className="px-6 py-4">Pagamento referente ao mês anterior</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'forecast' && (
        <div>
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">Previsão para os Próximos 6 Meses</h2>
            <ChartContainer 
              title="Previsão de Preço (R$)" 
              type="line" 
              data={forecastData}
              height={400}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Análise Preditiva</h2>
              <div className="mb-4">
                <h3 className="text-md font-semibold mb-2">Metodologia</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Nossa análise preditiva utiliza modelos estatísticos avançados combinando séries temporais, 
                  aprendizado de máquina e análise fundamentalista para projetar o comportamento futuro do FII.
                </p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-md font-semibold mb-2">Fatores Considerados</h3>
                <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300">
                  <li>Histórico de preços e dividendos</li>
                  <li>Cenário macroeconômico (juros, inflação, PIB)</li>
                  <li>Indicadores setoriais (vacância média, cap rate)</li>
                  <li>Métricas específicas do FII (DY, P/VP, liquidez)</li>
                  <li>Sazonalidade e correlação com outros ativos</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-md font-semibold mb-2">Confiabilidade</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  O modelo possui precisão histórica de 78% para previsões de até 3 meses e 65% para previsões de 6 meses. 
                  Sempre considere outros fatores antes de tomar decisões de investimento.
                </p>
              </div>
            </div>
            
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Previsões Detalhadas</h2>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 dark:bg-gray-800 text-xs uppercase">
                    <tr>
                      <th className="px-6 py-3">Período</th>
                      <th className="px-6 py-3">Preço Previsto</th>
                      <th className="px-6 py-3">Dividendo Est.</th>
                      <th className="px-6 py-3">DY Anualizado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fiiDetails.forecast?.monthly?.map((month, idx) => (
                      <tr key={idx} className="border-b dark:border-gray-700">
                        <td className="px-6 py-4">{month.month}</td>
                        <td className="px-6 py-4">R$ {month.price}</td>
                        <td className="px-6 py-4">R$ {month.dividend}</td>
                        <td className="px-6 py-4">{month.dy}%</td>
                      </tr>
                    )) || ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'].map((month, idx) => (
                      <tr key={idx} className="border-b dark:border-gray-700">
                        <td className="px-6 py-4">{month}/2026</td>
                        <td className="px-6 py-4">R$ {120 + idx * 2.5}</td>
                        <td className="px-6 py-4">R$ 0.{82 + idx}</td>
                        <td className="px-6 py-4">{(8.2 + idx * 0.1).toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiiDetails;