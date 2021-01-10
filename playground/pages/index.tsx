import React from "react";
import Link from "next/link";

export default function IndexPage() {
  return (
    <div className={"page-container"}>
      <h1 className={"title"}>Maskodid</h1>
      <p>
        <em>Simple in-browser DID identity wallet</em>
      </p>
      <section>
        <h3>Links for the impatient</h3>
        <ul>
          <li>
            <Link href={"/playground"} passHref={true}>
              <a>Live Playground</a>
            </Link>
          </li>
          <li>
            <Link
              href={"https://github.com/ukstv/maskodid/tree/main/playground"}
              passHref={true}
            >
              <a>Example source code</a>
            </Link>
          </li>
        </ul>
      </section>
      <section>
        <h2>Why</h2>
        <p>
          When working with <a href={"https://www.w3.org/TR/did-core/"}>DID</a>{" "}
          you eventually need a thing called <em>Identity Wallet</em> to store a
          private key, make compliant signatures and decrypt messages. It
          requires installing (and oftentimes building) custom browser
          extension, phone application, or heavily relying on external cloud
          infrastructure, which turns development into a nightmare. Maskodid is
          a simple in-browser Identity Wallet perfectly suited for development
          and testing of web-based DID solutions. It eliminates external
          dependencies, making development process fast and pleasant.
        </p>
      </section>
      <section>
        <h2>How to use</h2>
        <p>
          First, add <code>maskodid</code> as depednency into your web
          application, be it React or Vue or Next.js or something else.
        </p>
        <pre>
          <code className={"language-shell hljs"}>npm add maskodid</code>
        </pre>
        <p>
          Maskodid allows an application to have three DID-related functions:
        </p>
        <ul>
          <li>get user's DID,</li>
          <li>create JSON Web Signature,</li>
          <li>decrypt JSON Web Encryption message</li>
        </ul>
        <h3>Get user's DID</h3>
        <p>
          This would ask a user for permission to share her DID with the
          application. If there is no private key, the user is asked to create
          DID first.
        </p>
        <pre>
          <code className={"language-typescript hljs"}>
            {`import {Maskodid} from 'maskodid'
const maskodid = new Maskodid();                  
// Get DID
const did = await maskodid.authenticate() // did:key:z...`}
          </code>
        </pre>
        <h3>Create JSON Web Signature</h3>
        <p>
          The result is JWS in compact form. If passed DID does not match with
          the user's DID, the call throws an error.
        </p>
        <pre>
          <code className={"language-typescript hljs"}>
            {`import {Maskodid} from 'maskodid'
const maskodid = new Maskodid();
// First, get DID
const did = await maskodid.authenticate()
// Then sign
const jws = await maskodid.sign({aud: '*', hello: 'world'}, did)
// You could also add protected headers to the resulting JWS
const jwt = await maskodid.sign({aud: '*', hello: 'world'}, did, {typ: "JWT"})`}
          </code>
        </pre>
        <p>
          Resulting JWS contains key identifier (<code>kid</code>) as DID URL
          which makes it clear which key to check the signature against.
        </p>
        <h3>Decrypt JSON Web Encryption message</h3>
        <p>
          Maskodid supports <code>ECDH-ES+XC20PKW</code> JWE algorithm with{" "}
          <code>x25519</code> key exchange schema. To encrypt a payload to a DID
          you only have to know the recipient's public key. It is decryption
          that requires knowledge of the private key. So, if one gets an
          encrypted message <code>jwe</code>, decryption happens like this:
        </p>
        <pre>
          <code className={"language-typescript hljs"}>
            {`import {Maskodid} from 'maskodid'
const maskodid = new Maskodid();
const cleartext = await maskodid.decrypt(jwe)`}
          </code>
        </pre>
      </section>
      <section>
        <h2>Example</h2>
        <p>
          There is a{" "}
          <Link href={"/playground"} passHref={true}>
            <a>live playground</a>
          </Link>{" "}
          for Maskodid. Its{" "}
          <Link
            href={"https://github.com/ukstv/maskodid/tree/main/playground"}
            passHref={true}
          >
            <a>source code</a>
          </Link>{" "}
          could serve as an example of usage as well.
        </p>
      </section>
      <section>
        <h2>How it works</h2>
        <h3>Components</h3>
        <p>Maskodid comprises of two major parts:</p>
        <ul>
          <li>
            maskodid client:
            <ul>
              <li>provides API for DID functions,</li>
            </ul>
          </li>
          <li>
            maskodid frame
            <ul>
              <li>protects private key,</li>
              <li>exposes DID-related functions.</li>
            </ul>
          </li>
        </ul>
        <img src={"/maskodid-components.svg"} alt={"Maskodid Components"} />
        <h3>Flow</h3>
        <p>
          Whenever maskodid client is commanded to <code>authenticate</code>,{" "}
          <code>sign</code>, or <code>encrypt</code>, it sends a message via{" "}
          <a
            href={
              "https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage"
            }
          >
            <code>postMessage</code>
          </a>{" "}
          to the frame. The frame checks if the user has a private key
          generated, and the requesting application is permitted. If this is all
          right, the frame processes the command, end emits a response back.
        </p>
        <h3>Key Generation</h3>
        <p>
          In essence, a private key is just a big number, that is randomly
          chosen. Maskodid allows one to generate this purely at random.
          Alternatively, a user could provide a source of randomness by other
          means, like from MetaMask wallet signature.
        </p>
        <p>
          <img src={"/metamask-or-random.png"} width={"30%"} alt={"Maskodid screenshot"} />
          This way one could ensure that the key stays the same, as long as the
          same MetaMask account is used.
        </p>
      </section>
      <section>
        <h2>Security</h2>
        <p>
          For testing and development purposes security is of minor importance,
          yet it is still worth elaborating on the topic.
        </p>
        <p>
          Most precious part is private key. It is stored in a browser's local
          storage. Thanks to{" "}
          <a
            href={
              "https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy"
            }
          >
            same-origin policy
          </a>
          , an application can not ever read it. Communication between the frame
          and application is also subject to the same-origin policy protection.
          The frame always knows what application (by its origin) tries to
          invoke a command. It checks if a user permits the application before
          processing thee command.
        </p>
      </section>
      <section>
        <h2>Feedback</h2>
        <p>
          Feel free to raise an issue on GitHub, participate in GitHub
          Discussion, or just shoot an email to sergey [at] ukstv.me
        </p>
      </section>
      <section className={"mb-10"}>
        <h2>License</h2>
        <p>
          <a href={"https://opensource.org/licenses/Apache-2.0"}>Apache-2.0</a>
        </p>
      </section>
    </div>
  );
}
