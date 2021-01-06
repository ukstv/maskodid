import { useCases } from "../cases.context";
import React from "react";

export function HomeDidScreen(props: { did: string }) {
  const cases = useCases();

  const handleClear = () => {
    cases.clearKeyCommand().catch(console.error);
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
