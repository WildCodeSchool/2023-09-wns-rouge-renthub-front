import { MUTATION_ORDER } from "@/graphql/order/order";
import { OrangeBtnWhiteHover } from "@/styles/MuiButtons";
import { useMutation } from "@apollo/client";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { showToast } from "../utils/toastHelper";
import { useRouter } from "next/router";
import { Cart } from "@/types/Cart";

function OrderCard({ cart }: { cart: Cart }) {
  const router = useRouter();
  const totalPriceString = (cart?.totalPrice / 100).toFixed(2);
  const TVA = (Number(totalPriceString) * (20 / 100)).toFixed(2);
  const HT = (Number(totalPriceString) - Number(TVA)).toFixed(2);

  const [doOrder] = useMutation(MUTATION_ORDER);

  const handleOrder: React.MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      await doOrder();
      showToast("success", "Produit ajouté au panier");
      setTimeout(() => {
        router.replace("/");
      }, 2000);
    } catch (error) {
      showToast("error", "Une erreur s'est produite");
    }
  };
  return (
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
          {/* <Grid container alignItems="center">
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
          </Grid> */}
          {/* <Divider /> */}

          {/* Row 2 */}
          <Grid container alignItems="center">
            <Grid item xs={6}>
              <Typography variant="body1">TVA 20%</Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography variant="body1">{TVA} €</Typography>
            </Grid>
          </Grid>
          <Divider />

          {/* Row 3 */}
          <Grid container alignItems="center">
            <Grid item xs={6}>
              <Typography variant="body1">Article HT</Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography variant="body1">{HT}</Typography>
            </Grid>
          </Grid>
          <Divider />

          {/* Row 4 */}
          <Grid container alignItems="center">
            <Grid item xs={6}>
              <Typography variant="body1">Total</Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography variant="body1">{totalPriceString} € TTC</Typography>
            </Grid>
          </Grid>
          <Divider />

          {/* Button */}
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <OrangeBtnWhiteHover onClick={handleOrder}>
              Passer au paiement
            </OrangeBtnWhiteHover>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default OrderCard;
