import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";

import { AttachmentsComponent as BaseAttachmentsComponent } from "@bitwarden/angular/components/attachments.component";
import { ApiService } from "@bitwarden/common/abstractions/api.service";
import { CipherService } from "@bitwarden/common/abstractions/cipher.service";
import { CipherAttachmentApiServiceAbstraction } from "@bitwarden/common/abstractions/cipher/cipher-attachment-api.service.abstraction";
import { CryptoService } from "@bitwarden/common/abstractions/crypto.service";
import { FileDownloadService } from "@bitwarden/common/abstractions/fileDownload/fileDownload.service";
import { FileUploadService as FileUploadServiceAbstraction } from "@bitwarden/common/abstractions/fileUpload.service";
import { I18nService } from "@bitwarden/common/abstractions/i18n.service";
import { LogService } from "@bitwarden/common/abstractions/log.service";
import { PlatformUtilsService } from "@bitwarden/common/abstractions/platformUtils.service";
import { StateService } from "@bitwarden/common/abstractions/state.service";

@Component({
  selector: "app-vault-attachments",
  templateUrl: "attachments.component.html",
})
// eslint-disable-next-line rxjs-angular/prefer-takeuntil
export class AttachmentsComponent extends BaseAttachmentsComponent {
  openedAttachmentsInPopup: boolean;

  constructor(
    private cipherService: CipherService,
    cipherAttachmentApiService: CipherAttachmentApiServiceAbstraction,
    i18nService: I18nService,
    cryptoService: CryptoService,
    platformUtilsService: PlatformUtilsService,
    apiService: ApiService,
    private location: Location,
    private route: ActivatedRoute,
    stateService: StateService,
    logService: LogService,
    fileDownloadService: FileDownloadService,
    fileUploadService: FileUploadServiceAbstraction
  ) {
    super(
      cipherAttachmentApiService,
      i18nService,
      cryptoService,
      platformUtilsService,
      apiService,
      window,
      logService,
      stateService,
      fileDownloadService,
      fileUploadService
    );
  }

  async ngOnInit() {
    // eslint-disable-next-line rxjs-angular/prefer-takeuntil, rxjs/no-async-subscribe
    this.route.queryParams.pipe(first()).subscribe(async (params) => {
      this.cipherObject = await this.cipherService.get(params.cipherId);
      this.cipherId = params.cipherId;
      await this.init();
    });

    this.openedAttachmentsInPopup = history.length === 1;
  }

  back() {
    this.location.back();
  }

  close() {
    window.close();
  }
}