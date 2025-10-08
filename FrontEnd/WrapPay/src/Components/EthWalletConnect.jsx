import { useAccount, useConnect, useDisconnect } from 'wagmi';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { PAYMENT_GATEWAY_ABI } from '../Contracts/PaymentGatewayABI';
import { CONTRACT_ADDRESS } from '../Contracts/contractConfig';
import { parseEther } from 'viem';
import Loader from './Loader';

function EthWalletConnect({ selectedWallet, amount, recipientAddress }) {
  const navigate = useNavigate();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  
  const [paymentStatus, setPaymentStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const { data: hash, writeContract, error: txError, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Redirect on success
  useEffect(() => {
    if (isConfirmed && hash) {
      navigate('/payment-success', {
        state: {
          transactionHash: hash,
          amount: amount,
          merchant: recipientAddress
        }
      });
    }
  }, [isConfirmed, hash, navigate, amount, recipientAddress]);

  // Redirect on error
  useEffect(() => {
    if (txError) {
      navigate('/payment-failure', {
        state: {
          error: txError.message
        }
      });
    }
  }, [txError, navigate]);

  const handleConnect = async () => {
    try {
      const foundConnector = connectors.find(connector => 
        connector.id.toLowerCase().includes(selectedWallet.toLowerCase())
      );
      
      if (!foundConnector) {
        alert("Wallet not found or not installed");
        return;
      }
      
      await connect({ connector: foundConnector });
      
    } catch (error) {
      console.error('Connect error:', error);
      setErrorMessage(error.message || 'Connection failed');
    }
  };

  const handlePayment = () => {
    try {
      setPaymentStatus('processing');
      
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: PAYMENT_GATEWAY_ABI,
        functionName: 'processPayment',
        args: [recipientAddress],
        value: parseEther(amount.toString()),
      });

    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      setErrorMessage(error.message || 'Payment failed');
    }
  };

  return (
    <div>
      {/* Show loader during transaction */}
      {(isPending || isConfirming) && (
        <Loader message={isPending ? "Confirm in wallet..." : "Processing payment..."} />
      )}

      {/* Show Connect button if wallet not connected */}
      {!isConnected && (
        <button 
          onClick={handleConnect}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Connect Wallet
        </button>
      )}
      
      {/* Show wallet info and Pay button if connected */}
      {isConnected && !isConfirmed && (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Connected Wallet:</p>
            <p className="font-mono text-sm text-gray-800">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
          </div>
          
          <button 
            onClick={handlePayment}
            disabled={isPending || isConfirming}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isPending || isConfirming ? 'Processing...' : `Pay ${amount} ETH`}
          </button>
          
          <button 
            onClick={() => disconnect()}
            className="w-full bg-gray-200 text-gray-800 py-2 px-6 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Disconnect
          </button>
        </div>
      )}
      
      {/* Error message */}
      {errorMessage && !txError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default EthWalletConnect;