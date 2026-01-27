import {
  Badge,
  Button,
  Drawer,
  Flex,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronRight } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { CustomLink } from "~/components/CustomLink";
import { taskStatusOptions } from "~/helpers";
import {
  tasksQueryOptions,
  useCreateTaskMutation,
} from "~/utils/tasks/queryOptions";
import { TaskSchema, type TaskType } from "~/utils/tasks/schema";

export const Route = createFileRoute("/_authenticated/tasks/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(tasksQueryOptions());
  },
  component: RouteComponent,
});

function RouteComponent() {
  const theme = useMantineTheme();

  const { data: tasks } = useSuspenseQuery(tasksQueryOptions());
  const createTaskMutation = useCreateTaskMutation();

  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm<TaskType>({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      description: "",
      status: "NOT_STARTED",
    },
    validate: zod4Resolver(TaskSchema),
  });

  const handleTaskCreation = async (data: TaskType) => {
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
        <Stack>
          {tasks.map((task) => (
            <CustomLink
              key={task.id}
              to="/tasks/$taskId"
              params={{ taskId: task.id }}
              underline="never"
            >
              <Paper p={"xs"} shadow="xs">
                <Flex justify={"space-between"} align={"center"} mb={"md"}>
                  <Text c={"dark"}>{task.title}</Text>
                  <IconChevronRight color={theme.colors.dark[6]} />
                </Flex>

                <Flex justify={"space-between"} align={"center"}>
                  <Badge>{task.status}</Badge>
                  <Text fz={"sm"} c={"dimmed"}>
                    {task.createdAt.toLocaleString()}
                  </Text>
                </Flex>
              </Paper>
            </CustomLink>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
