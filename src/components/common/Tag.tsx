import * as React from "react";
import { cn } from "@/lib/utils";
import { tagStyles } from "@/config/tagVariants";
import type { TagProps } from "@types";

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant = "neutral", icon: Icon, children, ...props }, ref) => {
    const classes = cn(tagStyles.base, tagStyles.variants[variant], className);

    return (
      <span className={classes} ref={ref} {...props}>
        {Icon && <Icon className="mr-1 inline-block" />}
        {children}
      </span>
    );
  },
);

Tag.displayName = "Tag";

export { Tag };
