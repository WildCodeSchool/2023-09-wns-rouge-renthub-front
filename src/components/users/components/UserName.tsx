import React, { useState } from "react";
import { Box, TextField } from "@mui/material";

type UserNameProps = {
  firstName: string;
  setFirstName: (firstName: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
};

const UserName = (props: UserNameProps): React.ReactNode => {
  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");

  const validateName = (name: string) => /^[a-zA-ZÀ-ÿ\s-]{2,50}$/.test(name);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    props.setFirstName(value);
    if (!validateName(value)) {
      setFirstNameError(
        "Ne doit contenir que des lettres (minimum 2, maximum 50)"
      );
    } else {
      setFirstNameError("");
    }
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    props.setLastName(value);
    if (!validateName(value)) {
      setLastNameError(
        "Ne doit contenir que des lettres (minimum 2, maximum 50)"
      );
    } else {
      setLastNameError("");
    }
  };

  return (
    <Box className="userForm_control_box">
      <TextField
        fullWidth
        id="firstName"
        size="small"
        label="Prénom"
        variant="outlined"
        value={props.firstName}
        onChange={handleFirstNameChange}
        required
        error={!!firstNameError}
        helperText={firstNameError}
      />
      <TextField
        fullWidth
        id="lastName"
        size="small"
        label="Nom"
        variant="outlined"
        value={props.lastName}
        onChange={handleLastNameChange}
        required
        error={!!lastNameError}
        helperText={lastNameError}
      />
    </Box>
  );
};

export default UserName;
