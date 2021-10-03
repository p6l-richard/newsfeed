import type { RequestDocument } from "graphql-request/dist/types";
import type { InfiniteQueryOptions, Response } from "graphql/client";
import { apiClient } from "graphql/client";
import type { FellowshipUnion } from "graphql/data-models";
import { useInfiniteQuery, UseInfiniteQueryResult } from "react-query";
import type { NewsPieceRow } from "../../shared/data-models";

// TYPES
interface NewsPiecesParams {
  fellowship?: FellowshipUnion;
  cursor?: number;
}

// CACHING KEYS
export const newsPieceKeys = {
  all: ["newsPieces"] as const,
  lists: () => [...newsPieceKeys.all, "list"] as const,
  list: (filters: string) => [...newsPieceKeys.lists(), { filters }] as const,
};

// HOOKS
export function useNewsPieces<Data = NewsPieceRow[], SelectedData = Data>(
  query: RequestDocument
): UseInfiniteQueryResult<Response<SelectedData>>;
export function useNewsPieces<Data = NewsPieceRow[], SelectedData = Data>(
  query: RequestDocument,
  params?: NewsPiecesParams
): UseInfiniteQueryResult<Response<SelectedData>>;
export function useNewsPieces<Data = NewsPieceRow[], SelectedData = Data>(
  query: RequestDocument,
  params?: NewsPiecesParams,
  options?: InfiniteQueryOptions<Response<Data>, Error, SelectedData>
): UseInfiniteQueryResult<Response<SelectedData>>;
export function useNewsPieces<
  Data extends Response = Response<NewsPieceRow[]>,
  SelectedData = Data
>(
  query: RequestDocument,
  params: NewsPiecesParams = { fellowship: "all", cursor: 0 },
  {
    select,
  }: InfiniteQueryOptions<Response<Data>, Error, Response<SelectedData>> = {}
): UseInfiniteQueryResult<Response<SelectedData>> {
  const key = newsPieceKeys.list(params.fellowship ?? "all");
  return useInfiniteQuery<Response<Data>, Error, Response<SelectedData>>(
    key,
    ({ pageParam = 0 }) =>
      getNewsPieces<Response<Data>>(query, { ...params, cursor: pageParam }),
    {
      select,
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor ?? false;
      },
    }
  );
}

// FETCH
export async function getNewsPieces<Data = unknown>(
  query: RequestDocument,
  params: NewsPiecesParams
) {
  const { newsPieces } = await apiClient.request<{ newsPieces: Data }>(
    query,
    params
  );
  return newsPieces;
}
