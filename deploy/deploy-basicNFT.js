const { network, hre, deployments } = require("hardhat");
const { ethers } = require("ethers");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");
const { assert } = require("chai");

module.exports = async function () {
  const { log } = deployments;
  try {
    // Compiling the smart contract
    const basicNFTFactory = await ethers.getContractFactory("basicNFT");

    // Deploying the contract
    log("Deploying YourContract...");
    const basicNFT = await basicNFTFactory.deploy();

    // Waiting for the contract to be deployed
    await basicNFT.deployed();

    // Logging contract address
    log(`YourContract deployed to: ${basicNFT.address}`);

    //Verifying the smart contract
    if (
      !developmentChains.includes(network.name) &&
      process.env.ETHERSCAN_API_KEY
    ) {
      try {
        log("Verifying...");
        await verify(basicNFT.address);
      } catch (error) {
        assert.fail(`Deployment failed with error: ${error.message}`);
        process.exit(1);
      }
    }
  } catch (error) {
    assert.fail(`Deployment failed with error: ${error.message}`);
    process.exit(1);
  }
};

module.exports.tags = ["all", "basicNFT", "main"];
