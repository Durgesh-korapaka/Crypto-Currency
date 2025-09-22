import { CoinMarketData, Coin, TrendingCoin, HighlightCoin } from '../types/coin';

export const adaptCoinMarketData = (data: CoinMarketData): Coin => ({
  id: data.id,
  symbol: data.symbol.toUpperCase(),
  name: data.name,
  image: data.image,
  currentPrice: data.current_price,
  marketCap: data.market_cap,
  marketCapRank: data.market_cap_rank,
  totalVolume: data.total_volume,
  priceChange24h: data.price_change_24h ?? 0,
  priceChangePercentage24h: data.price_change_percentage_24h ?? 0,
  sparkline: data.sparkline_in_7d?.price,
  lastUpdated: data.last_updated
});

export const adaptTrendingCoin = (item: TrendingCoin): HighlightCoin => ({
  id: item.id,
  name: item.name,
  symbol: item.symbol.toUpperCase(),
  image: item.large,
  currentPrice: 0, // Trending API doesn't provide price
  priceChangePercentage24h: 0, // Will be filled from market data if needed
  marketCapRank: item.market_cap_rank
});

export const createHighlightCoin = (coin: Coin): HighlightCoin => ({
  id: coin.id,
  name: coin.name,
  symbol: coin.symbol,
  image: coin.image,
  currentPrice: coin.currentPrice,
  priceChangePercentage24h: coin.priceChangePercentage24h,
  marketCapRank: coin.marketCapRank
});