export const vaultAbi = [
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "deposit",
    inputs: [
      {name: "asset", type: "address"},
      {name: "amount", type: "uint256"}
    ],
    outputs: []
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "borrow",
    inputs: [
      {name: "cdpAmount", type: "uint256"}
    ],
    outputs: []
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "repay",
    inputs: [
      {name: "cdpAmount", type: "uint256"}
    ],
    outputs: []
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "withdraw",
    inputs: [
      {name: "asset", type: "address"},
      {name: "amount", type: "uint256"}
    ],
    outputs: [
      {name: "", type: "uint256"}
    ]
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "liquidate",
    inputs: [
      {name: "user", type: "address"}
    ],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        components: [
          {name: "asset", type: "address"},
          {name: "amount", type: "uint256"}
        ]
      }
    ]
  },
  {
    stateMutability: "view",
    type: "function",
    name: "MAX_POSITIONS",
    inputs: [],
    outputs: [
      {name: "", type: "uint8"}
    ]
  },
  {
    stateMutability: "view",
    type: "function",
    name: "userCollateral",
    inputs: [
      {name: "arg0", type: "address"},
      {name: "arg1", type: "address"}
    ],
    outputs: [
      {name: "", type: "uint256"}
    ]
  },
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [
      {name: "cdp_asset", type: "address"},
      {name: "liquidate_beneficiary", type: "address"},
      {name: "asset_positions", type: "address[]"}
    ],
    outputs: []
  }
]; 