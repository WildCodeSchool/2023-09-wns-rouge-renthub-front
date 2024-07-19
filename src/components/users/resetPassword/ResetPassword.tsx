import React, { useEffect, useState } from "react";
import { Card, FormControl, Grid, Typography } from "@mui/material";
import { mutationSetPassword } from "@/graphql/auth/mutationSetPassword";
import { useMutation } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import LockIcon from "@mui/icons-material/Lock";
import { VariablesColors } from "@/styles/Variables.colors";
import { StepFormButton } from "@/styles/MuiButtons";
import { isValidPasswordRegex } from "../signup/RegexForm";
import UserPassword from "../components/UserPassword";
import { showToast } from "@/components/utils/toastHelper";

const colors = new VariablesColors();
const { orangeColor } = colors;

const ResetPassword = (): React.ReactElement => {
  // Use the router to get the token
  const router = useRouter();
  const { token } = router.query;
  // Set the email state
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSamePassword, setIsSamePassword] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    // Check if the email is valid with the regex
    const isPasswordValid = isValidPasswordRegex(password);
    const isConfirmPasswordValid = isValidPasswordRegex(confirmPassword);
    // Check if the email and confirm email are the same
    setIsSamePassword(password === confirmPassword);
    // Set the form valid if the email and confirm email are valid and the same
    setIsFormValid(isPasswordValid && isConfirmPasswordValid && isSamePassword);
  }, [password, confirmPassword, isSamePassword]);

  const [resetPassword] = useMutation(mutationSetPassword);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await resetPassword({
        variables: { password: password, token: token },
      });
      if (data.setPassword) {
        showToast(
          "success",
          `Votre mot de passe a été réinitialisé avec succès`,
        );
        setTimeout(() => {
          router.push(`/signin`);
        }, 2000);
      }
    } catch (error) {
      // If the error is "Failed to fetch" (error network), display a toast with a message
      if (error.message === "Failed to fetch") {
        showToast("error", "Erreur de connexion, veuillez réessayer");
      }
      // If token is invalid or expired, display a toast with a message and redirect to the forgot password page
      if (
        error.message === "invalid token" ||
        error.message === "expired token"
      ) {
        showToast(
          "error",
          "Votre lien de réinitialisation est invalide ou expiré, veuillez retenter de réinitialiser votre mot de passe",
        );
        setTimeout(() => {
          router.push(`/forgot-password`);
        }, 2000);
      } else {
        showToast("error", error.message);
      }
      setPassword("");
      setConfirmPassword("");
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
              Réinitialisation de votre mot de passe
            </Typography>
            <Typography variant="subtitle2" textAlign={"center"} gutterBottom>
              Veuillez renseigner votre nouveau mot de passe
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
              <UserPassword
                label="nouveau mot de passe"
                password={password}
                setPassword={setPassword}
              />
              <UserPassword
                label="confirmer le mot de passe"
                password={confirmPassword}
                setPassword={setConfirmPassword}
              />
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
                Envoyer
              </StepFormButton>
            </Grid>
          </Card>
        </Grid>
      </FormControl>
    </Grid>
  );
};

export default ResetPassword;
