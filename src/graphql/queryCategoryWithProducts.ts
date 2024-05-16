import { gql } from "@apollo/client";

export const GET_CATEGORY_PRODUCT = gql`
  query FindCategory($findCategoryId: ID!) {
    item: findCategory(id: $findCategoryId) {
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
