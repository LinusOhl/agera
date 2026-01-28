import {
  Button,
  Modal,
  PasswordInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CustomLoader } from "~/components/CustomLoader";
import { authClient } from "~/lib/auth-client";

export const Route = createFileRoute("/_authenticated/user")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const { data: session, isPending } = authClient.useSession();

  const [password, setPassword] = useState<string>("");

  const [opened, { open, close }] = useDisclosure();

  if (isPending) {
    return <CustomLoader />;
  }

  const handleLogout = async () => {
    await authClient.signOut({}, { onSuccess: () => navigate({ to: "/" }) });
  };

  const handleAccountDeletion = async () => {
    await authClient.deleteUser(
      {
        password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          close();
          navigate({ to: "/" });
        },
      },
    );
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

      <Modal opened={opened} onClose={close} title="Delete account">
        <Text>This will permanently delete your account. Are you sure?</Text>

        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />

        <Button color="red" onClick={handleAccountDeletion}>
          Delete account
        </Button>
        <Button color="dark" onClick={close}>
          Cancel
        </Button>
      </Modal>

      <Button color="red" onClick={open}>
        Delete account
      </Button>
    </Stack>
  );
}
