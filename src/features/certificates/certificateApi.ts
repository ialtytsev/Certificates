import { ICertificate } from "../../models/ICertificate";
import { apiSlice } from "../api/apiSlice";

type CertificatesResponse = ICertificate[];

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    fetchAllCertificates: build.query<CertificatesResponse, void>({
      query: () => ({
        url: "/certificates",
      }),
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "Certificate", id } as const)),
              { type: "Certificate", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Certificate', id: 'LIST' }` is invalidated
            [{ type: "Certificate", id: "LIST" }],
    }),
    searchCertificates: build.query({
      query: (search: string) => ({
        url: `/certificates`,
        params: {
          q: search,
        },
      }),
      providesTags: ["Certificate"],
    }),
    createCertificate: build.mutation<ICertificate, Partial<ICertificate>>({
      query(body) {
        return {
          url: `/certificates`,
          method: "POST",
          body,
        };
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: [{ type: "Certificate", id: "LIST" }],
    }),
    updateCertificate: build.mutation<ICertificate, Partial<ICertificate>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `/certificates/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Certificate", id }],
    }),
    deleteCertificate: build.mutation<{ success: boolean; id: number }, number>(
      {
        query(id) {
          return {
            url: `/certificates/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: (result, error, id) => [{ type: "Certificate", id }],
      }
    ),
  }),
  overrideExisting: false,
});

export const {
  useFetchAllCertificatesQuery,
  useSearchCertificatesQuery,
  useCreateCertificateMutation,
  useUpdateCertificateMutation,
  useDeleteCertificateMutation,
} = extendedApi;
