import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey, Transaction, VersionedTransaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import Loader from './Loader';
import { getLifiQuote } from '../services/lifiService';

function SolWalletConnect({ selectedWallet, amount, recipientAddress, sessionId, swapDetails }) {
  const navigate = useNavigate();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const API_URL = import.meta.env?.VITE_API_BASE_URL || 'https://wrappay-backend.onrender.com';
  const isConnected = !!publicKey;

  const verifyPaymentAsync = async ({ sessionId, txHash, walletAddress }) => {
    try {
      await fetch(`${API_URL}/payments/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          txHash,
          chain: 'solana',
          walletAddress,
          status: 'submitted'
        }),
      });
    } catch (err) {
      console.error('Verify failed:', err);
    }
  };

  const handlePayment = async () => {
    if (!publicKey) {
      alert('Please connect wallet first');
      return;
    }

    try {
      setIsProcessing(true);
      setErrorMessage('');

      let signature;

      if (swapDetails) {
        // Execute Swap via LI.FI
        const tokenAmountBase = (parseFloat(swapDetails.fromAmount) * Math.pow(10, swapDetails.selectedToken.decimals)).toLocaleString('fullwide', {useGrouping:false});
        
        const quote = await getLifiQuote({
          fromChain: swapDetails.selectedToken.chain,
          toChain: swapDetails.toToken, // "ETH" or "SOL"
          fromToken: swapDetails.selectedToken.address,
          toToken: swapDetails.toToken === 'SOL' ? '11111111111111111111111111111111' : '0x0000000000000000000000000000000000000000',
          fromAmount: tokenAmountBase,
          fromAddress: publicKey.toString(),
          toAddress: recipientAddress
        });

        if (!quote.transactionRequest || !quote.transactionRequest.data) {
          throw new Error("Failed to generate swap transaction");
        }

        const transactionBuf = Buffer.from(quote.transactionRequest.data, 'base64');
        
        // LI.FI sometimes returns VersionedTransaction for Solana
        try {
          const transaction = VersionedTransaction.deserialize(transactionBuf);
          signature = await sendTransaction(transaction, connection);
        } catch (e) {
          const transaction = Transaction.from(transactionBuf);
          signature = await sendTransaction(transaction, connection);
        }

      } else {
        // Standard Direct Payment
        const amountInLamports = parseFloat(amount) * LAMPORTS_PER_SOL;
        
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new PublicKey(recipientAddress),
            lamports: amountInLamports,
          })
        );

        signature = await sendTransaction(transaction, connection);
      }

      await connection.confirmTransaction(signature, 'confirmed');
      verifyPaymentAsync({
        sessionId,
        txHash: signature,
        walletAddress: publicKey.toString(),
      });

      navigate('/payment-success', {
        state: {
          transactionHash: signature,
          amount: swapDetails ? swapDetails.fromAmount : amount,
          merchant: recipientAddress,
          chain: 'SOL'
        }
      });

    } catch (error) {
      console.error('Payment error:', error);
      setErrorMessage(error.message || 'Payment failed');
      navigate('/payment-failure', {
        state: { error: error.message }
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      {isProcessing && <Loader message="Processing payment..." />}

      {!isConnected && (
        <div className="flex justify-center">
          <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700" />
        </div>
      )}

      {isConnected && (
        <div className="space-y-4">
          <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
            <p className="text-sm text-purple-700 font-semibold mb-1">
              ✓ Solana Wallet Connected
            </p>
            <p className="font-mono text-sm text-gray-800">
              {publicKey.toString().slice(0, 8)}...{publicKey.toString().slice(-6)}
            </p>
          </div>

          {!swapDetails ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Payment Details:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold">{amount} SOL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Network Fee:</span>
                  <span className="text-gray-500">~0.000005 SOL</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
               <p className="text-sm text-blue-800">
                 You are swapping {swapDetails.fromAmount} {swapDetails.fromToken} for {swapDetails.toAmount} {swapDetails.toToken}
               </p>
            </div>
          )}

          <button 
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-purple-800 transition shadow-lg hover:shadow-xl disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : swapDetails ? `Swap & Pay ${swapDetails.fromAmount} ${swapDetails.fromToken}` : `Pay ${amount} SOL`}
          </button>

          <div className="flex justify-center">
            <WalletMultiButton className="!bg-gray-200 !text-gray-700 hover:!bg-gray-300" />
          </div>
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

export default SolWalletConnect;