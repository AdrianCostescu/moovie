import { useMemo } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_PAGINATED_MOVIES = gql`
  query GetPaginatedMovieList {
    movies(page: $page, limit: $limit)
      @rest(
        type: "Movies"
        path: "movies?_page={args.page}&_limit={args.limit}"
      ) {
      id
      title
      type
      score
      image
      release
      description
      time
    }
  }
`;

function useGetPaginatedMovies({ page, limit = 10 }) {
  const response = useQuery(GET_PAGINATED_MOVIES, {
    variables: {
      page,
      limit,
    },
  });

  const { data } = response;

  const movies = useMemo(() => data?.movies || [], [data]);

  return {
    ...response,
    movies,
  };
}

export { useGetPaginatedMovies };
