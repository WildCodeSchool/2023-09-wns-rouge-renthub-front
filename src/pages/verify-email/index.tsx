import {
  mutationReSendCode,
  mutationVerifyEmail,
} from "@/components/graphql/Users";
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
import { Toaster } from "react-hot-toast";
import { showToast } from "@/components/utils/toastHelper";

interface VerifyEmailMutationData {
  userId: number;
  code: string;
}

const VerifyEmail = (): React.ReactNode => {
  const user = parseInt(useSearchParams().get("userId"));
  const [code, setCode] = useState<string>("");
  const [doValidate] = useMutation<
    { verifyEmail: { success: boolean; message: string } },
    { data: VerifyEmailMutationData }
  >(mutationVerifyEmail);
  const [doResend] = useMutation(mutationReSendCode);
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
      showToast("success", "Votre compte a été vérifié avec succès !");
    } catch (error) {
      console.error(error);
      showToast("error", error.message);
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
      showToast("success", "Votre code a été envoyé sur votre boite mail !");
    } catch (error) {
      console.error(error);
      showToast("error", "Erreur lors de l'envoi du code");
    }
  }

  return (
    <Grid
      container
      item
      sm={8}
      xs={12}
      sx={{
        margin: "auto",
        [theme.breakpoints.down("sm")]: {
          alignItems: "center",
          justifyContent: "end",
        },
        alignContent: "center",
        paddingBlock: 5,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toaster position="bottom-left" />
      <Typography variant="h5" gutterBottom paddingBlockEnd={2}>
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
