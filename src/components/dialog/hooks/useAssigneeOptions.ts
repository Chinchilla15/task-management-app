import { GetUsersQuery } from "@/graphql/graphql";
import { useMemo } from "react";

export const useAssigneeOptions = (usersData?: GetUsersQuery) => {
  return useMemo(
    () =>
      usersData?.users.map((user) => ({
        value: user.id,
        label: user.fullName,
        avatar: user.avatar || undefined,
      })) || [],
    [usersData],
  );
};
