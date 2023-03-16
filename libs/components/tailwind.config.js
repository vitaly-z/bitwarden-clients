/* eslint-disable */
const config = require("./tailwind.config.base");

config.content = [
  "libs/components/src/**/*.{html,ts,mdx}",
  "apps/web/src/**/*.{html,ts,mdx}",
  "bitwarden_license/bit-web/src/**/*.{html,ts,mdx}",
  ".storybook/preview.tsx",
];
config.safelist = [
  {
    pattern: /tw-bg-(.*)/,
  },
];

module.exports = config;
