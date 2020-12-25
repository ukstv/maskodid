import React from "react";
import {
  fingerprint,
  PrivateKeyFactory,
  AlgorithmKind,
} from "@silentcastle/keys";
import { BehaviorSubject } from "rxjs";
import { Subjectable } from "./use-subjectable";

const privateKeyFactory = new PrivateKeyFactory();

export interface IBackbone {
  setSeed(seed: string): void;
  hasSeed: boolean;
  authenticate(): Promise<string>;
  did(): Promise<string>;
  clearSeed(): void;
  page$: Subjectable<JSX.Element>;
}

export class EmptyBackbone implements IBackbone {
  setSeed(seed: string) {}
  hasSeed = false;
  authenticate(): Promise<string> {
    throw new Error(`EmptyBackbone.authenticate`);
  }
  did(): Promise<string> {
    throw new Error(`EmptyBackbone.did`);
  }
  clearSeed(): void {}
  page$ = new BehaviorSubject(<></>);
}

export class Backbone {
  static create() {
    if (typeof localStorage !== "undefined") {
      return new Backbone().goHome();
    } else {
      return new EmptyBackbone();
    }
  }

  protected goHome() {
    if (this.hasSeed) {
      this.did()
        .then((did) => {
          // this._page$.next(<HomeIndexScreen did={did} />);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    return this;
  }

  setSeed(seed: string) {
    localStorage.setItem("maskodid:seed", seed);
  }

  clearSeed(): void {
    localStorage.removeItem("maskodid:seed");
  }

  get hasSeed(): boolean {
    return Boolean(localStorage.getItem("maskodid:seed"));
  }

  async did() {
    const seed = localStorage.getItem("maskodid:seed");
    const privateKey = privateKeyFactory.fromSeed(AlgorithmKind.ed25519, seed);
    const publicKey = await privateKey.publicKey();
    const f = fingerprint(publicKey);
    return `did:key:${f}`;
  }
}

export const BackboneContext = React.createContext(Backbone.create());
