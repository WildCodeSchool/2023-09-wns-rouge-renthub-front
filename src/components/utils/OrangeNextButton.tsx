import React from "react";
import { Box, IconButton, styled, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { OrangeBtnRoundedWhiteHover } from "../../styles/MuiButtons";
import { VariablesColors } from "../../styles/Variables.colors";
const colors = new VariablesColors();
const { darkBlueColor, lightGreyColor, orangeColor, whiteColor, blackColor } =
  colors;

import Link from "next/link";
// const OrangeNextButton = styled(IconButton)(({ theme }) => ({
//   height: "2rem",
//   width: "2rem",
//   backgroundColor: "#FFA500", // couleur orange
//   color: "#FFFFFF", // couleur blanche pour la flèche
//   borderRadius: "50%", // forme ronde
//   display: "flex", // utilisation de flexbox
//   justifyContent: "center", // centrage horizontal
//   alignItems: "center", // centrage vertical
//   paddingRight: "0rem",
//   // décalage à droite
//   "&:hover": {
//     backgroundColor: "white",
//     color: "#FFA500", // couleur orange plus foncée au survol
//   },
// }));

const CustomNextArrow = styled(ArrowForwardIos)(() => ({
  color: whiteColor,
  paddingRight: "0.1rem",
  transition:
    "background-color 0.4s ease, color 0.4s ease, font-weight 0.4s ease",
  "&:hover": {
    color: orangeColor,
  },
}));

const CustomForwardArrow = styled(ArrowBackIos)(() => ({
  color: whiteColor,
  marginLeft: "0rem",

  transition:
    "background-color 0.4s ease, color 0.4s ease, font-weight 0.4s ease",
  "&:hover": {
    color: orangeColor,
  },
}));

const NextButton = ({ onClick, disabled }) => {
  return (
    <OrangeBtnRoundedWhiteHover
      onClick={onClick}
      disabled={disabled}
      aria-label="Next"
    >
      <CustomNextArrow fontSize="small" />
    </OrangeBtnRoundedWhiteHover>
  );
};

const PreviousButton = ({ onClick, disabled }) => {
  return (
    <OrangeBtnRoundedWhiteHover
      onClick={onClick}
      disabled={disabled}
      aria-label="Next"
    >
      <CustomForwardArrow fontSize="small" />
    </OrangeBtnRoundedWhiteHover>
  );
};

export { NextButton, PreviousButton };
