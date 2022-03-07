import { gql, useMutation } from "@apollo/client";

const UPDATE_USER_INFO = gql`
  mutation updateUserInfo($id: ID!, $input: MovieInput!) {
    updateUserInfo(id: $id, input: $input)
      @rest(type: "User", path: "users/{args.id}", method: "PATCH") {
      id
    }
  }
`;

function useUpdateUserInfo() {
  return useMutation(UPDATE_USER_INFO);
}

export { useUpdateUserInfo };
