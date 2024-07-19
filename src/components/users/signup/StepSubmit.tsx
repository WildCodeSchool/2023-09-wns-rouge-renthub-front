import React, { useRef, useState } from "react";
import { Grid, Typography, useTheme } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import { StepFormButton } from "@/styles/MuiButtons";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { VariablesColors } from "@/styles/Variables.colors";
import CircularProgress from "@mui/material/CircularProgress";

const colors = new VariablesColors();
const { orangeColor } = colors;

type StepSubmitProps = {
  onSubmit: () => void;
  loading: boolean;
};

const StepSubmit = (props: StepSubmitProps): React.ReactNode => {
  const theme = useTheme();
  // ReCaptcha
  const [recaptcha, setRecaptcha] = useState(false);
  const captchaRef = useRef(null);
  const handleCaptchaChange = (value: string | null) => {
    setRecaptcha(!!value);
  };
  return (
    <Grid
      container
      item
      xs={9}
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
        [theme.breakpoints.down("sm")]: {
          p: 1,
          minHeight: "370px",
        },
      }}
    >
      <CheckCircleIcon sx={{ fontSize: 50, color: orangeColor }} />
      <Typography variant="h5" fontWeight={700} textAlign="center" gutterBottom>
        Tout est ok ?
      </Typography>
      <Typography variant="subtitle2" textAlign="center" gutterBottom>
        {`Si c'est bon pour vous, c'est bon pour nous !`}
      </Typography>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        ref={captchaRef}
        onChange={handleCaptchaChange}
      />
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
