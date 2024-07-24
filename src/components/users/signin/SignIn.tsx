import React, { useState } from "react";
import {
  Box,
  Card,
  FormControl,
  Grid,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import UserEmail from "../components/UserEmail";
import UserPassword from "../components/UserPassword";
import { useMutation } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { OrangeBtnWhiteHover } from "@/styles/MuiButtons";
import { useUserContext } from "@/context/UserContext";
import { showToast } from "@/components/utils/toastHelper";
import { useRouter } from "next/router";
import { mutationUserLogin } from "@/graphql/user/mutationUserLogin";

const UserConnection = (): React.ReactNode => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { refetchUserContext } = useUserContext();
  const theme = useTheme();
  const [doLogin] = useMutation(mutationUserLogin);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await doLogin({
        variables: { data: { email, password } },
      });
      if ("id" in data.item) {
        showToast(
          "success",
          `Connexion réussie, bienvenue ${data.item.firstName}`,
        );
        refetchUserContext();
        router.push("/");
      }
    } catch (error) {
      if (error.message === "Failed to fetch") {
        showToast("error", "Erreur de connexion, veuillez réessayer");
      } else {
        showToast("error", error.message);
      }
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Grid
      container
      item
      sm={8}
      xs={12}
      sx={{
        margin: 2,
        width: 370,
        [theme.breakpoints.down("sm")]: {
          marginRight: "auto",
          marginLeft: "auto",
          alignItems: "center",
        },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Se connecter
      </Typography>
      <Toaster />
      <FormControl component="form" autoComplete="off" onSubmit={onSubmit}>
        <Grid item xs={12} sm={6} md={6} xl={5} minWidth={360}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              padding: 4,
            }}
          >
            <Grid
              container
              item
              xs={12}
              sm={11}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              <UserEmail email={email} setEmail={setEmail} />
              <UserPassword password={password} setPassword={setPassword} />
            </Grid>
            <Grid item xs={12}>
              <Link variant="body2" href="/forgot-password">
                {"Mot de passe oublié ?"}
              </Link>
            </Grid>
            <Grid item xs={12} marginTop={3}>
              <OrangeBtnWhiteHover type="submit">
                Se connecter
              </OrangeBtnWhiteHover>
            </Grid>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "5px",
              }}
            >
              <Typography variant="subtitle2" gutterBottom>
                Première connexion ?
              </Typography>
              <Link variant="body2" href="/signup">
                {"Créez votre compte"}
              </Link>
            </Box>
          </Card>
        </Grid>
      </FormControl>
    </Grid>
  );
};

export default UserConnection;
