import { FrameWrap } from "./frame-wrap";
import * as uint8arrays from "uint8arrays";

export class Maskodid {
  #frame: FrameWrap | null = null;

  constructor(readonly frameUrl: string) {}

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

  async authenticate(): Promise<string> {
    const frame = await this.loadFrame();
    return frame.rpc.call<string>("did_authenticate", {});
  }

  show(): void {
    const frame = this.attachFrame();
    frame.show();
  }

  hide(): void {
    const frame = this.attachFrame();
    frame.hide();
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
