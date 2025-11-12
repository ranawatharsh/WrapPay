import React, { useState } from 'react';
import EthWalletConnect from './EthWalletConnect';
import SolWalletConnect from './SolWalletConnect';
import { walletLogos,allWallets } from '../utils/Walletlogo';

function Wallets({ currency, amount, merchantWallet }) {
  const [selectedWallet, setSelectedWallet] = useState('');
  const [selectedChain, setSelectedChain] = useState('');

  const handleWalletSelect = (wallet) => {
    setSelectedWallet(wallet.id);
    setSelectedChain(wallet.chain);
  };

  // Check if selected wallet matches required currency
  const isWalletMismatch = selectedChain && selectedChain !== currency;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Payment Method</h2>
      
      {/* Multi-wallet Info */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
        <p className="text-sm font-semibold text-gray-800 mb-1">
          💳 Multi-Wallet Support
        </p>
        <p className="text-xs text-gray-600">
          Choose any wallet from Ethereum or Solana networks
        </p>
      </div>

      {/* Mismatch Warning (if different chain selected) */}
      {isWalletMismatch && (
        <div className="mb-4 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
          <p className="text-sm font-semibold text-yellow-900 mb-1">
            🔄 Different network selected
          </p>
          <p className="text-xs text-yellow-800">
            Payment requires <strong>{currency}</strong>, but you selected <strong>{selectedChain}</strong> wallet. Swap feature coming soon to enable cross-chain payments!
          </p>
        </div>
      )}

      {/* ALL Wallets List */}
      <div className="space-y-3 mb-6">
        {allWallets.map((wallet) => (
          <label
            key={wallet.id}
            className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
              selectedWallet === wallet.id
                ? wallet.chain === 'ETH' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-purple-500 bg-purple-50'
                : 'border-gray-200'
            }`}
          >
            <input
              type="radio"
              name="wallet-select"
              value={wallet.id}
              checked={selectedWallet === wallet.id}
              onChange={() => handleWalletSelect(wallet)}
              className={`w-5 h-5 ${
                wallet.chain === 'ETH' ? 'text-blue-600' : 'text-purple-600'
              }`}
            />
            
            <img 
              src={walletLogos[wallet.id]} 
              alt={wallet.name} 
              className="w-10 h-10 object-contain"
            />
            
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{wallet.name}</p>
              <p className="text-xs text-gray-500">
                {wallet.chain === 'ETH' ? 'Ethereum Network' : 'Solana Network'}
              </p>
            </div>
            
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              wallet.chain === 'ETH' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-purple-100 text-purple-700'
            }`}>
              {wallet.chain}
            </span>
          </label>
        ))}
      </div>

      {/* Payment Component - Show only if chain matches OR allow anyway (for future swap) */}
      {selectedWallet && (
        <div className="border-t border-gray-200 pt-6 mt-6">
          {/* If mismatch, show coming soon message */}
          {isWalletMismatch ? (
            <div className="text-center py-8">
              <div className="mb-4 text-6xl">🔄</div>
              <p className="text-lg font-semibold text-gray-800 mb-2">
                Swap & Pay Coming Soon!
              </p>
              <p className="text-sm text-gray-600">
                You'll be able to pay with any token from any chain. We'll handle the swap automatically!
              </p>
            </div>
          ) : (
            <>
              {selectedChain === 'ETH' && (
                <EthWalletConnect
                  selectedWallet={selectedWallet}
                  amount={amount}
                  recipientAddress={merchantWallet}
                />
              )}

              {selectedChain === 'SOL' && (
                <SolWalletConnect
                  selectedWallet={selectedWallet}
                  amount={amount}
                  recipientAddress={merchantWallet}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Wallets;
