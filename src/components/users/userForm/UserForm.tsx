import React, { FormEvent, useRef, useState } from "react";
import axios from "axios";
import UserName from "../components/UserName";
import UserPassword from "../components/UserPassword";
import UserZipCity from "../components/UserZipCity";
import UserEmail from "../components/UserEmail";
import UserPhone from "../components/UserPhone";
import toast, { Toaster } from "react-hot-toast";
import {
  Box,
  Button,
  Card,
  CardMedia,
  FormControl,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { mutationCreateUser } from "@/components/graphql/Users";
import { UserFormData } from "@/types/UserTypes";
import { API_URL, RECAPTCHA_SITE_KEY } from "@/api/configApi";
import { useMutation } from "@apollo/client";
import router from "next/router";
import { DownloadInput } from "@/styles/MuiStyled";
import SendIcon from "@mui/icons-material/Send";

const UserForm = (): React.ReactNode => {
  // ReCaptcha
  const [recaptcha, setRecaptcha] = useState(false);
  const captchaRef = useRef(null);
  const handleCaptchaChange = (value: string | null) => {
    setRecaptcha(!!value);
  };
  // Form
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handlePasswordChange = (newPassword: React.SetStateAction<string>) => {
    setPassword(newPassword);
  };
  const [zipCode, setZipCode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [coordinates, setCoordinates] = useState<[number, number]>([0, 0]);
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [picture, setPicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  function handleFileSelection(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPicture(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }
  // SUBMIT
  const [doCreate] = useMutation(mutationCreateUser);
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const dataFile = new FormData();
    dataFile.append("title", nickName);
    dataFile.append("file", picture);

    try {
      let pictureId: number | null = null;
      if (picture) {
        const uploadResponse = await axios.post(`${API_URL}picture`, dataFile, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        pictureId = uploadResponse.data.id;
      }

      const data: UserFormData = {
        firstName,
        lastName,
        nickName,
        email,
        password,
        pictureId,
        zipCode,
        city,
        coordinates,
        isVerified: false,
        role: "USER",
        ...(phoneNumber !== "" && { phoneNumber }),
      };

      const result = await doCreate({
        variables: {
          data: data,
        },
      });
      if ("id" in result.data?.item) {
        toast(
          `Bienvenue ${result.data?.item.nickName} ! Un email de confirmation vous a été envoyé.`
        );
        setTimeout(() => {
          router.replace(`/`);
        }, 2000);
      } else {
        toast("Erreur pendant la création de votre compte");
      }
    } catch (error) {
      toast("Erreur pendant la création de votre compte");
      console.error("error", error);
    }
  }
  return (
    <Card className="userForm">
      <Toaster
        toastOptions={{
          style: {
            background: "#ff8a00",
            color: "#fff",
          },
        }}
      />
      <Typography variant="h4" gutterBottom>
        Création de votre compte
      </Typography>
      <FormControl
        className="userForm_control"
        component="form"
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <UserName
          lastName={lastName}
          firstName={firstName}
          setFirstName={setFirstName}
          setLastName={setLastName}
        />
        <Box className="userForm_control_box">
          <TextField
            fullWidth
            id="pseudo"
            size="small"
            label="Pseudo"
            variant="outlined"
            value={nickName || ""}
            onChange={(e) => setNickName(e.target.value)}
            required
          />
          <UserEmail email={email} setEmail={setEmail} />
        </Box>
        <UserPassword
          password={password}
          onPasswordChange={handlePasswordChange}
        />
        <Box className="userForm_control_box">
          <UserZipCity
            zipCode={zipCode}
            setCity={setCity}
            setZipCode={setZipCode}
            setCoordinates={setCoordinates}
          />
          <UserPhone
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />
        </Box>
        {previewUrl && (
          <CardMedia
            sx={{
              width: "200px",
              height: "200px",
              margin: "auto",
              objectFit: "cover",
              borderRadius: "5px",
            }}
            image={previewUrl}
          />
        )}
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          {`Télécharger une image de profil`}
          <DownloadInput
            type="file"
            accept=".jpg, .png, .webp"
            onChange={handleFileSelection}
          />
        </Button>
        <ReCAPTCHA
          sitekey={RECAPTCHA_SITE_KEY}
          ref={captchaRef}
          onChange={handleCaptchaChange}
        />

        <Button
          variant="contained"
          size="large"
          type="submit"
          disabled={!recaptcha && true}
          endIcon={<SendIcon />}
        >
          Créer mon compte
        </Button>

        <Box className="userForm_control_boxConnect">
          <Typography variant="subtitle2" gutterBottom>
            Déjà inscrit ?
          </Typography>
          <Link variant="body2" href="/connexion">
            {"Connectez-vous"}
          </Link>
        </Box>
      </FormControl>
    </Card>
  );
};

export default UserForm;
