import { gql, useMutation } from "@apollo/client";

const ADD_MOVIE_TO_FAVORITE = gql`
  mutation addMovieToFavorite($id: ID!, $input: MovieInput!) {
    addMovie(id: $id, input: $input)
      @rest(type: "User", path: "users/{args.id}", method: "PATCH") {
      id
      favoriteMoviesIds
    }
  }
`;

function useAddMovieToFavorite() {
  return useMutation(ADD_MOVIE_TO_FAVORITE);
}

export { useAddMovieToFavorite };
