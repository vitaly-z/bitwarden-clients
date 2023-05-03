import { DeviceResponse } from "./responses/device.response";

export abstract class DevicesApiServiceAbstraction {
  getKnownDevice: (email: string, deviceIdentifier: string) => Promise<boolean>;

  updateDeviceEncryptedMasterKey: (
    deviceId: string,
    deviceEncryptedMasterKey: string
  ) => Promise<DeviceResponse>;
  createDeviceEncryptedUserSymmetricKey: (
    deviceId: string,
    deviceEncryptedMasterKey: string
  ) => Promise<DeviceResponse>;
}
