import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";

import { I18nService } from "@bitwarden/common/abstractions/i18n.service";

import { I18nMockService } from "../utils/i18n-mock.service";

import { CalloutComponent } from "./callout.component";

export default {
  title: "Component Library/Callout",
  component: CalloutComponent,
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: I18nService,
          useFactory: () => {
            return new I18nMockService({
              warning: "Warning",
              error: "Error",
            });
          },
        },
      ],
    }),
  ],
  args: {
    type: "warning",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Zt3YSeb6E6lebAffrNLa0h/Tailwind-Component-Library?node-id=1881%3A17484",
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <bit-callout [type]="type" [title]="title">Content</bit-callout>
    `,
  }),
} as Meta;

type Story = StoryObj<CalloutComponent>;

export const Success: Story = {
  args: {
    type: "success",
    title: "Success",
  },
};

export const Info: Story = {
  args: {
    type: "info",
    title: "Info",
  },
};

export const Warning: Story = {
  args: { type: "warning" },
};

export const Danger: Story = {
  args: { type: "danger" },
};
