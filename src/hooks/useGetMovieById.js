import { gql, useQuery } from "@apollo/client";
import { MovieFragment } from "./fragments/MovieFragment";

const GET_MOVIES_BY_ID = gql`
  query GetMovieById {
    movie(id: $id) @rest(type: "Movie", path: "movies/{args.id}") {
      ...MovieFragment
    }
  }
  ${MovieFragment}
`;

function useGetMovieById({ id }) {
  const response = useQuery(GET_MOVIES_BY_ID, { variables: { id } });

  const { data } = response;

  const movie = data?.movie;

  return {
    ...response,
    movie,
  };
}

export { useGetMovieById };
