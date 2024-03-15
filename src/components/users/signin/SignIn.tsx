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
import { mutationUserLogin } from "@/components/graphql/Users";
import { useMutation } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
import { OrangeBtnWhiteHover } from "@/styles/MuiButtons";
import { VariablesColors } from "@/styles/Variables.colors";

const colors = new VariablesColors();
const { color2, successColor, errorColor } = colors;

const UserConnection = (): React.ReactNode => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const theme = useTheme();
  const [doLogin] = useMutation(mutationUserLogin);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await doLogin({
        variables: { data: { email, password } },
      });
      if ("id" in data.item) {
        toast(`Connexion réussie, bienvenue ${data.item.firstName}`, {
          style: { background: successColor, color: color2 },
        });
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      toast(error.message, {
        style: { background: errorColor, color: color2 },
      });
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
              padding: 5,
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
                {"Créer votre compte"}
              </Link>
            </Box>
          </Card>
        </Grid>
      </FormControl>
    </Grid>
  );
};

export default UserConnection;
