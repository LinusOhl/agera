import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "~/lib/auth";

export const getCurrentUserFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const headers = getRequestHeaders();
    const user = await auth.api.getSession({ headers });

    if (!user) {
      throw redirect({ to: "/" });
    }

    return user.user;
  },
);
