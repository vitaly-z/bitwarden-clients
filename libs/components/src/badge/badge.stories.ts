import { CommonModule } from "@angular/common";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";

import { BadgeDirective } from "./badge.directive";

export default {
  title: "Component Library/Badge",
  component: BadgeDirective,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
      declarations: [BadgeDirective],
    }),
  ],
  args: {
    badgeType: "primary",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Zt3YSeb6E6lebAffrNLa0h/Tailwind-Component-Library?node-id=1881%3A16956",
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <span class="tw-text-main">Span </span><span bitBadge [badgeType]="badgeType">Badge</span>
      <br><br>
      <span class="tw-text-main">Link </span><a href="#" bitBadge [badgeType]="badgeType">Badge</a>
      <br><br>
      <span class="tw-text-main">Button </span><button bitBadge [badgeType]="badgeType">Badge</button>
    `,
  }),
} as Meta;

type Story = StoryObj<BadgeDirective>;

export const Primary: Story = {
  args: { badgeType: "primary" },
};

export const Secondary: Story = {
  args: { badgeType: "secondary" },
};

export const Success: Story = {
  args: { badgeType: "success" },
};

export const Danger: Story = {
  args: { badgeType: "danger" },
};

export const Warning: Story = {
  args: { badgeType: "warning" },
};

export const Info: Story = {
  args: { badgeType: "info" },
};
