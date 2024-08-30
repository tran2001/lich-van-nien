import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dayApi = createApi({
  reducerPath: "day",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://baomoi.com/_next/data/ZsDYcNkM6Q9o3DAQwbdBE/utilities/calendar.json",
  }),
  endpoints: (builder) => ({
    getDayInfo: builder.query({
      query: (day) => `?activeTab=day&day=${day}`,
    }),
  }),
});

export const { useGetDayInfoQuery, useLazyGetDayInfoQuery } = dayApi;
