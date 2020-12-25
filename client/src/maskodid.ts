import { FrameWrap } from "./frame-wrap";

export class Maskodid {
  #frame: FrameWrap | null = null;

  constructor(readonly frameUrl: string) {}

  attachFrame(): FrameWrap {
    if (this.#frame) {
      return this.#frame;
    } else {
      this.#frame = FrameWrap.create(this.frameUrl);
      return this.#frame;
    }
  }

  async loadFrame(): Promise<FrameWrap> {
    const frame = this.attachFrame();
    await frame.waitReady();
    return frame;
  }

  async authenticate(): Promise<string> {
    const frame = await this.loadFrame();
    return frame.rpc.call<string>("authenticate", {});
  }

  show() {
    const frame = this.attachFrame();
    frame.show();
  }

  hide() {
    const frame = this.attachFrame();
    frame.hide();
  }
}
