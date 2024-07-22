import React, { useState } from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";

import { VariablesColors } from "@/styles/Variables.colors";
interface PriceTimeProps {
  price: number;
  time: number;
  priceRental?: number;
  isWeekend?: boolean;
  color?: string;
  border?: boolean;
  isSelected?: boolean;
}

export default function PriceTime({
  price,
  time,
  priceRental,
  isWeekend,
  color,
  border,
  isSelected,
}: PriceTimeProps): React.ReactNode {
  const colorPalette = new VariablesColors();

  return (
    <Box
      sx={{
        backgroundColor: colorPalette.darkBlueColor,
        color: isSelected ? "white" : "black",
        background: isSelected
          ? new VariablesColors().darkBlueColor
          : color
            ? color
            : "white",
        padding: 2,
        borderRadius: 2,
        textAlign: "center",
        width: "120px",
        height: "120px",
        border: priceRental && `1px solid ${colorPalette.darkBlueColor}`,
      }}
    >
      <Typography variant="body1" textAlign={"left"} m={0} paddingLeft={0}>
        {isWeekend ? "Week-end" : "1 à " + time + " j"}
      </Typography>

      <Stack direction="row" spacing={1} justifyContent="left" paddingTop={1}>
        <Typography
          sx={{ textDecoration: priceRental ? "line-through" : "none" }}
          fontWeight={priceRental || 700}
          variant="h6"
          fontSize={16}
        >
          {price}€
        </Typography>
        {priceRental && (
          <Typography
            component="div"
            variant="h6"
            fontWeight={700}
            fontSize={16}
          >
            {priceRental}€
          </Typography>
        )}
      </Stack>

      <Typography variant="body1" textAlign={"left"} m={0} paddingLeft={0}>
        TTC/jour
      </Typography>

      {/* badge in absolute position */}
      {priceRental && (
        <Box sx={{ position: "relative", top: "-7.3rem", left: "-1rem" }}>
          <Chip
            style={{
              transform: "rotate(-8deg)",
              backgroundColor: colorPalette.lightBlueColor,
              color: colorPalette.whiteColor,
              fontWeight: 600,
            }}
            size="small"
            label="promos !"
          />
        </Box>
      )}
    </Box>
  );
}
