import { Badge, Button, Group, Stack, Text, Title } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { taskQueryOptions } from "~/utils/tasks/queryOptions";

export const Route = createFileRoute("/_authenticated/tasks/$taskId")({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(taskQueryOptions(params.taskId));
  },
  pendingComponent: () => <div>Loading...</div>,
  component: RouteComponent,
});

function RouteComponent() {
  const { taskId } = Route.useParams();
  const { data: task } = useSuspenseQuery(taskQueryOptions(taskId));

  return (
    <Stack p={"xs"} gap={"xl"}>
      <Stack gap={"xs"}>
        <Group justify="space-between">
          <Title order={1} c={"dark"}>
            {task?.title}
          </Title>

          <Badge>{task?.status}</Badge>
        </Group>

        <Text c={"dimmed"} fz={"md"}>
          {task?.createdAt.toLocaleString()}
        </Text>
      </Stack>

      {task?.description && (
        <Stack gap={"xs"}>
          <Text c={"dark"} fw={500} fz={"lg"}>
            Description:
          </Text>

          <Text c={"dark"}>{task.description}</Text>
        </Stack>
      )}

      <Button variant="outline" color="dark">
        Edit task
      </Button>
      <Button color="red">Delete task</Button>
    </Stack>
  );
}
