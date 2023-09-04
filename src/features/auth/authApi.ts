import { IUser } from "../../models/IUser";
import { apiSlice } from "../api/apiSlice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<Array<IUser>, void>({
      query: () => "/users",
    }),
    getUser: build.query<IUser, void>({
      query: (id) => `/users/${id}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetUsersQuery, useGetUserQuery } = extendedApi;
