import { useMemo } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_MOVIES = gql`
  query GetMovieList {
    movies @rest(type: "Movies", path: "movies") {
      id
      title
      type
      score
      image
      release
      description
    }
  }
`;

function useGetMovies() {
  const response = useQuery(GET_MOVIES);

  const { data } = response;

  const movies = useMemo(() => data?.movies || [], [data]);

  return {
    ...response,
    movies,
  };
}

export { useGetMovies };
