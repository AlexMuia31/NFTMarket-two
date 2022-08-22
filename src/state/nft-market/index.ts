import { Contract } from "ethers";
import { CreationValues } from "../../modules/CreationPage/CreationForm";
import useSigner from "../signer";
import NFT_MARKET from "../../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const NFT_MARKET_ADDRESS = process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS as string;

const useNFTMarket = () => {
  const { signer } = useSigner();
  const nftmarket = new Contract(NFT_MARKET_ADDRESS, NFT_MARKET.abi, signer);
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
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { createNFT };
};
export default useNFTMarket;
