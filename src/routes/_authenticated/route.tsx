import { Tabs } from "@mantine/core";
import {
  createFileRoute,
  Outlet,
  useLocation,
  useNavigate,
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
  const navigate = useNavigate();
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  if (isLoading) {
    return <CustomLoader />;
  }

  return (
    <>
      <Outlet />

      <Tabs
        value={pathname}
        variant="outline"
        style={{ position: "fixed", bottom: 0 }}
        onChange={(value) => navigate({ to: `${value}` })}
      >
        <Tabs.List>
          <Tabs.Tab value="/tasks">Tasks</Tabs.Tab>
          <Tabs.Tab value="/user">User</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </>
  );
}
