import { DeviceResponse } from "./responses/device.response";

export abstract class DevicesApiServiceAbstraction {
  getKnownDevice: (email: string, deviceIdentifier: string) => Promise<boolean>;

  updateDeviceEncryptedUserSymmetricKey: (
    deviceId: string,
    deviceEncryptedUserSymmetricKey: string
  ) => Promise<DeviceResponse>;
  createDeviceEncryptedUserSymmetricKey: (
    deviceId: string,
    deviceEncryptedUserSymmetricKey: string
  ) => Promise<DeviceResponse>;
}
