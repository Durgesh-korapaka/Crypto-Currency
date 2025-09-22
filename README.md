# Crypto Dashboard

A professional cryptocurrency dashboard built with React and TypeScript that provides real-time market data and insights using the CoinGecko API.

## 🚀 Features

### Core Functionality
- **Real-time Market Data**: Live cryptocurrency prices, market caps, and trading volumes
- **Advanced Search & Filtering**: Debounced search with instant results
- **Smart Sorting**: Sort by price, market cap, volume, and 24h changes
- **Infinite Scroll**: Smooth pagination with "Load More" functionality
- **Interactive Details**: Click any coin for detailed information

### Highlights Section
- **Trending Coins**: Most popular cryptocurrencies based on community interest
- **Top Gainers/Losers**: Best and worst performing coins in the last 24 hours
- **Volume Leaders**: Coins with highest trading activity

### UX Excellence
- **Loading States**: Beautiful skeleton loaders and spinners
- **Error Handling**: Comprehensive error recovery with retry mechanisms
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Accessibility**: Keyboard navigation and screen reader support
- **Performance**: Optimized API calls with caching and debouncing

## 🏗️ Architecture & Design Patterns

### Clean Architecture
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, inputs, etc.)
│   ├── CoinTable.tsx   # Main data table component
│   ├── HighlightCard.tsx # Highlight section component
│   └── CoinModal.tsx   # Coin detail modal
├── hooks/              # Custom React hooks
│   ├── useCoins.ts     # Coin data management
│   ├── useHighlights.ts # Highlights data management
│   └── useDebounce.ts  # Input debouncing
├── services/           # External API services
│   └── coinGeckoApi.ts # CoinGecko API client
├── types/              # TypeScript type definitions
├── utils/              # Helper functions and adapters
└── App.tsx            # Main application component
```

### Design Patterns Used

1. **Repository Pattern**: `coinGeckoApi.ts` abstracts all API interactions
2. **Adapter Pattern**: `coinAdapter.ts` transforms API responses into domain models
3. **Custom Hooks Pattern**: Encapsulates business logic and state management
4. **Component Composition**: Small, focused components with single responsibilities
5. **Error Boundary Pattern**: Comprehensive error handling at multiple levels

### State Management Strategy
- **Local State**: React hooks for component-specific state
- **Server State**: Custom hooks for API data management with caching
- **Derived State**: Computed values from base state (filtered/sorted data)

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **API**: CoinGecko v3 API
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React hooks with custom patterns

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- CoinGecko API key (optional but recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crypto-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Add your CoinGecko API key to .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_COINGECKO_API_URL=https://api.coingecko.com/api/v3
VITE_COINGECKO_API_KEY=your_api_key_here
```

**Getting a CoinGecko API Key:**
1. Sign up at [CoinGecko](https://www.coingecko.com/en/api/pricing)
2. Choose the free plan (sufficient for this demo)
3. Copy your API key to the `.env` file

## 📈 Performance Optimizations

### API Efficiency
- **Debounced Search**: 300ms delay prevents excessive API calls
- **Request Caching**: Automatic caching of recent requests
- **Retry Logic**: Exponential backoff for failed requests
- **Batch Loading**: Efficient pagination with 50 items per page

### UI Performance
- **Lazy Loading**: Images load only when visible
- **Skeleton Screens**: Instant loading perception
- **Optimistic Updates**: Immediate UI feedback
- **Efficient Rendering**: Minimal re-renders with proper dependency arrays

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) for actions and highlights
- **Success**: Green (#22C55E) for positive changes
- **Error**: Red (#EF4444) for negative changes
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Headings**: Inter font family, multiple weights
- **Body**: Consistent line heights (150% for body, 120% for headings)
- **Hierarchy**: Clear visual hierarchy with appropriate sizing

### Spacing System
- **8px Grid**: All spacing follows 8px increments
- **Consistent Padding**: 16px, 24px, 32px for different contexts
- **Proper Margins**: Logical spacing between elements

## 🔒 Error Handling & Resilience

### API Error Handling
- **Network Errors**: Automatic retry with exponential backoff
- **Rate Limiting**: Graceful handling of API limits
- **Invalid Responses**: Fallback to cached data when possible
- **User Feedback**: Clear error messages with retry options

### Defensive Programming
- **Input Validation**: All user inputs are validated
- **Null Checks**: Safe handling of potentially undefined values
- **Fallback Values**: Default values for missing data
- **Error Boundaries**: Prevent entire app crashes

## 🔮 Future Enhancements

### Planned Features
- **Real-time Updates**: WebSocket integration for live price updates
- **Portfolio Tracking**: Personal portfolio management
- **Price Alerts**: Customizable price notifications
- **Advanced Charts**: Interactive price history charts
- **Dark Mode**: Toggle between light and dark themes

### Scalability Improvements
- **State Management**: Redux/Zustand for complex state
- **Code Splitting**: Route-based code splitting
- **PWA Features**: Offline support and push notifications
- **Testing**: Comprehensive unit and integration tests

### Production Readiness
- **Monitoring**: Error tracking and analytics
- **Logging**: Structured logging for debugging
- **Performance**: Bundle optimization and CDN
- **Security**: CSP headers and XSS protection

## 📝 API Limitations & Considerations

### CoinGecko Free Tier Limits
- **Rate Limit**: 30 calls/minute for demo API
- **Data**: Basic market data only
- **Real-time**: 5-minute delayed data

### Handling Limitations
- **Caching**: Reduces API calls through intelligent caching
- **Pagination**: Efficient data loading strategies
- **Fallbacks**: Graceful degradation when limits are reached

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using React, TypeScript, and the CoinGecko API**