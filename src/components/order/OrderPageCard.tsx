import { VariablesColors } from "@/styles/Variables.colors";
import { IOrder } from "@/types/IOrder";
import { IOrderStock } from "@/types/IOrderStock";
import { Box, Typography } from "@mui/material";
import React from "react";
import OrderPageSubCard from "./OrderPageSubCard";

function OrderPageCard({ order }: { order: IOrder }): React.ReactNode {
  const { lightGreyColor } = new VariablesColors();
  return (
    <Box sx={{ flex: 1 }}>
      <Typography variant="h6" fontWeight={"bold"}>
        Order ID : {order.id}
      </Typography>
      <Typography variant="body1">
        Nombre d&apos;articles : {order.orderStocks?.length}
      </Typography>

      <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
        {order.orderStocks?.map((orderStock: IOrderStock) => {
          return (
            <Box
              key={order.id}
              sx={{
                bgcolor: { lightGreyColor },
                borderRadius: "10px",
                padding: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <OrderPageSubCard orderStock={orderStock} />
            </Box>
          );
        })}
      </Box>

      {/* <Typography variant="body1">Prix: {} € TTC/jour</Typography> */}
    </Box>
  );
}

export default OrderPageCard;
