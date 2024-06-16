import { createTheme } from "@mui/material/styles";
import { VariablesColors } from "@/styles/Variables.colors";

const colors = new VariablesColors();
const {
  whiteColor,
  orangeColor,
  lightOrangeColor,
  lightGreyColor,
  darkBlueColor,
} = colors;

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    h1: {
      fontFamily: ["Poppins-Medium", "sans-serif"].join(","),
    },
    h2: {
      fontFamily: ["Poppins-Medium", "sans-serif"].join(","),
    },
    h3: {
      fontFamily: ["Poppins-Medium", "sans-serif"].join(","),
    },
    h4: {
      fontFamily: ["Poppins-Medium", "sans-serif"].join(","),
    },
    h5: {
      fontFamily: ["Poppins-Medium", "sans-serif"].join(","),
    },
  },

  palette: {
    mode: "light",
    background: {
      default: whiteColor,
    },
    primary: {
      main: orangeColor,
      light: lightOrangeColor,
      dark: "#e89116",
    },
    secondary: {
      main: "#343a40",
      light: "#5C6166",
      dark: darkBlueColor,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: lightGreyColor,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundColor: whiteColor,
          borderRadius: "1rem",
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          color: orangeColor,
        },
      },
    },
  },
});

export default theme;
