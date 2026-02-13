import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "~/middlewares/auth-middleware";
import { TeamSchema } from "./schema";
import { createTeam } from "./teams.server";

export const createTeamFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(TeamSchema)
  .handler(async ({ data, context }) => {
    const userId = context.user.id;
    return await createTeam(data, userId);
  });
