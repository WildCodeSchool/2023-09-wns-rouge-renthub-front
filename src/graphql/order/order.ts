import { gql } from "@apollo/client";

export const MUTATION_ORDER = gql`
  mutation createOrder {
    item: createOrder {
      id
    }
  }
`;

export const QUERY_ORDERS_BY_CONTEXT = gql`
  query findOrdersByContext {
    items: findOrdersByContext {
      id
      status
      user {
        email
      }
      orderStocks {
        id
        dateTimeStart
        dateTimeEnd
        stock {
          productReference {
            price
            name
          }
        }
      }
    }
  }
`;
