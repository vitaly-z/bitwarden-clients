import { DiskStorageOptions } from "@koa/multer";

import { AppIdService as AbstractAppIdService } from "@bitwarden/common/abstractions/appId.service";
import { AppIdService } from "@bitwarden/common/services/appId.service";

import {
  FactoryOptions,
  CachedServices,
  factory,
} from "../../platform/background/service-factories/factory-options";
import { diskStorageServiceFactory } from "../../platform/background/service-factories/storage-service.factory";

type AppIdServiceFactoryOptions = FactoryOptions;

export type AppIdServiceInitOptions = AppIdServiceFactoryOptions & DiskStorageOptions;

export function appIdServiceFactory(
  cache: { appIdService?: AbstractAppIdService } & CachedServices,
  opts: AppIdServiceInitOptions
): Promise<AbstractAppIdService> {
  return factory(
    cache,
    "appIdService",
    opts,
    async () => new AppIdService(await diskStorageServiceFactory(cache, opts))
  );
}
