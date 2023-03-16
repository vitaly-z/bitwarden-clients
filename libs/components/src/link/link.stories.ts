import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";

import { AnchorLinkDirective, ButtonLinkDirective } from "./link.directive";
import { LinkModule } from "./link.module";

export default {
  title: "Component Library/Link",
  decorators: [
    moduleMetadata({
      imports: [LinkModule],
    }),
  ],
  argTypes: {
    linkType: {
      options: ["primary", "secondary", "contrast"],
      control: { type: "radio" },
    },
  },
  args: {
    linkType: "primary",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Zt3YSeb6E6lebAffrNLa0h/Tailwind-Component-Library?node-id=1881%3A17419",
    },
  },
} as Meta;

export const Buttons: StoryObj<ButtonLinkDirective> = {
  render: (args) => ({
    props: args,
    template: `
      <div class="tw-p-2" [ngClass]="{ 'tw-bg-transparent': linkType != 'contrast', 'tw-bg-primary-500': linkType === 'contrast' }">
        <div class="tw-block tw-p-2">
          <button bitLink [linkType]="linkType">Button</button>
        </div>
        <div class="tw-block tw-p-2">
          <button bitLink [linkType]="linkType">
            <i class="bwi bwi-fw bwi-plus-circle" aria-hidden="true"></i>
            Add Icon Button
          </button>
        </div>
        <div class="tw-block tw-p-2">
          <button bitLink [linkType]="linkType">
            <i class="bwi bwi-fw bwi-sm bwi-angle-right" aria-hidden="true"></i>
            Chevron Icon Button
          </button>
        </div>
        <div class="tw-block tw-p-2">
          <button bitLink [linkType]="linkType" class="tw-text-sm">Small Button</button>
        </div>
      </div>
    `,
  }),
};

export const Anchors: StoryObj<AnchorLinkDirective> = {
  render: (args) => ({
    props: args,
    template: `
      <div class="tw-p-2" [ngClass]="{ 'tw-bg-transparent': linkType != 'contrast', 'tw-bg-primary-500': linkType === 'contrast' }">
        <div class="tw-block tw-p-2">
          <a bitLink [linkType]="linkType" href="#">Anchor</a>
        </div>
        <div class="tw-block tw-p-2">
          <a bitLink [linkType]="linkType" href="#">
            <i class="bwi bwi-fw bwi-plus-circle" aria-hidden="true"></i>
            Add Icon Anchor
          </a>
        </div>
        <div class="tw-block tw-p-2">
          <a bitLink [linkType]="linkType" href="#">
            <i class="bwi bwi-fw bwi-sm bwi-angle-right" aria-hidden="true"></i>
            Chevron Icon Anchor
          </a>
        </div>
        <div class="tw-block tw-p-2">
          <a bitLink [linkType]="linkType" class="tw-text-sm" href="#">Small Anchor</a>
        </div>
      </div>
    `,
  }),
};

export const Inline: StoryObj = {
  render: (args) => ({
    props: args,
    template: `
      <span class="tw-text-main">
        On the internet pargraphs often contain <a bitLink href="#">inline links</a>, but few know that <button bitLink>buttons</button> can be used for similar purposes.
      </span>
    `,
  }),
};

export const Disabled: StoryObj = {
  render: (args) => ({
    props: args,
    template: `
      <button bitLink disabled linkType="primary" class="tw-mr-2">Primary</button>
      <button bitLink disabled linkType="secondary" class="tw-mr-2">Secondary</button>
      <div class="tw-bg-primary-500 tw-p-2 tw-inline-block">
        <button bitLink disabled linkType="contrast" class="tw-mr-2">Contrast</button>
      </div>
    `,
  }),
  parameters: {
    controls: {
      exclude: ["linkType"],
      hideNoControlsWarning: true,
    },
  },
};
