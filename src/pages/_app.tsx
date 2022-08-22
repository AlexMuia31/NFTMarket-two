import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/Layout";
import { SignerProvider } from "../state/signer";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SignerProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SignerProvider>
  );
};

export default MyApp;
