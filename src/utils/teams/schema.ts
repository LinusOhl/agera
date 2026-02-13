import { z } from "zod";

export const TeamSchema = z.object({
  name: z.string().trim().min(1),
});

export type TeamType = z.infer<typeof TeamSchema>;
