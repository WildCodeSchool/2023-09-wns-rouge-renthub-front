import React from "react";
import router from "next/router";
import { Grid, Typography } from "@mui/material";
import { StepFormButton } from "@/styles/MuiButtons";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { VariablesColors } from "@/styles/Variables.colors";

const colors = new VariablesColors();
const { color3 } = colors;

type StepWelcomeProps = {
  email: string;
};

const StepWelcome = (props: StepWelcomeProps): React.ReactNode => {
  return (
    <Grid
      container
      item
      xs={12}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "89vh",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <RocketLaunchIcon sx={{ fontSize: 50, color: color3 }} />
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Bienvenue !
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        {`Votre compte a bien été créé !`}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        {`Un email de vérification vous a été envoyé à l'adresse ${props.email}`}
      </Typography>
      <StepFormButton
        sx={{ width: "300px", marginTop: "10px" }}
        onClick={() => router.replace(`/`)}
      >
        Accueil
      </StepFormButton>
    </Grid>
  );
};

export default StepWelcome;
