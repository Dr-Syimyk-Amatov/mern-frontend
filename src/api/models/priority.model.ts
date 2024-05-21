import { SortParams } from "./sort.model";

export interface Priority {
  id: string;
  title: string;
  colors: {
    primary: string;
    secondary: string;
  };
  default?: boolean;
}

export interface CreatePriority {
  title: string;
  colors: {
    primary: string;
    secondary: string;
  };
  default?: boolean;
}

export type PrioritySortKey = keyof Pick<Priority, "title"> | `colors.${keyof Priority["colors"]}`;

export type GetPrioritiesParams = SortParams<PrioritySortKey>;
