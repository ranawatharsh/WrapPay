import React from 'react';

function PaymentSummary({ amount, currency, merchantName = "Merchant" }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Details</h2>

      {/* Merchant Info */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600 mb-1">Paying to</p>
        <p className="text-lg font-semibold text-gray-800">{merchantName}</p>
      </div>

      {/* Amount Display - Moderate Size */}
      <div className="mb-6">
        <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
          <p className="text-sm text-gray-600 mb-2">Total Amount</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-gray-900">{amount}</p>
            <p className="text-xl font-semibold text-gray-700">{currency}</p>
          </div>
        </div>
      </div>

      {/* Info Boxes */}
      <div className="space-y-3">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-xs text-yellow-800">
            ⛽ <span className="font-semibold">Network fees apply:</span> Gas fees will be added during transaction
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-purple-900 mb-2">
            🔄 Pay with any wallet
          </p>
          <p className="text-xs text-purple-800">
            Select from multiple wallets across Ethereum & Solana networks. Don't have the required token? Swap feature coming soon!
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
            <p className="text-xs font-semibold text-green-800">
              Secure blockchain payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSummary;