const COLUMN_WIDTHS = {
  name: "w-[35%]",
  tags: "w-[15%]",
  estimate: "w-[15%]",
  assignee: "w-[20%]",
  dueDate: "w-[15%]",
} as const;

const tableCellStyles =
  "border-r border-neutral-3 p-4 text-left font-normal text-neutral-1";

export { COLUMN_WIDTHS, tableCellStyles };
