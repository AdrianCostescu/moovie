import { gql, useLazyQuery, useQuery } from "@apollo/client";

const GET_USER_CREDENTIALS = gql`
  query GetUserByEmailAndPassword {
    user(email: $email, password: $password)
      @rest(
        type: "User"
        path: "users?email={args.email}&password={args.password}"
      ) {
      id
      name
      email
      isAdmin
      password
      favoriteMoviesIds
    }
  }
`;

function useGetUserCredentialsLazyQuery() {
  return useLazyQuery(GET_USER_CREDENTIALS);
}

export { useGetUserCredentialsLazyQuery };
