import React from "react";
import { Grid, Typography } from "@mui/material";
import { StepFormButton } from "@/styles/MuiButtons";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { VariablesColors } from "@/styles/Variables.colors";
import CircularProgress from "@mui/material/CircularProgress";

const colors = new VariablesColors();
const { color3 } = colors;

type StepSubmitProps = {
  onSubmit: () => void;
  loading: boolean;
};

const StepSubmit = (props: StepSubmitProps): React.ReactNode => {
  return (
    <Grid
      container
      item
      xs={11}
      sm={10}
      md={5}
      lg={3.5}
      sx={{
        display: "flex",
        margin: "auto",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <CheckCircleIcon sx={{ fontSize: 50, color: color3 }} />
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Tout est ok ?
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        {`Si c'est bon pour vous, c'est bon pour nous !`}
      </Typography>
      <StepFormButton
        sx={{ width: "100% ", marginTop: "10px" }}
        onClick={props.onSubmit}
      >
        {props.loading ? (
          <CircularProgress size={24} />
        ) : (
          "Valider mon inscription"
        )}
      </StepFormButton>
    </Grid>
  );
};

export default StepSubmit;
