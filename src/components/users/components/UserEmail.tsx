import React, { useState } from 'react';
import { TextField } from '@mui/material';

type UserEmailProps = {
  email: string;
  setEmail: (email: string) => void;
};

const UserEmail = (props: UserEmailProps): React.ReactNode => {
  const [emailError, setEmailError] = useState<string>('');

  const validateEmail = (name: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(name);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    props.setEmail(value);
    if (!validateEmail(value)) {
      setEmailError('Doit être une adresse email valide');
    } else {
      setEmailError('');
    }
  };
  return (
    <TextField
      id="email"
      type="email"
      size="small"
      label="Email"
      variant="outlined"
      error={!!emailError}
      helperText={emailError}
      fullWidth
      value={props.email || ''}
      onChange={handlePasswordChange}
      required
    />
  );
};

export default UserEmail;
