import { useState, useEffect } from 'react';
import { HighlightCoin } from '../types/coin';
import { coinGeckoApi } from '../services/coinGeckoApi';
import { adaptCoinMarketData, createHighlightCoin } from '../utils/coinAdapter';

interface UseHighlightsReturn {
  trending: HighlightCoin[];
  topGainers: HighlightCoin[];
  topLosers: HighlightCoin[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export const useHighlights = (): UseHighlightsReturn => {
  const [trending, setTrending] = useState<HighlightCoin[]>([]);
  const [topGainers, setTopGainers] = useState<HighlightCoin[]>([]);
  const [topLosers, setTopLosers] = useState<HighlightCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHighlights = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch market data sorted by different criteria
      const [marketData, trendingData] = await Promise.all([
        coinGeckoApi.getMarketData(1, 100),
        coinGeckoApi.getTrending().catch(() => ({ coins: [] })) // Fallback if trending fails
      ]);

      const coins = marketData.map(adaptCoinMarketData);
      
      // Get top gainers (sorted by 24h percentage change)
      const gainers = coins
        .filter(coin => coin.priceChangePercentage24h > 0)
        .sort((a, b) => b.priceChangePercentage24h - a.priceChangePercentage24h)
        .slice(0, 10)
        .map(createHighlightCoin);

      // Get top losers (sorted by 24h percentage change)
      const losers = coins
        .filter(coin => coin.priceChangePercentage24h < 0)
        .sort((a, b) => a.priceChangePercentage24h - b.priceChangePercentage24h)
        .slice(0, 10)
        .map(createHighlightCoin);

      // Get trending coins (from trending endpoint or top volume)
      let trendingCoins: HighlightCoin[] = [];
      if (trendingData.coins && trendingData.coins.length > 0) {
        trendingCoins = trendingData.coins.slice(0, 10).map(({ item }) => ({
          id: item.id,
          name: item.name,
          symbol: item.symbol.toUpperCase(),
          image: item.large,
          currentPrice: 0,
          priceChangePercentage24h: 0,
          marketCapRank: item.market_cap_rank
        }));
      } else {
        // Fallback to high volume coins
        trendingCoins = coins
          .sort((a, b) => b.totalVolume - a.totalVolume)
          .slice(0, 10)
          .map(createHighlightCoin);
      }

      setTopGainers(gainers);
      setTopLosers(losers);
      setTrending(trendingCoins);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch highlights');
    } finally {
      setLoading(false);
    }
  };

  const retry = () => {
    fetchHighlights();
  };

  useEffect(() => {
    fetchHighlights();
  }, []);

  return {
    trending,
    topGainers,
    topLosers,
    loading,
    error,
    retry
  };
};