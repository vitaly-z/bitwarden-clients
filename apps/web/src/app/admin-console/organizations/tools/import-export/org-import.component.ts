import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap, takeUntil } from "rxjs/operators";

import { ModalService } from "@bitwarden/angular/services/modal.service";
import { I18nService } from "@bitwarden/common/abstractions/i18n.service";
import { LogService } from "@bitwarden/common/abstractions/log.service";
import { PlatformUtilsService } from "@bitwarden/common/abstractions/platformUtils.service";
import {
  canAccessVaultTab,
  OrganizationService,
} from "@bitwarden/common/admin-console/abstractions/organization/organization.service.abstraction";
import { PolicyService } from "@bitwarden/common/admin-console/abstractions/policy/policy.service.abstraction";
import { SyncService } from "@bitwarden/common/vault/abstractions/sync/sync.service.abstraction";
import { ImportServiceAbstraction } from "@bitwarden/importer";

import { ImportComponent } from "../../../../tools/import-export/import.component";

@Component({
  selector: "app-org-import",
  templateUrl: "../../../../tools/import-export/import.component.html",
})
// eslint-disable-next-line rxjs-angular/prefer-takeuntil
export class OrganizationImportComponent extends ImportComponent {
  organizationName: string;

  protected get importBlockedByPolicy(): boolean {
    return false;
  }

  constructor(
    i18nService: I18nService,
    importService: ImportServiceAbstraction,
    router: Router,
    private route: ActivatedRoute,
    platformUtilsService: PlatformUtilsService,
    policyService: PolicyService,
    private organizationService: OrganizationService,
    logService: LogService,
    modalService: ModalService,
    syncService: SyncService
  ) {
    super(
      i18nService,
      importService,
      router,
      platformUtilsService,
      policyService,
      logService,
      modalService,
      syncService
    );
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params) => this.organizationService.get$(params.organizationId)),
        takeUntil(this.destroy$)
      )
      .subscribe((organization) => {
        this.organizationId = organization.id;
        this.organizationName = organization.name;

        if (canAccessVaultTab(organization)) {
          this.successNavigate = ["organizations", this.organizationId, "vault"];
        } else {
          this.onSuccessfulImport = async () => {
            this.fileSelected = null;
            this.fileContents = "";
          };
        }
      });
    super.ngOnInit();
  }

  async submit() {
    const confirmed = await this.platformUtilsService.showDialog(
      this.i18nService.t("importWarning", this.organizationName),
      this.i18nService.t("warning"),
      this.i18nService.t("yes"),
      this.i18nService.t("no"),
      "warning"
    );
    if (!confirmed) {
      return;
    }
    super.submit();
  }
}
