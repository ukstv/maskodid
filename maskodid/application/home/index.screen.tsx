import React, { useContext, useEffect } from "react";
import { BackboneContext } from "../../backbone/backbone";
import { useCases } from "../cases.context";

export function HomeIndexScreen() {
  const backbone = useContext(BackboneContext);
  const cases = useCases();

  useEffect(() => {
    if (backbone.hasSeed) {
      cases.displayDid().catch(console.error);
    } else {
      cases.proposeCreateKey();
    }
  }, [backbone.hasSeed]);

  return <></>;
}
