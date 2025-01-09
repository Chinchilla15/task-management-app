import { ViewType } from "@/types/types";
import { useOutletContext } from "react-router";

type ContextType = {
  viewType: ViewType;
  setViewType: (viewType: ViewType) => void;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
};

export function useLayout() {
  return useOutletContext<ContextType>();
}
