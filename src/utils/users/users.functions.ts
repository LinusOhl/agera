import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "~/middlewares/auth-middleware";

export const getCurrentUserFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const user = context.user;

    return user;
  });
