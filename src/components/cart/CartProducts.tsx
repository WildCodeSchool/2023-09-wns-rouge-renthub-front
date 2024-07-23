import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { FaOpencart } from "react-icons/fa6";
import { GET_CART } from "@/graphql/cart/cart";
import { useQuery } from "@apollo/client";
import { VariablesColors } from "@/styles/Variables.colors";
import { Cart } from "@/types/Cart";
import { format } from "date-fns";

export default function CartProducts() {
  const { data, loading, error } = useQuery<{ item: Cart }>(GET_CART);
  const { lightGreyColor } = new VariablesColors();
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
        {data?.item.productCarts.map((productCart) => {
          return (
            <Box
              key={productCart.id}
              sx={{
                bgcolor: lightGreyColor,
                borderRadius: "10px",
                padding: "1rem",
              }}
            >
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
                Prix: {productCart.productReference.price} €
              </Typography>
            </Box>
          );
        })}
      </Box>
    </>
  );
}
