import type { Task } from "generated/prisma/client";
import {
  SORT_KEY_LABELS,
  SortKeys,
  TASK_PRIORITY_LABELS,
  TASK_STATUS_LABELS,
  TaskPriorities,
  TaskStatuses,
} from "./constants";

export const taskStatusOptions = Object.values(TaskStatuses).map((status) => ({
  value: status,
  label: TASK_STATUS_LABELS[status],
}));

export const taskPriorityOptions = Object.values(TaskPriorities).map(
  (priority) => ({
    value: priority,
    label: TASK_PRIORITY_LABELS[priority],
  }),
);

export const sortKeyOptions = Object.values(SortKeys).map((key) => ({
  value: key,
  label: SORT_KEY_LABELS[key],
}));

export type SortDirection = "asc" | "desc";

export const sortTasks = (
  tasks: Task[],
  key: SortKeys | null,
  direction: SortDirection,
) => {
  switch (key) {
    case SortKeys.TITLE: {
      const sortedTasks = [...tasks].sort((a, b) => {
        if (direction === "asc") return a.title.localeCompare(b.title);
        if (direction === "desc") return b.title.localeCompare(a.title);
        return 0;
      });
      return sortedTasks;
    }
    case SortKeys.CREATED_AT: {
      const sortedTasks = [...tasks].sort((a, b) => {
        const aValue = Date.parse(a.createdAt.toLocaleString());
        const bValue = Date.parse(b.createdAt.toLocaleString());

        if (direction === "asc") return aValue - bValue;
        if (direction === "desc") return bValue - aValue;
        return 0;
      });
      return sortedTasks;
    }
    default:
      return tasks;
  }
};

export const getProperStatusName = (name: string) => {
  switch (name) {
    case TaskStatuses.NOT_STARTED:
      return "Not started";
    case TaskStatuses.IN_PROGRESS:
      return "In progress";
    case TaskStatuses.COMPLETED:
      return "Completed";
    default:
      return "";
  }
};

export const filterTasks = (
  tasks: Task[],
  key: TaskStatuses | TaskPriorities,
): Task[] => {
  if (key in TaskStatuses) {
    return tasks.filter((task) => task.status === key);
  }

  if (key in TaskPriorities) {
    return tasks.filter((task) => task.priority === key);
  }

  return tasks;
};
