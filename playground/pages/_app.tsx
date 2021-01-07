import Head from "next/head";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Maskodid</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
