import type { TaskCreateType } from "./schema";

export const createTask = async (data: TaskCreateType, userId: string) => {
  if (!data) {
    throw new Error("Missing data fields.");
  }

  console.log("data:", data, userId);
};
