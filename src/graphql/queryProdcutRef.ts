import { gql } from "@apollo/client";

export const GET_PRODUCT_REF = gql`
  query GetProductReference($getProductReferenceId: ID!) {
    item: getProductReference(id: $getProductReferenceId) {
      createdAt
      updatedAt
      id
      name
      description
      index
      display
      brandName
      price
      category {
        id
        index
        name
      }

      pictureProduct {
        id
        index
        picture {
          name
          uri
          urlHD
          urlMiniature
          mimetype
          updatedAt
        }
      }

      stock {
        name
        isAvailable
      }
    }
  }
`;
