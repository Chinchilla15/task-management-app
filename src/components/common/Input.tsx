// import { useState } from "react";
import Search from "@icons/Search.svg?react";
import Close from "@icons/Close.svg?react";
import type { InputProps } from "@types";

export default function Input({
  id = "search",
  placeholder = "Search",
  className = "",
  value,
  onChange,
  icon = true,
}: InputProps) {
  const handleClear = () => onChange?.("");

  return (
    <div className="relative flex items-center gap-6">
      {icon && (
        <label htmlFor={id}>
          <Search />
        </label>
      )}
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`bg-neutral-4 text-body-m text-neutral-2 focus:outline-none focus:ring-0 ${className}`}
        placeholder={placeholder}
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-2 text-neutral-2 hover:text-neutral-1"
        >
          <Close className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
