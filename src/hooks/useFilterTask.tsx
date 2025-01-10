import { FilterTaskInput, useGetTasksQuery } from "@/graphql/graphql";
import { useLayout } from "./useLayout";

export const useFilterTask = (assigneeId?: string) => {
  const { searchQuery } = useLayout();

  const filterInput: FilterTaskInput = {
    assigneeId: assigneeId || undefined,
    name: searchQuery || undefined,
  };

  const { data, loading, error } = useGetTasksQuery({
    variables: { input: filterInput },
    skip: !filterInput,
  });

  return {
    tasks: data?.tasks || [],
    loading,
    error,
  };
};
