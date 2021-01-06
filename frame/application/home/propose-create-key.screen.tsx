import { useCases } from "../cases.context";
import React from "react";

export function HomeProposeCreateKeyScreen() {
  const cases = useCases();

  const handleCreate = () => {
    cases.createKeyCommand().catch(console.error);
  };

  return (
    <>
      <h1 className={"frame-container-heading"}>No key found</h1>
      <div className={"frame-container-body"}>
        <div className={"content-center justify-center flex-col flex"}>
          <button className={"btn"} onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </>
  );
}
