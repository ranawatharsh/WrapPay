import './App.css'
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
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
import { useMemo, useEffect, useState } from 'react';
import '@solana/wallet-adapter-react-ui/styles.css';

const queryClient = new QueryClient();

function PaymentPage() {
  const { sessionId } = useParams();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch(`https://wrappay-backend.onrender.com/session/${sessionId}`);

        if (!res.ok) {
          throw new Error(`Failed to fetch session: ${res.status}`);
        }

        const data = await res.json();
        console.log("SESSION DATA:", data);

        const currentCurrency = data.currency?.toUpperCase?.() || '';

        setPaymentData({
          amount: data.amount,
          currency: currentCurrency,
          merchantName: data.businessName,
          merchantWallets: {
            ETH: currentCurrency === 'ETH' ? data.walletAddress : '',
            SOL: currentCurrency === 'SOL' ? data.walletAddress : '',
          }
        });
      } catch (err) {
        console.error(err);
        setError(err.message);

        // fallback only
        setPaymentData({
          amount: "0.02",
          currency: "ETH",
          merchantName: "fallback-merchant",
          merchantWallets: {
            ETH: "0x10273E2BD2A9D3d8239e619B5503D2FB9019fF0c",
            SOL: "YourSolanaAddress"
          }
        });
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchSession();
    }
  }, [sessionId]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">WrapPay</h1>
          <p className="text-gray-600">Secure crypto payments</p>
          <p className="text-sm text-gray-500 mt-2">Session ID: {sessionId}</p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

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
  );
}

function App() {
  const network = 'devnet';
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <Router>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Navigate
                        to={`/payment/${sessionid}`}
                        replace
                      />
                    }
                  />
                  <Route path="/payment/:sessionId" element={<PaymentPage />} />
                  <Route path="/payment-success" element={<PaymentSuccess />} />
                  <Route path="/payment-failure" element={<PaymentFailure />} />
                </Routes>
              </Router>
            </QueryClientProvider>
          </WagmiProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;