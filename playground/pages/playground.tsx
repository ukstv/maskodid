import { Maskodid } from "maskodid";
import { FrameSection } from "../components/frame-section";
import { DidSection } from "../components/did-section";
import { SignSection } from "../components/sign-section";
import { useState } from "react";
import { EncryptionSection } from "../components/encryption-section";
import Link from "next/link";

const maskodid = new Maskodid(process.env.NEXT_PUBLIC_MASKODID_ENDPOINT);

export default function PlaygroundPage() {
  const [did, setDid] = useState("");

  return (
    <div className={"page-container"}>
      <h1>Maskodid Playground</h1>
      <p>
        Maskodid is a simple DID provider. Based on the MetaMask signature it
        generates entropy for an ed25519 key used as did:key DID.
      </p>
      <p>
        Here is a playground page used to test various exposed functions you
        could do with the DID provider.
      </p>
      <p className={"pt-2"}>
        <Link href={"/"} passHref={true}>
          <a>← Return to home page instead</a>
        </Link>
      </p>
      <FrameSection maskodid={maskodid} />
      <DidSection maskodid={maskodid} onDid={setDid} />
      <SignSection maskodid={maskodid} did={did} />
      <EncryptionSection maskodid={maskodid} did={did} />
    </div>
  );
}
