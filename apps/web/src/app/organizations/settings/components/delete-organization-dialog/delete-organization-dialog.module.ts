import { NgModule } from "@angular/core";

import { UserVerificationModule } from "../../../../shared/components/user-verification";
import { SharedModule } from "../../../../shared/shared.module";

import { DeleteOrganizationDialogComponent } from "./delete-organization-dialog.component";

@NgModule({
  imports: [SharedModule, UserVerificationModule],
  declarations: [DeleteOrganizationDialogComponent],
  exports: [DeleteOrganizationDialogComponent],
})
export class DeleteOrganizationDialogModule {}
