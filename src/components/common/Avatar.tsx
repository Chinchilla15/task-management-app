import { cn } from "@lib/utils";
import { AvatarContext, useAvatarContext } from "@/context/useAvatarContext";
import { AvatarProps, AvatarImageProps, AvatarFallbackProps } from "@types";
import { forwardRef, useState } from "react";

// Avatar component to wrap the image and fallback
const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ size = "32", children, ...props }, ref) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const sizeClasses = {
      "32": "h-8 w-8",
      "40": "h-10 w-10",
      "48": "h-12 w-12",
    };

    return (
      <AvatarContext.Provider value={{ size, imageLoaded, setImageLoaded }}>
        <div
          ref={ref}
          className={cn(
            "relative flex shrink-0 overflow-hidden rounded-full",
            sizeClasses[size],
          )}
          {...props}
        >
          {children}
        </div>
      </AvatarContext.Provider>
    );
  },
);

// Image component to load the avatar image
const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ onLoadingStatusChange, ...props }, ref) => {
    const { setImageLoaded } = useAvatarContext();

    const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
      setImageLoaded(true);
      onLoadingStatusChange?.("loaded");
      props.onLoad?.(event);
    };

    const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
      setImageLoaded(false);
      onLoadingStatusChange?.("error");
      props.onError?.(event);
    };

    return (
      <img
        ref={ref}
        className={cn("aspect-square h-full w-full object-cover")}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    );
  },
);

// Fallback component to show when the image is not loaded
const AvatarFallback = forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => {
    const { imageLoaded } = useAvatarContext();

    if (imageLoaded) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "bg-muted absolute inset-0 flex h-full w-full items-center justify-center",
          className,
        )}
        {...props}
      />
    );
  },
);

Avatar.displayName = "Avatar";
AvatarImage.displayName = "AvatarImage";
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
