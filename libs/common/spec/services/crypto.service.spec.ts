import { mock, mockReset } from "jest-mock-extended";

import { CryptoFunctionService } from "@bitwarden/common/abstractions/cryptoFunction.service";
import { EncryptService } from "@bitwarden/common/abstractions/encrypt.service";
import { LogService } from "@bitwarden/common/abstractions/log.service";
import { PlatformUtilsService } from "@bitwarden/common/abstractions/platformUtils.service";
import { StateService } from "@bitwarden/common/abstractions/state.service";
import { SymmetricCryptoKey } from "@bitwarden/common/models/domain/symmetric-crypto-key";
import { CryptoService } from "@bitwarden/common/services/crypto.service";
import { CsprngArray } from "@bitwarden/common/types/csprng";

describe("cryptoService", () => {
  let cryptoService: CryptoService;

  const cryptoFunctionService = mock<CryptoFunctionService>();
  const encryptService = mock<EncryptService>();
  const platformUtilService = mock<PlatformUtilsService>();
  const logService = mock<LogService>();
  const stateService = mock<StateService>();

  beforeEach(() => {
    mockReset(cryptoFunctionService);
    mockReset(encryptService);
    mockReset(platformUtilService);
    mockReset(logService);
    mockReset(stateService);

    cryptoService = new CryptoService(
      cryptoFunctionService,
      encryptService,
      platformUtilService,
      logService,
      stateService
    );
  });

  it("instantiates", () => {
    expect(cryptoService).not.toBeFalsy();
  });

  describe("makeDeviceKey", () => {
    const deviceKeyBytesLength = 64;

    it("Creates a non-null 64 byte device encryption key and securely stores it", async () => {
      const mockRandomBytes = new Uint8Array(deviceKeyBytesLength).buffer as CsprngArray;

      const cryptoFuncSvcRandomBytesSpy = jest
        .spyOn(cryptoFunctionService, "randomBytes")
        .mockResolvedValue(mockRandomBytes);
      const stateSvcSetDeviceKeySpy = jest.spyOn(stateService, "setDeviceKey");

      const deviceKey = await cryptoService.getDeviceKey();

      expect(cryptoFuncSvcRandomBytesSpy).toHaveBeenCalledTimes(1);
      expect(cryptoFuncSvcRandomBytesSpy).toHaveBeenCalledWith(deviceKeyBytesLength);
      expect(deviceKey).not.toBeNull();
      expect(deviceKey).toBeInstanceOf(SymmetricCryptoKey);
      expect(stateSvcSetDeviceKeySpy).toHaveBeenCalledTimes(1);
      expect(stateSvcSetDeviceKeySpy).toHaveBeenCalledWith(deviceKey);
    });
  });
});
