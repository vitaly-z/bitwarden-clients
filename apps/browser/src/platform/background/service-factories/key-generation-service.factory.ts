import {
  FactoryOptions,
  CachedServices,
  factory,
} from "../../../background/service-factories/factory-options";
import { KeyGenerationService } from "../../../services/keyGeneration.service";

import {
  cryptoFunctionServiceFactory,
  CryptoFunctionServiceInitOptions,
} from "./crypto-function-service.factory";

type KeyGenerationServiceFactoryOptions = FactoryOptions;

export type KeyGenerationServiceInitOptions = KeyGenerationServiceFactoryOptions &
  CryptoFunctionServiceInitOptions;

export function keyGenerationServiceFactory(
  cache: { keyGenerationService?: KeyGenerationService } & CachedServices,
  opts: KeyGenerationServiceInitOptions
): Promise<KeyGenerationService> {
  return factory(
    cache,
    "keyGenerationService",
    opts,
    async () => new KeyGenerationService(await cryptoFunctionServiceFactory(cache, opts))
  );
}
