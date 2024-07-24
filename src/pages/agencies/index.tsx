import React, { useMemo } from "react";

import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  Zoom,
} from "@mui/material";
import ContactHeader from "@/components/contact/ContactHeader";
import LayoutFull from "@/components/layout/LayoutFull";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import dynamic from "next/dynamic";
import { AgencyInfoCard } from "@/components/cards/AgencyInfoCard";

export interface IBranch {
  name: string;
  address: string;
  phone: string;
  email?: string;
  fax?: string;
  hours?: string;
  lat: number;
  lng: number;
}

const branches: IBranch[] = [
  {
    name: "Nantes ",
    address: "123 Rue de la République, 44000 Nantes, France",
    phone: "01 23 45 67 89",
    fax: "01 23 45 67 90",
    hours: "Lundi - Vendredi, 08:30 - 12:00, 13:30 - 17:00",
    email: "contact.nantes@crenthub.shop",
    lat: 47.218371,
    lng: -1.553621,
  },
  {
    name: "Paris ",
    address: "456 Avenue des Champs-Élysées, 75008 Paris, France",
    phone: "01 23 45 67 91",
    fax: "01 23 45 67 92",
    hours: "Lundi - Vendredi, 09:00 - 13:00, 14:00 - 18:00",
    lat: 48.856614,
    lng: 2.352222,
  },
  {
    name: "Bordeaux ",
    address: "789 Quai de Bacalan, 33000 Bordeaux, France",
    phone: "05 56 00 00 00",
    fax: "05 56 00 00 01",
    hours: "Lundi - Vendredi, 08:00 - 12:00, 14:00 - 17:00",
    lat: 44.836151,
    lng: -0.580816,
  },
  {
    name: "Toulouse ",
    address: "101 Rue Alsace Lorraine, 31000 Toulouse, France",
    phone: "05 61 00 00 00",
    fax: "05 61 00 00 01",
    hours: "Lundi - Vendredi, 08:00 - 12:30, 13:30 - 17:30",
    lat: 43.604652,
    lng: 1.444209,
  },
  {
    name: "Lille ",
    address: "102 Rue Nationale, 59000 Lille, France",
    phone: "03 20 00 00 00",
    fax: "03 20 00 00 01",
    hours: "Lundi - Vendredi, 08:30 - 12:30, 14:00 - 18:00",
    lat: 50.62925,
    lng: 3.057256,
  },
  {
    name: "Strasbourg ",
    address: "103 Place Kléber, 67000 Strasbourg, France",
    phone: "03 88 00 00 00",
    fax: "03 88 00 00 01",
    hours: "Lundi - Vendredi, 08:00 - 12:00, 13:00 - 17:00",
    lat: 48.584614,
    lng: 7.750713,
  },
];

export default function Agencies(): React.ReactNode {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    [],
  );

  const poi = useMemo(
    () => branches.map((branch) => [+branch.lat, +branch.lng]),
    [branches],
  );

  return (
    <LayoutFull title="RentHub : Contact-Agence">
      <ContactHeader />
      <Container>
        <Typography
          marginBlock={4}
          variant="h4"
          sx={{ color: "#152535", textAlign: "center" }}
        >
          Nos agences Renthub dans toute la France
        </Typography>
      </Container>

      <Stack
        gap={4}
        justifyContent={"center"}
        direction={{ xs: "column", md: "row" }}
      >
        <>
          <Grid
            container
            direction={"row"}
            alignContent={"start"}
            gap={2}
            overflow={"hidden"}
            maxHeight={"800px"}
            maxWidth={"250px"}
            paddingBlockStart={0}
          >
            {branches.map((branch, index) => (
              <Grid key={index} item xs={12} md={12} spacing={{ xs: 0, md: 4 }}>
                <AgencyInfoCard
                  displayMini={true}
                  agencyName={branch.name}
                  // address={branch.address}
                  phone={branch.phone}
                  hours={branch.hours}
                />
              </Grid>
            ))}
          </Grid>
        </>

        <Stack maxWidth={"800px"} marginBlockEnd={4}>
          <Map width={screen.width} height={700} branches={branches} />
        </Stack>
      </Stack>
    </LayoutFull>
  );
}
