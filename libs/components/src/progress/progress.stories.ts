import { Meta, StoryObj } from "@storybook/angular";

import { ProgressComponent } from "./progress.component";

export default {
  title: "Component Library/Progress",
  component: ProgressComponent,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Zt3YSeb6E6lebAffrNLa0h/Tailwind-Component-Library?node-id=1881%3A18185&t=AM0acaIJ00BUhZKz-4",
    },
  },
  args: {
    showText: true,
    size: "default",
    bgColor: "primary",
  },
} as Meta;

type Story = StoryObj<ProgressComponent>;

export const Empty: Story = {
  args: {
    barWidth: 0,
  },
};

export const Full: Story = {
  args: {
    barWidth: 100,
  },
};

export const CustomText: Story = {
  args: {
    barWidth: 25,
    text: "Loading...",
  },
};
