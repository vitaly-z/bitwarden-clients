import { DeviceResponse } from "./responses/device.response";

export abstract class DevicesApiServiceAbstraction {
  getKnownDevice: (email: string, deviceIdentifier: string) => Promise<boolean>;

  createTrustedDeviceKeys: (
    deviceId: string,
    devicePublicKeyEncryptedUserDataKey: string,
    userDataKeyEncryptedDevicePublicKey: string,
    deviceKeyEncryptedDevicePrivateKey: string
  ) => Promise<DeviceResponse>;

  updateTrustedDeviceKeys: (
    deviceId: string,
    devicePublicKeyEncryptedUserDataKey: string,
    userDataKeyEncryptedDevicePublicKey: string,
    deviceKeyEncryptedDevicePrivateKey: string
  ) => Promise<DeviceResponse>;
}
