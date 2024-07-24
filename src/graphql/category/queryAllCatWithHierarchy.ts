import { gql } from "@apollo/client";

export const queryAllCatWithHierarchy = gql`
  query CategoriesGetAllWithHierarchy {
    items: categoriesGetAllWithHierarchy {
      id
      name
      childCategories {
        id
        name
      }
    }
  }
`;
