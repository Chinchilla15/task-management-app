import { useContext, createContext } from "react";
import type { AvatarContextValue } from "@types";

export const AvatarContext = createContext<AvatarContextValue | undefined>(
  undefined,
);

export const useAvatarContext = () => {
  const context = useContext(AvatarContext);
  if (!context) throw new Error("Avatar components must be used within Avatar");
  return context;
};
