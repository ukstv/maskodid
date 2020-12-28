import { FrameWrap } from "./frame-wrap";

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
    return frame;
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

  async sign(payload: object, did: string): Promise<{jws: string}> {
    const frame = await this.loadFrame();
    return frame.rpc.call<{jws: string}>("did_createJWS", {
      payload: payload,
      did: did,
    });
  }
}
