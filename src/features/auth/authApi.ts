// userApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../models/IUser";

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (build) => ({
    getUsers: build.query<Array<IUser>, void>({
      query: () => "users",
    }),
    getUser: build.query<IUser, void>({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery } = authApi;
