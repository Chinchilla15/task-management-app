const buttonStyles = {
  base: "rounded-lg font-medium transition-all ease-out duration-300 focus:outline-none p-2",
  variants: {
    primary: "bg-primary-4 text-white hover:bg-primary-2 active:bg-primary-3",
    ghost: "text-blue-500 hover:bg-blue-50",
    "neutral-light": "bg-neutral-2 text-white hover:opacity-90",
    "neutral-dark": "bg-neutral-3 text-white hover:opacity-90",
    "transparent-white": "bg-transparent text-white hover:bg-white/10",
    "transparent-neutral":
      "bg-transparent text-neutral-2 hover:bg-neutral-2/10",
    bordered: "border border-primary-4 bg-transparent hover:bg-primary-4/10",
  },
  sizes: {
    sm: "px-3 py-1.5 text-sm",
    md: "text-base",
    lg: "px-6 py-3 text-lg",
  },
} as const;

export { buttonStyles };
