import { useAccount, useConnect, useDisconnect } from 'wagmi';
import React from 'react'

function EthWalletConnect({ selectedWallet }) {
const { connect, connectors } = useConnect();
const { disconnect } = useDisconnect();
const { address, isConnected } = useAccount();

function handleConnect() {
    console.log('Selected wallet:', selectedWallet);
  console.log('Available connectors:', connectors.map(c => c.id));
const foundConnector = connectors.find(connector => 
  connector.id.toLowerCase() === selectedWallet.toLowerCase()
)
  if (foundConnector) {
    connect({ connector: foundConnector });
 }
 else {
    alert("Selected wallet not found or not supported.");
 }
}
  return (
    <div>
      <button onClick={(handleConnect)}>Connect and PAy</button>
    </div>
  )
}

export default EthWalletConnect
