import React, { useState } from "react";
import { Box, CardMedia, Link, Menu, Typography } from "@mui/material";
import MenuCardProps from "@/types/MenuFooterTypes";
import SubscribeNewsLetterCard from "./SubscribeNewsLetterCard";

function FooterMenuCard({
  menuCard,
}: {
  menuCard: MenuCardProps;
}): React.ReactNode {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0,

        justifyContent: "center",
        alignItems: "center",
        width: "auto",

        padding: "1.5rem 0",
        margin: "0rem",
      }}
    >
      <div>
        <Typography
          variant="h6"
          component="h3"
          textAlign="left"
          fontWeight={700}
        >
          {menuCard.title}
        </Typography>

        <div style={{ marginTop: "1rem" }}>
          {menuCard.links.map((link) => (
            <Link key={link.id} href={link.url}>
              <Typography
                variant="body1"
                width={"100%"}
                padding={"0.1rem 0"}
                component="div"
                textAlign="left"
              >
                {link.name}
              </Typography>
            </Link>
          ))}
        </div>
      </div>
    </Box>
  );
}

FooterMenuCard.propTypes = {};

export default FooterMenuCard;
