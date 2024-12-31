import TaskProvider from "./TaskProvider";
import TaskListView from "./views/TaskListView";
import TaskGridView from "./views/TaskGridView";
import TaskColumn from "./layout/TaskColumn";

export const Task = {
  Provider: TaskProvider,
  List: TaskListView,
  Grid: TaskGridView,
  Column: TaskColumn,
};
