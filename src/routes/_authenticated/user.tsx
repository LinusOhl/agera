import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { authClient } from "~/lib/auth-client";
import { authMiddleware } from "~/middlewares/auth-middleware";

export const Route = createFileRoute("/_authenticated/user")({
  component: RouteComponent,
  server: {
    middleware: [authMiddleware],
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();

  return (
    <div>
      Hello "/user"!
      {session && <p>{session.user.id}</p>}
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
