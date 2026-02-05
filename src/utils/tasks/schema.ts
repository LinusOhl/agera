import { z } from "zod";

const Statuses = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"] as const;
const Priorities = ["LOW", "MEDIUM", "HIGH"] as const;

export const TaskSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().nullable(),
  status: z.enum(Statuses),
  priority: z.enum(Priorities).nullable(),
});

export type TaskType = z.infer<typeof TaskSchema>;
