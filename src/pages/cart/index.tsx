import { Container, Grid } from "@mui/material";
import { VariablesColors } from "@/styles/Variables.colors";

import CartProducts from "@/components/cart/CartProducts";
import RecapitulatifCart from "@/components/cart/RecapitulatifCart";

export default function Cart() {
  const { lightGreyColor } = new VariablesColors();

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6}>
            <CartProducts />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              backgroundColor: lightGreyColor,
              borderLeft: "1px solid grey",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: 2,
            }}
          >
            <RecapitulatifCart />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
