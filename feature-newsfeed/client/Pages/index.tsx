import Spinner from "components/Spinner";
import { useNewsPieces } from "feature-newsfeed/client/data-access/news-pieces";
import { gql } from "graphql-request";
import { FELLOWSHIPS, FellowshipUnion } from "graphql/data-models";
import React, { useMemo, useState } from "react";
import NewsfeedFilter from "./NewsfeedFilter";
import NewsfeedContent from "./NewsPieceContent";

function NewsfeedPageComponent() {
  const fellowships = useMemo(() => [...FELLOWSHIPS], [FELLOWSHIPS]);
  const [fellowship, setFellowship] = useState<FellowshipUnion>("all");
  const newsQuery = useMemo(() => getNewsQuery(fellowship), [fellowship]);
  const { data: newsPieces, isLoading: isLoadingNewsPieces } = useNewsPieces(
    newsQuery,
    {
      filters: fellowship,
    }
  );

  return (
    <>
      <h1>👇 Here is what's new On Deck 🚢</h1>
      {newsPieces ? (
        <>
          <NewsfeedFilter
            tabs={fellowships}
            activeTab={fellowship}
            onTabClick={setFellowship}
          ></NewsfeedFilter>
          <NewsfeedContent newsPieces={newsPieces} />
        </>
      ) : isLoadingNewsPieces ? (
        <Spinner />
      ) : (
        <div>Sorry, something went wrong</div>
      )}
    </>
  );
}

const getNewsQuery = (fellowship: FellowshipUnion) => gql`
  query newsPieces {
    newsPieces(fellowship: "${fellowship}") {
      id
      title
      description
      fellowship
      img_url
      created
      news_type
    }
  }
`;

export async function getStaticProps() {
  return {
    props: {
      fellowships: FELLOWSHIPS,
    },
  };
}

export default NewsfeedPageComponent;
