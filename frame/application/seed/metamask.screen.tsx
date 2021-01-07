import { useContext, useEffect } from "react";
import { BackboneContext } from "../../backbone/backbone";
import * as uint8arrays from "uint8arrays";

export function SeedMetamaskScreen(props: { done: (error?: Error) => void }) {
  const backbone = useContext(BackboneContext);

  useEffect(() => {
    const run = async () => {
      if (typeof window !== "undefined" && "ethereum" in window) {
        const w = window as any;
        const addresses = await w.ethereum.enable();
        const message = `Generate entropy for Maskodid at ${window.location.origin}`;
        const bytes = uint8arrays.toString(
          uint8arrays.fromString(message),
          "base16"
        );
        const signature = await w.ethereum.request({
          method: "personal_sign",
          params: [addresses[0], `0x${bytes}`],
        });
        backbone.setSeed(signature);
      }
    };
    run()
      .then(() => {
        props.done();
      })
      .catch((error) => {
        props.done(error);
      });
  });

  return <div className={"m-2"}>Creating key using MetaMask...</div>;
}
