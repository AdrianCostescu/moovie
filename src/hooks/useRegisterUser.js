import { gql, useMutation } from "@apollo/client";

const REGISTER_USER = gql`
  mutation registerUser($input: UserInput!) {
    registerUser: publish(input: $input)
      @rest(type: "User", path: "users", method: "POST") {
      name
      email
      password
    }
  }
`;

function useRegisterUser() {
  return useMutation(REGISTER_USER);
}

export { useRegisterUser };
