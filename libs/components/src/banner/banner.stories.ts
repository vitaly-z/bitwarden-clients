import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";

import { I18nService } from "@bitwarden/common/abstractions/i18n.service";

import { IconButtonModule } from "../icon-button";
import { LinkModule } from "../link";
import { SharedModule } from "../shared/shared.module";
import { I18nMockService } from "../utils/i18n-mock.service";

import { BannerComponent } from "./banner.component";

export default {
  title: "Component Library/Banner",
  component: BannerComponent,
  decorators: [
    moduleMetadata({
      imports: [SharedModule, IconButtonModule, LinkModule],
      providers: [
        {
          provide: I18nService,
          useFactory: () => {
            return new I18nMockService({
              close: "Close",
            });
          },
        },
      ],
    }),
  ],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Zt3YSeb6E6lebAffrNLa0h/Tailwind-Component-Library?node-id=2070%3A17207",
    },
  },
  args: {
    bannerType: "warning",
  },
  argTypes: {
    onClose: { action: "onClose" },
  },
} as Meta;

type Story = StoryObj<BannerComponent>;

const Template: Story = {
  render: (args) => ({
    props: args,
    template: `
      <bit-banner [bannerType]="bannerType" (onClose)="onClose($event)">
        Content Really Long Text Lorem Ipsum Ipsum Ipsum
        <button bitLink linkType="contrast">Text Button</button>
      </bit-banner>
    `,
  }),
};

export const Premium: Story = {
  ...Template,
  args: { bannerType: "premium" },
};

export const Info: Story = {
  ...Template,
  args: { bannerType: "info" },
};

export const Warning: Story = {
  ...Template,
  args: { bannerType: "warning" },
};

export const Danger: Story = {
  ...Template,
  args: { bannerType: "danger" },
};
