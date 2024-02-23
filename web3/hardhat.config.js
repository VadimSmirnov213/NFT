require("ethereum-waffle");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");

module.exports = {
  solidity: "0.8.17",
  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 1,
    },
  },
  gasReporter: {
    enabled: false,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
  },
};
