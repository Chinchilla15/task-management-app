import * as React from "react";
import { cn } from "@/lib/utils";
import { buttonStyles } from "@/config/buttonVariants";
import type { ButtonProps } from "@types";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild,
      icon: Icon,
      noAnimation = false,
      children,
      ...props
    },
    ref,
  ) => {
    const classes = cn(
      buttonStyles.base,
      !noAnimation && buttonStyles.animation,
      buttonStyles.variants[variant],
      buttonStyles.sizes[size],
      className,
    );

    const content = (
      <>
        {Icon && <Icon />}
        {children}
      </>
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        ...props,
        className: classes,
        ref,
      });
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button, type ButtonProps };
