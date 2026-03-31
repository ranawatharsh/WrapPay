import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { executeJupiterSwap } from '../services/executeSwap';

function SwapAndPay({ 
  wallet,
  swapDetails,
  merchantWallet,
  sessionId,
  returnUrl 
}) {
  const navigate = useNavigate();
  const [status, setStatus] = useState('ready'); // ready, swapping, paying, complete
  const [error, setError] = useState('');

  const handleSwapAndPay = async () => {
    try {
      setStatus('swapping');
      
      // Step 1: Execute swap
      // (Jupiter for SOL->ETH would actually need a bridge - complex!)
      // For demo, we'll simulate
      
      const swapTx = await executeSwap();
      
      setStatus('paying');
      
      // Step 2: Send swapped tokens to merchant
      const paymentTx = await sendToMerchant();
      
      setStatus('complete');
      
      // Step 3: Complete session
      await completeSession(paymentTx);
      
      // Redirect
      window.location.href = returnUrl + `?session=${sessionId}&status=success&tx=${paymentTx}`;
      
    } catch (err) {
      setError(err.message);
      setStatus('ready');
    }
  };

  if (status === 'swapping' || status === 'paying') {
    return (
      <Loader 
        message={status === 'swapping' ? 'Swapping tokens...' : 'Sending payment...'} 
      />
    );
  }

  return (
    <div>
      <button
        onClick={handleSwapAndPay}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition"
      >
        Execute Swap & Pay
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}

export default SwapAndPay;
