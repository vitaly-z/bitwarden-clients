export class TrustedDeviceKeysRequest {
  // TODO: finalize names with Justin
  constructor(
    public publicKeyEncryptedSymmetricKey: string,
    public symmetricKeyEncryptedPublicKey: string,
    public deviceKeyEncryptedPrivateKey: string
  ) {}
}
