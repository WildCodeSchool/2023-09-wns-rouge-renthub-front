import { gql } from "@apollo/client";

export const GET_ALL_CATEGORIES = gql`
  query ListCategories {
    items: listCategories {
      id
      name
      index
      display
      createdBy
      updatedBy
      createdAt
      updatedAt
      parentCategory {
        index
        name
      }
      childCategories {
        name
      }
      picture {
        name
        uri
      }
      productReference {
        name
        id
      }
    }
  }
`;
