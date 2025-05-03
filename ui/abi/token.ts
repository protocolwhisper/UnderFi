export const tokenAbi = [{
  "name": "RoleMinterChanged",
  "inputs": [{
    "name": "minter",
    "type": "address",
    "indexed": true
  }, {
    "name": "status",
    "type": "bool",
    "indexed": false
  }],
  "anonymous": false,
  "type": "event"
}, {
  "name": "OwnershipTransferred",
  "inputs": [{
    "name": "previous_owner",
    "type": "address",
    "indexed": true
  }, {
    "name": "new_owner",
    "type": "address",
    "indexed": true
  }],
  "anonymous": false,
  "type": "event"
}, {
  "name": "Transfer",
  "inputs": [{
    "name": "sender",
    "type": "address",
    "indexed": true
  }, {
    "name": "receiver",
    "type": "address",
    "indexed": true
  }, {
    "name": "value",
    "type": "uint256",
    "indexed": false
  }],
  "anonymous": false,
  "type": "event"
}, {
  "name": "Approval",
  "inputs": [{
    "name": "owner",
    "type": "address",
    "indexed": true
  }, {
    "name": "spender",
    "type": "address",
    "indexed": true
  }, {
    "name": "value",
    "type": "uint256",
    "indexed": false
  }],
  "anonymous": false,
  "type": "event"
}, {
  "stateMutability": "view",
  "type": "function",
  "name": "owner",
  "inputs": [],
  "outputs": [{
    "name": "",
    "type": "address"
  }]
}, {
  "stateMutability": "view",
  "type": "function",
  "name": "eip712Domain",
  "inputs": [],
  "outputs": [{
    "name": "",
    "type": "bytes1"
  }, {
    "name": "",
    "type": "string"
  }, {
    "name": "",
    "type": "string"
  }, {
    "name": "",
    "type": "uint256"
  }, {
    "name": "",
    "type": "address"
  }, {
    "name": "",
    "type": "bytes32"
  }, {
    "name": "",
    "type": "uint256[]"
  }]
}, {
  "stateMutability": "nonpayable",
  "type": "function",
  "name": "transfer",
  "inputs": [{
    "name": "to",
    "type": "address"
  }, {
    "name": "amount",
    "type": "uint256"
  }],
  "outputs": [{
    "name": "",
    "type": "bool"
  }]
}, {
  "stateMutability": "nonpayable",
  "type": "function",
  "name": "approve",
  "inputs": [{
    "name": "spender",
    "type": "address"
  }, {
    "name": "amount",
    "type": "uint256"
  }],
  "outputs": [{
    "name": "",
    "type": "bool"
  }]
}, {
  "stateMutability": "nonpayable",
  "type": "function",
  "name": "transferFrom",
  "inputs": [{
    "name": "owner",
    "type": "address"
  }, {
    "name": "to",
    "type": "address"
  }, {
    "name": "amount",
    "type": "uint256"
  }],
  "outputs": [{
    "name": "",
    "type": "bool"
  }]
}, {
  "stateMutability": "nonpayable",
  "type": "function",
  "name": "burn",
  "inputs": [{
    "name": "amount",
    "type": "uint256"
  }],
  "outputs": []
}, {
  "stateMutability": "nonpayable",
  "type": "function",
  "name": "burn_from",
  "inputs": [{
    "name": "owner",
    "type": "address"
  }, {
    "name": "amount",
    "type": "uint256"
  }],
  "outputs": []
}, {
  "stateMutability": "nonpayable",
  "type": "function",
  "name": "mint",
  "inputs": [{
    "name": "owner",
    "type": "address"
  }, {
    "name": "amount",
    "type": "uint256"
  }],
  "outputs": []
}, {
  "stateMutability": "nonpayable",
  "type": "function",
  "name": "set_minter",
  "inputs": [{
    "name": "minter",
    "type": "address"
  }, {
    "name": "status",
    "type": "bool"
  }],
  "outputs": []
}, {
  "stateMutability": "nonpayable",
  "type": "function",
  "name": "permit",
  "inputs": [{
    "name": "owner",
    "type": "address"
  }, {
    "name": "spender",
    "type": "address"
  }, {
    "name": "amount",
    "type": "uint256"
  }, {
    "name": "deadline",
    "type": "uint256"
  }, {
    "name": "v",
    "type": "uint8"
  }, {
    "name": "r",
    "type": "bytes32"
  }, {
    "name": "s",
    "type": "bytes32"
  }],
  "outputs": []
}, {
  "stateMutability": "view",
  "type": "function",
  "name": "DOMAIN_SEPARATOR",
  "inputs": [],
  "outputs": [{
    "name": "",
    "type": "bytes32"
  }]
}, {
  "stateMutability": "nonpayable",
  "type": "function",
  "name": "transfer_ownership",
  "inputs": [{
    "name": "new_owner",
    "type": "address"
  }],
  "outputs": []
}, {
  "stateMutability": "nonpayable",
  "type": "function",
  "name": "renounce_ownership",
  "inputs": [],
  "outputs": []
}, {
  "stateMutability": "view",
  "type": "function",
  "name": "name",
  "inputs": [],
  "outputs": [{
    "name": "",
    "type": "string"
  }]
}, {
  "stateMutability": "view",
  "type": "function",
  "name": "symbol",
  "inputs": [],
  "outputs": [{
    "name": "",
    "type": "string"
  }]
}, {
  "stateMutability": "view",
  "type": "function",
  "name": "decimals",
  "inputs": [],
  "outputs": [{
    "name": "",
    "type": "uint8"
  }]
}, {
  "stateMutability": "view",
  "type": "function",
  "name": "balanceOf",
  "inputs": [{
    "name": "arg0",
    "type": "address"
  }],
  "outputs": [{
    "name": "",
    "type": "uint256"
  }]
}, {
  "stateMutability": "view",
  "type": "function",
  "name": "allowance",
  "inputs": [{
    "name": "arg0",
    "type": "address"
  }, {
    "name": "arg1",
    "type": "address"
  }],
  "outputs": [{
    "name": "",
    "type": "uint256"
  }]
}, {
  "stateMutability": "view",
  "type": "function",
  "name": "totalSupply",
  "inputs": [],
  "outputs": [{
    "name": "",
    "type": "uint256"
  }]
}, {
  "stateMutability": "view",
  "type": "function",
  "name": "is_minter",
  "inputs": [{
    "name": "arg0",
    "type": "address"
  }],
  "outputs": [{
    "name": "",
    "type": "bool"
  }]
}, {
  "stateMutability": "view",
  "type": "function",
  "name": "nonces",
  "inputs": [{
    "name": "arg0",
    "type": "address"
  }],
  "outputs": [{
    "name": "",
    "type": "uint256"
  }]
}, {
  "stateMutability": "payable",
  "type": "constructor",
  "inputs": [{
    "name": "name_",
    "type": "string"
  }, {
    "name": "symbol_",
    "type": "string"
  }, {
    "name": "decimals_",
    "type": "uint8"
  }, {
    "name": "name_eip712_",
    "type": "string"
  }, {
    "name": "version_eip712_",
    "type": "string"
  }],
  "outputs": []
}]