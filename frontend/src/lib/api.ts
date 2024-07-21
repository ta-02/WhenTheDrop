import { UserType } from "@kinde-oss/kinde-typescript-sdk";
import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

const getCurrentUser = async () => {
  return axios
    .get("/api/me")
    .then((res) => res.data)
    .catch((error) => {
      throw new Error("Failed to get user details" + error.message);
    });
};

export const userQueryOptions = queryOptions<UserType>({
  queryKey: ["get-current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});
