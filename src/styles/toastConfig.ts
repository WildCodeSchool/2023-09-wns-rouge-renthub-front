import { VariablesColors } from "@/styles/Variables.colors";

const colors = new VariablesColors();
const { whiteColor, successColor, errorColor } = colors;

export const toastStyles = {
  success: {
    style: { background: successColor, color: whiteColor },
    iconTheme: { primary: whiteColor, secondary: successColor },
  },
  error: {
    style: { background: errorColor, color: whiteColor },
    iconTheme: { primary: whiteColor, secondary: errorColor },
  },
};
