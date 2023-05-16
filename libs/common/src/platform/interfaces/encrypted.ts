import { EncryptionType } from "../../enums";

export interface encrypted {
  encryptionType?: EncryptionType;
  dataBytes: ArrayBuffer;
  macBytes: ArrayBuffer;
  ivBytes: ArrayBuffer;
}
