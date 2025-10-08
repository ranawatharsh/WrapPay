import React from 'react'
import { useState } from 'react';
import EthWalletConnect from './EthWalletConnect';
function Wallets() {
    const [selectedWallet, setSelectedWallet] = useState("");
    const wallets = [{id:"MetaMask",name:"MetaMask"}, 
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
                   amount="0.01"
                recipientAddress="0x10273E2BD2A9D3d8239e619B5503D2FB9019fF0c"
              />
    </div>
    </div>
  )
}

export default Wallets
