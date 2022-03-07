// For reusability and optimisation purpose
// Details https://www.apollographql.com/docs/react/performance/optimistic-ui/#the-optimisticresponse-option

import { gql } from "@apollo/client";

const MovieFragment = gql`
  fragment MovieFragment on Movie {
    id
    title
    type
    score
    image
    release
    writers
    time
    description
    director
    stars
    trailer
  }
`;

export { MovieFragment };
