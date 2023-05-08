import { DIALOG_DATA, DialogConfig } from "@angular/cdk/dialog";
import { Component, Inject, OnInit } from "@angular/core";

import { UserNamePipe } from "@bitwarden/angular/pipes/user-name.pipe";
import { DialogServiceAbstraction } from "@bitwarden/angular/services/dialog";
import { ApiService } from "@bitwarden/common/abstractions/api.service";
import { I18nService } from "@bitwarden/common/abstractions/i18n.service";
import { LogService } from "@bitwarden/common/abstractions/log.service";
import { OrganizationUserService } from "@bitwarden/common/abstractions/organization-user/organization-user.service";
import { PlatformUtilsService } from "@bitwarden/common/abstractions/platformUtils.service";
import { EventResponse } from "@bitwarden/common/models/response/event.response";
import { ListResponse } from "@bitwarden/common/models/response/list.response";

import { EventService } from "../../../core";

export interface EntityEventsDialogParams {
  entity: "user" | "cipher";
  entityId: string;

  organizationId?: string;
  providerId?: string;
  showUser?: boolean;
  name?: string;
}

@Component({
  selector: "app-entity-events",
  templateUrl: "entity-events.component.html",
})
export class EntityEventsComponent implements OnInit {
  loading = true;
  loaded = false;
  events: any[];
  start: string;
  end: string;
  continuationToken: string;
  refreshPromise: Promise<any>;
  morePromise: Promise<any>;

  private orgUsersUserIdMap = new Map<string, any>();
  private orgUsersIdMap = new Map<string, any>();

  get name() {
    return this.params.name;
  }

  get showUser() {
    return this.params.showUser ?? false;
  }

  constructor(
    @Inject(DIALOG_DATA) private params: EntityEventsDialogParams,
    private apiService: ApiService,
    private i18nService: I18nService,
    private eventService: EventService,
    private platformUtilsService: PlatformUtilsService,
    private userNamePipe: UserNamePipe,
    private logService: LogService,
    private organizationUserService: OrganizationUserService
  ) {}

  async ngOnInit() {
    const defaultDates = this.eventService.getDefaultDateFilters();
    this.start = defaultDates[0];
    this.end = defaultDates[1];
    await this.load();
  }

  async load() {
    if (this.showUser) {
      const response = await this.organizationUserService.getAllUsers(this.params.organizationId);
      response.data.forEach((u) => {
        const name = this.userNamePipe.transform(u);
        this.orgUsersIdMap.set(u.id, { name: name, email: u.email });
        this.orgUsersUserIdMap.set(u.userId, { name: name, email: u.email });
      });
    }
    await this.loadEvents(true);
    this.loaded = true;
  }

  async loadEvents(clearExisting: boolean) {
    if (this.refreshPromise != null || this.morePromise != null) {
      return;
    }

    let dates: string[] = null;
    try {
      dates = this.eventService.formatDateFilters(this.start, this.end);
    } catch (e) {
      this.platformUtilsService.showToast(
        "error",
        this.i18nService.t("errorOccurred"),
        this.i18nService.t("invalidDateRange")
      );
      return;
    }

    this.loading = true;
    let response: ListResponse<EventResponse>;
    try {
      let promise: Promise<any>;
      if (this.params.entity === "user" && this.params.providerId) {
        promise = this.apiService.getEventsProviderUser(
          this.params.providerId,
          this.params.entityId,
          dates[0],
          dates[1],
          clearExisting ? null : this.continuationToken
        );
      } else if (this.params.entity === "user") {
        promise = this.apiService.getEventsOrganizationUser(
          this.params.organizationId,
          this.params.entityId,
          dates[0],
          dates[1],
          clearExisting ? null : this.continuationToken
        );
      } else {
        promise = this.apiService.getEventsCipher(
          this.params.entityId,
          dates[0],
          dates[1],
          clearExisting ? null : this.continuationToken
        );
      }
      if (clearExisting) {
        this.refreshPromise = promise;
      } else {
        this.morePromise = promise;
      }
      response = await promise;
    } catch (e) {
      this.logService.error(e);
    }

    this.continuationToken = response.continuationToken;
    const events = await Promise.all(
      response.data.map(async (r) => {
        const userId = r.actingUserId == null ? r.userId : r.actingUserId;
        const eventInfo = await this.eventService.getEventInfo(r);
        const user =
          this.showUser && userId != null && this.orgUsersUserIdMap.has(userId)
            ? this.orgUsersUserIdMap.get(userId)
            : null;
        return {
          message: eventInfo.message,
          appIcon: eventInfo.appIcon,
          appName: eventInfo.appName,
          userId: userId,
          userName: user != null ? user.name : this.showUser ? this.i18nService.t("unknown") : null,
          userEmail: user != null ? user.email : this.showUser ? "" : null,
          date: r.date,
          ip: r.ipAddress,
          type: r.type,
        };
      })
    );

    if (!clearExisting && this.events != null && this.events.length > 0) {
      this.events = this.events.concat(events);
    } else {
      this.events = events;
    }

    this.loading = false;
    this.morePromise = null;
    this.refreshPromise = null;
  }
}

/**
 * Strongly typed helper to open a EntityEventsComponent as a dialog
 * @param dialogService Instance of the dialog service that will be used to open the dialog
 * @param config Configuration for the dialog
 */
export const openEntityEventsDialog = (
  dialogService: DialogServiceAbstraction,
  config: DialogConfig<EntityEventsDialogParams>
) => {
  return dialogService.open<void, EntityEventsDialogParams>(EntityEventsComponent, config);
};
