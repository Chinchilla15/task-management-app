import { PointEstimate } from "@/graphql/graphql";
import { getPointEstimateDisplay } from "@/lib/utils";
import { useMemo } from "react";

export const usePointEstimateOptions = () => {
  return useMemo(
    () =>
      Object.values(PointEstimate).map((estimate) => ({
        value: estimate,
        label: getPointEstimateDisplay(estimate),
      })),
    [],
  );
};
