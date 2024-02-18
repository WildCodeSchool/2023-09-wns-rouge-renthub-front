import React from 'react';
import UserFirstName from '../components/UserFirstName';
import { Box, Button, Typography } from '@mui/material';

type StepFirstNameProps = {
  firstName: string;
  setFirstName: (firstName: string) => void;
  setCurrentStep: (currentStep: string) => void;
};

const StepFirstName = (props: StepFirstNameProps): React.ReactNode => {
  const isValidFirstName = (firstName: string) => {
    const regex = /^[a-zA-ZÀ-ÿ\s-]{2,50}$/;
    return regex.test(firstName);
  };

  return (
    <Box>
      {' '}
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Votre prénom ?
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Dites nous en un peu plus sur vous.
      </Typography>
      <UserFirstName
        firstName={props.firstName}
        setFirstName={props.setFirstName}
      />
      <Button
        onClick={() => props.setCurrentStep('lastName')}
        disabled={props.firstName === '' || !isValidFirstName(props.firstName)}
      >
        Suivant
      </Button>
    </Box>
  );
};

export default StepFirstName;
