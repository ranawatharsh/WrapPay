import { useEstimateGas } from 'wagmi';
import { parseEther } from 'viem';
import { CONTRACT_ADDRESS } from '../Contracts/contractConfig';
import { PAYMENT_GATEWAY_ABI } from '../Contracts/PaymentGatewayABI';

export function useGasEstimate(recipientAddress, amount, isConnected) {
  const { data: gasEstimate, isLoading, error } = useEstimateGas({
    address: CONTRACT_ADDRESS,
    abi: PAYMENT_GATEWAY_ABI,
    functionName: 'processPayment',
    args: [recipientAddress],
    value: amount ? parseEther(amount.toString()) : undefined,
    query: {
      enabled: isConnected && !!amount && !!recipientAddress, // Only estimate when ready
    }
  });

  return {
    gasEstimate,
    isLoading,
    error
  };
}