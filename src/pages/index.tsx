import LayoutFull from '@/components/layout/LayoutFull';
import { Box, Typography } from '@mui/material';

const Home = (): React.ReactNode => {
  return (
    <LayoutFull title="Accueil TGC">
      <Box className="userForm">
        <Typography variant="h3">YOUHOUUUUUU !</Typography>
        <Typography variant="h5">
          {"Bah ya plus qu'à bosser maintenant..."}
        </Typography>
      </Box>
    </LayoutFull>
  );
};

export default Home;
