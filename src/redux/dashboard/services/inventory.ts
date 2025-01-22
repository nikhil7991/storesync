import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export enum STATUS {
  active = "active",
  disabled = "disabled",
}
export type inventoryData = {
  category: string;
  name: string;
  price: string;
  quantity: number;
  value: string;
  status: STATUS;
};

export const inventoryApi = createApi({
  reducerPath: "inventoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dev-0tf0hinghgjl39z.api.raw-labs.com",
  }),
  endpoints: (builder) => ({
    getInventory: builder.query<inventoryData, void>({
      query: () => `/inventory`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetInventoryQuery } = inventoryApi;
