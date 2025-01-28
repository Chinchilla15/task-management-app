import { createBrowserRouter, RouteObject } from "react-router";
import { paths } from "@/config/paths";
import MyTask from "@pages/MyTask";
import Dashboard from "@pages/Dashboard";
import NotFoundRoute from "@/pages/NotFound";
import BaseLayout from "@/components/layouts/BaseLayout";
import Profile from "@/pages/Profile";

const routes: RouteObject[] = [
  {
    path: paths.home,
    element: <BaseLayout />,
    errorElement: <NotFoundRoute />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: paths.tasks.my,
        element: <MyTask />,
      },
      {
        path: paths.profile,
        element: <Profile />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
