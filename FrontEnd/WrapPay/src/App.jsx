import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CheckOut from './Components/CheckOut'
import Wallets from './Components/Wallets'
import PaymentSuccess from './Components/PaymentSuccess'
import PaymentFailure from './Components/PaymentFailure'
import { config } from '../wagmiConfig'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* Main payment page */}
            <Route path="/" element={
              <div className="min-h-screen bg-gray-100 p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <CheckOut />
                <Wallets />
              </div>
            } />
            
            {/* Success page */}
            <Route path="/payment-success" element={<PaymentSuccess />} />
            
            {/* Failure page */}
            <Route path="/payment-failure" element={<PaymentFailure />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App