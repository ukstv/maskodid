import { Maskodid } from "@maskodid/client";
import { FrameSection } from "../components/frame-section";
import { DidSection } from "../components/did-section";
import { SignSection } from "../components/sign-section";
import { useState } from "react";

const maskodid = new Maskodid("http://localhost:3000");

export default function Home() {
  const [did, setDid] = useState("");

  return (
    <div className={"page-container"}>
      <h1>Maskodid</h1>
      <p>
        Maskodid is a faux DID provider. Based on MetaMask signature it
        generates enotropy for an ed25519 key used as did:key DID.
      </p>
      <p>
        Here is a playground page used to test various exposed functions you
        could do with the DID provider.
      </p>
      <FrameSection maskodid={maskodid} />
      <DidSection maskodid={maskodid} onDid={setDid} />
      <SignSection maskodid={maskodid} did={did} />
      {/*<section>*/}
      {/*  <h2>Encryption</h2>*/}
      {/*  <div>*/}
      {/*    <textarea></textarea>*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    <input type={"text"} className={"w-1/2 min-w-max"} />*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    <button>Encrypt</button>*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    <textarea></textarea>*/}
      {/*  </div>*/}
      {/*</section>*/}
    </div>
  );
}
