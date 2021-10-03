import { UserInputError } from "apollo-server-errors";
import type { Pagination, Response } from "graphql/client";
import type { FellowshipUnion } from "graphql/data-models";
import { FELLOWSHIPS } from "graphql/data-models";
import db from "graphql/db";
import type { NewsPieceRow } from "../../../../shared/data-models";
import { composeNewsPiecesQuery } from "./composition";

export type Args = {
  fellowship?: FellowshipUnion;
} & Pagination;

const LIMIT = parseInt(process.env.RESULT_LIMIT);

export default async function newsPieces(
  parent: unknown,
  { fellowship = "all", cursor = 0 }: Args
): Promise<Response<NewsPieceRow[]>> {
  const isInvalidInput = !FELLOWSHIPS.includes(fellowship);
  if (isInvalidInput) {
    throw new UserInputError(
      `fellowship must be one of: [${FELLOWSHIPS.join(",")}]`
    );
  }
  const newsPieces: NewsPieceRow[] | undefined = await db.getAll(
    composeNewsPiecesQuery({ fellowship, cursor })
  );

  if (!newsPieces) {
    throw new Error(`Couldn't get newsPieces`);
  }
  const hasNextCursor = newsPieces.length === LIMIT;
  const hasPreviousCursor = newsPieces.length !== 0 && cursor > 0;
  return {
    data: newsPieces,
    ...(hasNextCursor && { nextCursor: cursor + 1 }),
    ...(hasPreviousCursor && { previousCursor: cursor - 1 }),
  };
}
