import { gql } from "@apollo/client";

export const GET_COUNT_STOCKS_AVAILABLE_BY_DATES_PRODUCTREFERENCEID = gql`
  query findAvailableStocksByDatesAndProductId(
    $dateEnd: DateTimeISO!
    $productReferenceId: Float!
    $dateStart: DateTimeISO!
  ) {
    count: findAvailableStocksByDatesAndProductId(
      dateEnd: $dateEnd
      productReferenceId: $productReferenceId
      dateStart: $dateStart
    )
  }
`;
