import React from "react";
import { RPC } from "@maskodid/postmessage-rpc";
import { CommandQueue } from "./command-queue";

export interface IBus {
  expose<A>(
    name: string,
    handler: (params: A, origin: string) => Promise<any>
  ): void;
  call<A>(method: string, params?: object): Promise<A>;
}

export class Bus implements IBus {
  private readonly queue: CommandQueue;

  static create(): IBus {
    if (typeof window !== "undefined") {
      const rpc = new RPC({
        target: window.parent,
        serviceId: "maskodid",
      });
      return new Bus(rpc);
    } else {
      return {
        expose() {},
        call<A>(): Promise<A> {
          return;
        },
      };
    }
  }

  constructor(private readonly rpc: RPC) {
    this.queue = new CommandQueue();
  }

  expose<A>(
    name: string,
    handler: (params: A, origin: string) => Promise<any>
  ) {
    this.rpc.expose<A>(name, (data, origin) => {
      return this.queue.execute(() => {
        return handler(data, origin);
      });
    });
  }

  call<A>(method: string, params?: object): Promise<A> {
    return this.rpc.call<A>(method, params);
  }
}

export const BusContext = React.createContext<IBus>(Bus.create());
