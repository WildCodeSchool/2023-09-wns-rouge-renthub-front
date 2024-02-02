import {
  Box,
  Button,
  Card,
  Fade,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CircularProgress from "@mui/material/CircularProgress";
import { FormEvent, useRef, useState } from "react";
import UserName from "../users/components/UserName";
import UserEmail from "../users/components/UserEmail";
import UserPhone from "../users/components/UserPhone";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { API_URL, RECAPTCHA_SITE_KEY } from "@/api/configApi";

const ContactForm = (): React.ReactNode => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
      firstName: firstName === "" ? firstName : "Non indiqué",
      lastName: lastName === "" ? lastName : "Non indiqué",
      phoneNumber: phoneNumber === "" ? phoneNumber : "Non indiqué",
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
            background: "green",
            color: "#fff",
          },
        });
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
        setPhoneNumber("");
        setRecaptcha(false);
        captchaRef.current.reset();
        setLoading(false);
      })
      .catch(() => {
        console.error("error");
        toast(
          `Une erreur s'est produite. Contactez-nous au 01 40 XX XX XX ou à
            contact@tgc.megakrash.com`,
          {
            style: {
              background: "red",
              color: "#fff",
            },
          }
        );
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
        setPhoneNumber("");
        setRecaptcha(false);
        captchaRef.current.reset();
        setLoading(false);
      });
  };
  return (
    <Card className="userForm">
      <Toaster />
      <Typography variant="h4" gutterBottom>
        {`Besoin d'un renseignement ?`}
      </Typography>
      <FormControl
        className="userForm_control"
        component="form"
        autoComplete="off"
        onSubmit={sendContactEmail}
      >
        <UserName
          lastName={lastName}
          firstName={firstName}
          setFirstName={setFirstName}
          setLastName={setLastName}
        />
        <Box className="userForm_control_box">
          <UserEmail email={email} setEmail={setEmail} />
          <UserPhone
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />
        </Box>
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
          <Button
            disabled={!recaptcha && true}
            variant="contained"
            size="large"
            type="submit"
            endIcon={<SendIcon />}
          >
            Envoyer
          </Button>
        )}
      </FormControl>
    </Card>
  );
};

export default ContactForm;
