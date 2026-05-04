 WrapPay — Multi-Chain Crypto Payment Gateway

WrapPay is a decentralized payment gateway that enables businesses to accept cryptocurrency payments across multiple blockchain networks while receiving settlements in their preferred token (e.g., stablecoins).

Think of it as a **“Stripe for Web3”** — simplifying crypto payments into a seamless, single integration.

 ✨Key Features

* 🌐 **Multi-Chain Support**
  Accept payments on Ethereum, Solana, and other EVM-compatible chains.

* 👛 **Multi-Wallet Integration**
  Supports wallets like MetaMask, Phantom, WalletConnect, Solflare, and Coinbase Wallet.

* 🔄 **Token Flexibility**
  Customers can pay in any supported token while merchants receive a predefined token (e.g., USDC).

* ⚙️ **Smart Contract Fee Splitting**
  Automated on-chain deduction of platform fees (e.g., 0.75%).

* ⚡ **Seamless Checkout Experience**
  Unified UI for handling different chains and wallets.

* 🔐 **Decentralized & Trustless**
  Payments are executed via smart contracts — no centralized custody.

## 🧱 Architecture

WrapPay follows a modular Web3 architecture:

* **Frontend**: React + Web3 libraries (Wagmi, Solana Wallet Adapter)
* **Blockchain Layer**:

  * Ethereum / EVM smart contracts (Solidity)
  * Solana program support
* **Wallet Layer**:

  * MetaMask, Phantom, WalletConnect, etc.
* **Payment Flow**:

  1. User selects token & wallet
  2. (Optional) Token swap
  3. Smart contract handles transfer + fee split
  4. Merchant receives funds


## 🔄 Payment Flow

User → Select Token → Connect Wallet → Swap (if needed)
     → Execute Transaction → Smart Contract Splits Fee
     → Merchant Receives Payment


## 🛠️ Tech Stack

* **Frontend**: React, TypeScript
* **Web3 (EVM)**: Wagmi, Ethers.js
* **Web3 (Solana)**: @solana/web3.js, Wallet Adapter
* **Smart Contracts**: Solidity
* **Blockchain Networks**: Ethereum, Solana, Polygon (extendable)

---

📸 Screenshots
<img width="1263" height="911" alt="Screenshot 2026-05-01 154536" src="https://github.com/user-attachments/assets/f7618e2d-9906-49e9-8b5c-5a02c2da741d" />

<img width="1398" height="861" alt="Screenshot 2026-05-02 213128" src="https://github.com/user-attachments/assets/27a60e61-10bc-43ae-a141-4408ca5e7cd3" />

<img width="1920" height="1080" alt="Screenshot 2026-05-01 154801" src="https://github.com/user-attachments/assets/baaaacb8-4bc6-4249-8222-199e048e8ba8" />

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ranawatharsh/WrapPay.git
cd FrontEnd
cd wrappay
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file:

```env
VITE_RPC_URL=your_rpc_url
VITE_CONTRACT_ADDRESS=your_contract_address
```

### 4. Run the project

```bash
npm run dev
```

---

## 📦 Use Case

* E-commerce stores accepting crypto
* SaaS products enabling Web3 payments
* Global payments without banking friction
* Cross-border transactions with low fees

---

## 🔮 Future Improvements

* Cross-chain bridges for seamless swaps
* Merchant dashboard & analytics
* Subscription payments (recurring billing)
* Mobile SDK integration
* Layer 2 scaling support

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit PRs.

---

## 📜 License

MIT License

---

## 👨‍💻 Author

Built by **Harsh Ranawat**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

* Or help you turn this into a **real product with users** 🚀
