import { CoinMarketData, TrendingData } from '../types/coin';

const API_BASE_URL = import.meta.env.VITE_COINGECKO_API_URL || 'https://api.coingecko.com/api/v3';
const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;

class CoinGeckoApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'CoinGeckoApiError';
  }
}

const createApiUrl = (endpoint: string, params: URLSearchParams = new URLSearchParams()): string => {
  if (API_KEY) {
    params.append('x_cg_demo_api_key', API_KEY);
  }
  
  const url = `${API_BASE_URL}${endpoint}`;
  const queryString = params.toString();
  return queryString ? `${url}?${queryString}` : url;
};

const fetchWithRetry = async (url: string, retries: number = 3): Promise<Response> => {
  let lastError: Error;
  
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new CoinGeckoApiError(
          `API request failed: ${response.status} ${response.statusText}`,
          response.status
        );
      }
      
      return response;
    } catch (error) {
      lastError = error as Error;
      
      if (i === retries - 1) break;
      
      // Exponential backoff
      const delay = Math.pow(2, i) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
};

export const coinGeckoApi = {
  async getMarketData(
    page: number = 1,
    perPage: number = 50,
    currency: string = 'usd',
    order: string = 'market_cap_desc'
  ): Promise<CoinMarketData[]> {
    const params = new URLSearchParams({
      vs_currency: currency,
      order,
      per_page: perPage.toString(),
      page: page.toString(),
      sparkline: 'false',
      price_change_percentage: '24h'
    });
    
    const url = createApiUrl('/coins/markets', params);
    const response = await fetchWithRetry(url);
    return response.json();
  },

  async getTrending(): Promise<TrendingData> {
    const url = createApiUrl('/search/trending');
    const response = await fetchWithRetry(url);
    return response.json();
  },

  async getCoinDetails(id: string): Promise<any> {
    const params = new URLSearchParams({
      localization: 'false',
      tickers: 'false',
      market_data: 'true',
      community_data: 'false',
      developer_data: 'false',
      sparkline: 'false'
    });
    
    const url = createApiUrl(`/coins/${id}`, params);
    const response = await fetchWithRetry(url);
    return response.json();
  },

  async searchCoins(query: string): Promise<any> {
    const params = new URLSearchParams({
      query: query.trim()
    });
    
    const url = createApiUrl('/search', params);
    const response = await fetchWithRetry(url);
    return response.json();
  }
};