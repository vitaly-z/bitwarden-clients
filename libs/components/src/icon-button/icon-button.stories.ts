import { Meta, StoryObj } from "@storybook/angular";

import { BitIconButtonComponent, IconButtonType } from "./icon-button.component";

const buttonTypes: IconButtonType[] = [
  "contrast",
  "main",
  "muted",
  "primary",
  "secondary",
  "danger",
  "light",
];

export default {
  title: "Component Library/Icon Button",
  component: BitIconButtonComponent,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Zt3YSeb6E6lebAffrNLa0h/Tailwind-Component-Library?node-id=4369%3A16686",
    },
  },
  args: {
    bitIconButton: "bwi-plus",
    size: "default",
    disabled: false,
    buttonTypes: buttonTypes,
  },
  argTypes: {
    buttonTypes: { table: { disable: true } },
  },
} as Meta;

type Story = StoryObj<BitIconButtonComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <table class="tw-border-spacing-2 tw-text-center tw-text-main">
        <thead>
          <tr>
            <td></td>
            <td *ngFor="let buttonType of buttonTypes" class="tw-capitalize tw-font-bold tw-p-4"
              [class.tw-text-contrast]="['contrast', 'light'].includes(buttonType)"
              [class.tw-bg-primary-500]="['contrast', 'light'].includes(buttonType)">{{buttonType}}</td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td class="tw-font-bold tw-p-4 tw-text-left">Default</td>
              <td *ngFor="let buttonType of buttonTypes" class="tw-p-2" [class.tw-bg-primary-500]="['contrast', 'light'].includes(buttonType)">
                <button
                  [bitIconButton]="bitIconButton"
                  [buttonType]="buttonType"
                  [size]="size"
                  title="Example icon button"
                  aria-label="Example icon button"></button>
              </td>
          </tr>

          <tr>
            <td class="tw-font-bold tw-p-4 tw-text-left">Disabled</td>
              <td *ngFor="let buttonType of buttonTypes" class="tw-p-2" [class.tw-bg-primary-500]="['contrast', 'light'].includes(buttonType)">
                <button
                  [bitIconButton]="bitIconButton"
                  [buttonType]="buttonType"
                  [size]="size"
                  disabled
                  title="Example icon button"
                  aria-label="Example icon button"></button>
              </td>
          </tr>

          <tr>
            <td class="tw-font-bold tw-p-4 tw-text-left">Loading</td>
              <td *ngFor="let buttonType of buttonTypes" class="tw-p-2" [class.tw-bg-primary-500]="['contrast', 'light'].includes(buttonType)">
                <button
                  [bitIconButton]="bitIconButton"
                  [buttonType]="buttonType"
                  [size]="size"
                  loading="true"
                  title="Example icon button"
                  aria-label="Example icon button"></button>
              </td>
          </tr>
        </tbody>
      </table>
    `,
  }),
};

export const Small: Story = {
  render: Default.render,
  args: {
    size: "small",
  },
};
