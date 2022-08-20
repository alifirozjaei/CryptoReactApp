import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Key": "02f49da7d9mshd267af3f905490fp1505a8jsn43eb65183d95",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({
  url,
  headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: ({ count, offset }) =>
        createRequest(`/coins?limit=${count}&offset=${count * offset}`),
    }),

    getCryptoDetails: builder.query({
      query: (id) => createRequest(`/coin/${id}`),
    }),

    getCryptoHistory: builder.query({
      query: ({ id, timeperiod }) =>
        createRequest(`/coin/${id}/history?timePeriod=${timeperiod}`),
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
export const { useGetCryptoDetailsQuery } = cryptoApi;
export const { useGetCryptoHistoryQuery } = cryptoApi;
