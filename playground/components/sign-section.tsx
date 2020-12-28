import React, { useState } from "react";
import { Maskodid } from "@maskodid/client";

const DEFAULT_PAYLOAD = JSON.stringify({ hello: "world" });

export function SignSection(props: { maskodid: Maskodid; did: string }) {
  const [payload, setPayload] = useState(DEFAULT_PAYLOAD);
  const [signature, setSignature] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPayload(e.currentTarget.value);
  };

  const requestSignature = async () => {
    const payloadObject = JSON.parse(payload);
    const signature = await props.maskodid.sign(payloadObject, "did:key:z6MkmzYNkgxkznJLz5MkrU36fCQp8PGeRZrTH62Wmtn3gS3i");
    setSignature(signature.jws);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    requestSignature()
      .then(() => {
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setSignature("");
    setPayload(DEFAULT_PAYLOAD);
  };

  const isPayloadJSON = () => {
    try {
      JSON.parse(payload);
      return true;
    } catch {
      return false;
    }
  };

  const renderValidMark = () => {
    if (isPayloadJSON()) {
      return <span className={"json-badge"}>JSON</span>;
    } else {
      return <span className={"json-badge invalid"}>Not JSON</span>;
    }
  };

  const disabledClassName = props.did ? "" : "disabled";

  return (
    <section className={disabledClassName}>
      <h2>Signing</h2>
      <div>
        <textarea
          // className={"z-0"}
          onChange={handleChange}
          value={payload}
          disabled={!props.did}
        />
        {renderValidMark()}
      </div>
      <div className={"button-group"}>
        <button
          onClick={handleSubmit}
          disabled={!props.did || !isPayloadJSON()}
        >
          Sign
        </button>
        <button onClick={handleClear} disabled={!props.did || !isPayloadJSON()}>
          Clear
        </button>
      </div>
      <div>
        <textarea
          className={"mt-2"}
          disabled={!props.did || !signature}
          value={signature}
        />
      </div>
    </section>
  );
}
