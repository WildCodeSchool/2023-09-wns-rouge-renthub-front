import React, { useState } from 'react';
import { TextField } from '@mui/material';

type UserNameProps = {
  userName: string;
  setUserName: (firstName: string) => void;
  type: string;
};

const UserName = (props: UserNameProps): React.ReactNode => {
  const [nameError, setNameError] = useState<string>('');

  const validateName = (name: string) => /^[a-zA-ZÀ-ÿ\s-]{2,50}$/.test(name);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    props.setUserName(value);
    if (!validateName(value)) {
      setNameError('Ne doit contenir que des lettres (minimum 2, maximum 50)');
    } else {
      setNameError('');
    }
  };

  return (
    <TextField
      fullWidth
      id={props.type === 'firstName' ? 'firstName' : 'lastName'}
      size="small"
      label={props.type === 'firstName' ? 'Prénom' : 'Nom'}
      variant="outlined"
      value={props.userName}
      onChange={handleFirstNameChange}
      required
      error={!!nameError}
      helperText={nameError}
    />
  );
};

export default UserName;
