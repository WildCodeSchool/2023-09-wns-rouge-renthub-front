import { gql } from "@apollo/client";

export const MUTATION_CREATE_PRODUCT_CART = gql`
  mutation createProductCart($data: ProductCartCreateInput!) {
    createProductCart(data: $data) {
      id
    }
  }
`;
