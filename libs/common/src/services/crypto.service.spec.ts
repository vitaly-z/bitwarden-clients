import { mock, mockReset } from "jest-mock-extended";

import { AppIdService } from "../abstractions/appId.service";
import { CryptoFunctionService } from "../abstractions/cryptoFunction.service";
import { DevicesApiServiceAbstraction } from "../abstractions/devices/devices-api.service.abstraction";
import { DeviceResponse } from "../abstractions/devices/responses/device.response";
import { EncryptService } from "../abstractions/encrypt.service";
import { LogService } from "../abstractions/log.service";
import { PlatformUtilsService } from "../abstractions/platformUtils.service";
import { StateService } from "../abstractions/state.service";
import { EncString } from "../models/domain/enc-string";
import { SymmetricCryptoKey } from "../models/domain/symmetric-crypto-key";
import { CryptoService } from "../services/crypto.service";
import { CsprngArray } from "../types/csprng";

describe("cryptoService", () => {
  let cryptoService: CryptoService;

  const cryptoFunctionService = mock<CryptoFunctionService>();
  const encryptService = mock<EncryptService>();
  const platformUtilService = mock<PlatformUtilsService>();
  const logService = mock<LogService>();
  const stateService = mock<StateService>();
  const appIdService = mock<AppIdService>();
  const devicesApiService = mock<DevicesApiServiceAbstraction>();

  beforeEach(() => {
    mockReset(cryptoFunctionService);
    mockReset(encryptService);
    mockReset(platformUtilService);
    mockReset(logService);
    mockReset(stateService);
    mockReset(appIdService);
    mockReset(devicesApiService);

    cryptoService = new CryptoService(
      cryptoFunctionService,
      encryptService,
      platformUtilService,
      logService,
      stateService,
      appIdService,
      devicesApiService
    );
  });

  it("instantiates", () => {
    expect(cryptoService).not.toBeFalsy();
  });

  describe("Trusted Device Encryption", () => {
    const deviceKeyBytesLength = 64;

    describe("getDeviceKey", () => {
      let mockRandomBytes: CsprngArray;
      let mockDeviceKey: SymmetricCryptoKey;
      let existingDeviceKey: SymmetricCryptoKey;
      let stateSvcGetDeviceKeySpy: jest.SpyInstance;
      let makeDeviceKeySpy: jest.SpyInstance;

      beforeEach(() => {
        mockRandomBytes = new Uint8Array(deviceKeyBytesLength).buffer as CsprngArray;
        mockDeviceKey = new SymmetricCryptoKey(mockRandomBytes);
        existingDeviceKey = new SymmetricCryptoKey(
          new Uint8Array(deviceKeyBytesLength).buffer as CsprngArray
        );

        stateSvcGetDeviceKeySpy = jest.spyOn(stateService, "getDeviceKey");
        makeDeviceKeySpy = jest.spyOn(cryptoService, "makeDeviceKey");
      });

      it("gets a device key when there is not an existing device key", async () => {
        stateSvcGetDeviceKeySpy.mockResolvedValue(null);
        makeDeviceKeySpy.mockResolvedValue(mockDeviceKey);

        const deviceKey = await cryptoService.getDeviceKey();

        expect(stateSvcGetDeviceKeySpy).toHaveBeenCalledTimes(1);
        expect(makeDeviceKeySpy).toHaveBeenCalledTimes(1);

        expect(deviceKey).not.toBeNull();
        expect(deviceKey).toBeInstanceOf(SymmetricCryptoKey);
        expect(deviceKey).toEqual(mockDeviceKey);
      });

      it("returns the existing device key without creating a new one when there is an existing device key", async () => {
        stateSvcGetDeviceKeySpy.mockResolvedValue(existingDeviceKey);

        const deviceKey = await cryptoService.getDeviceKey();

        expect(stateSvcGetDeviceKeySpy).toHaveBeenCalledTimes(1);
        expect(makeDeviceKeySpy).not.toHaveBeenCalled();

        expect(deviceKey).not.toBeNull();
        expect(deviceKey).toBeInstanceOf(SymmetricCryptoKey);
        expect(deviceKey).toEqual(existingDeviceKey);
      });
    });

    describe("makeDeviceKey", () => {
      it("creates a new non-null 64 byte device key, securely stores it, and returns it", async () => {
        const mockRandomBytes = new Uint8Array(deviceKeyBytesLength).buffer as CsprngArray;

        const cryptoFuncSvcRandomBytesSpy = jest
          .spyOn(cryptoFunctionService, "randomBytes")
          .mockResolvedValue(mockRandomBytes);

        const stateSvcSetDeviceKeySpy = jest.spyOn(stateService, "setDeviceKey");

        const deviceKey = await cryptoService.makeDeviceKey();

        expect(cryptoFuncSvcRandomBytesSpy).toHaveBeenCalledTimes(1);
        expect(cryptoFuncSvcRandomBytesSpy).toHaveBeenCalledWith(deviceKeyBytesLength);

        expect(deviceKey).not.toBeNull();
        expect(deviceKey).toBeInstanceOf(SymmetricCryptoKey);

        expect(stateSvcSetDeviceKeySpy).toHaveBeenCalledTimes(1);
        expect(stateSvcSetDeviceKeySpy).toHaveBeenCalledWith(deviceKey);
      });
    });

    // TODO: get this test suite working
    describe("trustDevice", () => {
      let mockRandomBytes: CsprngArray;
      let mockDeviceKey: SymmetricCryptoKey;
      let mockRsaKeyPair: [ArrayBuffer, ArrayBuffer];
      let mockEncString: EncString;
      let mockDeviceResponse: DeviceResponse;

      const mockDeviceId = "mockDeviceId";

      let makeDeviceKeySpy: jest.SpyInstance;
      let rsaGenerateKeyPairSpy: jest.SpyInstance;
      let getKeySpy: jest.SpyInstance;
      let rsaEncryptSpy: jest.SpyInstance;
      let encryptServiceEncryptSpy: jest.SpyInstance;
      let appIdServiceGetAppIdSpy: jest.SpyInstance;
      let devicesApiServiceCreateTrustedDeviceKeysSpy: jest.SpyInstance;

      beforeEach(() => {
        mockRandomBytes = new Uint8Array(deviceKeyBytesLength).buffer as CsprngArray;
        mockDeviceKey = new SymmetricCryptoKey(mockRandomBytes);

        mockRsaKeyPair = [
          new ArrayBuffer(deviceKeyBytesLength),
          new ArrayBuffer(deviceKeyBytesLength),
        ];

        mockEncString = new EncString("encryptedData");

        mockDeviceResponse = new DeviceResponse({
          Id: "mockId",
          Name: "mockName",
          Identifier: "mockIdentifier",
          Type: "mockType",
          CreationDate: "mockCreationDate",
        });

        makeDeviceKeySpy = jest
          .spyOn(cryptoService, "makeDeviceKey")
          .mockResolvedValue(mockDeviceKey);

        rsaGenerateKeyPairSpy = jest
          .spyOn(cryptoFunctionService, "rsaGenerateKeyPair")
          .mockResolvedValue(mockRsaKeyPair);

        getKeySpy = jest.spyOn(cryptoService, "getKey").mockResolvedValue(mockDeviceKey);

        rsaEncryptSpy = jest.spyOn(cryptoService, "rsaEncrypt").mockResolvedValue(mockEncString);

        encryptServiceEncryptSpy = jest
          .spyOn(encryptService, "encrypt")
          .mockResolvedValue(mockEncString);

        appIdServiceGetAppIdSpy = jest
          .spyOn(appIdService, "getAppId")
          .mockResolvedValue(mockDeviceId);

        devicesApiServiceCreateTrustedDeviceKeysSpy = jest
          .spyOn(devicesApiService, "createTrustedDeviceKeys")
          .mockResolvedValue(mockDeviceResponse);
      });

      it("calls the required methods with the correct arguments and returns a DeviceResponse", async () => {
        const response = await cryptoService.trustDevice();

        expect(makeDeviceKeySpy).toHaveBeenCalledTimes(1);
        expect(rsaGenerateKeyPairSpy).toHaveBeenCalledTimes(1);
        expect(getKeySpy).toHaveBeenCalledTimes(1);

        expect(rsaEncryptSpy).toHaveBeenCalledTimes(1);
        expect(encryptServiceEncryptSpy).toHaveBeenCalledTimes(2);

        expect(appIdServiceGetAppIdSpy).toHaveBeenCalledTimes(1);
        expect(devicesApiServiceCreateTrustedDeviceKeysSpy).toHaveBeenCalledTimes(1);
        expect(devicesApiServiceCreateTrustedDeviceKeysSpy).toHaveBeenCalledWith(
          mockDeviceId,
          mockEncString.encryptedString,
          mockEncString.encryptedString,
          mockEncString.encryptedString
        );

        expect(response).toBeInstanceOf(DeviceResponse);
        expect(response).toEqual(mockDeviceResponse);
      });
    });
  });
});
