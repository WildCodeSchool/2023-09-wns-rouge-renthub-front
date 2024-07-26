import { VariablesColors } from "@/styles/Variables.colors";
import { IOrder } from "@/types/IOrder";
import { IOrderStock } from "@/types/IOrderStock";
import { Box, Typography } from "@mui/material";
import React from "react";

function OrderPageSubCard({
  orderStock,
}: {
  orderStock: IOrderStock;
}): React.ReactNode {
  const { lightGreyColor, whiteColor, lightRedColor } = new VariablesColors();

  return (
    <Box sx={{ flex: 1, backgroundColor: { whiteColor } }}>
      <Typography variant="h6" fontWeight={"bold"}>
        Name : {orderStock?.stock?.productReference?.name}
      </Typography>
      {/* <Typography variant="body1">Location à la journée</Typography>
      <Typography variant="body1">
        Date de debut d&apos;articles : {String(orderStock.dateTimeEnd)}
      </Typography>
      <Typography variant="body1">Prix: --- € TTC/jour</Typography> */}
    </Box>
  );
}

export default OrderPageSubCard;
