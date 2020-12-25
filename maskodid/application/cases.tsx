import React from "react";
import { IInsideContext } from "./inside-context";
import { SeedIndexScreen } from "./seed/index.screen";
import { IBackbone } from "../backbone/backbone";
import { HomeProposeCreateKeyScreen } from "./home/propose-create-key.screen";
import { HomeDidScreen } from "./home/did.screen";
import { IBus } from "../backbone/bus";
import { PermitAuthenticationScreen } from "./permit/authentication.screen";
import PQueue from "p-queue";

export class Cases {
  readonly queue = new PQueue({ concurrency: 1 });

  constructor(
    private readonly inside: IInsideContext,
    private readonly backbone: IBackbone,
    private readonly bus: IBus
  ) {
    this.queue.on("idle", () => {
      console.log("idle");
      // this.inside.goHome();
    });
  }

  async clearKey() {
    this.backbone.clearSeed();
    this.inside.goHome();
  }

  async displayDid() {
    const did = await this.backbone.did();
    this.inside.goNext(<HomeDidScreen did={did} />);
  }

  proposeCreateKey() {
    this.inside.goNext(<HomeProposeCreateKeyScreen />);
  }

  async createKeyAndGoHome() {
    await this.createKey();
    this.inside.goHome();
  }

  createKey() {
    return new Promise<void>((resolve, reject) => {
      const handleDone = (error?: Error) => {
        error ? reject(error) : resolve();
      };
      this.inside.goNext(<SeedIndexScreen done={handleDone} />);
    });
  }

  async withShow<A>(f: () => Promise<A> | A) {
    await this.bus.call("show");
    try {
      return await f();
    } finally {
      await this.bus.call("hide");
      this.inside.goHome();
    }
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
      console.log("permit auth");
      const handleDone = (error?: Error) => {
        error ? reject(error) : resolve();
      };
      this.inside.goNext(
        <PermitAuthenticationScreen done={handleDone} origin={origin} />
      );
    });
  }

  async authenticate(origin: string) {
    return this.withShow(async () => {
      await this.ensureKey();
      await this.permitAuthenticate(origin);
      return new Date().toISOString();
    });
  }
}
