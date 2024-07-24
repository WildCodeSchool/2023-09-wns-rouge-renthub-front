import { gql } from "@apollo/client";

export const mutationCreateUser = gql`
  mutation userCreate($data: UserCreateInput!) {
    item: userCreate(data: $data) {
      id
      firstName
    }
  }
`;
