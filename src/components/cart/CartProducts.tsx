import { Box, Typography } from "@mui/material";
import { VariablesColors } from "@/styles/Variables.colors";
import { format } from "date-fns";
import { useCartContext } from "@/context/CartContext";
import { useQuery } from "@apollo/client";
import { GET_COUNT_STOCKS_AVAILABLE_BY_DATES_PRODUCTREFERENCEID } from "@/graphql/stocks/queryStocks";
import ProductCartAvailability from "./ProductCartAvailability";
import { ProductCart } from "@/types/ProductCart";

export default function CartProducts() {
  const { cart, refetchCartContext } = useCartContext();
  refetchCartContext();
  const { lightGreyColor } = new VariablesColors();

  const { data: countStockAvaiable, refetch } = useQuery<{ count: number }>(
    GET_COUNT_STOCKS_AVAILABLE_BY_DATES_PRODUCTREFERENCEID,
  );

  return (
    <>
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
        {cart?.productCarts.map((productCart: ProductCart) => {
          return (
            <Box
              key={productCart.id}
              sx={{
                bgcolor: lightGreyColor,
                borderRadius: "10px",
                padding: "1rem",
                display: "flex",
                justifyContent: "space-between", // Align items to the left and right
                alignItems: "center", // Center items vertically
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight={"bold"}>
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
              <ProductCartAvailability productCart={productCart} />
            </Box>
          );
        })}
      </Box>
    </>
  );
}
