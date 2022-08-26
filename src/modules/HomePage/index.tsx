import NFTCard from "../../components/NFTCard";
import useNFTMarket from "../../state/nft-market";

const HomePage = () => {
  const { listedNFTs } = useNFTMarket();
  return (
    <div className="flex w-full flex-col">
      {listedNFTs?.map((nft) => (
        <NFTCard nft={nft} className="mr-2 mb-2" key={nft.id} />
      ))}
    </div>
  );
};

export default HomePage;
