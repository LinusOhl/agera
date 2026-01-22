import { z } from "zod";

const Statuses = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"] as const;

export const TaskCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string().nullable(),
  status: z.enum(Statuses),
});

export type TaskCreateType = z.infer<typeof TaskCreateSchema>;
