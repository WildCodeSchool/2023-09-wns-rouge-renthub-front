import { Box, Grid } from "@mui/material";
import React from "react";
import ServiceOfferingsProps from "@/types/ServiceOfferingsType";
import { VariablesColors } from "@/styles/Variables.colors";
import ServiceOfferingsCard from "../cards/ServiceOfferingsCard";

const Footer: React.FunctionComponent = () => {
  const { darkBlueColor } = new VariablesColors();
  const redValue = parseInt(darkBlueColor.substring(1, 3), 16);
  const greenValue = parseInt(darkBlueColor.substring(3, 5), 16);
  const blueValue = parseInt(darkBlueColor.substring(5, 7), 16);

  const backgroundColor = `rgba(${redValue}, ${greenValue}, ${blueValue}, 1)`;

  return (
    <Box
      padding={{ xs: "2rem 0", md: "4rem 0" }}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        height: "fit-content",
      }}
    >
      <Grid
        container
        item
        maxWidth="xl"
        justifyContent={"center"}
        alignItems="center"
        xs={9}
        direction={{ xs: "row", md: "row" }}
        rowGap={"1.7rem"}
      >
        <div style={{ width: "auto" }}>footer</div>
      </Grid>
    </Box>
  );
};

export default Footer;
