export class TrustDeviceKeysRequest {
  constructor(
    public publicKeyEncryptedSymmetricKey: string,
    public symmetricKeyEncryptedPublicKey: string,
    public deviceKeyEncryptedPrivateKey: string
  ) {}
}
