import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <div className={"frame-container"}>
      <Component {...pageProps} />
    </div>
  );
}
