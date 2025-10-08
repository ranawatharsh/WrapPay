export const PAYMENT_GATEWAY_ABI = [
  
	
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_platformWallet",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_platformFeePercentage",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "merchant",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "MerchantRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "transactionId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "customer",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "merchant",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountPaid",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "platformFee",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "merchantReceived",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "PaymentProcessed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newFeePercentage",
				"type": "uint256"
			}
		],
		"name": "PlatformFeeUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_merchant",
				"type": "address"
			}
		],
		"name": "getMerchantPaymentIds",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_transactionId",
				"type": "uint256"
			}
		],
		"name": "getPaymentDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "transactionId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "customer",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "merchant",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amountPaid",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "platformFee",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "merchantReceived",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct PaymentGateway.Payment",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalTransactions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_merchant",
				"type": "address"
			}
		],
		"name": "isMerchantRegistered",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "merchantPayments",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "payments",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "transactionId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "customer",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "merchant",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountPaid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "platformFee",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "merchantReceived",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "platformFeePercentage",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "platformWallet",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_merchant",
				"type": "address"
			}
		],
		"name": "processPayment",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_merchant",
				"type": "address"
			}
		],
		"name": "registerMerchant",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "registeredMerchants",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_merchant",
				"type": "address"
			}
		],
		"name": "removeMerchant",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newFeePercentage",
				"type": "uint256"
			}
		],
		"name": "setPlatformFee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newPlatformWallet",
				"type": "address"
			}
		],
		"name": "setPlatformWallet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "transactionCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
    ]
