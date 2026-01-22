import {
  Button,
  Card,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { createFileRoute } from "@tanstack/react-router";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { CustomLink } from "~/components/CustomLink";

const SignUpSchema = z
  .object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine(
    (values) => {
      return values.confirmPassword === values.password;
    },
    {
      error: "Passwords does not match.",
      path: ["confirmPassword"],
    },
  );

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: zod4Resolver(SignUpSchema),
  });

  return (
    <Stack h={"100vh"} p={"xs"} gap={"xl"} justify="center">
      <Title
        order={1}
        fz={96}
        c={"dark"}
        styles={{ root: { textAlign: "center" } }}
      >
        agera
      </Title>

      <Stack gap={"xs"}>
        <Group justify="space-between">
          <Text fw={500} fz={24}>
            Sign up
          </Text>

          <CustomLink c={"dark"} to="/">
            Have an account?
          </CustomLink>
        </Group>

        <Card p={"lg"} radius={"md"} shadow="md">
          <Stack gap={"md"}>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <Stack gap={"sm"}>
                <TextInput
                  key={form.key("name")}
                  label="Name"
                  {...form.getInputProps("name")}
                />

                <TextInput
                  key={form.key("email")}
                  label="Email"
                  {...form.getInputProps("email")}
                />

                <PasswordInput
                  key={form.key("password")}
                  label="Password"
                  {...form.getInputProps("password")}
                />

                <PasswordInput
                  key={form.key("confirmPassword")}
                  label="Confirm password"
                  {...form.getInputProps("confirmPassword")}
                />

                <Button type="submit" color="dark" fullWidth>
                  Sign up
                </Button>
              </Stack>
            </form>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
}
