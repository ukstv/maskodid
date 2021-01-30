import {
  RPCConnection,
  RPCRequest,
  RPCResponse,
  createHandler,
} from "rpc-utils";

type ICall = (method: string, params: object) => Promise<any>;

export class DidProvider implements RPCConnection {
  readonly isDidProvider = true;
  #handler: (msg: RPCRequest) => Promise<RPCResponse | null>;

  constructor(call: ICall) {
    const h = createHandler({
      did_authenticate: (context, params) => {
        return call("did_authenticate", params);
      },
      did_createJWS: (context, params) => {
        return call("did_createJWS", params);
      },
      did_decryptJWE: async (context, params) => {
        return call("did_decryptJWE", params);
      },
    });
    this.#handler = (msg) => {
      return h({}, msg);
    };
  }

  async send(request: RPCRequest): Promise<RPCResponse | null> {
    return this.#handler(request);
  }
}
