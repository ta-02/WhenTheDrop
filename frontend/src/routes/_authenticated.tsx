import { Button } from "@/components/ui/button";
import { userQueryOptions } from "@/lib/api";
import { createFileRoute, Outlet } from "@tanstack/react-router";

const Login = () => {
  return (
    <div className="flex flex-col font-bold gap-y-4 w-[350px] m-auto mt-4">
      Please login
      <Button asChild>
        <a href="/api/login">Login!</a>
      </Button>
      <Button asChild>
        <a href="/api/register">Register!</a>
      </Button>
    </div>
  );
};

const Component = () => {
  const { user } = Route.useRouteContext();
  if (!user) {
    return <Login />;
  }
  return <Outlet />;
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;
    try {
      const data = await queryClient.fetchQuery(userQueryOptions);
      context.user = data;
    } catch (e) {
      console.log(e);
    }
  },
  component: Component,
});
