import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "~/middlewares/auth-middleware";
import { TaskCreateSchema } from "./schema";
import { createTask, fetchTasks } from "./tasks.server";

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
