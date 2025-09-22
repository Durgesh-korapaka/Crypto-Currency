import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { HighlightCoin } from '../types/coin';
import { formatCurrency, formatPercentage, getChangeColorClass } from '../utils/formatters';

interface HighlightCardProps {
  title: string;
  coins: HighlightCoin[];
  loading: boolean;
  icon: 'trending' | 'up' | 'down';
}

export const HighlightCard: React.FC<HighlightCardProps> = ({
  title,
  coins,
  loading,
  icon
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'trending':
        return <Activity className="w-5 h-5 text-blue-600" />;
      case 'up':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-5 h-5 text-red-600" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 bg-gray-200 rounded animate-pulse w-24" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20 mb-1" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
              </div>
              <div className="text-right">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-16 mb-1" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        {getIcon()}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-3">
        {coins.slice(0, 5).map((coin, index) => (
          <div key={coin.id} className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer">
            <span className="text-sm font-medium text-gray-500 w-4">
              {index + 1}
            </span>
            {coin.image && (
              <img
                src={coin.image}
                alt={coin.name}
                className="w-6 h-6 rounded-full"
                loading="lazy"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {coin.name}
              </div>
              <div className="text-xs text-gray-500 uppercase">
                {coin.symbol}
              </div>
            </div>
            <div className="text-right">
              {coin.currentPrice > 0 && (
                <div className="text-sm font-medium text-gray-900">
                  {formatCurrency(coin.currentPrice)}
                </div>
              )}
              {coin.priceChangePercentage24h !== 0 && (
                <div className={`text-xs font-medium ${getChangeColorClass(coin.priceChangePercentage24h)}`}>
                  {formatPercentage(coin.priceChangePercentage24h)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {coins.length > 5 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View more →
          </button>
        </div>
      )}
    </div>
  );
};