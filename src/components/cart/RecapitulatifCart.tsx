import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { OrangeBtnWhiteHover } from "@/styles/MuiButtons";
import { useCartContext } from "@/context/CartContext";
import OrderCard from "./OrderCard";

export default function RecapitulatifCart() {
  const { cart, refetchCartContext } = useCartContext();

  return (
    <>
      <OrderCard totalPrice={cart?.totalPrice} />
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
