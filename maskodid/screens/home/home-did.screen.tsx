import React, { useContext } from "react";
import { BackboneContext } from "../../backbone/backbone";
import { HomeIndexScreen } from "./home-index.screen";

export function HomeDidScreen(props: {
  setInside: (element: JSX.Element) => void;
  did: string;
}) {
  const backbone = useContext(BackboneContext);

  const handleClear = () => {
    backbone.clearSeed();
    props.setInside(<HomeIndexScreen setInside={props.setInside} />);
  };

  const fingerprint = props.did.replace(/did:key:/, "");
  return (
    <>
      <div className={"frame-container-heading"}>Welcome</div>
      <div className={"flex-auto flex-col flex content-center justify-center"}>
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
