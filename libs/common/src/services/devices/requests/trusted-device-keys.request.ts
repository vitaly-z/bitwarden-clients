export class TrustedDeviceKeysRequest {
  constructor(
    public devicePublicKeyEncryptedUserSymKey: string,
    public userSymKeyEncryptedDevicePublicKey: string,
    public deviceKeyEncryptedDevicePrivateKey: string
  ) {}
}
