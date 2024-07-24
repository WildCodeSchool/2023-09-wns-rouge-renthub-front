import { gql } from "@apollo/client";

export const queryMeContext = gql`
  query meContext {
    item: meContext {
      firstName
      lastName
      role
    }
  }
`;
