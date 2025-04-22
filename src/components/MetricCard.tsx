import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  isPositive?: boolean;
  tooltip?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  isPositive = true,
  tooltip
}) => {
  return (
    <div className="card relative group">
      {tooltip && (
        <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 -mt-1 -right-1 bg-gray-800 text-white text-xs rounded py-1 px-2 max-w-xs">
          {tooltip}
        </div>
      )}
      
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          
          {change && (
            <div className={`inline-flex items-center text-xs mt-1 ${isPositive ? 'text-success-500' : 'text-error-500'}`}>
              <span>{change}</span>
            </div>
          )}
        </div>
        
        <div className="p-2 rounded-full bg-primary-50 dark:bg-primary-900/30">
          <Icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;