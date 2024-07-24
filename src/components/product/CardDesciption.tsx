import { ArrowForward } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

export interface CardDescriptionProps {
  taille?: number;
  marque?: string;
  couleur?: string;
  materiaux?: string;
  poids?: number;
}

export function CardDescription({
  taille,
  marque,
  couleur,
  materiaux,
  poids,
}: CardDescriptionProps): React.ReactNode {
  const labelWidth = "70px"; // Largeur fixe pour les titres
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "16px",
        backgroundColor: "#ffe0cc",
        borderRadius: "16px",
        width: "100%",
        maxWidth: "521px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mr: 1, width: labelWidth }}
          >
            Taille
          </Typography>
          <ArrowForward sx={{ fontSize: "16px", mr: 1 }} />
          <Typography variant="body1">
            {" "}
            {taille ? taille + " cm " : "-"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mr: 1, width: labelWidth }}
          >
            Marque
          </Typography>
          <ArrowForward sx={{ fontSize: "16px", mr: 1 }} />
          <Typography variant="body1">{marque ? marque : "-"}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mr: 1, width: labelWidth }}
          >
            Couleur
          </Typography>
          <ArrowForward sx={{ fontSize: "16px", mr: 1 }} />
          <Typography variant="body1">{couleur ? couleur : " - "}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mr: 1, width: labelWidth }}
          >
            Matériau
          </Typography>
          <ArrowForward sx={{ fontSize: "16px", mr: 1 }} />
          <Typography variant="body1">
            {materiaux ? materiaux : " - "}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mr: 1, width: labelWidth }}
          >
            Poids
          </Typography>
          <ArrowForward sx={{ fontSize: "16px", mr: 1 }} />
          <Typography variant="body1">
            {" "}
            {poids ? poids + " kg" : " - "}{" "}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
