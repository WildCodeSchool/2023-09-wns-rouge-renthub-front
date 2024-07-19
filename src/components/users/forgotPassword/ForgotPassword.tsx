import React, { useEffect, useState } from "react";
import { Card, FormControl, Grid, Typography } from "@mui/material";
import { mutationResetPassword } from "@/graphql/auth/mutationResetPassword";
import { useMutation } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import UserEmail from "../components/UserEmail";
import LockIcon from "@mui/icons-material/Lock";
import { VariablesColors } from "@/styles/Variables.colors";
import { StepFormButton } from "@/styles/MuiButtons";
import { isValidEmailRegex } from "../signup/RegexForm";
import { showToast } from "@/components/utils/toastHelper";

const colors = new VariablesColors();
const { orangeColor } = colors;

const ForgotPassword = (): React.ReactElement => {
  const router = useRouter();
  // Set the email state
  const [email, setEmail] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    const isEmailValid = isValidEmailRegex(email);
    setIsFormValid(isEmailValid);
  }, [email]);

  const [doForgotPassword] = useMutation(mutationResetPassword);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await doForgotPassword({
        variables: { email: email },
      });
      if (data.resetPassword) {
        showToast(
          "success",
          `Un email vous a été envoyé pour réinitialiser votre mot de passe`,
        );
        setTimeout(() => {
          router.push(`/`);
        }, 2000);
      }
    } catch (error) {
      if (error.message === "Failed to fetch") {
        showToast("error", "Erreur de connexion, veuillez réessayer");
      } else {
        showToast("error", error.message);
      }
      setEmail("");
    }
  };

  return (
    <Grid
      container
      item
      xs={12}
      sx={{
        marginTop: 2,
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Toaster />
      <FormControl
        component="form"
        autoComplete="off"
        onSubmit={onSubmit}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid item container xs={10} sm={8} md={6} lg={4} xl={4}>
          <Card
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              padding: 3,
            }}
          >
            <LockIcon sx={{ fontSize: 50, color: orangeColor }} />
            <Typography
              variant="h5"
              fontWeight={700}
              marginTop={2}
              textAlign={"center"}
              gutterBottom
            >
              Mot de passe oublié ?
            </Typography>
            <Typography variant="subtitle2" textAlign={"center"} gutterBottom>
              Nous allons vous envoyer un lien par email sur votre adresse pour
              réinitialiser votre mot de passe.
            </Typography>
            <Grid
              container
              item
              xs={12}
              sm={11}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 3,
                gap: 3,
              }}
            >
              <UserEmail email={email} setEmail={setEmail} />
            </Grid>

            <Grid
              item
              xs={12}
              sm={11}
              marginTop={3}
              sx={{
                width: "100%",
              }}
            >
              <StepFormButton sx={{ width: "100%" }} disabled={!isFormValid}>
                Réinitialiser mon mot de passe
              </StepFormButton>
            </Grid>
          </Card>
        </Grid>
      </FormControl>
    </Grid>
  );
};

export default ForgotPassword;
