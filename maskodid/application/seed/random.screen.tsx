import React, { useContext, useEffect } from "react";
import { BackboneContext } from "../../backbone/backbone";
import * as random from "@stablelib/random";

const HUMAN_TIMEOUT = 1000;

export function SeedRandomScreen(props: { done: (error?: Error) => void }) {
  const backbone = useContext(BackboneContext);

  useEffect(() => {
    setTimeout(() => {
      const seed = random.randomString(64);
      backbone.setSeed(seed);
      props.done();
    }, HUMAN_TIMEOUT);
  });

  return (
    <div className={"m-2"}>Creating key using random number generator...</div>
  );
}
