var DecentralizedShipment = artifacts.require("DecentralizedShipment.sol");

module.exports = function(deployer) {
  deployer.deploy(DecentralizedShipment);
};
