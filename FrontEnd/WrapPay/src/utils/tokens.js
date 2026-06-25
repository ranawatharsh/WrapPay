export const SUPPORTED_TOKENS = [
  {
    id: 'ETH',
    symbol: 'ETH',
    name: 'Ethereum',
    chain: 'ETH',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
  },
  {
    id: 'SHIB',
    symbol: 'SHIB',
    name: 'Shiba Inu',
    chain: 'ETH',
    address: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/11939/small/shiba.png'
  },
  {
    id: 'XAUT',
    symbol: 'XAUT',
    name: 'Tether Gold',
    chain: 'ETH',
    address: '0x68749665FF8D2d112Fa859AA293F07A622782F38',
    decimals: 6,
    logoURI: 'https://assets.coingecko.com/coins/images/10481/small/Tether_Gold.png'
  },
  {
    id: 'USDC-ETH',
    symbol: 'USDC',
    name: 'USD Coin (ETH)',
    chain: 'ETH',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    decimals: 6,
    logoURI: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png'
  },
  {
    id: 'SOL',
    symbol: 'SOL',
    name: 'Solana',
    chain: 'SOL',
    address: '11111111111111111111111111111111',
    decimals: 9,
    logoURI: 'https://assets.coingecko.com/coins/images/4128/small/solana.png'
  },
  {
    id: 'USDC-SOL',
    symbol: 'USDC',
    name: 'USD Coin (SOL)',
    chain: 'SOL',
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    decimals: 6,
    logoURI: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png'
  }
];

// Helper to get native token address for a chain
export const getNativeToken = (chain) => {
  return SUPPORTED_TOKENS.find(t => t.chain === chain && (t.symbol === chain));
};
