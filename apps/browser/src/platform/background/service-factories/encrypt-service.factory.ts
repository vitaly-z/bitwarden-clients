import { EncryptServiceImplementation } from "@bitwarden/common/services/cryptography/encrypt.service.implementation";

import {
  FactoryOptions,
  CachedServices,
  factory,
} from "../../../background/service-factories/factory-options";
import {
  LogServiceInitOptions,
  logServiceFactory,
} from "../../../background/service-factories/log-service.factory";

import {
  cryptoFunctionServiceFactory,
  CryptoFunctionServiceInitOptions,
} from "./crypto-function-service.factory";

type EncryptServiceFactoryOptions = FactoryOptions & {
  encryptServiceOptions: {
    logMacFailures: boolean;
  };
};

export type EncryptServiceInitOptions = EncryptServiceFactoryOptions &
  CryptoFunctionServiceInitOptions &
  LogServiceInitOptions;

export function encryptServiceFactory(
  cache: { encryptService?: EncryptServiceImplementation } & CachedServices,
  opts: EncryptServiceInitOptions
): Promise<EncryptServiceImplementation> {
  return factory(
    cache,
    "encryptService",
    opts,
    async () =>
      new EncryptServiceImplementation(
        await cryptoFunctionServiceFactory(cache, opts),
        await logServiceFactory(cache, opts),
        opts.encryptServiceOptions.logMacFailures
      )
  );
}
