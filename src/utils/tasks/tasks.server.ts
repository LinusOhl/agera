import { prisma } from "~/lib/prisma";
import type { TaskCreateType } from "./schema";

export const createTask = async (data: TaskCreateType, userId: string) => {
  if (!data) {
    throw new Error("Missing data fields.");
  }

  console.log("data:", data, userId);
};

export const fetchTasks = async (userId: string) => {
  const tasks = await prisma.task.findMany({
    where: {
      userId,
    },
  });

  return tasks;
};
