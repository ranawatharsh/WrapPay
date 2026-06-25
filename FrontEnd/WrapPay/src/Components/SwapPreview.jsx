import React, { useState, useEffect } from 'react';
import { getLifiQuote } from '../services/lifiService';
import { SUPPORTED_TOKENS, getNativeToken } from '../utils/tokens';

function SwapPreview({ 
  userWalletChain,      // "SOL" or "ETH"
  requiredCurrency,     // "ETH" or "SOL"
  requiredAmount,       // e.g. "0.02"
  userBalance,          // User's balance (mocked for now)
  onConfirm,
  onCancel 
}) {
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Filter tokens by the user's connected wallet chain
    const chainTokens = SUPPORTED_TOKENS.filter(t => t.chain === userWalletChain);
    setTokens(chainTokens);
    
    // Default to the native token of that chain
    const defaultToken = getNativeToken(userWalletChain) || chainTokens[0];
    if (defaultToken) {
      setSelectedToken(defaultToken);
    }
  }, [userWalletChain]);

  useEffect(() => {
    if (selectedToken) {
      loadQuote(selectedToken);
    }
  }, [selectedToken, requiredCurrency, requiredAmount]);

  const loadQuote = async (token) => {
    try {
      setLoading(true);
      setError('');
      
      const toTokenDef = getNativeToken(requiredCurrency);
      
      // Calculate amount in correct decimals for the destination token
      // E.g., requiredAmount is "0.02" ETH
      const toAmountBase = (parseFloat(requiredAmount) * Math.pow(10, toTokenDef.decimals)).toLocaleString('fullwide', {useGrouping:false});

      // We need to reverse-calculate how much of `selectedToken` we need.
      // LI.FI quote API allows getting exact output if we supply fromToken, toToken and ask for it, 
      // but standard endpoint takes `fromAmount`. Since LI.FI /quote doesn't natively do exact-out easily without complex params, 
      // we can do a mock estimation or use LI.FI's standard quote. 
      // For simplicity in this demo, let's just do a direct quote from 1 unit to get the exchange rate, then scale it.
      
      const oneUnitBase = Math.pow(10, token.decimals).toLocaleString('fullwide', {useGrouping:false});
      const rateQuote = await getLifiQuote({
        fromChain: token.chain,
        toChain: toTokenDef.chain,
        fromToken: token.address,
        toToken: toTokenDef.address,
        fromAmount: oneUnitBase, // 1 token
        fromAddress: token.chain === 'SOL' ? '11111111111111111111111111111111' : '0x000000000000000000000000000000000000dEaD',
        toAddress: toTokenDef.chain === 'SOL' ? '11111111111111111111111111111111' : '0x000000000000000000000000000000000000dEaD'
      });

      const rate = parseFloat(rateQuote.estimate.toAmount) / Math.pow(10, toTokenDef.decimals);
      
      if (rate === 0) throw new Error("No liquidity found");

      // How many input tokens do we need?
      const requiredInputAmount = parseFloat(requiredAmount) / rate;
      // Add 2% slippage buffer
      const requiredInputWithSlippage = requiredInputAmount * 1.02;

      setQuote({
        fromAmount: requiredInputWithSlippage.toFixed(4),
        fromToken: token.symbol,
        toAmount: requiredAmount,
        toToken: requiredCurrency,
        rate: rate.toFixed(6),
        usdValue: rateQuote.estimate.gasCosts?.[0]?.amountUSD || "0.00", // approx gas
        rawLifiQuote: rateQuote
      });

    } catch (err) {
      console.error(err);
      setError('Failed to fetch swap quote from LI.FI. Try a different token.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !quote) {
    return (
      <div className="p-6 bg-white rounded-xl border-2 border-purple-200">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border-2 border-purple-300 p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xl">🔄</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">Swap & Pay</h3>
          <p className="text-sm text-gray-600">Select token to pay with</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Pay with:</label>
        <select 
          className="w-full border-2 border-gray-200 rounded-lg p-3 bg-gray-50 focus:border-purple-500 focus:ring-0"
          value={selectedToken?.id || ''}
          onChange={(e) => {
            const tk = tokens.find(t => t.id === e.target.value);
            setSelectedToken(tk);
          }}
        >
          {tokens.map(t => (
            <option key={t.id} value={t.id}>{t.name} ({t.symbol})</option>
          ))}
        </select>
      </div>

      {error ? (
        <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl mb-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      ) : quote ? (
        <>
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">You pay (estimated)</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : quote.fromAmount} {quote.fromToken}
                </p>
              </div>
            </div>

            <div className="flex justify-center my-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                <span className="text-gray-600">↓</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Merchant receives exactly</p>
                <p className="text-2xl font-bold text-gray-900">
                  {quote.toAmount} {quote.toToken}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 mb-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Exchange Rate:</span>
              <span className="font-medium">
                1 {quote.fromToken} ≈ {quote.rate} {quote.toToken}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Est. Gas (USD):</span>
              <span className="font-medium">${quote.usdValue}</span>
            </div>
          </div>
        </>
      ) : null}

      <div className="flex gap-3 mt-6">
        <button
          onClick={onCancel}
          className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          onClick={() => onConfirm({ ...quote, selectedToken })}
          disabled={loading || !!error || !quote}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Estimating...' : 'Confirm Swap'}
        </button>
      </div>
    </div>
  );
}

export default SwapPreview;