import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

export interface SearchBarProps {
  backgroundColor: string;
  borderColor: string;
  colorText: string;
}

function SearchBar({
  backgroundColor,
  borderColor,
  colorText,
}: SearchBarProps): React.ReactNode {
  const [globalFilterValue, setGlobalFilterValue] = React.useState<string>("");

  return (
    <FormControl sx={{ mx: "auto", width: "30ch" }} variant="outlined">
      <InputLabel
        variant="outlined"
        sx={{
          color: { colorText },
        }}
        htmlFor="search"
        size="small"
      >
        Rechercher
      </InputLabel>
      <OutlinedInput
        sx={{
          backgroundColor: "white", // { backgroundColor },
          color: { colorText },
        }}
        id="search"
        type="text"
        size="small"
        onClick={(e) => {
          const inputElement = e.target as HTMLInputElement;
          setGlobalFilterValue(inputElement.value);
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="search">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        label="Rechercher"
      />
    </FormControl>
  );
}

export default SearchBar;
