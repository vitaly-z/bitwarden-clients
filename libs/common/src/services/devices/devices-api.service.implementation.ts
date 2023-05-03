import { DevicesApiServiceAbstraction } from "../../abstractions/devices/devices-api.service.abstraction";
import { DeviceResponse } from "../../abstractions/devices/responses/device.response";
import { Utils } from "../../misc/utils";
import { ApiService } from "../api.service";

import { DeviceEncryptedUserSymmetricKeyRequest } from "./requests/device-encrypted-user-symmetric-key.request";

export class DevicesApiServiceImplementation implements DevicesApiServiceAbstraction {
  constructor(private apiService: ApiService) {}

  async getKnownDevice(email: string, deviceIdentifier: string): Promise<boolean> {
    const r = await this.apiService.send(
      "GET",
      "/devices/knowndevice",
      null,
      false,
      true,
      null,
      (headers) => {
        headers.set("X-Device-Identifier", deviceIdentifier);
        headers.set("X-Request-Email", Utils.fromUtf8ToUrlB64(email));
      }
    );
    return r as boolean;
  }

  async createDeviceEncryptedUserSymmetricKey(
    deviceId: string,
    deviceEncryptedUserSymmetricKey: string
  ): Promise<DeviceResponse> {
    const request = new DeviceEncryptedUserSymmetricKeyRequest(deviceEncryptedUserSymmetricKey);

    const result = await this.apiService.send(
      "POST",
      `/devices/${deviceId}/key`,
      request,
      true,
      true
    );

    return new DeviceResponse(result);
  }

  async updateDeviceEncryptedUserSymmetricKey(
    deviceId: string,
    deviceEncryptedUserSymmetricKey: string
  ): Promise<DeviceResponse> {
    const request = new DeviceEncryptedUserSymmetricKeyRequest(deviceEncryptedUserSymmetricKey);

    const result = await this.apiService.send(
      "PUT",
      `/devices/${deviceId}/key`,
      request,
      true,
      true
    );

    return new DeviceResponse(result);
  }
}
