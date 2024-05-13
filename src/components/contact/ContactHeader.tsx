import { Button, Typography, Box } from "@mui/material";
import { PATH_IMAGE } from "@/api/configApi";

const ContactHeader = (): React.ReactNode => {
  return (
    <Box
      sx={{
        height: "250px",
        display: "flex",
        color: "white",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${PATH_IMAGE}/general/contact.jpg)`,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Contactez nous
      </Typography>
      <Button variant="contained" size="large">
        01 40 XX XX XX
      </Button>
      <Typography variant="subtitle2" gutterBottom>
        Vous pouvez nous joindre au 01 40 XX XX XX
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        du Lundi au Samedi de 10H à 19H
      </Typography>
    </Box>
  );
};

export default ContactHeader;
