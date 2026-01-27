import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { CustomLoader } from "~/components/CustomLoader";
import { getCurrentUserFn } from "~/utils/users/users.functions";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    const user = await getCurrentUserFn();
    return { user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { isLoading } = useRouterState();

  if (isLoading) {
    return <CustomLoader />;
  }

  return <Outlet />;
}
