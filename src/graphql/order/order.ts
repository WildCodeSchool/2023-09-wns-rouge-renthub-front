import { gql } from "@apollo/client";

export const MUTATION_ORDER = gql`
  mutation createOrder {
    item: createOrder {
      id
    }
  }
`;
