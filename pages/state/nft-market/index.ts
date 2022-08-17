import { CreationValues } from "../../Components/modules/CreationPage/CreationForm";

const useNFTMarket = () => {
  const createNFT = async (values: CreationValues) => {
    try {
      const data = new FormData();
      data.append("name", values.name);
      data.append("descriptions", values.description);
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
