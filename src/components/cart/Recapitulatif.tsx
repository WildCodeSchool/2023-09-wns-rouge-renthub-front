import { Box, Typography } from "@mui/material";
import { DateRangeState } from "../../pages/cart/[productId]/add";
import { format } from "date-fns";
import { BiPurchaseTag } from "react-icons/bi";

type RecapitulatifProps = {
  state: DateRangeState;
  quantity: number;
  nameProduct: string;
};

export default function Recapitulatif({
  state,
  quantity,
  nameProduct,
}: RecapitulatifProps) {
  const startDate = format(state[0]?.startDate ?? new Date(), "dd/MM/yyyy");
  const endDate = format(state[0]?.endDate ?? new Date(), "dd/MM/yyyy");

  return (
    <>
      <Box
        sx={{ mt: 3 }}
        display={"flex"}
        flexWrap={"nowrap"}
        gap={1}
        alignItems={"baseline"}
      >
        <BiPurchaseTag size={30} />
        <Typography variant="h4">Vos informations de location</Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Mode de retrait</Typography>
        <Typography variant="body1" fontWeight={"bold"}>
          Retrait gratuit magasin
        </Typography>
        <Typography variant="h6" pt={2}>
          Période de location
        </Typography>
        <Typography variant="body1" fontWeight={"bold"}>
          {startDate === "No date" ? "-" : startDate} -{" "}
          {endDate === "No date" ? "-" : endDate}
        </Typography>
        <Typography variant="h6" pt={2}>
          Matériel de location
        </Typography>
        <Typography variant="body1" fontWeight={"bold"}>
          {nameProduct ? nameProduct : "-"}
        </Typography>
        <Typography variant="h6" pt={2}>
          Quantité
        </Typography>
        <Typography variant="body1" fontWeight={"bold"}>
          {quantity >= 1 ? quantity : "-"}
        </Typography>
      </Box>
    </>
  );
}
