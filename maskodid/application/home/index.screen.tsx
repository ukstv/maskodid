import React, { useContext, useEffect, useState } from "react";
import { BackboneContext } from "../../backbone/backbone";
import { useInside } from "../inside-provider";
import { SeedIndexScreen } from "../seed/index.screen";

export function HomeIndexScreen() {
  const backbone = useContext(BackboneContext);
  const inside = useInside();
  const [did, setDid] = useState("");

  useEffect(() => {
    if (backbone.hasSeed) {
      backbone
        .did()
        .then((did) => {
          setDid(did);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      inside.goNext(<SeedIndexScreen />);
    }
  });

  const handleClear = () => {
    backbone.clearSeed();
    setDid("");
    inside.goHome();
  };

  if (!did) {
    return <></>;
  } else {
    const fingerprint = did.replace(/did:key:/, "");
    return (
      <>
        <div className={"frame-container-heading"}>Welcome</div>
        <div
          className={"flex-auto flex-col flex content-center justify-center"}
        >
          <div
            className={"text-center font-mono"}
            style={{ fontSize: "smaller" }}
          >
            <span className={"badge"}>ed25519</span> did:key
          </div>
          <div
            style={{ fontSize: "3.2vw" }}
            className={"text-center font-mono mt-1 mb-1"}
          >
            {fingerprint}
          </div>
          <div className={"text-center mt-2"}>
            <button className={"btn"} onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>
      </>
    );
  }
}
