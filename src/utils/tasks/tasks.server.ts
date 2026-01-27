import { prisma } from "~/lib/prisma";
import type { TaskType } from "./schema";

export const createTask = async (data: TaskType, userId: string) => {
  const task = await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      status: data.status,
      userId,
    },
  });

  return task;
};

export const fetchTasks = async (userId: string) => {
  const tasks = await prisma.task.findMany({
    where: {
      userId,
    },
  });

  return tasks;
};

export const fetchTask = async (id: string, userId: string) => {
  const task = await prisma.task.findUnique({
    where: {
      id,
      userId,
    },
  });

  return task;
};

export const deleteTask = async (id: string, userId: string) => {
  const task = await prisma.task.delete({
    where: {
      id,
      userId,
    },
  });

  return task;
};

export const updateTask = async (
  id: string,
  data: TaskType,
  userId: string,
) => {
  const task = await prisma.task.update({
    where: {
      id,
      userId,
    },
    data,
  });

  return task;
};
