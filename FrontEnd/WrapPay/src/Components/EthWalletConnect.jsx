import { useAccount, useConnect, useDisconnect, useSendTransaction, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAYMENT_GATEWAY_ABI } from '../Contracts/PaymentGatewayABI';
import { CONTRACT_ADDRESS } from '../Contracts/contractConfig';
import { parseEther } from 'viem';
import Loader from './Loader';
import GasEstimate from './GasEstimate';
import { useGasEstimate } from '../Hooks/useGasEstimate';
import { getLifiQuote, resolveChainId } from '../services/lifiService';

function EthWalletConnect({ selectedWallet, amount, recipientAddress, sessionId, swapDetails }) {
  const navigate = useNavigate();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const API_URL = import.meta.env?.VITE_API_BASE_URL || 'https://wrappay-backend.onrender.com';
  const [paymentStatus, setPaymentStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const { data: contractHash, writeContract, error: txError, isPending: contractPending } = useWriteContract();
  const { sendTransaction, data: swapHash, isPending: swapPending, error: swapError } = useSendTransaction();

  const activeHash = contractHash || swapHash;
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: activeHash,
  });

  // Get gas estimate (only for standard payment, for swap we show LI.FI estimate)
  const { gasEstimate, isLoading: gasLoading } = useGasEstimate(
    recipientAddress,
    amount,
    isConnected && !swapDetails
  );

  const verifyPaymentAsync = async ({ sessionId, txHash, walletAddress }) => {
    try {
      await fetch(`${API_URL}/payments/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          tx_hash: txHash,
        }),
      });
    } catch (err) {
      console.error('Verify failed:', err);
    }
  };

  // Redirect on success
  useEffect(() => {
    if (isConfirmed && activeHash) {
      navigate('/payment-success', {
        state: {
          transactionHash: activeHash,
          amount: swapDetails ? swapDetails.fromAmount : amount,
          merchant: recipientAddress,
          chain: 'ETH'
        }
      });
      verifyPaymentAsync({
        sessionId,
        txHash: activeHash,
        walletAddress: address,
      });
    }
  }, [isConfirmed, activeHash, navigate, amount, recipientAddress, sessionId, address, swapDetails]);

  // Redirect on error
  useEffect(() => {
    const err = txError || swapError;
    if (err) {
      navigate('/payment-failure', {
        state: {
          error: err.message
        }
      });
    }
  }, [txError, swapError, navigate]);

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

  const handlePayment = async () => {
    try {
      setPaymentStatus('processing');
      setErrorMessage('');

      if (swapDetails) {
        // Execute Swap via LI.FI
        // We need to fetch the quote again with the real fromAddress to get the transactionRequest
        const tokenAmountBase = (parseFloat(swapDetails.fromAmount) * Math.pow(10, swapDetails.selectedToken.decimals)).toLocaleString('fullwide', {useGrouping:false});
        
        const quote = await getLifiQuote({
          fromChain: swapDetails.selectedToken.chain,
          toChain: swapDetails.toToken, // "ETH" or "SOL"
          fromToken: swapDetails.selectedToken.address,
          toToken: swapDetails.toToken === 'SOL' ? '11111111111111111111111111111111' : '0x0000000000000000000000000000000000000000',
          fromAmount: tokenAmountBase,
          fromAddress: address,
          toAddress: recipientAddress
        });

        if (!quote.transactionRequest) {
          throw new Error("Failed to generate swap transaction");
        }

        sendTransaction({
          to: quote.transactionRequest.to,
          data: quote.transactionRequest.data,
          value: quote.transactionRequest.value ? BigInt(quote.transactionRequest.value) : undefined,
          gasPrice: quote.transactionRequest.gasPrice ? BigInt(quote.transactionRequest.gasPrice) : undefined,
          gasLimit: quote.transactionRequest.gasLimit ? BigInt(quote.transactionRequest.gasLimit) : undefined
        });

      } else {
        // Standard Direct Payment
        writeContract({
          address: CONTRACT_ADDRESS,
          abi: PAYMENT_GATEWAY_ABI,
          functionName: 'processPayment',
          args: [recipientAddress],
          value: parseEther(amount.toString()),
        });
      }

    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      setErrorMessage(error.message || 'Payment failed');
    }
  };

  const isPending = contractPending || swapPending;

  return (
    <div className="space-y-4">
      {(isPending || isConfirming || paymentStatus === 'processing') && !errorMessage && (
        <Loader message={isPending ? "Confirm in wallet..." : "Processing payment..."} />
      )}

      {!isConnected && (
        <button 
          onClick={handleConnect}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
        >
          Connect Wallet
        </button>
      )}
      
      {isConnected && !isConfirmed && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <p className="text-sm text-green-700 font-semibold mb-1">✓ Wallet Connected</p>
            <p className="font-mono text-sm text-gray-800">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
          </div>

          {!swapDetails && gasLoading ? (
            <div className="bg-gray-50 rounded-lg p-4 animate-pulse">
              <p className="text-sm text-gray-500">Calculating gas fees...</p>
            </div>
          ) : !swapDetails ? (
            <GasEstimate gasEstimate={gasEstimate} amount={amount} />
          ) : (
            <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
               <p className="text-sm text-purple-800">
                 You are swapping {swapDetails.fromAmount} {swapDetails.fromToken} for {swapDetails.toAmount} {swapDetails.toToken}
               </p>
            </div>
          )}
          
          <button 
            onClick={handlePayment}
            disabled={isPending || isConfirming || (gasLoading && !swapDetails)}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 transition shadow-lg hover:shadow-xl disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed"
          >
            {isPending || isConfirming ? 'Processing...' : swapDetails ? `Swap & Pay ${swapDetails.fromAmount} ${swapDetails.fromToken}` : `Pay ${amount} ETH + Gas`}
          </button>
          
          <button 
            onClick={() => disconnect()}
            className="w-full bg-gray-100 text-gray-700 py-2 px-6 rounded-lg font-semibold hover:bg-gray-200 transition border border-gray-300"
          >
            Disconnect Wallet
          </button>
        </div>
      )}
      
      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm font-medium">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default EthWalletConnect;