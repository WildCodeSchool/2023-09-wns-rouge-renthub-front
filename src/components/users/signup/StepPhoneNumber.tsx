import React from 'react';
import UserPhone from '../components/UserPhone';
import { Box, Button, Typography } from '@mui/material';

type StepPhoneNumberProps = {
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  setCurrentStep: (currentStep: string) => void;
};

const StepFirstName = (props: StepPhoneNumberProps): React.ReactNode => {
  const isValidPhoneNumber = (phoneNumber: string) => {
    const regex = /^\d{10}$/;
    return regex.test(phoneNumber);
  };
  return (
    <Box>
      {' '}
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Votre numéro de téléphone ?
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Si on doit vous appeler pour la préparation de votre matériel.
      </Typography>
      <UserPhone
        phoneNumber={props.phoneNumber}
        setPhoneNumber={props.setPhoneNumber}
      />
      <Button
        onClick={() => props.setCurrentStep('password')}
        disabled={
          props.phoneNumber === '' || !isValidPhoneNumber(props.phoneNumber)
        }
      >
        Suivant
      </Button>
    </Box>
  );
};

export default StepFirstName;
