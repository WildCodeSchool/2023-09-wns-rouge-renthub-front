import { gql } from "@apollo/client";

export const QUERY_PRODUCTS_REFERENCES = gql`
  query Query {
    items: getProductsReferences {
      id
      name
    }
  }
`;
