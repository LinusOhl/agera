import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "~/lib/auth-client";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <p>Log in:</p>

      <button
        type="button"
        onClick={async () =>
          await authClient.signIn.social({
            provider: "github",
            callbackURL: "/user",
          })
        }
      >
        Log in
      </button>
    </div>
  );
}
