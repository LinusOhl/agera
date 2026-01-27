import { Badge, Button, Group, Modal, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  taskQueryOptions,
  useDeleteTaskMutation,
} from "~/utils/tasks/queryOptions";

export const Route = createFileRoute("/_authenticated/tasks/$taskId")({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(taskQueryOptions(params.taskId));
  },
  pendingComponent: () => <div>Loading...</div>,
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { taskId } = Route.useParams();

  const { data: task } = useSuspenseQuery(taskQueryOptions(taskId));
  const deleteTaskMutation = useDeleteTaskMutation();

  const [opened, { open, close }] = useDisclosure(false);

  const handleTaskDeletion = async () => {
    deleteTaskMutation.mutate(
      {
        data: {
          id: taskId,
        },
      },
      {
        onSuccess: () => {
          close();
          navigate({ to: "/tasks" });
        },
      },
    );
  };

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

      <Modal opened={opened} onClose={close} title="Confirm deletion">
        <Text mb={"md"}>Are you sure you want to delete the task?</Text>

        <Group gap={"sm"} grow>
          <Button color="red" onClick={handleTaskDeletion}>
            Delete task
          </Button>

          <Button variant="light" color="dark" onClick={close}>
            Cancel
          </Button>
        </Group>
      </Modal>

      <Button color="red" onClick={open}>
        Delete task
      </Button>
    </Stack>
  );
}
