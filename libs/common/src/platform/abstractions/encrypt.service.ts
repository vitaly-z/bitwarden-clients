import { Decryptable } from "../interfaces/decryptable.interface";
import { encrypted } from "../interfaces/encrypted";
import { InitializerMetadata } from "../interfaces/initializer-metadata.interface";
import { EncArrayBuffer } from "../models/domain/enc-array-buffer";
import { EncString } from "../models/domain/enc-string";
import { SymmetricCryptoKey } from "../models/domain/symmetric-crypto-key";

export abstract class EncryptService {
  abstract encrypt(plainValue: string | ArrayBuffer, key: SymmetricCryptoKey): Promise<EncString>;
  abstract encryptToBytes: (
    plainValue: ArrayBuffer,
    key?: SymmetricCryptoKey
  ) => Promise<EncArrayBuffer>;
  abstract decryptToUtf8: (encString: EncString, key: SymmetricCryptoKey) => Promise<string>;
  abstract decryptToBytes: (encThing: encrypted, key: SymmetricCryptoKey) => Promise<ArrayBuffer>;
  abstract resolveLegacyKey: (key: SymmetricCryptoKey, encThing: encrypted) => SymmetricCryptoKey;
  abstract decryptItems: <T extends InitializerMetadata>(
    items: Decryptable<T>[],
    key: SymmetricCryptoKey
  ) => Promise<T[]>;
}
