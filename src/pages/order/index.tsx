import { Container, Grid } from "@mui/material";
import { VariablesColors } from "@/styles/Variables.colors";

import CartProducts from "@/components/cart/CartProducts";
import RecapitulatifCart from "@/components/cart/RecapitulatifCart";
import Order from "@/components/order/order";
import { useQuery } from "@apollo/client";
import { IOrder } from "@/types/IOrder";
import { QUERY_ORDERS_BY_CONTEXT } from "@/graphql/order/order";

export default function OrderPage() {
  const { lightGreyColor } = new VariablesColors();

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Order />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
