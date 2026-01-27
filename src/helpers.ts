import { TASK_STATUS_LABELS, TaskStatuses } from "./constants";

export const taskStatusOptions = Object.values(TaskStatuses).map((status) => ({
  value: status,
  label: TASK_STATUS_LABELS[status],
}));
