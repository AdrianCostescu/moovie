import { gql, useQuery } from "@apollo/client";

const GET_USER_BY_ID = gql`
  query GetUserById {
    user(id: $id) @rest(type: "User", path: "users/{args.id}") {
      firstName
      lastName
      password
      isAdmin
      favoriteMoviesIds
    }
  }
`;

function useGetUserById({ id }) {
  const response = useQuery(GET_USER_BY_ID, { variables: { id } });
  
  const { data } = response;

  const user = data?.user;

  return {
    ...response,
    user,
  };
}

export { useGetUserById };
