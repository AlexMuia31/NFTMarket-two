import classNames from "classnames";
import useNFTMarket from "../../state/nft-market";
import useSigner from "../../state/signer";
import CreationForm, { CreationValues } from "./CreationForm";

const CreationPage = () => {
  const { signer } = useSigner();
  const { createNFT } = useNFTMarket();

  const onSubmit = async (values: CreationValues) => {
    console.log(values);
  };

  return (
    <div
      className={classNames("flex h-full w-full flex-col", {
        "items-center justify-center": !signer,
      })}
    >
      {signer ? <CreationForm onSubmit={createNFT} /> : "Connect your wallet"}
    </div>
  );
};

export default CreationPage;
