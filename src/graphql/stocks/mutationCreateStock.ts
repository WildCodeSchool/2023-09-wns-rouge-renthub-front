import { gql } from "@apollo/client";

export const MUTATION_CREATE_STOCK = gql`
  mutation Mutation($data: StockCreateInput!) {
    createStock(data: $data) {
      id
      name
      isAvailable
    }
  }
`;
