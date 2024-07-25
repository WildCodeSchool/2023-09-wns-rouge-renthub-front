import { gql } from "@apollo/client";

export const MUTATION_CREATE_PRODUCT_REFERENCE = gql`
  mutation CreateProductReference($data: ProductReferenceCreateInput!) {
    createProductReference(data: $data) {
      id
    }
  }
`;
