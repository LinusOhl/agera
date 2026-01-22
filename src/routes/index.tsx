import {
  Alert,
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
import { IconBrandGithub, IconExclamationCircle } from "@tabler/icons-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CustomLink } from "~/components/CustomLink";
import { authClient } from "~/lib/auth-client";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleEmailSignIn = async (email: string, password: string) => {
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => navigate({ to: "/user" }),
        onError: ({ error }) => setError(error.message),
      },
    );
  };

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

          <CustomLink c={"dark"} to="/signup">
            Need an account?
          </CustomLink>
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

            {error && (
              <Alert
                title="Error"
                variant="light"
                color="red"
                radius={"md"}
                icon={<IconExclamationCircle size={18} />}
              >
                {error}
              </Alert>
            )}

            <form
              onSubmit={form.onSubmit((values) =>
                handleEmailSignIn(values.email, values.password),
              )}
            >
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
