import React, { useState, useEffect } from 'react';
import { getTokenPrices, calculateSwapAmount } from '../services/swapService';

function SwapPreview({ 
  userWalletChain,      // "SOL"
  requiredCurrency,     // "ETH"
  requiredAmount,       // "0.02"
  userBalance,          // User's SOL balance
  onConfirm,
  onCancel 
}) {
  const [prices, setPrices] = useState(null);
  const [swapDetails, setSwapDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSwapDetails();
  }, []);

  const loadSwapDetails = async () => {
    setLoading(true);
    
    // Get current prices
    const currentPrices = await getTokenPrices();
    setPrices(currentPrices);
    
    if (currentPrices) {
      // Calculate how much user needs to swap
      const details = calculateSwapAmount(
        parseFloat(requiredAmount),
        requiredCurrency,
        userWalletChain,
        currentPrices
      );
      
      // Reverse calculation - how much user needs to pay
      const userNeedsToSwap = {
        fromAmount: details.toAmount, // Amount in SOL
        fromToken: userWalletChain,
        toAmount: requiredAmount,
        toToken: requiredCurrency,
        rate: details.rate,
        usdValue: details.usdValue
      };
      
      setSwapDetails(userNeedsToSwap);
    }
    
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-xl border-2 border-purple-200">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!swapDetails) {
    return (
      <div className="p-6 bg-red-50 border-2 border-red-200 rounded-xl">
        <p className="text-red-800">Failed to load swap details. Please try again.</p>
      </div>
    );
  }

  const hasEnoughBalance = parseFloat(userBalance) >= parseFloat(swapDetails.fromAmount);

  return (
    <div className="bg-white rounded-xl border-2 border-purple-300 p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xl">🔄</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">Swap Required</h3>
          <p className="text-sm text-gray-600">We'll swap your tokens automatically</p>
        </div>
      </div>

      {/* Swap Details */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 mb-4">
        {/* From */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-gray-600 mb-1">You pay</p>
            <p className="text-2xl font-bold text-gray-900">
              {swapDetails.fromAmount} {swapDetails.fromToken}
            </p>
          </div>
          <div className={`px-3 py-1 rounded-lg ${
            swapDetails.fromToken === 'SOL' 
              ? 'bg-purple-100 text-purple-700'
              : 'bg-blue-100 text-blue-700'
          }`}>
            {swapDetails.fromToken}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center my-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
            <span className="text-gray-600">↓</span>
          </div>
        </div>

        {/* To */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-600 mb-1">Merchant receives</p>
            <p className="text-2xl font-bold text-gray-900">
              {swapDetails.toAmount} {swapDetails.toToken}
            </p>
          </div>
          <div className={`px-3 py-1 rounded-lg ${
            swapDetails.toToken === 'ETH' 
              ? 'bg-blue-100 text-blue-700'
              : 'bg-purple-100 text-purple-700'
          }`}>
            {swapDetails.toToken}
          </div>
        </div>
      </div>

      {/* Exchange Rate */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Exchange Rate:</span>
          <span className="font-medium">
            1 {swapDetails.fromToken} ≈ {swapDetails.rate} {swapDetails.toToken}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">USD Value:</span>
          <span className="font-medium">${swapDetails.usdValue}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Slippage Tolerance:</span>
          <span className="font-medium">0.5%</span>
        </div>
      </div>

      {/* Balance Check */}
      {!hasEnoughBalance && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-red-800 text-sm">
            ⚠️ Insufficient balance. You need {swapDetails.fromAmount} {swapDetails.fromToken} 
            but only have {userBalance} {swapDetails.fromToken}
          </p>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <p className="text-xs text-blue-800">
          <span className="font-semibold">How it works:</span> We'll swap your {swapDetails.fromToken} to {swapDetails.toToken} 
          using decentralized exchanges (DEX), then send it to the merchant. This happens in one transaction.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          onClick={() => onConfirm(swapDetails)}
          disabled={!hasEnoughBalance}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed"
        >
          Confirm Swap & Pay
        </button>
      </div>
    </div>
  );
}

export default SwapPreview;