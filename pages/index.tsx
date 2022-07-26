import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "./Components/Banner";
import Banner2 from "./Components/Banner2";

const Home: NextPage = () => {
  return (
    <div>
      <Banner />
      <Banner2 />
    </div>
  );
};

export default Home;
