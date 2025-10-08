import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PaymentFailure() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { error } = location.state || { error: 'Payment failed' };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Payment Failed
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Your transaction could not be completed
        </p>

        {/* Error Details */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800 text-sm">
            <span className="font-semibold">Error: </span>
            {error}
          </p>
        </div>

        {/* Common Reasons */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">Common Reasons:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• User rejected the transaction</li>
            <li>• Insufficient balance for gas fees</li>
            <li>• Network congestion</li>
            <li>• Merchant not registered</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/')}
            className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Try Again
          </button>
          
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

export default PaymentFailure;