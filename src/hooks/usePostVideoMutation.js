import { gql, useMutation } from "@apollo/client";
import { MovieFragment } from "./fragments/MovieFragment";

const POST_VIDEO = gql`
  mutation postVideo($input: MovieInput!) {
    postVideo: publish(input: $input)
      @rest(type: "Movie", path: "movies", method: "POST") {
      ...MovieFragment
    }
  }

  ${MovieFragment}
`;

function usePostVideoMutation() {
  return useMutation(POST_VIDEO);
}

export { usePostVideoMutation };
