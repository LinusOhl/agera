import { Priority, Status } from "generated/prisma/enums";

export const BASE_URL_LOCAL = "http://localhost:3000";

export const TASK_STATUS_LABELS: Record<Status, string> = {
  [Status.NOT_STARTED]: "Not started",
  [Status.IN_PROGRESS]: "In progress",
  [Status.COMPLETED]: "Completed",
};

export const TASK_PRIORITY_LABELS: Record<Priority, string> = {
  [Priority.LOW]: "Low",
  [Priority.MEDIUM]: "Medium",
  [Priority.HIGH]: "High",
};

export enum SortKeys {
  TITLE = "TITLE",
  CREATED_AT = "CREATED_AT",
}

export const SORT_KEY_LABELS: Record<SortKeys, string> = {
  [SortKeys.TITLE]: "Title",
  [SortKeys.CREATED_AT]: "Created at",
};
