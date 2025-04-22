import React from 'react';
import { TrendingUp, AlertTriangle, ThumbsUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Recommendation } from '../types/recommendation';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  const getRecommendationColor = () => {
    switch (recommendation.type) {
      case 'Compra':
        return 'bg-success-50 text-success-700 dark:bg-success-900/30 dark:text-success-300';
      case 'Venda':
        return 'bg-error-50 text-error-700 dark:bg-error-900/30 dark:text-error-300';
      case 'Neutro':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
      default:
        return 'bg-warning-50 text-warning-700 dark:bg-warning-900/30 dark:text-warning-300';
    }
  };

  const getRecommendationIcon = () => {
    switch (recommendation.type) {
      case 'Compra':
        return <ThumbsUp className="h-5 w-5 mr-1" />;
      case 'Venda':
        return <AlertTriangle className="h-5 w-5 mr-1" />;
      case 'Neutro':
        return <TrendingUp className="h-5 w-5 mr-1" />;
      default:
        return <TrendingUp className="h-5 w-5 mr-1" />;
    }
  };

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold">{recommendation.fii.symbol}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{recommendation.fii.name}</p>
        </div>
        <div className={`text-sm font-semibold py-1 px-3 rounded-full flex items-center ${getRecommendationColor()}`}>
          {getRecommendationIcon()}
          {recommendation.type}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">{recommendation.reason}</p>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
        <div>
          <p className="text-gray-500 dark:text-gray-400">Cotação</p>
          <p className="font-semibold">R$ {recommendation.fii.price}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">DY (12m)</p>
          <p className="font-semibold">{recommendation.fii.dy}%</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">P/VP</p>
          <p className="font-semibold">{recommendation.fii.pvp}</p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {recommendation.date}
        </div>
        <Link 
          to={`/fii/${recommendation.fii.symbol}`} 
          className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
        >
          Ver detalhes <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default RecommendationCard;