# Maskodid

Simple in-browser DID identity wallet.

# Rationale

When working with DID you eventually need a thing called Identity Wallet to store a private key,
make compliant signatures and decrypt messages. It requires installing (and oftentimes building) custom browser extensions,
phone applications, or heavily relying on external cloud infrastructure, which turns development into a nightmare.
Maskodid is a simple in-browser Identity Wallet perfectly suited for the development and testing of web-based DID solutions.
It eliminates external dependencies, making the development process fast and pleasant.

## Installation

```shell
npm install maskodid
```

## Usage

Maskodid allows an application to have three DID-related functions:

- get DID of the user,
- create JSON Web Signature,
- decrypt JSON Web Encryption message

### Get DID

This would ask a user for permission to share her DID with the application. If there is no private key, the user is asked to create DID first.

```typescript
import { Maskodid } from "maskodid";
const maskodid = new Maskodid();
// Get DID
const did = await maskodid.authenticate(); // did:key:z...
```

### Create JSON Web Signature

The result is JWS in a compact form. If passed DID does not match with the user's DID, the call throws an error.

```typescript
import { Maskodid } from "maskodid";
const maskodid = new Maskodid();
// First, get DID
const did = await maskodid.authenticate();
// Then sign
const jws = await maskodid.sign({ aud: "*", hello: "world" }, did);
// You could also add protected headers to the resulting JWS
const jwt = await maskodid.sign({ aud: "*", hello: "world" }, did, {
  typ: "JWT",
});
```

The resulting JWS contains a key identifier (kid) as DID URL which makes it clear which key to check the signature against.

### Decrypt JSON Web Encryption message

Maskodid supports ECDH-ES+XC20PKW JWE algorithm with x25519 key exchange schema.
To encrypt a payload to a DID you only have to know the recipient's public key.
It is a decryption that requires knowledge of the private key.
So, if one gets an encrypted message jwe, decryption happens like this:

```typescript
import { Maskodid } from "maskodid";
const maskodid = new Maskodid();
const cleartext = await maskodid.decrypt(jwe);
```

## Repository contents

The repository contains source code for:
- maskodid as a library
- iFrame contents (deployed on [https://frame.maskodid.ukstv.me](https://frame.maskodid.ukstv.me))
- maskodid playground as a web application (deployed on [https://maskodid.ukstv.me](https://maskodid.ukstv.me))

## License

Apache-2.0 or MIT
