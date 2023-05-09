import { DialogModule } from "@angular/cdk/dialog";
import { Component } from "@angular/core";
import { Meta, moduleMetadata, Story } from "@storybook/angular";

import { SimpleDialogType, SimpleDialogOptions } from "@bitwarden/angular/services/dialog";
import { I18nService } from "@bitwarden/common/abstractions/i18n.service";

import { ButtonModule } from "../../button";
import { CalloutModule } from "../../callout";
import { IconButtonModule } from "../../icon-button";
import { SharedModule } from "../../shared/shared.module";
import { I18nMockService } from "../../utils/i18n-mock.service";
import { DialogService } from "../dialog.service";
import { DialogCloseDirective } from "../directives/dialog-close.directive";
import { DialogTitleContainerDirective } from "../directives/dialog-title-container.directive";
import { SimpleDialogComponent } from "../simple-dialog/simple-dialog.component";

@Component({
  template: `
    <div *ngFor="let group of dialogs">
      <h2>{{ group.title }}</h2>
      <div class="tw-mb-4 tw-flex tw-flex-row tw-gap-2">
        <button
          *ngFor="let dialog of group.dialogs"
          bitButton
          (click)="openSimpleConfigurableDialog(dialog)"
        >
          {{ dialog.title }}
        </button>
      </div>
    </div>

    <bit-callout *ngIf="showCallout" [type]="calloutType" title="Dialog Close Result">
      {{ dialogCloseResult }}
    </bit-callout>
  `,
})
class StoryDialogComponent {
  protected dialogs: { title: string; dialogs: SimpleDialogOptions[] }[] = [
    {
      title: "Regular",
      dialogs: [
        {
          title: this.i18nService.t("primaryTypeSimpleDialog"),
          content: this.i18nService.t("dialogContent"),
          type: SimpleDialogType.PRIMARY,
        },
        {
          title: this.i18nService.t("successTypeSimpleDialog"),
          content: this.i18nService.t("dialogContent"),
          type: SimpleDialogType.SUCCESS,
        },
        {
          title: this.i18nService.t("infoTypeSimpleDialog"),
          content: this.i18nService.t("dialogContent"),
          type: SimpleDialogType.INFO,
        },
        {
          title: this.i18nService.t("warningTypeSimpleDialog"),
          content: this.i18nService.t("dialogContent"),
          type: SimpleDialogType.WARNING,
        },
        {
          title: this.i18nService.t("dangerTypeSimpleDialog"),
          content: this.i18nService.t("dialogContent"),
          type: SimpleDialogType.DANGER,
        },
      ],
    },
    {
      title: "Custom",
      dialogs: [
        {
          title: this.i18nService.t("primaryTypeSimpleDialog"),
          content: this.i18nService.t("dialogContent"),
          type: SimpleDialogType.PRIMARY,
          acceptButtonText: "Ok",
          cancelButtonText: null,
        },
        {
          title: this.i18nService.t("primaryTypeSimpleDialog"),
          content: this.i18nService.t("dialogContent"),
          type: SimpleDialogType.PRIMARY,
          acceptButtonText: this.i18nService.t("accept"),
          cancelButtonText: this.i18nService.t("decline"),
        },
        {
          title: this.i18nService.t("primaryTypeSimpleDialog"),
          content: this.i18nService.t("dialogContent"),
          type: SimpleDialogType.PRIMARY,
          acceptButtonText: "Ok",
        },
      ],
    },
    {
      title: "Icon",
      dialogs: [
        {
          title: this.i18nService.t("primaryTypeSimpleDialog"),
          content: this.i18nService.t("dialogContent"),
          type: SimpleDialogType.PRIMARY,
          icon: "bwi-family",
        },
      ],
    },
    {
      title: "Additional",
      dialogs: [
        {
          title: this.i18nService.t("primaryTypeSimpleDialog"),
          content: this.i18nService.t("dialogContent"),
          type: SimpleDialogType.PRIMARY,
          disableClose: true,
        },
        {
          title: this.i18nService.t("asyncTypeSimpleDialog"),
          content: this.i18nService.t("dialogContent"),
          acceptAction: () => {
            return new Promise((resolve) => setTimeout(resolve, 10000));
          },
          type: SimpleDialogType.PRIMARY,
        },
      ],
    },
  ];

  showCallout = false;
  calloutType = "info";
  dialogCloseResult: boolean;

  constructor(public dialogService: DialogService, private i18nService: I18nService) {}

  async openSimpleConfigurableDialog(opts: SimpleDialogOptions) {
    this.dialogCloseResult = await this.dialogService.openSimpleDialog(opts);

    this.showCallout = true;
    if (this.dialogCloseResult) {
      this.calloutType = "success";
    } else {
      this.calloutType = "info";
    }
  }
}

export default {
  title: "Component Library/Dialogs/Service/SimpleConfigurable",
  component: StoryDialogComponent,
  decorators: [
    moduleMetadata({
      declarations: [DialogCloseDirective, DialogTitleContainerDirective, SimpleDialogComponent],
      imports: [SharedModule, IconButtonModule, ButtonModule, DialogModule, CalloutModule],
      providers: [
        DialogService,
        {
          provide: I18nService,
          useFactory: () => {
            return new I18nMockService({
              primaryTypeSimpleDialog: "Primary Type Simple Dialog",
              successTypeSimpleDialog: "Success Type Simple Dialog",
              infoTypeSimpleDialog: "Info Type Simple Dialog",
              warningTypeSimpleDialog: "Warning Type Simple Dialog",
              dangerTypeSimpleDialog: "Danger Type Simple Dialog",
              asyncTypeSimpleDialog: "Async",
              dialogContent: "Dialog content goes here",
              yes: "Yes",
              no: "No",
              ok: "Ok",
              cancel: "Cancel",
              accept: "Accept",
              decline: "Decline",
            });
          },
        },
      ],
    }),
  ],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Zt3YSeb6E6lebAffrNLa0h/Tailwind-Component-Library",
    },
  },
} as Meta;

const Template: Story<StoryDialogComponent> = (args: StoryDialogComponent) => ({
  props: args,
});

export const Default = Template.bind({});
