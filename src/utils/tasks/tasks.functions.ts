import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "~/middlewares/auth-middleware";
import { TaskCreateSchema } from "./schema";
import { createTask, fetchTask, fetchTasks } from "./tasks.server";

export const createTaskFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(TaskCreateSchema)
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
