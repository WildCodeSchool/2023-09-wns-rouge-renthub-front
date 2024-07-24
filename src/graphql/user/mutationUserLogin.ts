import { gql } from "@apollo/client";

export const mutationUserLogin = gql`
  mutation userLogin($data: UserLoginInput!) {
    item: userLogin(data: $data) {
      id
      firstName
    }
  }
`;
