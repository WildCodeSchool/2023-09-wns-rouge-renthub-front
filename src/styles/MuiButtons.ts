import { styled } from "@mui/material";
import { VariablesColors } from "./Variables.colors";

const colors = new VariablesColors();
const { darkBlueColor, lightGreyColor, orangeColor, whiteColor, blackColor } =
  colors;

interface ButtonsHoverProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const OrangeBtnWhiteHover = styled("button")<ButtonsHoverProps>(() => ({
  borderRadius: "10px",
  backgroundColor: orangeColor,
  color: "white",
  fontWeight: "600",
  maxWidth: "fit-content",
  minWidth: "160px",
  minHeight: "40px",
  border: "none",
  outline: "none",
  cursor: "pointer",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  transition:
    "background-color 0.3s ease, color 0.3s ease, font-weight 0.3s ease",
  "&:hover": {
    backgroundColor: lightGreyColor,
    color: darkBlueColor,
    outline: `1px solid ${darkBlueColor}`,
  },
  "&:disabled": {
    cursor: "not-allowed",
    backgroundColor: darkBlueColor,
    color: "white",
  },
}));

export const OrangeBtnBlueHover = styled("button")<ButtonsHoverProps>(() => ({
  borderRadius: "10px",
  backgroundColor: orangeColor,
  color: "white",
  fontWeight: "600",
  maxWidth: "fit-content",
  minWidth: "160px",
  minHeight: "40px",
  border: "none",
  outline: "none",
  cursor: "pointer",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  transition:
    "background-color 0.4s ease, color 0.4s ease, font-weight 0.4s ease",
  "&:hover": {
    backgroundColor: darkBlueColor,
  },
}));

export const StepFormButton = styled("button")<ButtonsHoverProps>(() => ({
  borderRadius: "10px",
  backgroundColor: darkBlueColor,
  color: "white",
  fontWeight: "600",
  minWidth: "160px",
  minHeight: "40px",
  border: "none",
  outline: "none",
  cursor: "pointer",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  transition:
    "background-color 0.4s ease, color 0.4s ease, font-weight 0.4s ease",
  "&:hover": {
    backgroundColor: orangeColor,
  },
  "&:disabled": {
    cursor: "not-allowed",
    backgroundColor: darkBlueColor,
  },
}));

export const CardDetailsBtn = styled("button")<ButtonsHoverProps>(() => ({
  display: "flex",
  alignItems: "center",
  borderRadius: "20px",
  height: "25px",
  padding: "0px 20px",
  outline: "1px solid #000000",
  border: "none",
  cursor: "pointer",
  transition:
    "background-color 0.3s ease, color 0.3s ease, font-weight 0.3s ease",
  backgroundColor: "black",
  color: "white",
  "&:hover": {
    backgroundColor: darkBlueColor,
    color: whiteColor,
    outline: `1px solid ${whiteColor}`,
  },
}));
