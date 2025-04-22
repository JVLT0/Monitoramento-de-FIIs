import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import RecommendationCard from '../components/RecommendationCard';
import { fetchRecommendations } from '../services/api';
import { Recommendation } from '../types/recommendation';

const Recommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const data = await fetchRecommendations();
        setRecommendations(data);
      } catch (error) {
        console.error('Error loading recommendations:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadRecommendations();
  }, []);

  const filteredRecommendations = recommendations.filter(rec => {
    if (filter === 'all') return true;
    return rec.type === filter;
  });

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(9)].map((_, idx) => (
            <div key={idx} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Recomendações</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Análises e recomendações baseadas em dados e algoritmos
          </p>
        </div>
        
        <div className="flex items-center mt-4 md:mt-0 bg-white dark:bg-gray-800 rounded-md shadow p-1">
          <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400 ml-2" />
          <select 
            className="bg-transparent border-none text-sm focus:ring-0 focus:outline-none py-1 pl-1 pr-8 text-gray-700 dark:text-gray-300"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Todas Recomendações</option>
            <option value="Compra">Compra</option>
            <option value="Venda">Venda</option>
            <option value="Neutro">Neutro</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecommendations.length > 0 ? (
          filteredRecommendations.map((recommendation, idx) => (
            <RecommendationCard key={idx} recommendation={recommendation} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Nenhuma recomendação encontrada para o filtro selecionado
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;