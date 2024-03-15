import { InputLabel } from "@mui/material";
import { VariablesColors } from "@/styles/Variables.colors";
import React from "react";

/* Ce composant (modulable)permet de créer un label pour un input. */
export default function InputLabelForm({
  title,
  htmlFor,
  required = true,
  shrink = true,
  fontSize = "1.5rem",
  fontWeight = "bold",
  color = "black",
  textAlign = "start",
}): React.ReactNode {
  const colors = new VariablesColors();

  return (
    <InputLabel
      htmlFor={htmlFor}
      required={required}
      shrink={shrink}
      sx={{
        fontSize: fontSize,
        fontWeight: fontWeight,
        color: color,
        textAlign: textAlign,
        ".MuiInputLabel-asterisk": {
          color: colors.color3,
        },
      }}
    >
      {title}
    </InputLabel>
  );
}
