import React, { useRef, useState } from "react";
import { Box, Button, Container, Toolbar } from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import { CssTextField } from "./Components/TextFields";
import Layout from "./Components/Layout";

import type { ReactElement } from "react";
import useSigner from "./state/nft-market/signer";
import Loader from "./Components/loader";

const Create = () => {
  const { signer } = useSigner();
  const uploadInputRef = useRef(null);
  const [inputs, setInputs] = useState({
    file: "",
    name: "",
    description: "",
    price: "",
  });

  const createNFT = async (inputs: any) => {
    try {
      const data = new FormData();
      data.append("name", inputs.name);
      data.append("description", inputs.description);
      data.append("file", inputs.file);
      const response = await fetch("/api/nft-storage", {
        method: "POST",
        body: data,
      });
      if (response.status == 201) {
        const json = await response.json();
        console.log("tokenURI", json.uri);
      }
    } catch (error) {
      console.log(error);
    }
    return createNFT;
  };

  const handleChange = async (e: { target: { name: any; value: any } }) => {
    try {
      const data = new FormData();
      data.append("name", inputs.name);
      data.append("description", inputs.description);
      data.append("file", inputs.file);
      const response = await fetch("/api/nft-storage", {
        method: "POST",
        body: data,
      });
      if (response.status == 201) {
        const json = await response.json();
        console.log("tokenURI", json.uri);
        setInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(inputs);
  };
  return (
    <Box sx={{ backgroundColor: "#b4b7bf" }}>
      <Toolbar />
      <Toolbar />
      {signer ? (
        <Container sx={{ minHeight: "100vh" }}>
          <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Button
              component="label"
              startIcon={<UploadFileIcon />}
              sx={{ color: "black", bgcolor: "#0fe9ef" }}
            >
              <input
                type="file"
                name="file"
                value={inputs.file}
                onChange={handleChange}
              />
            </Button>
            <CssTextField
              name="name"
              value={inputs.name}
              onChange={handleChange}
              type="text"
              label="Name"
              sx={{ width: "80%", mt: "2%" }}
              required
            />
            <CssTextField
              name="description"
              type="text"
              value={inputs.description}
              onChange={handleChange}
              multiline
              rows={4}
              sx={{ width: "80%", mt: "4%" }}
              placeholder="Add a Description"
              required
            />
            <CssTextField
              name="price"
              value={inputs.price}
              onChange={handleChange}
              label="Price in ETH"
              type="number"
              required
              sx={{ width: "80%", mt: "4%" }}
            />
            <Button
              type="submit"
              sx={{
                backgroundColor: "#000002",
                color: "white",
                width: "80%",
                mt: "4%",
                "&:hover,&:focus": {
                  background: "#000002",
                },
              }}
            >
              Create & List NFT !
            </Button>
          </Box>
        </Container>
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default Create;

Create.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
