import { styled } from "@mui/material";
import { VariablesColors } from "./Variables.colors";

const { color5 } = new VariablesColors();

export const DownloadInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const PromoTag = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: color5,
  width: "fit-content",
  padding: "0.2rem 1.5rem",
  borderRadius: "20px",
  rotate: "-5deg",
});
