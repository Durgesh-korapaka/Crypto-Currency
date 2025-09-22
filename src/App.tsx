import React, { useState } from 'react';
import { Coins, TrendingUp, Search as SearchIcon } from 'lucide-react';
import { CoinTable } from './components/CoinTable';
import { HighlightCard } from './components/HighlightCard';
import { CoinModal } from './components/CoinModal';
import { SearchInput } from './components/ui/SearchInput';
import { ErrorMessage } from './components/ui/ErrorMessage';
import { SkeletonLoader } from './components/ui/SkeletonLoader';
import { useCoins } from './hooks/useCoins';
import { useHighlights } from './hooks/useHighlights';
import { useDebounce } from './hooks/useDebounce';
import { Coin } from './types/coin';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  const {
    coins,
    loading: coinsLoading,
    error: coinsError,
    hasMore,
    loadMore,
    retry: retryCoins,
    sort,
    currentSort
  } = useCoins(debouncedSearchQuery);

  const {
    trending,
    topGainers,
    topLosers,
    loading: highlightsLoading,
    error: highlightsError,
    retry: retryHighlights
  } = useHighlights();

  const handleCoinClick = (coin: Coin) => {
    setSelectedCoin(coin);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCoin(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <Coins className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Cryptocurrency Prices by Market Cap
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              The global cryptocurrency market cap today is $4.1 Trillion, a +1.2% change in the last 24 hours.
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              className="w-full sm:w-96"
              placeholder="Search cryptocurrencies..."
            />
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <SearchIcon className="w-4 h-4" />
              {coins.length} coins
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Coins Table */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">All Coins Overview</h2>
            </div>

            {coinsError ? (
              <ErrorMessage message={coinsError} onRetry={retryCoins} />
            ) : coinsLoading && coins.length === 0 ? (
              <SkeletonLoader rows={10} className="bg-white rounded-lg shadow-sm border border-gray-200" />
            ) : (
              <CoinTable
                coins={coins}
                loading={coinsLoading}
                hasMore={hasMore}
                onLoadMore={loadMore}
                onSort={sort}
                currentSort={currentSort}
                onCoinClick={handleCoinClick}
              />
            )}
          </div>

          {/* Highlights Section */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Crypto Highlights</h2>
              <p className="text-sm text-gray-500 ml-2">
                Which cryptocurrencies are people more interested in? Track and discover the most interesting cryptocurrencies based on market and CoinGecko activity.
              </p>
            </div>

            {highlightsError ? (
              <ErrorMessage message={highlightsError} onRetry={retryHighlights} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <HighlightCard
                  title="Trending Coins"
                  coins={trending}
                  loading={highlightsLoading}
                  icon="trending"
                />
                <HighlightCard
                  title="Top Gainers"
                  coins={topGainers}
                  loading={highlightsLoading}
                  icon="up"
                />
                <HighlightCard
                  title="Top Losers"
                  coins={topLosers}
                  loading={highlightsLoading}
                  icon="down"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Coin Detail Modal */}
      <CoinModal
        coin={selectedCoin}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;