import { useContext, useEffect } from "react";
import { BackboneContext } from "../../backbone/backbone";
import * as uint8arrays from "uint8arrays";
import { useInside } from "../inside-provider";

export function SeedMetamaskScreen(props: { done?: (error?: Error) => void }) {
  const backbone = useContext(BackboneContext);
  const inside = useInside();

  useEffect(() => {
    const run = async () => {
      if (typeof window !== "undefined" && "ethereum" in window) {
        const w = window as any;
        const addresses = await w.ethereum.enable();
        const message = `Generate entropy for ${window.location.origin}`;
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
        inside.goHome();
        if (props.done) props.done();
      })
      .catch((error) => {
        console.log(error);
        inside.goHome();
        if (props.done) props.done(error);
      });
  });

  return <div className={"m-2"}>Authenticating via MetaMask...</div>;
}
