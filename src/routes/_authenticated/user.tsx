import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { authClient } from "~/lib/auth-client";
import { useCreateTaskMutation } from "~/utils/tasks/queryOptions";

export const Route = createFileRoute("/_authenticated/user")({
  loader: ({ context }) => {
    console.log(context.user.id);
  },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();
  const createTaskMutation = useCreateTaskMutation();

  if (isPending) {
    return <div>Loading...</div>;
  }

  const handleTaskCreation = async () => {
    createTaskMutation.mutate({
      data: {
        title: "First task",
        description: null,
        status: "NOT_STARTED",
      },
    });
  };

  return (
    <div>
      Hello "/user"!
      {session && <p>{session.user.id}</p>}
      <button type="button" onClick={handleTaskCreation}>
        Create task
      </button>
      <button
        type="button"
        onClick={() =>
          authClient.signOut({}, { onSuccess: () => navigate({ to: "/" }) })
        }
      >
        Log out
      </button>
    </div>
  );
}
