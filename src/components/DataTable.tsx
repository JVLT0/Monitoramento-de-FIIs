import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Search, ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FiiData } from '../types/fii';

interface DataTableProps {
  data: FiiData[];
  title: string;
}

type SortField = 'symbol' | 'price' | 'dy' | 'pvp' | 'liquidity' | 'vacancy' | 'lastDividend';
type SortDirection = 'asc' | 'desc';

const DataTable: React.FC<DataTableProps> = ({ data, title }) => {
  const [sortField, setSortField] = useState<SortField>('symbol');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data]
    .filter(item => 
      item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        if (sortField === 'dy' || sortField === 'price' || sortField === 'pvp' || 
            sortField === 'liquidity' || sortField === 'vacancy' || sortField === 'lastDividend') {
          return sortDirection === 'asc' 
            ? parseFloat(aValue) - parseFloat(bValue)
            : parseFloat(bValue) - parseFloat(aValue);
        }
        
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown size={16} className="ml-1 text-gray-400" />;
    return sortDirection === 'asc' 
      ? <ArrowUp size={16} className="ml-1" /> 
      : <ArrowDown size={16} className="ml-1" />;
  };

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar FII..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('symbol')}
              >
                <div className="flex items-center">
                  Código {getSortIcon('symbol')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center">
                  Preço {getSortIcon('price')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('dy')}
              >
                <div className="flex items-center">
                  DY (12m) {getSortIcon('dy')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('pvp')}
              >
                <div className="flex items-center">
                  P/VP {getSortIcon('pvp')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('liquidity')}
              >
                <div className="flex items-center">
                  Liquidez {getSortIcon('liquidity')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('vacancy')}
              >
                <div className="flex items-center">
                  Vacância {getSortIcon('vacancy')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('lastDividend')}
              >
                <div className="flex items-center">
                  Últ. Dividendo {getSortIcon('lastDividend')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {sortedData.length > 0 ? (
              sortedData.map((fii) => (
                <tr 
                  key={fii.symbol} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/fii/${fii.symbol}`} className="text-primary-600 hover:underline">
                      <div className="font-medium">{fii.symbol}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{fii.name}</div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    R$ {fii.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap ">
                    <span 
                      className={`${parseFloat(fii.dy) > 0 ? 'text-success-500' : 'text-error-500'}`}
                    >
                      {fii.dy}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className={`${parseFloat(fii.pvp) < 1 ? 'text-success-500' : 'text-error-500'}`}
                    >
                      {fii.pvp}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {fii.liquidity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {fii.vacancy}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    R$ {fii.lastDividend}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  Nenhum FII encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;