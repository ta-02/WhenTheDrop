import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { UserType } from "@kinde-oss/kinde-typescript-sdk";
import axios from "axios";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

const getUserData = async () => {
  const res = await axios.get("/api/me");
  return res.data.user;
};

function ProfilePage() {
  const { isPending, error, data } = useQuery<UserType>({
    queryKey: ["getUserData"],
    queryFn: getUserData,
  });

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const user = data;

  return (
    <div>
      <div>Hello {user.given_name}</div>
    </div>
  );
}
