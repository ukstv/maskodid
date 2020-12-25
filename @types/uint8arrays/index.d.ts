declare module 'uint8arrays' {
    type BaseName = "identity" | "base2" | "base8" | "base10" | "base16" | "base16upper" | "base32hex" | "base32hexupper" | "base32hexpad" | "base32hexpadupper" | "base32" | "base32upper" | "base32pad" | "base32padupper" | "base32z" | "base36" | "base36upper" | "base58btc" | "base58flickr" | "base64" | "base64pad" | "base64url" | "base64urlpad";

    export function compare(a: Uint8Array, b: Uint8Array): number;
    export function concat(arrays: Array<ArrayLike<number>>, length?: number | undefined): Uint8Array;
    export function equals(a: Uint8Array, b: Uint8Array): boolean;
    export function fromString(string: string, encoding?: "identity" | "base2" | "base8" | "base10" | "base16" | "base16upper" | "base32hex" | "base32hexupper" | "base32hexpad" | "base32hexpadupper" | "base32" | "base32upper" | "base32pad" | "base32padupper" | "base32z" | "base36" | "base36upper" | "base58btc" | "base58flickr" | "base64" | "base64pad" | "base64url" | "base64urlpad" | "utf8" | "utf-8" | "ascii" | undefined): Uint8Array;
    export namespace fromString {
        export { BaseName };
    }
    export function toString(array: Uint8Array, encoding?: "identity" | "base2" | "base8" | "base10" | "base16" | "base16upper" | "base32hex" | "base32hexupper" | "base32hexpad" | "base32hexpadupper" | "base32" | "base32upper" | "base32pad" | "base32padupper" | "base32z" | "base36" | "base36upper" | "base58btc" | "base58flickr" | "base64" | "base64pad" | "base64url" | "base64urlpad" | "utf8" | "utf-8" | "ascii" | undefined): string;
    export namespace toString {
        export { BaseName };
    }
}