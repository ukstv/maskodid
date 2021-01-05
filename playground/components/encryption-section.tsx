import React, { useState } from "react";
import { Maskodid } from "@maskodid/client";
import * as didJWT from "did-jwt";
import { Resolver } from "did-resolver";
import keyResolver from "key-did-resolver";
import * as uint8arrays from "uint8arrays";

const DEFAULT_PAYLOAD = "Hello, world!";

export function EncryptionSection(props: { maskodid: Maskodid; did: string }) {
  const disabledClassName = props.did ? "" : "disabled";
  const [payload, setPayload] = useState(DEFAULT_PAYLOAD);
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");

  const handleChangePayload = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPayload(e.currentTarget.value);
  };

  const handleEncrypt = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const resolver = new Resolver({ ...keyResolver.getResolver() });
    const encrypters = await didJWT.resolveX25519Encrypters(
      [props.did],
      resolver
    );
    const jwe = await didJWT.createJWE(
      uint8arrays.fromString(payload),
      encrypters
    );
    setEncrypted(JSON.stringify(jwe, null, 4));
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setEncrypted("");
    setDecrypted("");
    setPayload(DEFAULT_PAYLOAD);
  };

  const handleDecrypt = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const result = await props.maskodid.decrypt(JSON.parse(encrypted));
    const cleartext = uint8arrays.toString(result.cleartext);
    setDecrypted(cleartext);
  };

  return (
    <section className={disabledClassName}>
      <h2>Encryption</h2>
      <div>
        <p>Payload:</p>
        <textarea value={payload} onChange={handleChangePayload} />
      </div>
      <div className={"button-group"}>
        <button onClick={handleEncrypt}>Encrypt</button>
        <button onClick={handleClear}>Clear</button>
      </div>
      <div>
        <p>JWE:</p>
        <textarea value={encrypted} readOnly={true} />
      </div>
      <div>
        <button onClick={handleDecrypt} disabled={!encrypted}>
          Decrypt
        </button>
      </div>
      <div>
        <p>Decrypted:</p>
        <textarea value={decrypted} readOnly={true} />
      </div>
    </section>
  );
}
