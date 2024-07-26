import { gql } from "@apollo/client";

export const MUTATION_CREATE_PRODUCT_CART = gql`
  mutation createProductCart($data: ProductCartCreateInput!) {
    createProductCart(data: $data) {
      id
    }
  }
`;

export const MUTATION_UPDATE_PRODUCT_CART = gql`
  mutation updateProductCart(
    $data: ProductCartUpdateInput!
    $updateProductCartId: Int!
  ) {
    updateProductCart(data: $data, id: $updateProductCartId) {
      id
    }
  }
`;

export const MUTATION_DELETE_PRODUCT_CART = gql`
  mutation deleteProductCart($deleteProductCartId: Int!) {
    deleteProductCart(id: $deleteProductCartId) {
      id
    }
  }
`;
