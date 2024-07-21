import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { userQueryOptions } from "@/lib/api";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { isPending, error, data } = useQuery(userQueryOptions);
  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const user = data;

  return (
    <div>
      <div>Hello {user.given_name}</div>
    </div>
  );
}
