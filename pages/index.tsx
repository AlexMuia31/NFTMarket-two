import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "./Components/Banner";

const Home: NextPage = () => {
  return (
    <div>
      <Banner />
    </div>
  );
};

export default Home;
