import React, { useState } from 'react';
import { TextField } from '@mui/material';

type UserNameProps = {
  lastName: string;
  setLastName: (lastName: string) => void;
};

const UserName = (props: UserNameProps): React.ReactNode => {
  const [lastNameError, setLastNameError] = useState<string>('');

  const validateName = (name: string) => /^[a-zA-ZÀ-ÿ\s-]{2,50}$/.test(name);

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    props.setLastName(value);
    if (!validateName(value)) {
      setLastNameError(
        'Ne doit contenir que des lettres (minimum 2, maximum 50)'
      );
    } else {
      setLastNameError('');
    }
  };

  return (
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
  );
};

export default UserName;
