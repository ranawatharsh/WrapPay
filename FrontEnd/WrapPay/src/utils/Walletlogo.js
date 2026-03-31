// walletData.js
export const walletLogos = {
  metamask: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
  coinbase: "https://brandlogo.org/wp-content/uploads/2024/04/Coinbase-Wallet-Logo-300x300.png",
  walletconnect: "https://images.prismic.io/wallet-connect/65779a69531ac2845a25ec6c_WalletConnect-App-Logo-1024X1024.png?auto=format%2Ccompress&fit=max&w=2048",
  phantom: "https://play-lh.googleusercontent.com/305M_FPkDCWQFc_5ABf3XG9zgZ1ESzRIQf-hfKf0SAY3VRh1Rqa6TNkhBEWtOD8ggHk",
  solflare: "https://www.solflare.com/wp-content/uploads/2024/11/App-Icon.svg",
  backpack: "https://play-lh.googleusercontent.com/EhgMPJGUYrA7-8PNfOdZgVGzxrOw4toX8tQXv-YzIvN6sAMYFunQ55MVo2SS_hLiNm8"
};


export const allWallets = [
  { id: "metamask", name: "MetaMask", chain: "ETH", color: "blue" },
  { id: "coinbase", name: "Coinbase Wallet", chain: "ETH", color: "blue" },
  { id: "walletconnect", name: "WalletConnect", chain: "ETH", color: "blue" },
  { id: "phantom", name: "Phantom", chain: "SOL", color: "purple" },
  { id: "solflare", name: "Solflare", chain: "SOL", color: "purple" },
  { id: "backpack", name: "Backpack", chain: "SOL", color: "purple" }
];