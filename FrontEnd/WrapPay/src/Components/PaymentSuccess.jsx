import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  
  // Get data passed from payment component
  const { transactionHash, amount, merchant } = location.state || {};


  if (!transactionHash) {
    // If accessed directly without payment
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
     

      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Payment Successful! 🎉
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Your transaction has been confirmed on the blockchain
        </p>

        {/* Transaction Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Amount Paid:</span>
            <span className="font-semibold text-gray-800">{amount} ETH</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Transaction ID:</span>
            <span className="font-mono text-sm text-gray-800">
              {transactionHash?.slice(0, 10)}...{transactionHash?.slice(-8)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Merchant:</span>
            <span className="font-mono text-sm text-gray-800">
              {merchant?.slice(0, 6)}...{merchant?.slice(-4)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
           <a
            href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
         >
            View on Etherscan
          </a>
          
          <button
            onClick={() => navigate('/')}
            className="block w-full bg-gray-200 text-gray-800 text-center py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;