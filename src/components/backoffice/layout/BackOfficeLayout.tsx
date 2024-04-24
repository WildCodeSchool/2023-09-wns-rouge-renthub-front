import React from "react";
import BackOfficeSidebar from "./sideBar/BackOfficeSideBar";
import { Box, Container } from "@mui/material";
import { VariablesColors } from "@/styles/Variables.colors";

const colors = new VariablesColors();
const { lightGreyColor } = colors;

const BackOfficeLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <BackOfficeSidebar />
      <Container
        component="main"
        sx={{
          marginLeft: "300px",
          marginTop: "75px",
          minHeight: "calc(100vh - 75px)",
          padding: 0,
          backgroundColor: lightGreyColor,
        }}
        maxWidth={false}
      >
        {children}
      </Container>
    </Box>
  );
};

export default BackOfficeLayout;
