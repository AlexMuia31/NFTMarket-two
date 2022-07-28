import React from "react";
import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import Link from "next/link";
import Blockies from "react-blockies";
import useSigner from "../state/nft-market/signer";

const NavBar = () => {
  const { address, loading, connectWallet } = useSigner();
  return (
    <Box>
      <AppBar sx={{ backgroundColor: "#000002" }}>
        <Toolbar>
          <Container maxWidth="xl" sx={{ display: "flex" }}>
            <Box
              sx={{
                flex: 0.3,
                alignItems: "center",
                display: "flex",
              }}
            >
              <Link href="/" style={{ cursor: "pointer" }}>
                <img src="/logo.svg" height="100px" alt="logo" />
              </Link>
            </Box>
            <Box
              sx={{
                flex: 0.5,
                justifyContent: "space-between",
                alignItems: "center",
                display: { xs: "none", sm: "flex" },
              }}
            >
              <Link
                href="/explore"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Box sx={{ cursor: "pointer" }}>Explore</Box>
              </Link>
              <Box sx={{ cursor: "pointer" }}>Collectors</Box>
              <Box sx={{ cursor: "pointer" }}>
                {" "}
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  href="/create"
                >
                  Create
                </Link>
              </Box>
              <Box sx={{ cursor: "pointer" }}>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  href="/myPurchases"
                >
                  MyPurchases
                </Link>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                flex: 0.2,
                alignItems: "center",
              }}
            >
              {address ? (
                <Button
                  sx={{
                    border: "1px solid white",
                    color: "white",
                    borderRadius: "20px",
                    height: "50px",
                  }}
                  startIcon={
                    <Blockies seed={address.toLocaleLowerCase()} size={7} />
                  }
                >
                  {address.slice(0, 6) + "..." + address.slice(-4)}
                </Button>
              ) : (
                <Button
                  sx={{
                    border: "1px solid white",
                    color: "white",
                    borderRadius: "20px",
                    height: "50px",
                  }}
                  onClick={connectWallet}
                  disabled={loading}
                >
                  {loading ? "Busy..." : "Connect Wallet"}
                </Button>
              )}
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
