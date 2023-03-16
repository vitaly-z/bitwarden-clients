import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";

import { JslibModule } from "@bitwarden/angular/jslib.module";
import { InputModule } from "@bitwarden/components/src/input/input.module";

import { PreloadedEnglishI18nModule } from "../../../../tests/preloaded-english-i18n.module";

import { SearchInputComponent } from "./search-input.component";

export default {
  title: "Web/Organizations/Search Input",
  component: SearchInputComponent,
  decorators: [
    moduleMetadata({
      imports: [
        InputModule,
        FormsModule,
        ReactiveFormsModule,
        PreloadedEnglishI18nModule,
        JslibModule,
      ],
      providers: [],
    }),
  ],
} as Meta;

export const Default: StoryObj<SearchInputComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <app-search-input [(ngModel)]="searchText" [placeholder]="placeholder" [disabled]="disabled"></app-search-input>
    `,
  }),
};
