export const paths = {
  home: "/",
  dashboard: "/dashboard",
  tasks: {
    root: "/tasks",
    my: "/my-tasks",
    getEditParams: (taskId: string) => `?edit=${taskId}`,
  },
  profile: "/profile",
} as const;
