import React from "react";
import { IconButton, styled } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const OrangeNextButton = styled(IconButton)(({ theme }) => ({
  height: "2rem",
  width: "2rem",
  backgroundColor: "#FFA500", // couleur orange
  color: "#FFFFFF", // couleur blanche pour la flèche
  borderRadius: "50%", // forme ronde
  display: "flex", // utilisation de flexbox
  justifyContent: "center", // centrage horizontal
  alignItems: "center", // centrage vertical
  paddingRight: "0rem",
  // décalage à droite
  "&:hover": {
    backgroundColor: "white",
    color: "#FFA500", // couleur orange plus foncée au survol
  },
}));

const NextButton = ({ onClick, disabled }) => {
  return (
    <OrangeNextButton onClick={onClick} disabled={disabled} aria-label="Next">
      <ArrowForwardIos fontSize="small" />
    </OrangeNextButton>
  );
};

const PreviousButton = ({ onClick, disabled }) => {
  return (
    <OrangeNextButton onClick={onClick} disabled={disabled} aria-label="Next">
      <ArrowBackIos fontSize="small" />
    </OrangeNextButton>
  );
};

export { NextButton, PreviousButton };
