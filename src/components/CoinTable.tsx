import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Star, TrendingUp } from 'lucide-react';
import { Coin, SortConfig, SortField } from '../types/coin';
import { formatCurrency, formatPercentage, formatMarketCap, formatVolume, getChangeColorClass } from '../utils/formatters';

interface CoinTableProps {
  coins: Coin[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onSort: (config: SortConfig) => void;
  currentSort: SortConfig;
  onCoinClick: (coin: Coin) => void;
}

export const CoinTable: React.FC<CoinTableProps> = ({
  coins,
  loading,
  hasMore,
  onLoadMore,
  onSort,
  currentSort,
  onCoinClick
}) => {
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());

  const handleSort = (field: SortField) => {
    const newOrder = currentSort.field === field && currentSort.order === 'asc' ? 'desc' : 'asc';
    onSort({ field, order: newOrder });
  };

  const toggleWatchlist = (coinId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setWatchlist(prev => {
      const newSet = new Set(prev);
      if (newSet.has(coinId)) {
        newSet.delete(coinId);
      } else {
        newSet.add(coinId);
      }
      return newSet;
    });
  };

  const getSortIcon = (field: SortField) => {
    if (currentSort.field !== field) return null;
    return currentSort.order === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('market_cap_rank')}
                  className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors"
                >
                  # {getSortIcon('market_cap_rank')}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Coin
              </th>
              <th className="px-6 py-3 text-right">
                <button
                  onClick={() => handleSort('current_price')}
                  className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors ml-auto"
                >
                  Price {getSortIcon('current_price')}
                </button>
              </th>
              <th className="px-6 py-3 text-right">
                <button
                  onClick={() => handleSort('price_change_percentage_24h')}
                  className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors ml-auto"
                >
                  24h {getSortIcon('price_change_percentage_24h')}
                </button>
              </th>
              <th className="px-6 py-3 text-right">
                <button
                  onClick={() => handleSort('total_volume')}
                  className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors ml-auto"
                >
                  24h Volume {getSortIcon('total_volume')}
                </button>
              </th>
              <th className="px-6 py-3 text-right">
                <button
                  onClick={() => handleSort('market_cap')}
                  className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors ml-auto"
                >
                  Market Cap {getSortIcon('market_cap')}
                </button>
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last 7 Days
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {coins.map((coin) => (
              <tr
                key={coin.id}
                onClick={() => onCoinClick(coin)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => toggleWatchlist(coin.id, e)}
                      className="text-gray-400 hover:text-yellow-500 transition-colors"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          watchlist.has(coin.id) ? 'fill-yellow-500 text-yellow-500' : ''
                        }`}
                      />
                    </button>
                    <span className="text-sm text-gray-900 font-medium">
                      {coin.marketCapRank}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-8 h-8 rounded-full"
                      loading="lazy"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {coin.name}
                      </div>
                      <div className="text-sm text-gray-500 uppercase">
                        {coin.symbol}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 font-medium">
                  {formatCurrency(coin.currentPrice)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="space-y-1">
                    <div className={`text-sm font-medium ${getChangeColorClass(coin.priceChangePercentage24h)}`}>
                      {formatPercentage(coin.priceChangePercentage24h)}
                    </div>
                    <div className={`text-xs ${getChangeColorClass(coin.priceChange24h)}`}>
                      {coin.priceChange24h >= 0 ? '+' : ''}{formatCurrency(coin.priceChange24h)}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                  {formatVolume(coin.totalVolume)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                  {formatMarketCap(coin.marketCap)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center">
                    <TrendingUp className={`w-4 h-4 ${getChangeColorClass(coin.priceChangePercentage24h)}`} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hasMore && !loading && (
        <div className="px-6 py-4 border-t border-gray-200">
          <button
            onClick={onLoadMore}
            className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Load More
          </button>
        </div>
      )}

      {loading && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
          </div>
        </div>
      )}
    </div>
  );
};