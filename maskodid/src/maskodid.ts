import { FrameWrap } from "./frame-wrap";
import * as uint8arrays from "uint8arrays";
import { DidProvider } from "./did-provider";
import KeyResolver from "key-did-resolver";
import { DID } from "dids";

const DEFAULT_FRAME_URL = "https://frame.maskodid.ukstv.me";

export class Maskodid {
  #frame: FrameWrap | null = null;
  readonly didProvider: DidProvider;
  readonly did: DID;

  constructor(readonly frameUrl: string = DEFAULT_FRAME_URL) {
    this.didProvider = new DidProvider(
      async (method: string, params: object) => {
        const frame = await this.loadFrame();
        return frame.rpc.call(method, params, true);
      }
    );
    this.did = new DID({
      provider: this.didProvider,
      resolver: KeyResolver.getResolver(),
    });
  }

  private attachFrame(): FrameWrap {
    if (this.#frame) {
      return this.#frame;
    } else {
      this.#frame = FrameWrap.create(this.frameUrl);
      return this.#frame;
    }
  }

  private async loadFrame(): Promise<FrameWrap> {
    const frame = this.attachFrame();
    await frame.waitReady();
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(frame);
      }, 300);
    });
  }

  show(): void {
    const frame = this.attachFrame();
    frame.show();
  }

  hide(): void {
    const frame = this.attachFrame();
    frame.hide();
  }

  async authenticate(): Promise<string> {
    const frame = await this.loadFrame();
    const result = await frame.rpc.call<any>("did_authenticate", {}, true);
    const payload = result.payload;
    const json = JSON.parse(
      uint8arrays.toString(uint8arrays.fromString(payload, "base64url"))
    );
    return json.did;
  }

  async sign(
    payload: object,
    did?: string,
    header?: object
  ): Promise<{ jws: string }> {
    const frame = await this.loadFrame();
    const effectiveDid = did || (await this.authenticate());
    return frame.rpc.call<{ jws: string }>("did_createJWS", {
      payload: payload,
      did: effectiveDid,
      header: header,
    });
  }

  async decrypt(jwe: object, did?: string): Promise<{ cleartext: Uint8Array }> {
    const frame = await this.loadFrame();
    const effectiveDid = did || (await this.authenticate());
    const result = await frame.rpc.call<{ cleartext: string }>(
      "did_decryptJWE",
      {
        jwe: jwe,
        did: effectiveDid,
      }
    );
    return {
      cleartext: uint8arrays.fromString(result.cleartext, "base64pad"),
    };
  }
}
