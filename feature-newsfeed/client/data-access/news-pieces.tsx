import { RequestDocument } from "graphql-request/dist/types";
import { apiClient } from "graphql/client";
import { QueryObserverOptions, useQuery, UseQueryResult } from "react-query";
import { NewsPieceRow } from "../../shared/data-models";

// CACHING KEYS
export const newsPieceKeys = {
  all: ["newsPieces"] as const,
  lists: () => [...newsPieceKeys.all, "list"] as const,
  list: (filters: string) => [...newsPieceKeys.lists(), { filters }] as const,
};

// HOOKS
interface Options<Data = unknown, SelectedData = Data> {
  select?: QueryObserverOptions<Data, Error, SelectedData>["select"];
  filters?: string;
}
export function useNewsPieces<Data = NewsPieceRow[]>(
  query: RequestDocument
): UseQueryResult<Data>;
export function useNewsPieces<Data = NewsPieceRow[], SelectedData = Data>(
  query: RequestDocument,
  options?: Options<Data, SelectedData>
): UseQueryResult<SelectedData>;
export function useNewsPieces<Data = NewsPieceRow[], SelectedData = Data>(
  query: RequestDocument,
  { filters, select }: Options<Data, SelectedData> = {}
): UseQueryResult<SelectedData> {
  const key =
    filters === undefined ? newsPieceKeys.lists() : newsPieceKeys.list(filters);
  return useQuery<Data, Error, SelectedData>(
    key,
    () => getNewsPieces<Data>({ query }),
    { select }
  );
}

// FETCH
interface GQLQuery {
  query: RequestDocument;
  params?: Partial<NewsPieceRow>;
}

export async function getNewsPieces<Data = unknown>({
  query,
  params,
}: GQLQuery) {
  const { newsPieces } = await apiClient.request<{ newsPieces: Data }>(query, {
    params,
  });
  return newsPieces;
}
