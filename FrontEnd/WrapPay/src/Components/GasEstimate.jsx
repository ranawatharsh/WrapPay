import React, { useEffect, useState } from 'react';
import { useGasPrice } from 'wagmi';
import { formatEther } from 'viem';

function GasEstimate({ gasEstimate, amount }) {
  const { data: gasPrice } = useGasPrice();
  const [gasCostInEth, setGasCostInEth] = useState('0');
  const [totalCost, setTotalCost] = useState('0');

  useEffect(() => {
    if (gasEstimate && gasPrice) {
      // Calculate gas cost = gasLimit * gasPrice
      const gasCost = gasEstimate * gasPrice;
      const gasCostEth = formatEther(gasCost);
      setGasCostInEth(gasCostEth);

      // Calculate total = payment amount + gas
      const total = parseFloat(amount || 0) + parseFloat(gasCostEth);
      setTotalCost(total.toFixed(6));
    }
  }, [gasEstimate, gasPrice, amount]);

  if (!gasEstimate || !gasPrice) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 space-y-3">
      <h3 className="font-semibold text-gray-800 flex items-center gap-2">
        <span>⛽</span>
        Gas Estimate
      </h3>

      <div className="space-y-2 text-sm">
        {/* Gas Limit */}
        <div className="flex justify-between text-gray-700">
          <span>Gas Limit:</span>
          <span className="font-mono">{gasEstimate.toString()}</span>
        </div>

        {/* Gas Price */}
        <div className="flex justify-between text-gray-700">
          <span>Gas Price:</span>
          <span className="font-mono">{formatEther(gasPrice)} ETH</span>
        </div>

        {/* Estimated Gas Cost */}
        <div className="flex justify-between text-gray-700 pt-2 border-t border-purple-200">
          <span>Est. Gas Cost:</span>
          <span className="font-semibold text-purple-700">~{parseFloat(gasCostInEth).toFixed(6)} ETH</span>
        </div>

        {/* Payment Amount */}
        <div className="flex justify-between text-gray-700">
          <span>Payment Amount:</span>
          <span className="font-semibold">{amount} ETH</span>
        </div>

        {/* Total Cost */}
        <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t-2 border-purple-300">
          <span>Total Cost:</span>
          <span className="text-purple-700">{totalCost} ETH</span>
        </div>
      </div>

      <div className="text-xs text-gray-600 mt-2 bg-white/50 rounded p-2">
        💡 <span className="font-semibold">Note:</span> Gas fees go to network validators, not the merchant
      </div>
    </div>
  );
}

export default GasEstimate;