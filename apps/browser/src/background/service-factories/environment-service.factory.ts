import {
  CachedServices,
  factory,
  FactoryOptions,
} from "../../platform/background/service-factories/factory-options";
import {
  logServiceFactory,
  LogServiceInitOptions,
} from "../../platform/background/service-factories/log-service.factory";
import {
  stateServiceFactory as stateServiceFactory,
  StateServiceInitOptions,
} from "../../platform/background/service-factories/state-service.factory";
import { BrowserEnvironmentService } from "../../services/browser-environment.service";

type EnvironmentServiceFactoryOptions = FactoryOptions;

export type EnvironmentServiceInitOptions = EnvironmentServiceFactoryOptions &
  StateServiceInitOptions &
  LogServiceInitOptions;

export function environmentServiceFactory(
  cache: { environmentService?: BrowserEnvironmentService } & CachedServices,
  opts: EnvironmentServiceInitOptions
): Promise<BrowserEnvironmentService> {
  return factory(
    cache,
    "environmentService",
    opts,
    async () =>
      new BrowserEnvironmentService(
        await stateServiceFactory(cache, opts),
        await logServiceFactory(cache, opts)
      )
  );
}
