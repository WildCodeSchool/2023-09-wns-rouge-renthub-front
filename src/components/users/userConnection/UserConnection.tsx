import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  Link,
  Typography,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import UserEmail from "../components/UserEmail";
import UserPassword from "../components/UserPassword";
import { mutationUserLogin, queryMeContext } from "@/components/graphql/Users";
import { useMutation } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
import router from "next/router";

const UserConnection = (): React.ReactNode => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handlePasswordChange = (newPassword: React.SetStateAction<string>) => {
    setPassword(newPassword);
  };
  const [doLogin] = useMutation(mutationUserLogin, {
    refetchQueries: [queryMeContext],
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await doLogin({
        variables: { data: { email, password } },
      });
      if ("id" in data.item) {
        toast(`Connexion réussie, bienvenue ${data.item.nickName}`, {
          style: { background: "#0fcc45", color: "#fff" },
        });
        setTimeout(() => {
          router.replace(`/compte`);
        }, 1500);
      }
    } catch (error) {
      toast(error.message, {
        style: { background: "#e14d2a", color: "#fff" },
      });
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Card className="userForm userSignin">
      <Toaster />
      <Typography variant="h4" gutterBottom>
        Connexion
      </Typography>
      <FormControl
        className="userForm_control"
        component="form"
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <UserEmail email={email} setEmail={setEmail} />
        <UserPassword
          password={password}
          onPasswordChange={handlePasswordChange}
        />
        <Button
          variant="contained"
          size="large"
          type="submit"
          endIcon={<LoginIcon />}
        >
          Connexion
        </Button>
      </FormControl>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "5px",
        }}
      >
        <Typography variant="subtitle2" gutterBottom>
          Pas encore de compte ?
        </Typography>
        <Link variant="body2" href="/inscription">
          {"Inscrivez-vous"}
        </Link>
      </Box>
    </Card>
  );
};

export default UserConnection;
