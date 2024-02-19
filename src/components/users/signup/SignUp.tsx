import React, { useState } from 'react';
import StepSignUpForm from './StepForm';
import { Button, Grid, Typography } from '@mui/material';
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
      xs={12}
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
          height: '89vh',
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
        <StepSignUpForm
          email={email}
          setEmail={setEmail}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          password={password}
          setPassword={setPassword}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </Grid>
    </Grid>
  );
};

export default SignUp;
