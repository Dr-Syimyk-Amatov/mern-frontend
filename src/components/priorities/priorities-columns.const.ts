import { PrioritySortKey } from "../../api";

interface HeadCell {
  id: string;
  field: PrioritySortKey;
  label: string;
  type: "numeric" | "text" | "color";
  sortable: boolean;
}

export const prioritiesHeadCells: HeadCell[] = [
  {
    id: "title",
    field: "title",
    label: "Title",
    sortable: true,
    type: "text",
  },
  {
    id: "primaryColor",
    field: "colors.primary",
    label: "Primary Color",
    sortable: true,
    type: "color",
  },
  {
    id: "secondaryColor",
    field: "colors.secondary",
    label: "Secondary Color",
    sortable: true,
    type: "text",
  },
];
