import React, { useState } from "react";
import { Maskodid } from "maskodid";

const DEFAULT_PAYLOAD = JSON.stringify({ hello: "world" });

export function SignSection(props: { maskodid: Maskodid; did: string }) {
  const [payload, setPayload] = useState(DEFAULT_PAYLOAD);
  const [signature, setSignature] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPayload(e.currentTarget.value);
  };

  const requestSignature = async () => {
    const payloadObject = JSON.parse(payload);
    const signature = await props.maskodid.sign(payloadObject, props.did);
    return signature.jws;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    requestSignature()
      .then((jws) => {
        setSignature(jws);
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
        <p>Payload to sign:</p>
        <textarea
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
      <div className={"mt-2"}>
        <p>JWS Compact form:</p>
        <textarea disabled={!props.did || !signature} value={signature} />
      </div>
    </section>
  );
}
