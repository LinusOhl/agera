import { createFileRoute, Outlet } from "@tanstack/react-router";
import { getCurrentUserFn } from "~/utils/users/users.functions";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    const user = await getCurrentUserFn();
    return { user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
