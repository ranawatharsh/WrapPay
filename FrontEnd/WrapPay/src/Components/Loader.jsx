import React from 'react';

function Loader({ message = "Processing..." }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="relative w-20 h-20 mb-4">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          
          {/* Message */}
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {message}
          </h3>
          <p className="text-gray-600 text-center">
            Please confirm the transaction in your wallet and wait...
          </p>
          
          {/* Animated dots */}
          <div className="flex gap-1 mt-4">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;