import { Box } from "@mui/material";
import Head from "next/head";
import { ReactComponentElement } from "react";
import NavBar from "./Navbar";
import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

export default function Layout({ children, ...props }: Props) {
  return (
    <div>
      <Head>
        <title>NFT MarketPlace</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <NavBar />
      <Box>{children}</Box>
    </div>
  );
}
