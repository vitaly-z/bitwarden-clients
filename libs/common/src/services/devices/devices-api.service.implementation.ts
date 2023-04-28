import { DevicesApiServiceAbstraction } from "../../abstractions/devices/devices-api.service.abstraction";
import { DeviceResponse } from "../../abstractions/devices/responses/device.response";
import { ApiService } from "../api.service";

import { DeviceEncryptedMasterKeyRequest } from "./requests/device-encrypted-master-key.request";

export class DevicesApiServiceImplementation implements DevicesApiServiceAbstraction {
  constructor(private apiService: ApiService) {}

  async createDeviceEncryptedMasterKey(
    deviceId: string,
    deviceEncryptedMasterKey: string
  ): Promise<DeviceResponse> {
    const request = new DeviceEncryptedMasterKeyRequest(deviceEncryptedMasterKey);

    const result = await this.apiService.send(
      "POST",
      `/devices/${deviceId}/key`,
      request,
      true,
      true
    );

    return new DeviceResponse(result);
  }

  async updateDeviceEncryptedMasterKey(
    deviceId: string,
    deviceEncryptedMasterKey: string
  ): Promise<DeviceResponse> {
    const request = new DeviceEncryptedMasterKeyRequest(deviceEncryptedMasterKey);

    const result = await this.apiService.send(
      "PUT",
      `/devices/${deviceId}/key`,
      request,
      true,
      true
    );

    return new DeviceResponse(result);
  }

  // TODO: move other devices endpoint calls out of api service
}
