import React, { useState } from 'react';
import { TextField } from '@mui/material';

type UserNameProps = {
  firstName: string;
  setFirstName: (firstName: string) => void;
};

const UserName = (props: UserNameProps): React.ReactNode => {
  const [firstNameError, setFirstNameError] = useState<string>('');

  const validateName = (name: string) => /^[a-zA-ZÀ-ÿ\s-]{2,50}$/.test(name);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    props.setFirstName(value);
    if (!validateName(value)) {
      setFirstNameError(
        'Ne doit contenir que des lettres (minimum 2, maximum 50)'
      );
    } else {
      setFirstNameError('');
    }
  };

  return (
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
  );
};

export default UserName;
