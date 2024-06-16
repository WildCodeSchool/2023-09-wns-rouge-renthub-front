import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { OrangeBtnWhiteHover } from "@/styles/MuiButtons";
import Link from "next/link";
import Alert from "@mui/material/Alert";
import SendOutlined from "@mui/icons-material/SendOutlined";

function SubscribeNewsLetterCard(): React.ReactNode {
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState(false);

  const handleChangeMail = (event) => {
    setEmail(event.target.value);
  };

  const handleSubscribe = () => {
    // mock email subscription : if the server response is 200, the subscription is successful
    setTimeout(() => {
      emailStatus ? setEmailStatus(false) : setEmailStatus(true);
      emailStatus ? setEmailStatus(false) : setEmailStatus(true);
    }, 600);
  };

  useEffect(() => {
    if (email === "") setEmailStatus(false);
  }, [email]);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0,

          justifyContent: "center",
          alignItems: "left",
          width: "auto",

          padding: "1.5rem 0",
          margin: "0rem",
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          textAlign="left"
          fontWeight={700}
        >
          <div>{`Je m'inscris à la newsletter pour`}</div>
          {`recevoir les nouveautés !`}
        </Typography>

        {emailStatus && (
          <Alert sx={{ width: "80%", margin: "1rem 0" }} severity="success">
            {" "}
            souscription reussie
          </Alert>
        )}
        <TextField
          id="outlined-basic"
          label="email"
          variant="outlined"
          sx={{ width: "80%", margin: "1rem 0" }}
          value={email}
          onChange={handleChangeMail}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  disabled={email === ""}
                  style={{
                    rotate: "-45deg",
                    position: "relative",
                    right: "-1.5rem",
                    bottom: "0.5rem",
                  }}
                  onClick={handleSubscribe}
                  startIcon={<SendOutlined />}
                />
              </InputAdornment>
            ),
          }}
        />

        <Link href="/contact">
          <OrangeBtnWhiteHover sx={{ width: "auto" }}>
            Contact
          </OrangeBtnWhiteHover>
        </Link>
      </Box>
    </div>
  );
}

export default SubscribeNewsLetterCard;
