import axios from 'axios';

// Get current token prices
export const getTokenPrices = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'ethereum,solana',
        vs_currencies: 'usd'
      }
    });
    
    return {
      ETH: response.data.ethereum.usd,
      SOL: response.data.solana.usd
    };
  } catch (error) {
    console.error('Failed to fetch prices:', error);
    return null;
  }
};

// Calculate swap amount
export const calculateSwapAmount = (fromAmount, fromToken, toToken, prices) => {
  if (!prices) return null;
  
  const fromValueUSD = fromAmount * prices[fromToken];
  const toAmount = fromValueUSD / prices[toToken];
  
  return {
    fromAmount,
    fromToken,
    toAmount: toAmount.toFixed(6),
    toToken,
    rate: (prices[fromToken] / prices[toToken]).toFixed(4),
    usdValue: fromValueUSD.toFixed(2)
  };
};

// Get Jupiter quote for Solana swaps
export const getJupiterQuote = async (inputMint, outputMint, amount) => {
  try {
    const response = await axios.get('https://quote-api.jup.ag/v6/quote', {
      params: {
        inputMint,
        outputMint,
        amount,
        slippageBps: 50 // 0.5% slippage
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Jupiter quote failed:', error);
    return null;
  }
};