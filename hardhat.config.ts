import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
const RINKEBY = process.env.RINKEBY_URL as string;

const config: HardhatUserConfig = {
  solidity: "0.8.11",
  networks: {
    rinkeby: {
      url: RINKEBY,
      accounts: [PRIVATE_KEY],
    },
  },
};

export default config;
