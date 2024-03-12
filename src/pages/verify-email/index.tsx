import { mutationVerifyEmail } from '@/components/graphql/Users';
import LayoutFull from '@/components/layout/LayoutFull';
import EmailVerify from '@/components/users/userVerifyEmail/EmailVerify';
import { useMutation } from '@apollo/client';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Button,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const VerifyEmail = () => {
  const user = parseInt(useSearchParams().get('userId'));
  const [code, setCode] = useState<string>('');
  const [doCreate, loading] = useMutation(mutationVerifyEmail);

  async function sendCode() {
    try {
      const result = await doCreate({
        variables: {
          userId: user,
          code: code,
        },
      });
    } catch (error) {}
  }

  return (
    <LayoutFull title="RentHub : Vérification email">
      {/* <EmailVerify /> */}
      <Container maxWidth={'sm'}>
        <Grid container>
          <Typography variant="h4">Vérification de votre compte</Typography>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">
              Votre code
            </InputLabel>
            <Input
              id="code"
              value={code}
              onChange={e => setCode(e.target.value)}
              name="code"
              size="small"
              startAdornment={
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <Button onClick={() => sendCode()}> Envoyez </Button>
        </Grid>
      </Container>
    </LayoutFull>
  );
};

export default VerifyEmail;
