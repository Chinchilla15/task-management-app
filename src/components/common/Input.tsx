import { useState } from "react";
import Search from "@icons/Search.svg?react";
import Close from "@icons/Close.svg?react";

export default function Input() {
  const [value, setValue] = useState("");

  const handleClear = () => setValue("");

  return (
    <div className="relative flex items-center gap-6">
      <label htmlFor="search">
        <Search />
      </label>
      <input
        type="text"
        id="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-neutral-4 text-body-m text-neutral-2 focus:outline-none focus:ring-0"
        placeholder="Search"
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
