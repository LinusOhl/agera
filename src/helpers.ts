import type { Task } from "generated/prisma/client";
import { TASK_STATUS_LABELS, TaskStatuses } from "./constants";

export const taskStatusOptions = Object.values(TaskStatuses).map((status) => ({
  value: status,
  label: TASK_STATUS_LABELS[status],
}));

type SortDirection = "asc" | "desc";
type SortKey = "title" | "status" | "createdAt";

export const sortTasks = (
  tasks: Task[],
  key: SortKey,
  direction: SortDirection,
) => {
  switch (key) {
    case "title": {
      const sortedTasks = [...tasks].sort((a, b) => {
        if (direction === "asc") return a.title.localeCompare(b.title);
        if (direction === "desc") return b.title.localeCompare(a.title);
        return 0;
      });
      return sortedTasks;
    }
    case "createdAt": {
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
      break;
  }
};
