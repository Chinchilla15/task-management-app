import { gql } from "@apollo/client";
import { useCreateTaskMutation } from "@/graphql/graphql";

export const useCreateTask = () => {
  const [createTask] = useCreateTaskMutation({
    update(cache, { data }) {
      if (!data?.createTask) return;
      cache.modify({
        fields: {
          tasks(existingTasks = []) {
            const newTaskRef = cache.writeFragment({
              data: data.createTask,
              fragment: gql`
                fragment NewTask on Task {
                  id
                  name
                  pointEstimate
                  assigneeId
                  tags
                  dueDate
                  status
                }
              `,
            });
            return [...existingTasks, newTaskRef];
          },
        },
      });
    },
  });

  return createTask;
};
