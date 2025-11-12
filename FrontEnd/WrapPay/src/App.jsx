import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaymentSummary from './Components/PaymentSummary'
import Wallets from './Components/Wallets'
import PaymentSuccess from './Components/PaymentSuccess'
import PaymentFailure from './Components/PaymentFailure'
import { config } from '../wagmiConfig'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Solana imports
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
  const queryClient = new QueryClient()

  // Solana setup
  const network = 'devnet';
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  // Mock payment session data (will come from API later)
  const paymentData = {
    amount: "0.02",
    currency: "ETH",
    merchantName: "CoolNFT Shop",
    merchantWallets: {
      ETH: "0xYourEthAddress",
      SOL: "YourSolanaAddress"
    }
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <Router>
                <Routes>
                  {/* Main payment page */}
                  <Route path="/" element={
                    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
                      <div className="max-w-6xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-8">
                          <h1 className="text-4xl font-bold text-gray-800 mb-2">
                            WrapPay
                          </h1>
                          <p className="text-gray-600">Secure crypto payments</p>
                        </div>

                        {/* Payment Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <PaymentSummary 
                            amount={paymentData.amount}
                            currency={paymentData.currency}
                            merchantName={paymentData.merchantName}
                          />
                          <Wallets 
                            currency={paymentData.currency}
                            amount={paymentData.amount}
                            merchantWallet={paymentData.merchantWallets[paymentData.currency]}
                          />
                        </div>
                      </div>
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
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
