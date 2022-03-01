import { gql, useQuery } from "@apollo/client";

const GET_PHOTO_BY_ID = gql`
  query GetPhotoById {
    photo(id: $id) @rest(type: "Photo", path: "movies/{args.id}") {
      image
    }
  }
`;

function useGetPhotoById({ id }) {
  const response = useQuery(GET_PHOTO_BY_ID, { variables: { id } });

  const { data } = response;

  const photo = data?.photo;

  return {
    ...response,
    photo,
  };
}

export { useGetPhotoById };
