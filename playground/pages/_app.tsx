import Head from "next/head";
import "../styles/globals.css";
import { usePanelbear } from "../components/use-panelbear";

export default function MyApp({ Component, pageProps }) {
  usePanelbear("475k3q08fn7");

  return (
    <>
      <Head>
        <title>Maskodid</title>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.5.0/styles/default.min.css"
        />
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.5.0/highlight.min.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `hljs.initHighlightingOnLoad();`,
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
