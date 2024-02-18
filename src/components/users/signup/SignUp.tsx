import React, { useState } from 'react';
import StepEmail from './StepEmail';
import StepFirstName from './StepFirstName';
import StepLastName from './StepLastName';
import StepPhoneNumber from './StepPhoneNumber';
import StepPassword from './StepPassword';
import { Box, Button, Grid, Typography } from '@mui/material';
import { VariablesColors } from '@/styles/Variables.colors';
import { useMutation } from '@apollo/client';
import { mutationCreateUser } from '@/components/graphql/Users';
import { UserFormData } from '@/types/UserTypes';

const colors = new VariablesColors();
const { color2 } = colors;

const SignUp = (): React.ReactNode => {
  // FORM
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const hidenPassword = (): string => {
    const length = password.length;
    const hidenPassword = '*'.repeat(length);
    return hidenPassword;
  };
  // SUBMIT
  const [doCreate] = useMutation(mutationCreateUser);
  async function onSubmit() {
    try {
      const data: UserFormData = {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
      };

      const result = await doCreate({
        variables: {
          data: data,
        },
      });
      if ('id' in result.data?.item) {
        // toast(
        //   `Bienvenue ${result.data?.item.nickName} ! Un email de confirmation vous a été envoyé.`
        // );
        // setTimeout(() => {
        //   router.replace(`/`);
        // }, 2000);
      } else {
        // toast('Erreur pendant la création de votre compte');
      }
    } catch (error) {
      // toast('Erreur pendant la création de votre compte');
      console.error('error', error);
    }
  }
  const [currentStep, setCurrentStep] = useState<string>('email');
  // DISPLAY
  const PageDisplay = () => {
    switch (currentStep) {
      case 'email':
        return (
          <StepEmail
            UserEmailProps={{ email, setEmail }}
            setCurrentStep={setCurrentStep}
          />
        );
      case 'firstName':
        return (
          <StepFirstName
            firstName={firstName}
            setFirstName={setFirstName}
            setCurrentStep={setCurrentStep}
          />
        );
      case 'lastName':
        return (
          <StepLastName
            firstName={firstName}
            lastName={lastName}
            setLastName={setLastName}
            setCurrentStep={setCurrentStep}
          />
        );
      case 'phoneNumber':
        return (
          <StepPhoneNumber
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            setCurrentStep={setCurrentStep}
          />
        );
      case 'password':
        return (
          <StepPassword
            password={password}
            setPassword={setPassword}
            onSubmit={onSubmit}
          />
        );
    }
  };
  // FORM STEPS
  const formSteps = [
    {
      step: 'email',
      title: 'Votre adresse email',
      data: email,
    },
    { step: 'firstName', title: 'Votre prénom', data: firstName },
    { step: 'lastName', title: 'Votre nom', data: lastName },
    {
      step: 'phoneNumber',
      title: 'Votre numéro de téléphone',
      data: phoneNumber,
    },
    { step: 'password', title: 'Votre mot de passe', data: password },
  ];

  return (
    <Grid
      container
      item
      xs={11}
      sx={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Grid
        item
        xs={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: color2,
        }}
      >
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Vos informations
        </Typography>
        {formSteps.map(el => (
          <div key={el.step}>
            <p>{el.title}</p>
            {el.step === 'password' ? (
              <p>{!el.data ? '-' : hidenPassword()}</p>
            ) : (
              <p>{el.data ? el.data : '-'}</p>
            )}

            {el.data && el.step !== currentStep && (
              <Button onClick={() => setCurrentStep(el.step)}>Modifier</Button>
            )}
          </div>
        ))}
      </Grid>
      <Grid item xs={9}>
        <Box>{PageDisplay()}</Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;
