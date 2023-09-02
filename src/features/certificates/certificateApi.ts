import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ICertificate } from "../../models/ICertificate";

export const certificateApi = createApi({
  reducerPath: "certificate/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  tagTypes: ["Certificate"],
  endpoints: (build) => ({
    fetchAllCertificates: build.query<ICertificate[], number>({
      query: (limit: number) => ({
        url: "/certificates",
        params: {
          _limit: limit,
        },
      }),
      providesTags: () => ["Certificate"],
    }),
    searchCertificates: build.query({
      query: (search: string) => ({
        url: `/certificates`,
        params: {
          q: search,
        },
      }),
      providesTags: () => ["Certificate"],
    }),
    createCertificate: build.mutation<ICertificate, ICertificate>({
      query: (certificate) => ({
        url: "/certificates",
        method: "POST",
        body: certificate,
      }),
      invalidatesTags: ["Certificate"],
    }),
    updateCertificate: build.mutation<ICertificate, ICertificate>({
      query: (certificate) => ({
        url: `/certificates/${certificate.id}`,
        method: "PUT",
        body: certificate,
      }),
      invalidatesTags: ["Certificate"],
    }),
    deleteCertificate: build.mutation<ICertificate, ICertificate>({
      query: (certificate) => ({
        url: `/certificates/${certificate.id}`,
        method: "DELETE",
        body: certificate,
      }),
      invalidatesTags: ["Certificate"],
    }),
  }),
});

export const {
  useFetchAllCertificatesQuery,
  useSearchCertificatesQuery,
  useCreateCertificateMutation,
  useUpdateCertificateMutation,
  useDeleteCertificateMutation,
} = certificateApi;
