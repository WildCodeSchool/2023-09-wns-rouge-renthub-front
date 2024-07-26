import { Box, Button, Typography } from "@mui/material";
import { VariablesColors } from "@/styles/Variables.colors";
import { format, set } from "date-fns";
import { useCartContext } from "@/context/CartContext";
import { useMutation, useQuery } from "@apollo/client";
import { GET_COUNT_STOCKS_AVAILABLE_BY_DATES_PRODUCTREFERENCEID } from "@/graphql/stocks/queryStocks";
import ProductCartAvailability from "./ProductCartAvailability";
import { ProductCart } from "@/types/ProductCart";
import { MUTATION_DELETE_PRODUCT_CART } from "@/graphql/productCart/productCart";
import { showToast } from "../utils/toastHelper";
import { Toaster } from "react-hot-toast";

export default function CartProducts() {
  const { cart, refetchCartContext } = useCartContext();
  refetchCartContext();
  const { lightGreyColor } = new VariablesColors();

  const { data: countStockAvaiable, refetch } = useQuery<{ count: number }>(
    GET_COUNT_STOCKS_AVAILABLE_BY_DATES_PRODUCTREFERENCEID,
  );

  const [doDeleteProductCart] = useMutation(MUTATION_DELETE_PRODUCT_CART);

  const handleDeleteProductCart = async (id: number) => {
    try {
      await doDeleteProductCart({
        variables: {
          deleteProductCartId: Number(id),
        },
      });
      showToast("success", "Produit supprimé du panier");
      setTimeout(() => {
        refetchCartContext();
      }, 1000);
    } catch (error) {
      showToast("error", "Une erreur s'est produite");
    }
  };

  return (
    <>
      <Toaster />
      <Box>
        <Box display={"flex"} gap={1} alignItems={"baseline"}>
          <Box>
            <Typography
              variant="h4"
              mt={3}
              sx={{
                fontSize: {
                  xs: "1.5rem",
                  sm: "2.5rem",
                },
              }}
            >
              Votre panier
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
        {cart?.productCarts.map((productCart: ProductCart) => (
          <Box
            key={productCart.id}
            sx={{
              position: "relative",
              bgcolor: lightGreyColor,
              borderRadius: "10px",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {productCart.productReference.name}
                </Typography>
                <Typography variant="body1">Location à la journée</Typography>
                <Typography variant="body1">
                  Quantité: {productCart.quantity}
                </Typography>
                <Typography variant="body1">
                  Période: {format(productCart.dateTimeStart, "dd/MM/yyyy")} -{" "}
                  {format(productCart.dateTimeEnd, "dd/MM/yyyy")}
                </Typography>
                <Typography variant="body1">
                  Prix: {(productCart.productReference.price / 100).toFixed(2)}{" "}
                  € TTC/jour
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1">Availability: </Typography>
                {/* Replace with your actual component */}
                <ProductCartAvailability productCart={productCart} />
              </Box>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              // size="small" // Adjust size here
              onClick={() => handleDeleteProductCart(productCart.id)}
              sx={{
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
                padding: "0",
              }}
            >
              Delete
            </Button>
          </Box>
        ))}
      </Box>
    </>
  );
}
