import { BigNumber, Contract } from "ethers";
import { CreationValues } from "../../modules/CreationPage/CreationForm";
import useSigner from "../signer";
import NFT_MARKET from "../../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import { TransactionResponse } from "@ethersproject/providers";
import useOwnedNFTs from "./useOwnedNFTs";

const NFT_MARKET_ADDRESS = process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS as string;

const useNFTMarket = () => {
  const { signer } = useSigner();
  const nftmarket = new Contract(NFT_MARKET_ADDRESS, NFT_MARKET.abi, signer);

  const ownedNFTs = useOwnedNFTs();
  //creating the nft and uploading it to nft.storage
  const createNFT = async (values: CreationValues) => {
    try {
      const data = new FormData();
      data.append("name", values.name);
      data.append("description", values.description);
      data.append("image", values.image!);
      const response = await fetch("/api/nft-storage", {
        method: "POST",
        body: data,
      });
      if (response.status == 201) {
        const json = await response.json();
        console.log("tokenURI: ", json.uri);
        const transaction: TransactionResponse = await nftmarket.createNFT(
          json.uri
        );
        await transaction.wait();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const listNFT = async (tokenID: string, price: BigNumber) => {
    const transaction: TransactionResponse = await nftmarket.listNFT(
      tokenID,
      price
    );
    await transaction.wait();
  };
  return { createNFT, listNFT, ...ownedNFTs };
};
export default useNFTMarket;
