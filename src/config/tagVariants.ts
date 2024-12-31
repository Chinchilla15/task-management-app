const tagStyles = {
  base: "rounded-[4px] flex py-1 px-4 justify-center items-center gap-2 font-semibold text-body-m",
  variants: {
    success: "bg-opacity-10 bg-green-500 text-secondary-4",
    error: "bg-opacity-10 bg-red-500 text-primary-4",
    warning: "bg-opacity-10 bg-yellow-500 text-tertiary-4",
    info: "bg-opacity-10 bg-blue-500 text-blue-500",
    neutral: "bg-opacity-10 bg-neutral-500 text-neutral-1",
    successOutline: "border border-green-500 text-secondary-4",
    errorOutline: "border border-red-500 text-primary-4",
    warningOutline: "border border-yellow-500 text-tertiary-4",
    infoOutline: "border border-blue-500 text-blue-500",
    neutralOutline: "border border-neutral-500 text-neutral-1",
  },
} as const;

export { tagStyles };
