import { z } from "zod";

const Statuses = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"] as const;

export const TaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().nullable(),
  status: z.enum(Statuses),
});

export type TaskType = z.infer<typeof TaskSchema>;
