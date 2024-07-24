import { gql } from "@apollo/client";

export const MUTATION_CREATE_CATEGORY = gql`
  mutation CreateCategory($data: CategoryCreateInput!) {
    createCategory(data: $data) {
      id
      name
      index
      display
      createdBy
      updatedBy
      createdAt
      updatedAt
      parentCategory {
        name
        IDindex
      }
      childCategories {
        name
        id
        index
      }
      picture {
        name
        id
      }
    }
  }
`;
