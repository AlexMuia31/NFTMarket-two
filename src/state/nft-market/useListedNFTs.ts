import { gql, useQuery } from "@apollo/client";
import { ethers } from "ethers";

import useSigner from "../signer";
import { NFT_MARKET_ADDRESS } from "./config";
import { NFT } from "./interfaces";
import {
  GetListedNFTs,
  GetListedNFTsVariables,
} from "./__generated__/GetListedNFTs";
import {
  GetOwnedListedNFTs,
  GetOwnedListedNFTsVariables,
} from "./__generated__/GetOwnedListedNFTs";
import { parseRawNFT } from "./__generated__/helpers";

const useListedNFTs = () => {
  const { address } = useSigner();

  const { data } = useQuery<GetListedNFTs, GetListedNFTsVariables>(
    GET_LISTED_NFTS,
    { variables: { currentAddress: address ?? "" }, skip: !address }
  );
  const listedNFTs = data?.nfts.map(parseRawNFT);

  return { listedNFTs };
};

const GET_LISTED_NFTS = gql`
  query GetListedNFTs($currentAddress: String!) {
    nfts(
      where: {
        to: "${NFT_MARKET_ADDRESS}"
        from_not: $currentAddress 
      }
    ) {
      id
      from
      to
      tokenURI
      price
    }
  }
`;

export default useListedNFTs;
