
import './App.css'
import CheckOut from './Components/CheckOut'
import Wallets from './Components/Wallets'
import { config } from '../wagmiConfig'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
function App() {
  const queryClient = new QueryClient()

  return (
   <WagmiProvider config={config}>
  <QueryClientProvider client={queryClient}>
    <div className="min-h-screen bg-gray-100 p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <CheckOut />
      <Wallets />
    </div>
  </QueryClientProvider>
</WagmiProvider>
  )
}

export default App
