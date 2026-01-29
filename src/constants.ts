export const BASE_URL_LOCAL = "http://localhost:3000";

export enum TaskStatuses {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export const TASK_STATUS_LABELS: Record<TaskStatuses, string> = {
  [TaskStatuses.NOT_STARTED]: "Not started",
  [TaskStatuses.IN_PROGRESS]: "In progress",
  [TaskStatuses.COMPLETED]: "Completed",
};

export enum SortKeys {
  TITLE = "TITLE",
  CREATED_AT = "CREATED_AT",
}

export const SORT_KEY_LABELS: Record<SortKeys, string> = {
  [SortKeys.TITLE]: "Title",
  [SortKeys.CREATED_AT]: "Created at",
};
