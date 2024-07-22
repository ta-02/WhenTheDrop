import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { type QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="p-2 flex gap-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{" "}
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
          <Link to="/profile" className="[&.active]:font-bold">
            Profile
          </Link>
          <ModeToggle />
        </div>
        <hr />
        <Outlet />
      </ThemeProvider>
    </>
  ),
  notFoundComponent: () => {
    return (
      <div className="text-lg">
        <Link to="/">Start Over</Link>
      </div>
    );
  },
});
