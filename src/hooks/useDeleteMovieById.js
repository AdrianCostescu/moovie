import { gql, useMutation } from "@apollo/client";

const DELETE_MOVIE_BY_ID = gql`
  mutation DeleteMovieById($id: ID!) {
    deleteMovieById(id: $id)
      @rest(type: "Movie", path: "movies/{args.id}", method: "DELETE") {
      id
    }
  }
`;

function useDeleteMovieById() {
  return useMutation(DELETE_MOVIE_BY_ID);
}

export { useDeleteMovieById };
