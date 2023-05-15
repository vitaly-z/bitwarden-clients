import { FileUploadService as FileUploadServiceAbstraction } from "@bitwarden/common/abstractions/file-upload/file-upload.service";
import { FileUploadService } from "@bitwarden/common/services/file-upload/file-upload.service";

import {
  logServiceFactory,
  LogServiceInitOptions,
} from "../../platform/background/service-factories/log-service.factory";

import { CachedServices, factory, FactoryOptions } from "./factory-options";

type FileUploadServiceFactoryOptions = FactoryOptions;

export type FileUploadServiceInitOptions = FileUploadServiceFactoryOptions & LogServiceInitOptions;

export function fileUploadServiceFactory(
  cache: { fileUploadService?: FileUploadServiceAbstraction } & CachedServices,
  opts: FileUploadServiceInitOptions
): Promise<FileUploadServiceAbstraction> {
  return factory(
    cache,
    "fileUploadService",
    opts,
    async () => new FileUploadService(await logServiceFactory(cache, opts))
  );
}
