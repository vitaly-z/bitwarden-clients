import { DeviceResponse } from "./responses/device.response";

export abstract class DevicesApiServiceAbstraction {
  updateDeviceEncryptedMasterKey: (
    deviceId: string,
    deviceEncryptedMasterKey: string
  ) => Promise<DeviceResponse>;
  createDeviceEncryptedMasterKey: (
    deviceId: string,
    deviceEncryptedMasterKey: string
  ) => Promise<DeviceResponse>;
}
