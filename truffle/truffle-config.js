/**
 * More information about configuration can be found at:
 * trufflesuite.com/docs/advanced/configuration
 */
require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    rinkeby: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: process.env.MNEMONIC,
          addressIndex: 0,
          chainSettings: {
            chainId: 4,
          },
          providerOrUrl: process.env.RINKEBY_URL,
        }),
      network_id: 4,
    },
  },
  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: false,
          runs: 200,
        },
        // evmVersion: "byzantium",
      },
    },
  },
};
