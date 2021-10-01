import { UserInputError } from "apollo-server-errors";
import db, { FellowshipUnion, FELLOWSHIPS, FELLOWSHIP_ENUM } from "graphql/db";
import { NewsPieceRow } from "../../db";
import { composeNewsPiecesQuery } from "./composition";

type Args = {
  fellowship?: FellowshipUnion;
};

export default async function newsPieces(
  parent: unknown,
  { fellowship = "all" }: Args
): Promise<NewsPieceRow[]> {
  const isInvalidInput = !FELLOWSHIPS.includes(fellowship);
  if (isInvalidInput) {
    throw new UserInputError(
      `fellowship must be one of: [${FELLOWSHIPS.join(",")}]`
    );
  }
  const newsPieces: NewsPieceRow[] | undefined = await db.getAll(
    composeNewsPiecesQuery(fellowship)
  );

  if (!newsPieces) {
    throw new Error(`Couldn't get newsPieces`);
  }
  return newsPieces;
}
