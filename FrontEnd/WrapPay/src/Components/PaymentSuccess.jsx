import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { transactionHash, amount, merchant, chain = 'ETH' } = location.state || {};

  if (!transactionHash) {
    navigate('/');
    return null;
  }

  const getExplorerUrl = () => {
    if (chain === 'SOL') {
      return `https://explorer.solana.com/tx/${transactionHash}?cluster=devnet`;
    } else {
      return `https://sepolia.etherscan.io/tx/${transactionHash}`;
    }
  };

  const getExplorerName = () => {
    return chain === 'SOL' ? 'Solana Explorer' : 'Etherscan';
  };

  const getCurrency = () => {
    return chain === 'SOL' ? 'SOL' : 'ETH';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full border border-gray-200">
        
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
          Payment Successful
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Your transaction has been confirmed on the blockchain
        </p>

        {/* Chain Badge */}
        <div className="flex justify-center mb-6">
          <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${
            chain === 'SOL' 
              ? 'bg-purple-100 text-purple-700' 
              : 'bg-blue-100 text-blue-700'
          }`}>
            {chain === 'SOL' ? '◎ Solana Network' : '⟠ Ethereum Network'}
          </span>
        </div>

        {/* Transaction Details */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6 space-y-4 border border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Amount Paid</span>
            <span className="font-bold text-gray-900 text-lg">
              {amount} {getCurrency()}
            </span>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-600 font-medium mb-2">Transaction ID</p>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <p className="font-mono text-xs text-gray-800 break-all">
                {transactionHash}
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-600 font-medium mb-2">Merchant Address</p>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <p className="font-mono text-xs text-gray-800">
                {merchant}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <a
            href={getExplorerUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 w-full text-white py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg ${
              chain === 'SOL'
                ? 'bg-purple-600 hover:bg-purple-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
            View on {getExplorerName()}
          </a>
          
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition border border-gray-300"
          >
            Make Another Payment
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            Keep this transaction ID for your records
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;