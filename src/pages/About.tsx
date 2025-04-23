import React from 'react';
import { Code, Database, BarChart2, Brain, AlertTriangle } from 'lucide-react';
import { color } from 'chart.js/helpers';

const About: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Sobre o FII Tracker</h1>
      
      <div className="card mb-6">
        <h2 className="text-lg font-semibold mb-4">Visão Geral</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          O FII Tracker é uma plataforma de análise de dados para Fundos de Investimento Imobiliário (FIIs) do mercado brasileiro. 
          Nosso objetivo é fornecer informações precisas, análises detalhadas e previsões baseadas em algoritmos para ajudar investidores 
          a tomarem decisões mais informadas.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Utilizamos técnicas avançadas de ciência de dados, aprendizado de máquina e análise estatística para processar grandes volumes 
          de dados históricos e em tempo real, transformando-os em insights acionáveis.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 color:white">
        <div className="card">
          <div className="flex items-start mb-4">
            <div className="p-2 rounded-full bg-primary-50 dark:bg-primary-900/30 mr-3">
              <Database className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Fonte de Dados</h3>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            Nossos dados são coletados de diversas fontes confiáveis, incluindo:
          </p>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
            <li className="mb-1">APIs de provedores de dados financeiros</li>
            <li className="mb-1">Relatórios oficiais dos fundos</li>
            <li className="mb-1">Dados da B3 (Bolsa de Valores do Brasil)</li>
            <li className="mb-1">Dados econômicos de fontes governamentais</li>
            <li>Informações setoriais do mercado imobiliário</li>
          </ul>
        </div>
        
        <div className="card">
          <div className="flex items-start mb-4">
            <div className="p-2 rounded-full bg-primary-50 dark:bg-primary-900/30 mr-3">
              <BarChart2 className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Métricas e Análises</h3>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            O FII Tracker oferece diversas métricas e análises, incluindo:
          </p>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
            <li className="mb-1">Dividend Yield (DY) atual e histórico</li>
            <li className="mb-1">Preço sobre Valor Patrimonial (P/VP)</li>
            <li className="mb-1">Taxa de vacância dos imóveis</li>
            <li className="mb-1">Histórico de dividendos</li>
            <li className="mb-1">Liquidez e volume de negociação</li>
            <li>Composição da carteira de ativos</li>
          </ul>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <div className="flex items-start mb-4">
            <div className="p-2 rounded-full bg-primary-50 dark:bg-primary-900/30 mr-3">
              <Brain className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Modelos Preditivos</h3>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            Nossas previsões são baseadas em modelos como:
          </p>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
            <li className="mb-1">Modelos de séries temporais (ARIMA, SARIMA)</li>
            <li className="mb-1">Redes neurais recorrentes (LSTM)</li>
            <li className="mb-1">Algoritmos de ensemble learning</li>
            <li className="mb-1">Modelos de regressão avançados</li>
            <li>Análise de sentimento de mercado</li>
          </ul>
        </div>
        
        <div className="card">
          <div className="flex items-start mb-4">
            <div className="p-2 rounded-full bg-primary-50 dark:bg-primary-900/30 mr-3">
              <Code className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Tecnologias Utilizadas</h3>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            Nossa plataforma foi construída utilizando:
          </p>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
            <li className="mb-1">Python para backend e algoritmos de análise</li>
            <li className="mb-1">React.js e TypeScript para frontend</li>
            <li className="mb-1">Bibliotecas de ciência de dados (Pandas, NumPy, scikit-learn)</li>
            <li className="mb-1">TensorFlow e PyTorch para modelos de aprendizado profundo</li>
            <li>APIs RESTful para comunicação entre frontend e backend</li>
          </ul>
        </div>
      </div>
      
      <div className="card mb-6">
        <div className="flex items-start mb-4">
          <div className="p-2 rounded-full bg-warning-50 dark:bg-warning-900/30 mr-3">
            <AlertTriangle className="h-5 w-5 text-warning-600 dark:text-warning-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Aviso Importante</h3>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-3">
          O FII Tracker é uma ferramenta de análise e informação. Considerações importantes:
        </p>
        <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
          <li className="mb-1">As previsões são baseadas em modelos estatísticos e têm limitações</li>
          <li className="mb-1">Eventos imprevisíveis de mercado podem afetar significativamente os resultados</li>
          <li className="mb-1">As recomendações não constituem aconselhamento financeiro formal</li>
          <li className="mb-1">Rentabilidade passada não é garantia de resultados futuros</li>
          <li>Sempre consulte um profissional financeiro antes de tomar decisões de investimento</li>
        </ul>
      </div>
      
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Contato</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Para dúvidas, sugestões ou informações adicionais, entre em contato conosco:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
            <h4 className="font-medium mb-2">Suporte</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Email: suporte@fiitracker.com.br<br />
              Horário: Segunda a Sexta, 9h às 18h
            </p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
            <h4 className="font-medium mb-2">Mídia e Parcerias</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Email: contato@fiitracker.com.br<br />
              Tel: (11) 1234-5678
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;