import React from 'react';
import UserEmail from '../components/UserEmail';
import UserFirstName from '../components/UserFirstName';
import UserLastName from '../components/UserLastName';
import UserPhone from '../components/UserPhone';
import UserPassword from '../components/UserPassword';
import { StepFormButton } from '@/styles/MuiButtons';
import { VariablesColors } from '@/styles/Variables.colors';
import { Box, Grid, Typography } from '@mui/material';
import {
  isValidEmailRegex,
  isValidNameRegex,
  isValidPhoneNumberRegex,
  isValidPasswordRegex,
} from './RegexForm';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LockIcon from '@mui/icons-material/Lock';

const colors = new VariablesColors();
const { color3 } = colors;

type StepSignUpFormProps = {
  email: string;
  setEmail: (email: string) => void;
  firstName: string;
  setFirstName: (firstName: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  password: string;
  setPassword: (password: string) => void;
  currentStep: string;
  setCurrentStep: (currentStep: string) => void;
};

const StepSignUpForm = (props: StepSignUpFormProps): React.ReactNode => {
  const stepConfig = {
    email: {
      title: 'Votre email ?',
      subtitle: 'Si on doit vous envoyer un email.',
      icon: AlternateEmailIcon,
      Component: UserEmail,
      componentProps: {
        email: props.email,
        setEmail: props.setEmail,
      },
      isDisabled: () => props.email === '' || !isValidEmailRegex(props.email),
      nextStep: 'firstName',
    },
    firstName: {
      title: 'Votre prénom ?',
      subtitle: 'Dites nous en un peu plus sur vous.',
      icon: FingerprintIcon,
      Component: UserFirstName,
      componentProps: {
        firstName: props.firstName,
        setFirstName: props.setFirstName,
      },
      isDisabled: () =>
        props.firstName === '' || !isValidNameRegex(props.firstName),
      nextStep: 'lastName',
    },
    lastName: {
      title: 'Votre  nom ?',
      subtitle: `Dites nous en un peu plus sur vous, ${props.firstName}.`,
      icon: FingerprintIcon,
      Component: UserLastName,
      componentProps: {
        lastName: props.lastName,
        setLastName: props.setLastName,
      },
      isDisabled: () =>
        props.lastName === '' || !isValidNameRegex(props.lastName),
      nextStep: 'phoneNumber',
    },
    phoneNumber: {
      title: 'Votre numéro de téléphone ?',
      subtitle:
        'Si on doit vous appeler pour la préparation de votre matériel.',
      icon: PhoneIphoneIcon,
      Component: UserPhone,
      componentProps: {
        phoneNumber: props.phoneNumber,
        setPhoneNumber: props.setPhoneNumber,
      },
      isDisabled: () =>
        props.phoneNumber === '' || !isValidPhoneNumberRegex(props.phoneNumber),
      nextStep: 'password',
    },
    password: {
      title: 'Votre mot de passe ?',
      subtitle: 'On ne vous embête plus après. Promis !',
      icon: LockIcon,
      Component: UserPassword,
      componentProps: {
        password: props.password,
        setPassword: props.setPassword,
      },
      isDisabled: () =>
        props.password === '' || !isValidPasswordRegex(props.password),
      nextStep: 'submit',
    },
  };

  const currentConfig = stepConfig[props.currentStep];
  const isButtonDisabled = currentConfig.isDisabled();
  const StepComponent = currentConfig.Component;
  const StepIcon = currentConfig.icon;
  return (
    <Grid
      container
      item
      xs={11}
      sm={10}
      md={5}
      lg={3.5}
      sx={{
        display: 'flex',
        margin: 'auto',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StepIcon sx={{ fontSize: 50, color: color3 }} />
      <Typography variant="h5" fontWeight={700} marginTop={3} gutterBottom>
        {currentConfig.title}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        {currentConfig.subtitle}
      </Typography>
      <Box sx={{ marginTop: '20px', marginBottom: '30px', width: '100%' }}>
        <StepComponent {...currentConfig.componentProps} />
      </Box>
      <StepFormButton
        sx={{ width: '100% ' }}
        onClick={() => props.setCurrentStep(currentConfig.nextStep)}
        disabled={isButtonDisabled}
      >
        {props.currentStep === 'password'
          ? 'Valider mon mot de passe'
          : 'Suivant'}
      </StepFormButton>
    </Grid>
  );
};

export default StepSignUpForm;
