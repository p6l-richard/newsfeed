import Card from "components/Card";
import Markdown from "components/Markdown";
import Link from "next/link";
import styled from "styled-components";
import { NewsPieceRow } from "../../shared/data-models";

interface Props {
  newsPieces: NewsPieceRow[];
}
export default function NewsfeedContent({ newsPieces }: Props) {
  return (
    <>
      {newsPieces?.map((newsPiece) => (
        <NewsPieceCard newsPiece={newsPiece} />
      ))}
    </>
  );
}

type CardProps = {
  newsPiece: Partial<NewsPieceRow>;
};

function NewsPieceCard({ newsPiece }: CardProps) {
  const hasDetailsPage =
    "project" === newsPiece.news_type || newsPiece.news_type === "user";
  return (
    <Card>
      <Columns>
        <ColumnLeft>
          {newsPiece.img_url ? (
            <Icon src={newsPiece.img_url} />
          ) : (
            <Emoji>📢</Emoji>
          )}
        </ColumnLeft>
        <ColumnRight>
          {newsPiece.title && <h2>{newsPiece.title}</h2>}
          {newsPiece.description && (
            <Markdown>{newsPiece.description}</Markdown>
          )}
        </ColumnRight>
      </Columns>
      <Footer>
        {hasDetailsPage && (
          <Link href={`/${newsPiece?.news_type}s/${newsPiece.id}`}>
            {`Details: ${newsPiece.title}`}
          </Link>
        )}

        <span style={{ marginLeft: "auto" }}>
          Published: {newsPiece.created}
        </span>
      </Footer>
    </Card>
  );
}
const Icon = styled.img`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Emoji = styled.div`
  font-size: 2rem;
`;

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 21rem;
`;

const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 7rem;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 1.5rem;
  justify-content: center;
  align-items: center;
`;

const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 14rem;
`;

const Footer = styled.div`
  font-size: 11px;
  line-height: 20px;
  display: flex;
  justify-content: space-between;
`;
