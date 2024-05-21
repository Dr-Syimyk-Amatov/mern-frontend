import { SortOrder } from "../../enums";

export interface SortParams<K extends string = string> {
  sortKey: K;
  sortOrder: SortOrder;
}
