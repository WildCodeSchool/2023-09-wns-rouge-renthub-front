import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import ServiceOfferingsProps from "@/types/ServiceOfferingsType";
import { VariablesColors } from "@/styles/Variables.colors";
import ServiceOfferingsCard from "../cards/ServiceOfferingsCard";
import FooterMenuCard from "../cards/FooterMenuCard";
import { BorderTop } from "@mui/icons-material";
import SubscribeNewsLetterCard from "../cards/SubscribeNewsLetterCard";
import ServiceOfferings from "./ServiceOfferings";

const Footer: React.FunctionComponent = () => {
  const { darkBlueColor } = new VariablesColors();
  const redValue = parseInt(darkBlueColor.substring(1, 3), 16);
  const greenValue = parseInt(darkBlueColor.substring(3, 5), 16);
  const blueValue = parseInt(darkBlueColor.substring(5, 7), 16);

  const backgroundColor = `rgba(${redValue}, ${greenValue}, ${blueValue}, 1)`;

  const data = [
    {
      id: 1,
      title: "La société",
      links: [
        { id: 1, name: "Qui sommes-nous ?", url: "/qui-sommes-nous" },
        { id: 2, name: "témoignages clietns", url: "/temoignages" },
      ],
    },
    {
      id: 2,
      title: "Nos Services",
      links: [
        { id: 1, name: "RenHub Service", url: "/renhub-service" },
        { id: 2, name: "RenHub Event", url: "/renhub-event" },
      ],
    },
    {
      id: 3,
      title: "Nos matériels",
      links: [
        { id: 1, name: "Catalogue", url: "/catalogue" },
        {
          id: 2,
          name: "Documentation technique",
          url: "/documentation-technique",
        },
        { id: 3, name: "Faq", url: "/faq" },
      ],
    },
    {
      id: 4,
      title: "Nos agences",
      links: [
        { id: 1, name: "France", url: "/fr" },
        { id: 2, name: "Allemagne", url: "/de" },
        { id: 3, name: "Portugal", url: "/pt" },
      ],
    },
  ];
  return (
    <>
      {/* top footer */}
      <Grid item xs={12}>
        <ServiceOfferings />
      </Grid>
      <Box
        padding={{ xs: "2rem 0", md: "1rem 0" }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          // backgroundColor: backgroundColor,
          height: "fit-content",
        }}
      >
        <Grid
          container
          item
          maxWidth="xl"
          justifyContent={"space-between"}
          alignItems="start"
          xs={9}
          direction={{ xs: "row", md: "row" }}
          rowGap={"1.7rem"}
        >
          {data.map((menuCard) => (
            <FooterMenuCard key={menuCard.id} menuCard={menuCard} />
          ))}
          <SubscribeNewsLetterCard />
        </Grid>
      </Box>
      {/* middle footer */}

      {/* bottom footer */}
      <Grid
        container
        item
        maxWidth="xl"
        justifyContent={"center"}
        alignItems="center"
        xs={12}
        direction={{ xs: "row", md: "row" }}
        rowGap={"1.rem"}
        borderTop={"1px solid black"}
      >
        <Typography textAlign={"center"} fontSize={"0.8rem"} padding={"0.6rem"}>
          Mentions légales - Données personnelles - CGL - Plan du site
        </Typography>
      </Grid>
    </>
  );
};

export default Footer;
