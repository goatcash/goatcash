// GOAT
var ownerAddress = "0x4d8ba761dc5307f905b3397d697ef898cddf5c2b";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    }, 
    ropsten: {
      host: "localhost",
      port: 8545,
      gas: 4700000,
      gasPrice: 2000000000,
      network_id: "3",
      from: ownerAddress
    },
    kovan: {
      host: "localhost",
      port: 8545,
      gas: 4000000,
      gasPrice: 1000000000,
      network_id: "42",
      from: ownerAddress
    },   
    mainnet: {
      host: "localhost",
      port: 8545,
      gas: 4700000,
      gasPrice: 3000000000,
      network_id: "1",
      from: ownerAddress
    },
  },  
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions : {
      currency: 'USD',
      gasPrice: 21
    }
  }
};
