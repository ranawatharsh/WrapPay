import React from 'react'
import { useState } from 'react';
import EthWalletConnect from './EthWalletConnect';
function Wallets() {
    const [selectedWallet, setSelectedWallet] = useState("");
    const wallets = [{id:"MetaMaskSDK",name:"MetaMask"}, 
        {id:"com.coinbase.wallet" ,name:"Coinbase Wallet"},
         {id:"com.trustwallet.app",name:"Trust Wallet"},
        {id:"injected", name:"Browser Wallet"}];
  return (
    <div>
      <div>
      <h2>Select a Wallet</h2>
      {wallets.map((wallet, index) => (
        <div key={index}>
          <input
            type="radio"
            id={wallet.id}
            
            value={wallet.name}
            checked={selectedWallet === wallet.id}
            onChange={() => setSelectedWallet(wallet.id)}
          />
          <label htmlFor={wallet.id}>{wallet.name}</label>
        </div>
      ))}

      {/* <button onClick={() => alert(`Connecting to ${selectedWallet || "..."}`)}>
        Connect & Pay
      </button> */}
              <EthWalletConnect
                  selectedWallet={selectedWallet}
                //   amount={amount}
                //   recipientAddress={recipientAddress}
              />
    </div>
    </div>
  )
}

export default Wallets
