import { Button, Stack, Text, Title } from "@mantine/core";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CustomLoader } from "~/components/CustomLoader";
import { authClient } from "~/lib/auth-client";

export const Route = createFileRoute("/_authenticated/user")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <CustomLoader />;
  }

  const handleLogout = async () => {
    await authClient.signOut({}, { onSuccess: () => navigate({ to: "/" }) });
  };

  return (
    <Stack p={"xs"} gap={"xl"} justify="center">
      <Stack gap={0}>
        <Text fz={"lg"} fw={500} c={"dark"}>
          Greetings
        </Text>
        <Title order={1} fz={96} c={"dark"}>
          {session?.user.name}
        </Title>
      </Stack>

      <Button color="dark" onClick={handleLogout}>
        Log out
      </Button>
    </Stack>
  );
}
