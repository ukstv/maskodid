import React from "react";
import { IInsideContext } from "./inside-context";
import { SeedIndexScreen } from "./seed/index.screen";
import { IBackbone } from "../backbone/backbone";
import { HomeProposeCreateKeyScreen } from "./home/propose-create-key.screen";
import { HomeDidScreen } from "./home/did.screen";
import { IBus } from "../backbone/bus";
import { PermitAuthenticationScreen } from "./permit/authentication.screen";
import PQueue from "p-queue";
import { CreateJwsPayload } from "./create-jws.payload";

export class Cases {
  readonly queue = new PQueue({ concurrency: 1 });

  constructor(
    private readonly inside: IInsideContext,
    private readonly backbone: IBackbone,
    private readonly bus: IBus
  ) {
    this.queue.on("idle", () => {
      this.inside.goHome();
    });
  }

  private command<A>(f: () => Promise<A>, hideAfter: boolean = true) {
    return this.queue.add(async () => {
      const result = await f();
      if (hideAfter) {
        await this.bus.call("hide").catch(() => {});
      }
      return result;
    });
  }

  // COMMAND
  async clearKeyCommand() {
    return this.command<void>(async () => {
      this.backbone.clearSeed();
    }, false);
  }

  // NO QUEUE
  async displayDid() {
    const did = await this.backbone.did();
    this.inside.goNext(<HomeDidScreen did={did} />);
  }

  // NO QUEUE
  proposeCreateKey() {
    this.inside.goNext(<HomeProposeCreateKeyScreen />);
  }

  // COMMAND
  async createKeyCommand() {
    return this.command<void>(() => {
      return this.createKey();
    }, false);
  }

  async createKey() {
    return new Promise<void>((resolve, reject) => {
      const handleDone = (error?: Error) => {
        error ? reject(error) : resolve();
      };
      this.inside.goNext(<SeedIndexScreen done={handleDone} />);
    });
  }

  async ensureKey() {
    if (this.backbone.hasSeed) {
      return Promise.resolve();
    } else {
      return this.createKey();
    }
  }

  async permitAuthenticate(origin: string) {
    return new Promise<void>((resolve, reject) => {
      const handleDone = (error?: Error) => {
        error ? reject(error) : resolve();
      };
      this.inside.goNext(
        <PermitAuthenticationScreen done={handleDone} origin={origin} />
      );
    });
  }

  async signCommand(payload: CreateJwsPayload, origin: string) {
    return this.backbone.sign(payload, origin)
  }

  async authenticateCommand(origin: string) {
    return this.command(async () => {
      await this.bus.call("show");
      await this.ensureKey();
      await this.permitAuthenticate(origin);
      return this.backbone.did();
    });
  }
}
