import React from "react";
import * as keys from "@silentcastle/keys";
import * as util from "@silentcastle/did-util";
import { BehaviorSubject } from "rxjs";
import { CreateJwsPayload } from "../application/create-jws.payload";
import {InvalidDidRequestedError} from "./invalid-did-requested.error";

const privateKeyFactory = new keys.PrivateKeyFactory();

export interface IBackbone {
  setSeed(seed: string): void;
  hasSeed: boolean;
  // authenticate(): Promise<string>;
  did(): Promise<string>;
  clearSeed(): void;
  sign(payload: CreateJwsPayload, origin: string): Promise<{ jws: string }>;
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

  sign(payload: CreateJwsPayload, origin: string): Promise<{ jws: string }> {
    throw new Error(`EmptyBackbone.sign`);
  }
}

export class Backbone implements IBackbone {
  static create() {
    if (typeof localStorage !== "undefined") {
      return new Backbone();
    } else {
      return new EmptyBackbone();
    }
  }

  setSeed(seed: string) {
    localStorage.setItem("maskodid:seed", seed);
  }

  clearSeed(): void {
    localStorage.removeItem("maskodid:seed");
  }

  async sign(payload: CreateJwsPayload, origin: string) {
    const did = await this.did()
    const requestedDid = util.parse(payload.did).did
    if (requestedDid !== did) {
      throw new InvalidDidRequestedError(`Invalid DID ${requestedDid} requested`)
    }
    // check permission
    const privateKey = await this.privateKey();
    const signer = await keys.keyMethod.SignerIdentified.fromPrivateKey(
      privateKey
    );
    const signature = await keys.jws.create(signer, payload.payload);
    return { jws: signature };
  }

  get hasSeed(): boolean {
    return Boolean(localStorage.getItem("maskodid:seed"));
  }

  async privateKey(): Promise<keys.IPrivateKey & keys.ISigner> {
    const seed = localStorage.getItem("maskodid:seed");
    return privateKeyFactory.fromSeed(keys.AlgorithmKind.ed25519, seed);
  }

  async did() {
    const privateKey = await this.privateKey();
    const publicKey = await privateKey.publicKey();
    const f = keys.fingerprint(publicKey);
    return `did:key:${f}`;
  }
}

export const BackboneContext = React.createContext(Backbone.create());
