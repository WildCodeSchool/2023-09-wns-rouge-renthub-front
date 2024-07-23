import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { OrangeBtnWhiteHover } from "@/styles/MuiButtons";
import { useQuery } from "@apollo/client";
import { GET_CART } from "@/graphql/cart/cart";
import { Cart } from "@/types/Cart";

export default function RecapitulatifCart() {
  const { data: dataCart } = useQuery<{ item: Cart }>(GET_CART);
  const totalPrice = (dataCart?.item.totalPrice / 100).toFixed(2);
  const HT = (Number(totalPrice) / 20).toFixed(2);

  return (
    <>
      <Card
        sx={{
          width: "100%", // Take full width of the container
          maxWidth: 600,
          borderRadius: "10px",
          mx: "auto",
          my: 4,
          boxShadow: "none", // Remove shadow
          backgroundColor: "white", // Set background to white
          px: 2, // Add horizontal padding
        }}
      >
        <CardContent>
          <Stack spacing={2}>
            {/* Row 1 */}
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <Typography variant="body2" fontSize={"small"}>
                  État de la demande :
                </Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Box
                  sx={{
                    padding: "2px 10px",
                    fontSize: "small",
                    backgroundColor: "rgba(0, 255, 0, 0.4)",
                    borderRadius: "10px",
                    display: "inline-block",
                  }}
                >
                  <Typography variant="body2" fontSize={"small"}>
                    disponible
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Divider />

            {/* Row 2 */}
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <Typography variant="body1">TVA 20%</Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography variant="body1">{HT} €</Typography>
              </Grid>
            </Grid>
            <Divider />

            {/* Row 3 */}
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <Typography variant="body1">Article HT</Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography variant="body1">---</Typography>
              </Grid>
            </Grid>
            <Divider />

            {/* Row 4 */}
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <Typography variant="body1">Total</Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography variant="body1">{totalPrice} € TTC</Typography>
              </Grid>
            </Grid>
            <Divider />

            {/* Button */}
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <OrangeBtnWhiteHover>Passer au paiement</OrangeBtnWhiteHover>
            </Box>
          </Stack>
        </CardContent>
      </Card>
      <Box
        sx={{ mt: 3 }}
        display={"flex"}
        flexWrap={"nowrap"}
        gap={1}
        alignItems={"baseline"}
      >
        {/* <BiPurchaseTag size={30} /> */}
        <Typography variant="h4">Vos informations de location</Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Mode de retrait</Typography>
        <Typography variant="body1" fontWeight={"bold"}>
          Retrait gratuit magasin
        </Typography>
        <Typography variant="h6" pt={2}>
          Matériel de location
        </Typography>
        <Typography variant="body1" fontWeight={"bold"}>
          {/* {nameProduct ? nameProduct : "-"} */}
        </Typography>
        <Typography variant="body1" fontWeight={"bold"}>
          {/* {quantity >= 1 ? quantity : "-"} */}
        </Typography>
      </Box>
    </>
  );
}
