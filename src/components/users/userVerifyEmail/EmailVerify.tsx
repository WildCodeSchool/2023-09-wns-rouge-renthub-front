import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import {
  Button,
  Card,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { mutationVerifyEmail } from "@/components/graphql/Users";

type UserEmailVerify = {
  success: boolean;
  message: string;
};

const EmailVerify = () => {
  const router = useRouter();
  const { token } = router.query;
  const [requestSend, setRequestSend] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verifyEmail, { loading, error }] = useMutation<{
    item: UserEmailVerify;
  }>(mutationVerifyEmail, {
    variables: { token },
    onCompleted: (data) => {
      if (data.item.success === true) {
        toast(data.item.message, {
          style: { background: "#e89116", color: "#fff" },
        });
        setVerified(true);
      } else {
        toast.error(data.item.message);
      }
    },
  });

  useEffect(() => {
    if (token && !requestSend) {
      verifyEmail();
      setRequestSend(true);
    }
  }, [token]);

  return (
    <Card className="userForm emailVerify">
      <Toaster />
      <Typography variant="h4">{`Vérification de l'Email`}</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Typography>
          {verified
            ? "Votre email a été vérifié avec succès. Vous pouvez maintenant vous connecter."
            : "Vérification en cours..."}
        </Typography>
      )}
      {error && (
        <Typography color="error">{`Une erreur s'est produite.`}</Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/connexion")}
        sx={{ marginTop: "1rem" }}
      >
        {`Page de connexion`}
      </Button>
    </Card>
  );
};

export default EmailVerify;
