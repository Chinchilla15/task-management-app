import { FilterTaskInput, useGetTasksQuery } from "@/graphql/graphql";
import { useEffect, useState } from "react";
import { useLayout } from "./useLayout";

export const useFilterTask = (assigneeId?: string) => {
  const { searchQuery } = useLayout();
  const [filterInput, setFilterInput] = useState<FilterTaskInput>({
    assigneeId: assigneeId || undefined,
  });

  useEffect(() => {
    setFilterInput((prev) => ({
      ...prev,
      name: searchQuery || undefined,
    }));
  }, [searchQuery]);

  const { data, loading } = useGetTasksQuery({
    variables: { input: filterInput },
    skip: !filterInput,
  });

  return {
    tasks: data?.tasks || [],
    loading,
  };
};
