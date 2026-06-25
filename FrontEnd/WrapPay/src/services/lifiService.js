import axios from 'axios';

const LIFI_API_URL = 'https://li.quest/v1';

// Convert chain ID to LI.FI chain identifier. For SOL, it's 'SOL'. For Ethereum, 'ETH'.
export const resolveChainId = (chain) => {
  if (chain.toUpperCase() === 'SOL') return 'SOL';
  if (chain.toUpperCase() === 'ETH') return 'ETH';
  return chain;
};

export const getLifiQuote = async ({
  fromChain,
  toChain,
  fromToken,
  toToken,
  fromAmount,
  fromAddress,
  toAddress
}) => {
  try {
    const params = {
      fromChain: resolveChainId(fromChain),
      toChain: resolveChainId(toChain),
      fromToken,
      toToken,
      fromAmount,
      fromAddress,
    };
    if (toAddress) {
      params.toAddress = toAddress; // The merchant's address where funds should arrive
    }

    const response = await axios.get(`${LIFI_API_URL}/quote`, { params });
    return response.data;
  } catch (error) {
    console.error('LI.FI Quote Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch swap quote');
  }
};
