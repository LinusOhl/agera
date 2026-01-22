import { Button, Center, Loader, Stack, Text, Title } from "@mantine/core";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { authClient } from "~/lib/auth-client";
import { useCreateTaskMutation } from "~/utils/tasks/queryOptions";

export const Route = createFileRoute("/_authenticated/user")({
  loader: ({ context }) => {
    // console.log(context.user.id);
  },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();
  const createTaskMutation = useCreateTaskMutation();

  if (isPending) {
    return (
      <Center mih={"100vh"}>
        <Loader color="dark" />
      </Center>
    );
  }

  const handleLogout = async () => {
    authClient.signOut({}, { onSuccess: () => navigate({ to: "/" }) });
  };

  const handleTaskCreation = async () => {
    createTaskMutation.mutate({
      data: {
        title: "First task",
        description: null,
        status: "NOT_STARTED",
      },
    });
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
