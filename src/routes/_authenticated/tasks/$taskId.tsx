import {
  Badge,
  Button,
  Drawer,
  Group,
  Modal,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { taskStatusOptions } from "~/helpers";
import {
  taskQueryOptions,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "~/utils/tasks/queryOptions";
import { TaskSchema, type TaskType } from "~/utils/tasks/schema";

export const Route = createFileRoute("/_authenticated/tasks/$taskId")({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(taskQueryOptions(params.taskId));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { taskId } = Route.useParams();

  const { data: task } = useSuspenseQuery(taskQueryOptions(taskId));
  const deleteTaskMutation = useDeleteTaskMutation();
  const updateTaskMutation = useUpdateTaskMutation();

  const [modalOpened, { open: modalOpen, close: modalClose }] =
    useDisclosure(false);
  const [drawerOpened, { open: drawerOpen, close: drawerClose }] =
    useDisclosure(false);

  const handleTaskDeletion = async () => {
    deleteTaskMutation.mutate(
      {
        data: {
          id: taskId,
        },
      },
      {
        onSuccess: () => {
          modalClose();
          navigate({ to: "/tasks" });
        },
      },
    );
  };

  const form = useForm<TaskType>({
    mode: "uncontrolled",
    initialValues: {
      title: task?.title || "",
      description: task?.description || "",
      status: task?.status || "NOT_STARTED",
    },
    validate: zod4Resolver(TaskSchema),
  });

  const handleTaskUpdate = async (data: TaskType) => {
    updateTaskMutation.mutate(
      {
        data: {
          id: taskId,
          title: data.title,
          description: data.description,
          status: data.status,
        },
      },
      {
        onSuccess: () => drawerClose(),
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

          <Badge
            color={
              task?.status === "COMPLETED"
                ? "green"
                : task?.status === "IN_PROGRESS"
                  ? "orange"
                  : "gray"
            }
          >
            {task?.status}
          </Badge>
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

      <Drawer
        opened={drawerOpened}
        onClose={drawerClose}
        position="bottom"
        size={"lg"}
        title="Update task"
      >
        <form onSubmit={form.onSubmit((values) => handleTaskUpdate(values))}>
          <Stack gap={"sm"}>
            <TextInput
              key={form.key("title")}
              label="Task title"
              withAsterisk
              {...form.getInputProps("title")}
            />

            <TextInput
              key={form.key("description")}
              label="Task description"
              description="(optional)"
              {...form.getInputProps("description")}
            />

            <Select
              key={form.key("status")}
              label="Task status"
              data={taskStatusOptions}
              comboboxProps={{ position: "bottom-start" }}
              withAsterisk
              {...form.getInputProps("status")}
            />

            <Button type="submit" color="dark">
              Update task
            </Button>
          </Stack>
        </form>
      </Drawer>

      <Button variant="outline" color="dark" onClick={drawerOpen}>
        Edit task
      </Button>

      <Modal opened={modalOpened} onClose={modalClose} title="Confirm deletion">
        <Text mb={"md"}>Are you sure you want to delete the task?</Text>

        <Group gap={"sm"} grow>
          <Button color="red" onClick={handleTaskDeletion}>
            Delete task
          </Button>

          <Button variant="light" color="dark" onClick={modalClose}>
            Cancel
          </Button>
        </Group>
      </Modal>

      <Button color="red" onClick={modalOpen}>
        Delete task
      </Button>
    </Stack>
  );
}
