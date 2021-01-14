import { RPC } from "@maskodid/postmessage-rpc";

const STYLE_HIDDEN =
  "position:fixed; width:0; height:0; border:0; border:none !important";
const STYLE_SHOWN =
  "border:none border:0; z-index: 500; position: fixed; max-width: 100%;top: 10px; right: 10px";

export class FrameWrap {
  constructor(private readonly element: HTMLIFrameElement, readonly rpc: RPC) {
    rpc.expose("show", () => {
      this.show();
    });
    rpc.expose("hide", () => {
      this.hide();
    });
  }

  static create(endpoint: string) {
    const element = document.createElement("iframe");
    element.src = endpoint;
    element.style.cssText = STYLE_HIDDEN;
    // @ts-ignore
    element.allowTransparency = true;
    // @ts-ignore
    element.frameBorder = 0;
    element.sandbox.add("allow-scripts");
    element.sandbox.add("allow-same-origin");
    document.body.appendChild(element);

    if (element.contentWindow) {
      const rpc = new RPC({
        // The window you want to talk to:
        target: element.contentWindow,
        // This should be unique for each of your producer<->consumer pairs:
        serviceId: "maskodid",
        origin: endpoint,
        onLoad: new Promise((resolve) => {
          element.onload = () => {
            resolve();
          };
        }),
      });
      return new FrameWrap(element, rpc);
    } else {
      throw new Error(`Frame contentWindow is not available`);
    }
  }

  async waitReady() {
    await this.rpc.isReady;
  }

  show() {
    this.element.style.cssText = STYLE_SHOWN;
  }

  hide() {
    this.element.style.cssText = STYLE_HIDDEN;
  }
}
