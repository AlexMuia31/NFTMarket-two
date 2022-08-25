import { gql, useQuery } from "@apollo/client";
import { ethers } from "ethers";

import useSigner from "../signer";
import { NFT_MARKET_ADDRESS } from "./config";
import { NFT } from "./interfaces";
import {
  GetOwnedListedNFTs,
  GetOwnedListedNFTsVariables,
} from "./__generated__/GetOwnedListedNFTs";
import { parseRawNFT } from "./__generated__/helpers";

const useOwnedListedNFTs = () => {
  const { address } = useSigner();

  const { data } = useQuery<GetOwnedListedNFTs, GetOwnedListedNFTsVariables>(
    GET_OWNED_LISTED_NFTS,
    { variables: { owner: address ?? "" }, skip: !address }
  );
  const ownedListedNFTs = data?.nfts.map(parseRawNFT);

  return { ownedListedNFTs };
};

const GET_OWNED_LISTED_NFTS = gql`
  query GetOwnedListedNFTs($owner: String!) {
    nfts(
      where: {
        to: "${NFT_MARKET_ADDRESS}"
        from: $owner 
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

export default useOwnedListedNFTs;
