import React, { useRef, useState } from "react";

import Layout from "./Components/Layout";

import type { ReactElement } from "react";
import useSigner from "./state/nft-market/signer";
import Loader from "./Components/loader";
import CreationPage from "./Components/modules/CreationPage";
import { Container } from "@mui/material";

const Create = () => {
  return;

  <CreationPage />;
};

export default Create;

Create.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
