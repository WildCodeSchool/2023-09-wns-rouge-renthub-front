import { Box, Grid } from "@mui/material";
import React from "react";
import ServiceOfferingsProps from "@/types/ServiceOfferingsType";
import { VariablesColors } from "@/styles/Variables.colors";
import ServiceOfferingsCard from "../cards/ServiceOfferingsCard";

const ServiceOfferings: React.FC = () => {
  const { darkBlueColor } = new VariablesColors();
  const redValue = parseInt(darkBlueColor.substring(1, 3), 16);
  const greenValue = parseInt(darkBlueColor.substring(3, 5), 16);
  const blueValue = parseInt(darkBlueColor.substring(5, 7), 16);

  const backgroundColor = `rgba(${redValue}, ${greenValue}, ${blueValue}, 1)`;

  const serviceOfferingsData: ServiceOfferingsProps[] = [
    {
      id: 1,
      title: "Retrait Gratuit",
      description: "Près de 500 agences à votre service",
      image: "/images/serviceOfferings/freeWithdrawal.png",
      alt: "freeWithdrawal",
    },
    {
      id: 2,
      title: "Tarifs Promo",
      description: "Des tarfis avantageux le week-end",
      image: "/images/serviceOfferings/promoRate.png",
      alt: "promoRate",
    },
    {
      id: 3,
      title: "Réservation en ligne",
      description: "Disponibilité et prix en temps réel",
      image: "/images/serviceOfferings/onlineBooking.png",
      alt: "onlineBooking",
    },
    {
      id: 4,
      title: "On vous rappelle",
      description: "Sous 2h pour toute demande de réservation",
      image: "/images/serviceOfferings/weCallYouBack.png",
      alt: "weCallYouBack",
    },
    {
      id: 5,
      title: "Assurance incluse",
      description: "Vous êtes couvert en cas de sinistre",
      image: "/images/serviceOfferings/includedInsurance.png",
      alt: "includedInsurance",
    },
  ];

  return (
    <Box
      padding={{ xs: "2rem 0", md: "4rem 0" }}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        backgroundColor: backgroundColor,
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
        {serviceOfferingsData.map((serviceOffering, index) => (
          <ServiceOfferingsCard
            key={serviceOffering.id}
            card={serviceOffering}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default ServiceOfferings;
