export interface JWSSignature {
  protected: string;
  signature: string;
}

export interface GeneralJWS {
  payload: string;
  signatures: Array<JWSSignature>;
}

export function toGeneralJWS(jws: string): GeneralJWS {
  const [protectedHeader, payload, signature] = jws.split(".");
  return {
    payload,
    signatures: [{ protected: protectedHeader, signature }],
  };
}

export interface CreateJwsPayload {
  payload: object;
  did: string;
  header?: object;
}