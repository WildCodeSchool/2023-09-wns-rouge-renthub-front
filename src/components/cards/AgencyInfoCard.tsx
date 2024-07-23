import { Button, Box, Stack, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import HourIcon from "@mui/icons-material/AccessTime";
import FaxIcon from "@mui/icons-material/Print";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import EmailIcon from "@mui/icons-material/Email";
import NearMeIcon from "@mui/icons-material/NearMe";

export interface AgencyInfoCardProps {
  displayMini: boolean;
  agencyName: string;
  email?: string;
  phone?: string;
  address?: string;
  fax?: string;
  lat?: number;
  lng?: number;
  hours?: string;
}

export const AgencyInfoCard = ({
  displayMini,
  agencyName,
  email,
  phone,
  address,
  lat,
  lng,

  fax,
  hours,
}: AgencyInfoCardProps) => {
  const [displayDetail, setDisplayDetail] = useState(false);

  const handlePlanRoute = (e, lat, long) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <>
      <Box sx={{ width: "100%", maxWidth: "420px" }}>
        <Paper
          sx={{
            padding: 2,
            backgroundColor: "InfoBackground",
            borderRadius: "7px",
          }}
        >
          <Typography
            display="flex"
            alignContent="center"
            variant="h6"
            alignItems="center"
            gap={1}
            sx={{ color: "#000000" }}
          >
            <ShareLocationIcon />
            {agencyName}
          </Typography>

          <Typography
            variant="body1"
            sx={{ margin: "16px 0", color: "#000000" }}
          >
            {address}
          </Typography>

          {displayDetail && (
            <>
              <Typography
                display="flex"
                alignContent="center"
                variant="body2"
                alignItems="center"
                gap={1}
                sx={{ color: "#000000" }}
              >
                <PhoneIcon sx={{ fontSize: 16 }} />
                {phone ? phone : " - "}
              </Typography>

              {!displayMini && (
                <>
                  {email && (
                    <Typography
                      display="flex"
                      alignContent="center"
                      variant="body2"
                      alignItems="center"
                      gap={1}
                      sx={{ color: "#000000" }}
                    >
                      <EmailIcon />
                      {email}
                    </Typography>
                  )}

                  <Typography
                    display="flex"
                    alignContent="center"
                    variant="body2"
                    alignItems="center"
                    gap={1}
                    sx={{ color: "#000000" }}
                  >
                    <FaxIcon />
                    {fax}
                  </Typography>
                </>
              )}

              <Typography
                variant="body2"
                display="flex"
                alignContent="center"
                alignItems="center"
                gap={1}
                sx={{ color: "#000000" }}
              >
                <HourIcon sx={{ fontSize: 16 }} />
                {hours}
              </Typography>
            </>
          )}
          <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
            {!displayMini && (
              <>
                <Button
                  variant="outlined"
                  sx={{ color: "#152535", borderColor: "#152535" }}
                  onClick={(e) => handlePlanRoute(e, lat, lng)}
                >
                  <NearMeIcon /> {" Planifier l'itinéraire"}
                </Button>

                <Button
                  onClick={() => {
                    setDisplayDetail(!displayDetail);
                  }}
                  variant="contained"
                  sx={{ backgroundColor: "#152535", color: "#ffffff" }}
                >
                  Afficher les détails
                </Button>
              </>
            )}
          </Stack>
        </Paper>
      </Box>
    </>
  );
};
