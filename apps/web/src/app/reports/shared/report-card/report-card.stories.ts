import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";

import { JslibModule } from "@bitwarden/angular/jslib.module";
import { I18nService } from "@bitwarden/common/abstractions/i18n.service";
import { BadgeModule, I18nMockService, IconModule } from "@bitwarden/components";

import { PremiumBadgeComponent } from "../../../vault/components/premium-badge.component";
import { ReportExposedPasswords } from "../../icons/report-exposed-passwords.icon";
import { ReportVariant } from "../models/report-variant";

import { ReportCardComponent } from "./report-card.component";

export default {
  title: "Web/Reports/Card",
  component: ReportCardComponent,
  decorators: [
    moduleMetadata({
      imports: [JslibModule, BadgeModule, IconModule],
      declarations: [PremiumBadgeComponent],
      providers: [
        {
          provide: I18nService,
          useFactory: () => {
            return new I18nMockService({
              premium: "Premium",
            });
          },
        },
      ],
    }),
  ],
  args: {
    title: "Exposed Passwords",
    description:
      "Passwords exposed in a data breach are easy targets for attackers. Change these passwords to prevent potential break-ins.",
    icon: ReportExposedPasswords,
    variant: ReportVariant.Enabled,
  },
} as Meta;

type Story = StoryObj<ReportCardComponent>;

export const Enabled: Story = {};

export const RequiresPremium: Story = {
  args: { variant: ReportVariant.RequiresPremium },
};

export const RequiresUpgrade: Story = {
  args: { variant: ReportVariant.RequiresUpgrade },
};
