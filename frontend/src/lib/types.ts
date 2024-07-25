import { UserType } from "@kinde-oss/kinde-typescript-sdk";

export type GetCurrentUser = {
  user: UserType;
};

export type Problem = {
  id: string;
  title: string;
  difficulty: string;
  category: string;
  order: number;
};
