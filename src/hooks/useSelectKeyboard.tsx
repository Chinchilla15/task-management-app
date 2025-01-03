import React from "react";

export function useSelectKeyboard(
  isOpen: boolean,
  options: { value: string }[],
  // currentValue: string,
  onSelect: (value: string) => void,
  onClose: () => void,
) {
  const [focusedIndex, setFocusedIndex] = React.useState(0);
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          onClose();
          break;
        case "Tab":
          e.preventDefault();
          if (e.shiftKey) {
            setFocusedIndex((i) => (i - 1 + options.length) % options.length);
          } else {
            setFocusedIndex((i) => (i + 1) % options.length);
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((i) => (i + 1) % options.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((i) => (i - 1 + options.length) % options.length);
          break;
        case "Enter":
          e.preventDefault();
          onSelect(options[focusedIndex].value);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, options, focusedIndex, onSelect, onClose]);

  return { focusedIndex, listRef };
}
