import React, { useState } from 'react';
import EthWalletConnect from './EthWalletConnect';
import SolWalletConnect from './SolWalletConnect';
import SwapPreview from './SwapPreview';
import { walletLogos,allWallets } from '../utils/Walletlogo';

function Wallets({ currency, amount, merchantWallet, sessionId, returnUrl }) {
  const [selectedWallet, setSelectedWallet] = useState('');
  const [selectedChain, setSelectedChain] = useState('');
  const [showSwapPreview, setShowSwapPreview] = useState(false);
  const [userBalance, setUserBalance] = useState('1.5'); // Get from wallet
  const [confirmedSwapDetails, setConfirmedSwapDetails] = useState(null);

  const handleWalletSelect = (wallet) => {
    setSelectedWallet(wallet.id);
    setSelectedChain(wallet.chain);
    
    // Check if swap is needed
    if (wallet.chain !== currency) {
      setShowSwapPreview(true);
    } else {
      setShowSwapPreview(false);
    }
  };

  const handleSwapConfirm = (swapDetails) => {
    // User confirmed swap
    console.log('Swap confirmed:', swapDetails);
    setConfirmedSwapDetails(swapDetails);
    setShowSwapPreview(false);
  };

  const handleSwapCancel = () => {
    setShowSwapPreview(false);
    setSelectedWallet('');
    setSelectedChain('');
    setConfirmedSwapDetails(null);
  };

  const isWalletMismatch = selectedChain && selectedChain !== currency;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Payment Method</h2>
      
      {/* Multi-wallet Info */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
        <p className="text-sm font-semibold text-gray-800 mb-1">
          🔄 Swap & Pay Available
        </p>
        <p className="text-xs text-gray-600">
          Don't have {currency}? Pay with any token - we'll swap it automatically!
        </p>
      </div>

      {/* Wallet List */}
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

            {/* Swap Badge */}
            {wallet.chain !== currency && (
              <span className="text-xs bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-2 py-1 rounded-full font-semibold">
                Auto Swap
              </span>
            )}
          </label>
        ))}
      </div>

      {/* Show Swap Preview or Payment Component */}
      {selectedWallet && (
        <div className="border-t border-gray-200 pt-6 mt-6">
          {showSwapPreview && isWalletMismatch ? (
            <SwapPreview
              userWalletChain={selectedChain}
              requiredCurrency={currency}
              requiredAmount={amount}
              userBalance={userBalance}
              onConfirm={handleSwapConfirm}
              onCancel={handleSwapCancel}
            />
          ) : (
            <>
              {selectedChain === 'ETH' && (
                <EthWalletConnect
                  selectedWallet={selectedWallet}
                  amount={amount}
                  recipientAddress={merchantWallet}
                  sessionId={sessionId}
                  returnUrl={returnUrl}
                  swapDetails={confirmedSwapDetails}
                />
              )}

              {selectedChain === 'SOL' && (
                <SolWalletConnect
                  selectedWallet={selectedWallet}
                  amount={amount}
                  recipientAddress={merchantWallet}
                  sessionId={sessionId}
                  returnUrl={returnUrl}
                  swapDetails={confirmedSwapDetails}
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