import { queryOptions } from "@tanstack/react-query";
import { GetCurrentUser } from "./types";
import axios from "axios";

const getCurrentUser = async () => {
  return axios
    .get("/api/me")
    .then((res) => res.data)
    .catch((error) => {
      throw new Error("Failed to get user details" + error.message);
    });
};

export const userQueryOptions = queryOptions<GetCurrentUser>({
  queryKey: ["get-current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});
