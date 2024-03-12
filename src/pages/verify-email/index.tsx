import LayoutFull from '@/components/layout/LayoutFull';
import EmailVerify from '@/components/users/userVerifyEmail/EmailVerify';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';

const VerifyEmail = () => {
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
              size="small"
              startAdornment={
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
      </Container>
    </LayoutFull>
  );
};

export default VerifyEmail;
