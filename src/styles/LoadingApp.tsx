import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export const LoadingApp = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <CircularProgress size={120} />
      <Typography variant="h4" gutterBottom>
        Chargement...
      </Typography>
    </Box>
  );
};

export default LoadingApp;
