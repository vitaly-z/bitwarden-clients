import remarkGfm from "remark-gfm";
import { StorybookConfig } from "@storybook/angular";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const config: StorybookConfig = {
  stories: [
    "../libs/components/src/**/*.mdx",
    "../libs/components/src/**/*.stories.@(js|jsx|ts|tsx)",
    "../apps/web/src/**/*.mdx",
    "../apps/web/src/**/*.stories.@(js|jsx|ts|tsx)",
    "../bitwarden_license/bit-web/src/**/*.mdx",
    "../bitwarden_license/bit-web/src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    {
      name: "@storybook/addon-essentials",
      options: {
        docs: false,
      },
    },
    "@storybook/addon-a11y",
    "storybook-addon-designs",
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  framework: {
    name: "@storybook/angular",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  webpackFinal: async (config, { configType }) => {
    if (config.resolve) {
      config.resolve.plugins = [new TsconfigPathsPlugin()] as any;
    }
    return config;
  },
  docs: {
    autodocs: true,
  },
};

export default config;
