import React, { useContext, useEffect } from "react";
import * as uint8arrays from "uint8arrays";
import { BackboneContext } from "../../backbone/backbone";
import { HomeIndexScreen } from "../home/home-index.screen";

export function AuthMetamaskScreen(props: {
  setInside: (element: JSX.Element) => void;
}) {
  const backbone = useContext(BackboneContext);

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
        props.setInside(<HomeIndexScreen setInside={props.setInside} />);
      })
      .catch((error) => {
        console.log(error);
        props.setInside(<HomeIndexScreen setInside={props.setInside} />);
      });
  });

  return <div className={"m-2"}>Authenticating via MetaMask...</div>;
}
