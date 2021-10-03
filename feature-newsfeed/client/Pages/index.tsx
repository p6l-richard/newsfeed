import Spinner from "components/Spinner";
import { useNewsPieces } from "feature-newsfeed/client/data-access/news-pieces";
import { gql } from "graphql-request";
import type { FellowshipUnion } from "graphql/data-models";
import { FELLOWSHIPS } from "graphql/data-models";
import React, { useMemo, useState } from "react";
import NewsfeedFilter from "./NewsfeedFilter";
import NewsfeedContent from "./NewsPieceContent";

function NewsfeedPageComponent() {
  const fellowships = useMemo(() => [...FELLOWSHIPS], [FELLOWSHIPS]);
  const [selectedFellowship, setSelectedFellowship] =
    useState<FellowshipUnion>("all");
  const {
    data: newsPieces,
    isFetching: isFetchingNewsPieces,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useNewsPieces(NEWS_QUERY, {
    fellowship: selectedFellowship,
  });

  return (
    <>
      <h1>👇 Here is what's new On Deck 🚢</h1>
      {newsPieces ? (
        <>
          <NewsfeedFilter
            tabs={fellowships}
            activeTab={selectedFellowship}
            onTabClick={setSelectedFellowship}
          ></NewsfeedFilter>
          {newsPieces.pages.map((newsPiecePage, i) => {
            return (
              <React.Fragment key={i}>
                <NewsfeedContent newsPieces={newsPiecePage.data} />
              </React.Fragment>
            );
          })}
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
          </button>
        </>
      ) : isFetchingNewsPieces ? (
        <Spinner />
      ) : (
        <div>Sorry, something went wrong</div>
      )}
    </>
  );
}

const NEWS_QUERY = gql`
  query NewsPieces($fellowship: String, $cursor: Int) {
    newsPieces(fellowship: $fellowship, cursor: $cursor) {
      data {
        id
        news_type
        title
        fellowship
        img_url
        created
        description
      }
      nextCursor
      previousCursor
    }
  }
`;

export default NewsfeedPageComponent;
