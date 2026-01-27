import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "~/middlewares/auth-middleware";
import { TaskSchema } from "./schema";
import {
  createTask,
  deleteTask,
  fetchTask,
  fetchTasks,
  updateTask,
} from "./tasks.server";

export const createTaskFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(TaskSchema)
  .handler(async ({ data, context }) => {
    const userId = context.user.id;
    return await createTask(data, userId);
  });

export const fetchTasksFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const userId = context.user.id;
    return await fetchTasks(userId);
  });

export const fetchTaskFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data, context }) => {
    const userId = context.user.id;
    return await fetchTask(data.id, userId);
  });

export const deleteTaskFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ context, data }) => {
    const userId = context.user.id;
    return await deleteTask(data.id, userId);
  });

export const updateTaskFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(
    TaskSchema.extend({
      id: z.string(),
    }),
  )
  .handler(async ({ context, data }) => {
    const userId = context.user.id;
    return await updateTask(data.id, data, userId);
  });
