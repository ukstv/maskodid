import Head from "next/head";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
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
