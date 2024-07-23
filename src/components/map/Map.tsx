// src/components/Map.tsx
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import React from "react";
import { IBranch } from "@/pages/agencies";
import { AgencyInfoCard } from "../cards/AgencyInfoCard";

export interface poiProps {
  branches: IBranch[];
  width?: number;
  height?: number;
}

export default function MyMap({
  branches,
  width,
  height,
}: poiProps): React.ReactNode {
  return (
    <MapContainer
      boundsOptions={{ padding: [50, 50] }}
      style={{
        width: width < 500 ? "100vh" : "800px",
        height: height ? height : "800px",
        borderRadius: "10px",
      }}
      center={[46.65184929900413, 3]}
      zoom={6}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {branches.map((branch, index) => (
        <Marker key={index} position={[branch.lat, branch.lng]}>
          <Popup>
            <AgencyInfoCard
              displayMini={false}
              lat={branch.lat}
              lng={branch.lng}
              agencyName={branch.name}
              address={branch.address}
              phone={branch.phone}
              fax={branch.fax}
              hours={branch.hours}
            />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
