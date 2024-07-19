import { gql } from "@apollo/client";

export const GET_CART = gql`
  query currentCart {
    item: currentCart {
      id
      totalPrice
      productCarts {
        id
        quantity
        dateTimeStart
        dateTimeEnd
        productReference {
          id
          name
          price
        }
      }
    }
  }
`;
