import React from 'react';
import { X, ExternalLink, TrendingUp, TrendingDown } from 'lucide-react';
import { Coin } from '../types/coin';
import { formatCurrency, formatPercentage, formatMarketCap, getChangeColorClass } from '../utils/formatters';

interface CoinModalProps {
  coin: Coin | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CoinModal: React.FC<CoinModalProps> = ({ coin, isOpen, onClose }) => {
  if (!isOpen || !coin) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img
              src={coin.image}
              alt={coin.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-900">{coin.name}</h2>
              <p className="text-sm text-gray-500 uppercase">{coin.symbol}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatCurrency(coin.currentPrice)}
            </div>
            <div className={`flex items-center justify-center gap-2 text-lg font-medium ${getChangeColorClass(coin.priceChangePercentage24h)}`}>
              {coin.priceChangePercentage24h >= 0 ? (
                <TrendingUp className="w-5 h-5" />
              ) : (
                <TrendingDown className="w-5 h-5" />
              )}
              {formatPercentage(coin.priceChangePercentage24h)} (24h)
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Market Cap Rank</div>
              <div className="text-lg font-semibold text-gray-900">
                #{coin.marketCapRank}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Market Cap</div>
              <div className="text-lg font-semibold text-gray-900">
                {formatMarketCap(coin.marketCap)}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">24h Volume</div>
              <div className="text-lg font-semibold text-gray-900">
                {formatMarketCap(coin.totalVolume)}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">24h Change</div>
              <div className={`text-lg font-semibold ${getChangeColorClass(coin.priceChange24h)}`}>
                {coin.priceChange24h >= 0 ? '+' : ''}{formatCurrency(coin.priceChange24h)}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => window.open(`https://www.coingecko.com/en/coins/${coin.id}`, '_blank')}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View on CoinGecko
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};