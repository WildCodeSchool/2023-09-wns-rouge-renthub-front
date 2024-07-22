import { gql } from "@apollo/client";

export const MUTATION_CREATE_PRODUCT_REFERENCE = gql`
  mutation CreateProductReference($input: ProductReferenceCreateInput!) {
    item: createProductReference(input: $input) {
      id
      pictureProduct {
        id
      }
    }
  }
`;
