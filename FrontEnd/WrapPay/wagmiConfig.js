import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected, metaMask, walletConnect, coinbaseWallet } from 'wagmi/connectors'
export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
 connectors: [
     injected(),
     metaMask()
    //  walletConnect({ projectId: 'YOUR_PROJECT_ID' }),
    //  coinbaseWallet({ appName: 'Your App Name' })
   ]
})