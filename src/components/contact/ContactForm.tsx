import {
  Box,
  Card,
  Fade,
  FormControl,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { FormEvent, useRef, useState } from "react";
import UserEmail from "../users/components/UserEmail";
import UserPhone from "../users/components/UserPhone";
import UserName from "../users/components/UserName";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { API_URL, RECAPTCHA_SITE_KEY } from "@/api/configApi";
import { OrangeBtnWhiteHover } from "@/styles/MuiButtons";
import { VariablesColors } from "@/styles/Variables.colors";

const colors = new VariablesColors();
const { lightGreyColor, successColor, errorColor } = colors;

const ContactForm = (): React.ReactNode => {
  const theme = useTheme();

  // Form
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");
    setPhoneNumber("");
    setRecaptcha(false);
    if (captchaRef.current) {
      captchaRef.current.reset();
    }
    setLoading(false);
  };

  // ReCaptcha
  const [recaptcha, setRecaptcha] = useState(false);
  const captchaRef = useRef(null);
  const handleCaptchaChange = (value: string | null) => {
    setRecaptcha(!!value);
  };

  const sendContactEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = captchaRef.current.getValue();
    const formDetails = {
      firstName: firstName === "" ? "Non indiqué" : firstName,
      lastName: lastName === "" ? "Non indiqué" : lastName,
      phoneNumber: phoneNumber === "" ? "Non indiqué" : phoneNumber,
      email,
      message,
    };
    setLoading(true);
    axios
      .post(`${API_URL}sendcontactemail`, {
        formDetails,
        token,
      })
      .then(() => {
        toast("Votre formulaire a été soumis avec succès.", {
          style: {
            background: successColor,
            color: lightGreyColor,
          },
        });
        resetForm();
      })
      .catch(() => {
        console.error("error");
        toast(
          `Une erreur s'est produite. Contactez-nous au 01 40 XX XX XX ou à
            contact@renthub.shop.`,
          {
            style: {
              background: errorColor,
              color: lightGreyColor,
            },
          },
        );
        resetForm();
      });
  };
  return (
    <Grid
      container
      item
      xs={12}
      sx={{
        margin: "auto",
        [theme.breakpoints.down("sm")]: {
          marginRight: "auto",
          marginLeft: "auto",
          alignItems: "center",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        marginTop: "1%",
        marginBottom: "1%",
      }}
    >
      <Toaster />
      <Typography variant="h4" gutterBottom>
        {`Besoin d'un renseignement ?`}
      </Typography>
      <FormControl
        component="form"
        autoComplete="on"
        onSubmit={sendContactEmail}
        sx={{
          width: "100%",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid item container xs={11} sm={10} md={8} lg={7.5} xl={6}>
          <Card
            sx={{
              width: "100%",
              padding: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: 3,
                [theme.breakpoints.down("sm")]: {
                  flexDirection: "column",
                },
              }}
            >
              <UserName
                userName={firstName}
                setUserName={setFirstName}
                type="firstName"
              />
              <UserName
                userName={lastName}
                setUserName={setLastName}
                type="lastName"
              />
            </Box>
            <UserEmail email={email} setEmail={setEmail} />
            <UserPhone
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
            <TextField
              id="description"
              multiline
              fullWidth
              minRows={8}
              maxRows={24}
              label="Message"
              variant="outlined"
              value={message || ""}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <ReCAPTCHA
              sitekey={RECAPTCHA_SITE_KEY}
              ref={captchaRef}
              onChange={handleCaptchaChange}
            />

            {loading ? (
              <Box sx={{ height: 40, margin: "auto" }}>
                <Fade
                  in={loading}
                  style={{
                    transitionDelay: loading ? "800ms" : "0ms",
                  }}
                  unmountOnExit
                >
                  <CircularProgress />
                </Fade>
              </Box>
            ) : (
              <OrangeBtnWhiteHover
                disabled={
                  !recaptcha ||
                  firstName === "" ||
                  lastName === "" ||
                  email === "" ||
                  message === ""
                }
                type="submit"
              >
                Envoyer
              </OrangeBtnWhiteHover>
            )}
          </Card>
        </Grid>
      </FormControl>
    </Grid>
  );
};

export default ContactForm;
