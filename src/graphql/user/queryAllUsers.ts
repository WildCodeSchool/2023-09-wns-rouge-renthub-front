import { gql } from "@apollo/client";

export const QUERY_ALL_USERS = gql`
  query UsersGetAll {
    items: usersGetAll {
      id
      firstName
      lastName
      email
      phoneNumber
      createdBy {
        id
        firstName
        lastName
      }
      createdAt
      role {
        name
        right
      }
      lastConnectionDate
      nickName
      updatedAt
      updatedBy {
        id
        firstName
        lastName
      }
    }
  }
`;
