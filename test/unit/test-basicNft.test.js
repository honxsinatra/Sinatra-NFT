const { expect, assert } = require("chai");
const { developmentChains } = require("../../helper-hardhat-config");
const { network, getNamedAccounts, deployments } = require("hardhat");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("basicNFT", function () {
      let basicNFT, deployer;

      beforeEach(async function () {
        const { deploy, log } = deployments;
        const deployer = (await getNamedAccounts()).deployer;
        const args = [];
        try {
          basicNFT = await deploy("basicNFT", {
            from: deployer,
            args: args,
            log: true,
            waitConfirmations: network.config.blockconfirmations || 1,
          });
          log(`deployed, contract address: ${basicNFT.address}`);
        } catch (error) {
          assert.fail(`Deployment failed with error: ${error.message}`);
        }
      });

      describe("constructor", async function () {
        it("should assign the Sinatra NFT and SN to the NFT name and symbol respectively", async function () {
          try {
            const name = await basicNFT.name();
            const expectedName = "Sinatra NFT";
            const response2 = await basicNFT.symbol();
            assert.equal(name, expectedName, "Name does not match");
            expect(response2).to.equal("SN");
          } catch (error) {
            // Handle any errors that occurred during the test
            assert.fail(`Test failed with error: ${error.message}`);
          }
        });
      });

      describe("getTokenCounter function", async function () {
        it("should initialize s_counter to 0", async function () {
          try {
            const expectedCounter = 0;
            const s_counter = await basicNFT.getTokenCounter();
            assert.equal(expectedCounter, s_counter);
          } catch (error) {
            assert.fail(`Test failed with error: ${error.message}`);
          }
        });
      });
    });
