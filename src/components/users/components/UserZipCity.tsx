import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { ListItemButton, List, Box } from "@mui/material";
import { API_URL } from "@/api/configApi";
import { FeatureType, SuggestionType } from "@/types/GpsTypes";

type UserZipCityProps = {
  zipCode: string;
  setCity: (city: string) => void;
  setZipCode: (zipCode: string) => void;
  setCoordinates: (coordinates: [number, number]) => void;
};

const UserZipCity = (props: UserZipCityProps): React.ReactNode => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    if (newValue.length >= 4) {
      axios(`${API_URL}search-address?q=${newValue}`)
        .then((res) => {
          if (res.data && res.data.features) {
            setSuggestions(
              res.data.features.map((feature: FeatureType) => ({
                label: `${feature.properties.postcode} - ${feature.properties.city}`,
                postcode: feature.properties.postcode,
                city: feature.properties.city,
                coordinates: feature.geometry.coordinates,
              }))
            );
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des adresses:", error);
        });
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: SuggestionType) => {
    setInputValue(suggestion.label);
    props.setZipCode(suggestion.postcode);
    props.setCity(suggestion.city);
    props.setCoordinates(suggestion.coordinates);
    setSuggestions([]);
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <TextField
        fullWidth
        sx={{
          backgroundColor: "white",
        }}
        label="Code postal"
        variant="outlined"
        size="small"
        value={inputValue !== "" ? inputValue : props.zipCode}
        onChange={handleInputChange}
        required
      />
      {suggestions.length > 0 && (
        <List>
          {suggestions.map((suggestion, index) => (
            <ListItemButton
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.label}
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );
};

export default UserZipCity;
