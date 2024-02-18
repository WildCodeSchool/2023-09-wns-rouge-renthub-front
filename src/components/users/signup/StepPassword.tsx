import React from 'react';
import UserPassword from '../components/UserPassword';
import { Box, Button, Typography } from '@mui/material';

type StepPasswordProps = {
  password: string;
  setPassword: (password: string) => void;
  onSubmit: () => void;
};

const StepFirstName = (props: StepPasswordProps): React.ReactNode => {
  const isValidPassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{9,}$/;
    return regex.test(password);
  };
  return (
    <Box>
      {' '}
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Votre numéro de téléphone ?
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        On ne vous embête plus après. Promis !
      </Typography>
      <UserPassword password={props.password} setPassword={props.setPassword} />
      <Button
        onClick={() => props.onSubmit()}
        disabled={props.password === '' || !isValidPassword(props.password)}
      >
        Valider mon mot de passe
      </Button>
    </Box>
  );
};

export default StepFirstName;
