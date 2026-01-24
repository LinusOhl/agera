import {
  Button,
  Drawer,
  List,
  ListItem,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { TASK_STATUS_LABELS, TaskStatuses } from "~/constants";
import {
  tasksQueryOptions,
  useCreateTaskMutation,
} from "~/utils/tasks/queryOptions";
import { TaskCreateSchema, type TaskCreateType } from "~/utils/tasks/schema";

export const Route = createFileRoute("/_authenticated/tasks/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(tasksQueryOptions());
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data: tasks } = useSuspenseQuery(tasksQueryOptions());
  const createTaskMutation = useCreateTaskMutation();
  const [opened, { open, close }] = useDisclosure(false);

  const taskStatusOptions = Object.values(TaskStatuses).map((status) => ({
    value: status,
    label: TASK_STATUS_LABELS[status],
  }));

  const form = useForm<TaskCreateType>({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      description: "",
      status: "NOT_STARTED",
    },
    validate: zod4Resolver(TaskCreateSchema),
  });

  const handleTaskCreation = async (data: TaskCreateType) => {
    createTaskMutation.mutate({
      data: {
        title: data.title,
        description: data.description || null,
        status: data.status,
      },
    });

    close();
    form.reset();
  };

  return (
    <Stack p={"xs"} gap={"xl"}>
      <Title order={1} c={"dark"}>
        Your tasks
      </Title>

      <Drawer
        opened={opened}
        onClose={close}
        position="bottom"
        size={"lg"}
        title="Create a new task"
      >
        <form onSubmit={form.onSubmit((values) => handleTaskCreation(values))}>
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
              Create task
            </Button>
          </Stack>
        </form>
      </Drawer>

      <Button color="dark" onClick={open}>
        Create task
      </Button>

      {tasks.length === 0 ? (
        <Text c={"dimmed"} fs={"italic"}>
          No existing tasks.
        </Text>
      ) : (
        <List>
          {tasks.map((task) => (
            <ListItem key={task.id}>{task.title}</ListItem>
          ))}
        </List>
      )}
    </Stack>
  );
}
