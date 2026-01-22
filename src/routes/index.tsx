import {
  Anchor,
  Button,
  Card,
  Divider,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBrandGithub } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "~/lib/auth-client";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleGithubLogin = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/user",
    });
  };

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
            Sign in
          </Text>

          <Anchor c={"dark"}>Need an account?</Anchor>
        </Group>

        <Card p={"lg"} radius={"md"} shadow="md">
          <Stack gap={"md"}>
            <Button
              variant="outline"
              color="dark"
              leftSection={<IconBrandGithub size={18} />}
              onClick={handleGithubLogin}
            >
              Sign in with GitHub
            </Button>

            <Divider label="or" />

            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <Stack gap={"sm"}>
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

                <Button type="submit" color="dark" fullWidth>
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
}
