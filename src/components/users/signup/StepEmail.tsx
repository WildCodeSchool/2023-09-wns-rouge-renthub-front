import React from 'react';
import UserEmail from '../components/UserEmail';
import { UserEmailProps } from '@/types/UserTypes';
import { Box, Button, Typography } from '@mui/material';

type StepEmailProps = {
  UserEmailProps: UserEmailProps;
  setCurrentStep: (currentStep: string) => void;
};

const StepEmail = (props: StepEmailProps): React.ReactNode => {
  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  return (
    <Box>
      {' '}
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Votre adresse email ?
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Si on doit vous envoyer un email.
      </Typography>
      <UserEmail
        email={props.UserEmailProps.email}
        setEmail={props.UserEmailProps.setEmail}
      />
      <Button
        onClick={() => props.setCurrentStep('firstName')}
        disabled={
          props.UserEmailProps.email === '' ||
          !isValidEmail(props.UserEmailProps.email)
        }
      >
        Suivant
      </Button>
    </Box>
  );
};

export default StepEmail;
