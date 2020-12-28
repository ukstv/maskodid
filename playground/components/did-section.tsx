import React, { useState } from "react";
import { Maskodid } from "@maskodid/client";

export function DidSection(props: {
  maskodid: Maskodid;
  onDid: (did: string) => void;
}) {
  const [did, setDid] = useState("");

  const authenticate = () => {
    props.maskodid
      .authenticate()
      .then((did) => {
        setDid(did);
        props.onDid(did);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section>
      <h2>DID</h2>
      <div>
        <button onClick={authenticate}>Authenticate</button>
      </div>
      <div className={"mt-2"}>
        <input type={"text"} value={did} disabled={!did} />
      </div>
    </section>
  );
}
