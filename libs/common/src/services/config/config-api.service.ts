import { ApiService } from "../../abstractions/api.service";
import { ConfigApiServiceAbstraction as ConfigApiServiceAbstraction } from "../../abstractions/config/config-api.service.abstraction";
import { TokenService } from "../../auth/abstractions/token.service";
import { ServerConfigResponse } from "../../models/response/server-config.response";

export class ConfigApiService implements ConfigApiServiceAbstraction {
  constructor(private apiService: ApiService, private tokenService: TokenService) {}

  async get(): Promise<ServerConfigResponse> {
    let authed = false;
    const accessToken = await this.tokenService.getToken();
    if (accessToken !== undefined) {
      authed = true;
    }

    const r = await this.apiService.send("GET", "/config", null, authed, true);
    return new ServerConfigResponse(r);
  }
}
