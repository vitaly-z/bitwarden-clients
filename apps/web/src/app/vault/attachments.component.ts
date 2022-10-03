import { Component } from "@angular/core";

import { AttachmentsComponent as BaseAttachmentsComponent } from "@bitwarden/angular/components/attachments.component";
import { ApiService } from "@bitwarden/common/abstractions/api.service";
import { CipherAttachmentApiServiceAbstraction } from "@bitwarden/common/abstractions/cipher/cipher-attachment-api.service.abstraction";
import { CryptoService } from "@bitwarden/common/abstractions/crypto.service";
import { FileDownloadService } from "@bitwarden/common/abstractions/fileDownload/fileDownload.service";
import { FileUploadService as FileUploadServiceAbstraction } from "@bitwarden/common/abstractions/fileUpload.service";
import { I18nService } from "@bitwarden/common/abstractions/i18n.service";
import { LogService } from "@bitwarden/common/abstractions/log.service";
import { PlatformUtilsService } from "@bitwarden/common/abstractions/platformUtils.service";
import { StateService } from "@bitwarden/common/abstractions/state.service";
import { AttachmentView } from "@bitwarden/common/models/view/attachmentView";

@Component({
  selector: "app-vault-attachments",
  templateUrl: "attachments.component.html",
})
export class AttachmentsComponent extends BaseAttachmentsComponent {
  viewOnly = false;

  constructor(
    cipherAttachmentApiService: CipherAttachmentApiServiceAbstraction,
    i18nService: I18nService,
    cryptoService: CryptoService,
    stateService: StateService,
    platformUtilsService: PlatformUtilsService,
    apiService: ApiService,
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

  protected async reupload(attachment: AttachmentView) {
    if (this.showFixOldAttachments(attachment)) {
      await this.reuploadCipherAttachment(attachment, false);
    }
  }

  protected showFixOldAttachments(attachment: AttachmentView) {
    return attachment.key == null && this.cipher.organizationId == null;
  }
}