import { Button, Modal, PasswordInput, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "~/lib/auth-client";

export const DeleteAccount = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState<string>("");

  const [opened, { open, close }] = useDisclosure();

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
    <>
      <Button color="red" onClick={open}>
        Delete account
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
    </>
  );
};
