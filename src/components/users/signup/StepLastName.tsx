import React from 'react';
import UserLastName from '../components/UserLastName';
import { Box, Button, Typography } from '@mui/material';

type StepFirstNameProps = {
  firstName: string;
  lastName: string;
  setLastName: (lastName: string) => void;
  setCurrentStep: (currentStep: string) => void;
};

const StepLastName = (props: StepFirstNameProps): React.ReactNode => {
  const isValidLastName = (lastName: string) => {
    const regex = /^[a-zA-ZÀ-ÿ\s-]{2,50}$/;
    return regex.test(lastName);
  };
  return (
    <Box>
      {' '}
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Votre nom ?
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {`Dites nous en un peu plus sur vous, ${props.firstName}.`}
      </Typography>
      <UserLastName lastName={props.lastName} setLastName={props.setLastName} />
      <Button
        onClick={() => props.setCurrentStep('phoneNumber')}
        disabled={props.lastName === '' || !isValidLastName(props.lastName)}
      >
        Suivant
      </Button>
    </Box>
  );
};

export default StepLastName;
