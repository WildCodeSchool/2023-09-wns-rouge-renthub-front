import { mutationReSendCode, mutationVerifyEmail } from "@/graphql/Users";
import { OrangeBtnWhiteHover } from "@/styles/MuiButtons";
import { useMutation } from "@apollo/client";
import {
  Card,
  Grid,
  Typography,
  useTheme,
  Link,
  TextField,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface VerifyEmailMutationData {
  userId: number;
  code: string;
}

const VerifyEmail = (): React.ReactNode => {
  const user = parseInt(useSearchParams().get("userId"));
  const [code, setCode] = useState<string>("");
  const [doValidate, loading] = useMutation(mutationVerifyEmail);
  const [doResend, loadingResend] = useMutation(mutationReSendCode);
  const theme = useTheme();

  async function sendCode() {
    try {
      const result = await doValidate({
        variables: {
          data: {
            userId: user,
            code: code,
          },
        },
      });
      if (!result.data.verifyEmail.success) {
        throw new Error(result.data.verifyEmail.message);
      }
      toast("Votre compte a été vérifié avec succès !", {
        style: {
          background: "green",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error(error);
      toast(error.message, {
        style: {
          background: "red",
          color: "#fff",
        },
      });
    }
  }

  async function reSendCode() {
    try {
      const result = await doResend({
        variables: {
          data: {
            userId: user,
          },
        },
      });
      if (result.data.generateNewVerificationCode !== true) {
        throw new Error("Erreur lors de l'envoi du code");
      }
      toast("Votre code a été envoyé sur votre boite mail !", {
        style: {
          background: "green",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error(error);
      toast("Erreur lors de l'envoi du code", {
        style: {
          background: "red",
          color: "#fff",
        },
      });
    }
  }

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
      <Toaster position="bottom-left" />
      <Typography variant="h5" gutterBottom>
        Vérification de votre compte
      </Typography>
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
            <TextField
              id="code"
              label="Insérer votre code"
              name="code"
              type="text"
              variant="outlined"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <Link
              variant="body2"
              sx={{ cursor: "pointer" }}
              onClick={() => reSendCode()}
            >
              {"Recevoir un nouveau code ?"}
            </Link>
          </Grid>
          <Grid item xs={12} marginTop={3}>
            <OrangeBtnWhiteHover
              onClick={() => {
                sendCode();
              }}
            >
              Valider
            </OrangeBtnWhiteHover>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default VerifyEmail;
