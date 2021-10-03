import { GraphQLClient } from "graphql-request";
import type { QueryKey, UseInfiniteQueryOptions } from "react-query";

export const apiClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_GQL_ENDPOINT,
  {
    headers: {},
  }
);

export type InfiniteQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = Omit<
  UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>,
  "queryKey" | "queryFn"
>;

export type Pagination = { cursor?: number };
export type PaginationResponse = {
  nextCursor?: number;
  previousCursor?: number;
};
export type Response<Data = unknown> = {
  data: Data;
} & PaginationResponse;
