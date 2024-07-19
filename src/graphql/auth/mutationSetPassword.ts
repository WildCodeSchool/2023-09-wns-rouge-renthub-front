import { gql } from "@apollo/client";

export const mutationSetPassword = gql`
  mutation setPassword($password: String!, $token: String!) {
    setPassword(password: $password, token: $token)
  }
`;
