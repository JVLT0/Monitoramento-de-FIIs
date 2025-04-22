import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FiiData } from '../types/fii';

interface FiiCardProps {
  fii: FiiData;
}

const FiiCard: React.FC<FiiCardProps> = ({ fii }) => {
  const isDyPositive = parseFloat(fii.dy) > 0;
  const isPvpPositive = parseFloat(fii.pvp) < 1;

  return (
    <Link to={`/fii/${fii.symbol}`}>
      <div className="card hover:shadow-lg transition-shadow duration-200">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold">{fii.symbol}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{fii.name}</p>
          </div>
          <div 
            className={`text-xs font-semibold py-1 px-2 rounded-full ${
              fii.segment === 'Lajes Corporativas' 
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                : fii.segment === 'Shoppings' 
                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                : fii.segment === 'Logística' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            }`}
          >
            {fii.segment}
          </div>
        </div>
  
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
              <DollarSign size={14} className="mr-1" /> Cotação
            </p>
            <p className="text-lg font-semibold">R$ {fii.price}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
              <Activity size={14} className="mr-1" /> Último Div.
            </p>
            <p className="text-lg font-semibold">R$ {fii.lastDividend}</p>
          </div>
        </div>
  
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
              {isDyPositive ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />} DY (12m)
            </p>
            <p className={`text-base font-semibold ${isDyPositive ? 'text-success-500' : 'text-error-500'}`}>
              {fii.dy}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
              <BarChart size={14} className="mr-1" /> P/VP
            </p>
            <p className={`text-base font-semibold ${isPvpPositive ? 'text-success-500' : 'text-error-500'}`}>
              {fii.pvp}
            </p>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
          <span>Liquidez: {fii.liquidity}</span>
          <span>Vacância: {fii.vacancy}%</span>
        </div>
      </div>
    </Link>
  );
};

export default FiiCard;