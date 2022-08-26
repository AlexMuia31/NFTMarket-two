import { BigNumber, Contract } from "ethers";
import { CreationValues } from "../../modules/CreationPage/CreationForm";
import useSigner from "../signer";
import NFT_MARKET from "../../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import { TransactionResponse } from "@ethersproject/providers";
import useOwnedNFTs from "./useOwnedNFTs";
import useOwnedListedNFTs from "./useOwnedListedNFTs";
import { NFT_MARKET_ADDRESS } from "./config";
import useListedNFTs from "./useListedNFTs";
import { NFT } from "./interfaces";
import { ethers } from "ethers";

const useNFTMarket = () => {
  const { signer } = useSigner();
  const nftmarket = new Contract(NFT_MARKET_ADDRESS, NFT_MARKET.abi, signer);

  const ownedNFTs = useOwnedNFTs();
  const ownedListedNFTs = useOwnedListedNFTs();
  const listedNFTs = useListedNFTs();
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

  const cancelListing = async (tokenID: string) => {
    const transaction: TransactionResponse = await nftmarket.cancelListing(
      tokenID
    );
    await transaction.wait();
  };

  const buyNFT = async (nft: NFT) => {
    const transaction: TransactionResponse = await nftmarket.buyNFT(nft.id, {
      value: ethers.utils.parseEther(nft.price),
    });
    await transaction.wait();
  };

  return {
    createNFT,
    listNFT,
    buyNFT,
    cancelListing,
    ...ownedNFTs,
    ...ownedListedNFTs,
    ...listedNFTs,
  };
};
export default useNFTMarket;
