import { ethers } from "hardhat";

async function main() {
  const NFTMarket = await ethers.getContractFactory("NFTMarket");
  const nftmarket = await NFTMarket.deploy();

  await nftmarket.deployed();

  console.log("Contract deployed to:", nftmarket.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Contract deployed to: 0xE1acB28f24bf27592778E3C0b616F5fF064cFA6c
