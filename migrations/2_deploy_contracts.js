var GoatCash = artifacts.require("GoatCash");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(GoatCash);
};
