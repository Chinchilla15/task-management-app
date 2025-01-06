import { TaskTag } from "@/graphql/graphql";
import { getTagDisplay } from "@/lib/utils";
import { useMemo } from "react";

export const useTagOptions = () => {
  return useMemo(
    () =>
      Object.values(TaskTag).map((tag) => ({
        value: tag,
        label: getTagDisplay(tag),
      })),
    [],
  );
};
