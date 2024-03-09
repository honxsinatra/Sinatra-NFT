const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;;
  const { deployer } = await getNamedAccounts();

  log("___________________________________________________________");

  const args = [];
  const basicNFT = await deploy("basicNFT", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.blockconfirmations || 1,
  });
  log(`deployed, contract address: ${basicNFT.address}`);

  // Verification of the contract
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying...");
    await verify(basicNFT.address, args);
  }
};

module.exports.tags = ["all", "basicNFT", "main"];
