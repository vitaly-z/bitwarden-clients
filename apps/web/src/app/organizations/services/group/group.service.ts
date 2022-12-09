import { Injectable } from "@angular/core";

import { ApiService } from "@bitwarden/common/abstractions/api.service";
import { SelectionReadOnlyRequest } from "@bitwarden/common/models/request/selection-read-only.request";
import { ListResponse } from "@bitwarden/common/models/response/list.response";

import { GroupView } from "../../views/group.view";
import { GroupRequest, GroupServiceAbstraction } from "../abstractions/group";

import { OrganizationGroupBulkRequest } from "./requests/organization-group-bulk.request";
import { GroupDetailsResponse, GroupResponse } from "./responses/group.response";

@Injectable()
export class GroupService implements GroupServiceAbstraction {
  constructor(private apiService: ApiService) {}

  async delete(orgId: string, groupId: string): Promise<void> {
    await this.apiService.send(
      "DELETE",
      "/organizations/" + orgId + "/groups/" + groupId,
      null,
      true,
      false
    );
  }

  async deleteMany(orgId: string, groupIds: string[]): Promise<GroupView[]> {
    const request = new OrganizationGroupBulkRequest(groupIds);

    const r = await this.apiService.send(
      "DELETE",
      "/organizations/" + orgId + "/groups",
      request,
      true,
      true
    );
    const listResponse = new ListResponse(r, GroupResponse);

    return listResponse.data?.map((gr) => GroupView.fromResponse(gr)) ?? [];
  }

  async get(orgId: string, groupId: string): Promise<GroupView> {
    const r = await this.apiService.send(
      "GET",
      "/organizations/" + orgId + "/groups/" + groupId + "/details",
      null,
      true,
      true
    );

    return GroupView.fromResponse(new GroupDetailsResponse(r));
  }

  async getAll(orgId: string): Promise<GroupView[]> {
    const r = await this.apiService.send(
      "GET",
      "/organizations/" + orgId + "/groups",
      null,
      true,
      true
    );

    const listResponse = new ListResponse(r, GroupDetailsResponse);

    return listResponse.data?.map((gr) => GroupView.fromResponse(gr)) ?? [];
  }

  async save(group: GroupView): Promise<GroupView> {
    const request = new GroupRequest();
    request.name = group.name;
    request.externalId = group.externalId;
    request.accessAll = group.accessAll;
    request.users = group.members;
    request.collections = group.collections.map(
      (c) => new SelectionReadOnlyRequest(c.id, c.readOnly, c.hidePasswords)
    );

    if (group.id == undefined) {
      return await this.postGroup(group.organizationId, request);
    } else {
      return await this.putGroup(group.organizationId, group.id, request);
    }
  }

  private async postGroup(organizationId: string, request: GroupRequest): Promise<GroupView> {
    const r = await this.apiService.send(
      "POST",
      "/organizations/" + organizationId + "/groups",
      request,
      true,
      true
    );
    return GroupView.fromResponse(new GroupResponse(r));
  }

  private async putGroup(
    organizationId: string,
    id: string,
    request: GroupRequest
  ): Promise<GroupView> {
    const r = await this.apiService.send(
      "PUT",
      "/organizations/" + organizationId + "/groups/" + id,
      request,
      true,
      true
    );
    return GroupView.fromResponse(new GroupResponse(r));
  }
}