import "../styles/globals.css";
import { HeadDefault } from "../application/head-default";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <HeadDefault />
      <div className={"frame-container"}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
