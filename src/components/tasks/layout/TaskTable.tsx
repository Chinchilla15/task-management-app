import { TableContext, useTableContext } from "@/context/TableContext";
import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";
import { COLUMN_WIDTHS } from "@/config/tableStyles";
import { TableBodyProps, TableHeaderProps, TableProps } from "@types";

// Root Table Component
const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, status, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <TableContext.Provider
        value={{ isOpen, setIsOpen, status, columnWidths: COLUMN_WIDTHS }}
      >
        <table
          ref={ref}
          className={cn("w-full border-collapse border-spacing-0", className)}
          {...props}
        />
      </TableContext.Provider>
    );
  },
);

// Table Header Component
const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => {
    const { isOpen, setIsOpen } = useTableContext();

    return (
      <thead
        ref={ref}
        className={cn("cursor-pointer bg-neutral-4", className)}
        onClick={() => setIsOpen(!isOpen)}
        {...props}
      />
    );
  },
);

// Table Body Component
const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => {
    const { isOpen } = useTableContext();

    if (!isOpen) return null;

    return (
      <tbody ref={ref} className={cn("bg-neutral-4", className)} {...props} />
    );
  },
);

Table.displayName = "Table";
TableHeader.displayName = "TableHeader";
TableBody.displayName = "TableBody";

export { Table, TableHeader, TableBody };
