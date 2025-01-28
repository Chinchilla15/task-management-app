import { useGetProfileQuery, useGetTasksQuery } from "@graphql/graphql";

export function useUserProfile() {
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useGetProfileQuery();

  const {
    data: tasksData,
    loading: tasksLoading,
    error: tasksError,
  } = useGetTasksQuery({
    variables: {
      input: {
        assigneeId: userData?.profile?.id,
      },
    },
    skip: !userData?.profile?.id,
  });

  if (userError) console.error("Error fetching profile:", userError);
  if (tasksError) console.error("Error fetching tasks:", tasksError);

  return {
    currentUser: userData?.profile,
    tasks: tasksData?.tasks || [],
    loading: userLoading || tasksLoading,
    error: userError || tasksError,
  };
}
