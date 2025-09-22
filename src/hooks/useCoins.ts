import { useState, useEffect, useCallback } from 'react';
import { Coin, SortConfig } from '../types/coin';
import { coinGeckoApi } from '../services/coinGeckoApi';
import { adaptCoinMarketData } from '../utils/coinAdapter';

interface UseCoinsReturn {
  coins: Coin[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  retry: () => void;
  sort: (config: SortConfig) => void;
  currentSort: SortConfig;
}

export const useCoins = (searchQuery?: string): UseCoinsReturn => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentSort, setCurrentSort] = useState<SortConfig>({
    field: 'market_cap_rank',
    order: 'asc'
  });

  const fetchCoins = useCallback(async (pageNum: number, reset: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      const sortOrder = currentSort.field === 'market_cap_rank' ? 
        'market_cap_desc' : 
        `${currentSort.field}_${currentSort.order}`;

      const data = await coinGeckoApi.getMarketData(pageNum, 50, 'usd', sortOrder);
      const adaptedCoins = data.map(adaptCoinMarketData);

      if (reset) {
        setCoins(adaptedCoins);
      } else {
        setCoins(prev => [...prev, ...adaptedCoins]);
      }

      setHasMore(adaptedCoins.length === 50);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch coins');
    } finally {
      setLoading(false);
    }
  }, [currentSort]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCoins(nextPage);
    }
  }, [loading, hasMore, page, fetchCoins]);

  const retry = useCallback(() => {
    setPage(1);
    fetchCoins(1, true);
  }, [fetchCoins]);

  const sort = useCallback((config: SortConfig) => {
    setCurrentSort(config);
    setPage(1);
    setCoins([]);
  }, []);

  // Filter coins based on search query
  const filteredCoins = searchQuery
    ? coins.filter(coin => 
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : coins;

  useEffect(() => {
    fetchCoins(1, true);
  }, [currentSort]);

  return {
    coins: filteredCoins,
    loading,
    error,
    hasMore,
    loadMore,
    retry,
    sort,
    currentSort
  };
};