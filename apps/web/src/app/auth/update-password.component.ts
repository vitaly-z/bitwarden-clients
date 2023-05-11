import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { UpdatePasswordComponent as BaseUpdatePasswordComponent } from "@bitwarden/angular/auth/components/update-password.component";
import { DialogServiceAbstraction } from "@bitwarden/angular/services/dialog";
import { ApiService } from "@bitwarden/common/abstractions/api.service";
import { I18nService } from "@bitwarden/common/abstractions/i18n.service";
import { MessagingService } from "@bitwarden/common/abstractions/messaging.service";
import { PlatformUtilsService } from "@bitwarden/common/abstractions/platformUtils.service";
import { StateService } from "@bitwarden/common/abstractions/state.service";
import { UserVerificationService } from "@bitwarden/common/abstractions/userVerification/userVerification.service.abstraction";
import { PolicyService } from "@bitwarden/common/admin-console/abstractions/policy/policy.service.abstraction";
import { CryptoService } from "@bitwarden/common/platform/abstractions/crypto.service";
import { LogService } from "@bitwarden/common/platform/abstractions/log.service";
import { PasswordGenerationServiceAbstraction } from "@bitwarden/common/tools/generator/password";

@Component({
  selector: "app-update-password",
  templateUrl: "update-password.component.html",
})
export class UpdatePasswordComponent extends BaseUpdatePasswordComponent {
  constructor(
    router: Router,
    i18nService: I18nService,
    platformUtilsService: PlatformUtilsService,
    passwordGenerationService: PasswordGenerationServiceAbstraction,
    policyService: PolicyService,
    cryptoService: CryptoService,
    messagingService: MessagingService,
    apiService: ApiService,
    logService: LogService,
    stateService: StateService,
    userVerificationService: UserVerificationService,
    dialogService: DialogServiceAbstraction
  ) {
    super(
      router,
      i18nService,
      platformUtilsService,
      passwordGenerationService,
      policyService,
      cryptoService,
      messagingService,
      apiService,
      stateService,
      userVerificationService,
      logService,
      dialogService
    );
  }
}
