import classNames from "classnames";
import { toast } from "react-toastify";
import useNFTMarket from "../../../state/nft-market";

import useSigner from "../../../state/nft-market/signer";

import Loader from "../../loader";
import CreationForm, { CreationValues } from "./CreationForm";

const CreationPage = () => {
  const { signer } = useSigner();
  const { createNFT } = useNFTMarket();

  const onSubmit = async (values: CreationValues) => {
    try {
      await createNFT(values);
      toast.success("You'll see your new NFT here shortly. Refresh the page.");
    } catch (e) {
      toast.warn("Something wrong!");
      console.log(e);
    }
  };

  return (
    <div className={classNames("flex h-full w-full flex-col")}>
      {!signer && <Loader />}
      {signer && <CreationForm onSubmit={onSubmit} />}
    </div>
  );
};

export default CreationPage;
