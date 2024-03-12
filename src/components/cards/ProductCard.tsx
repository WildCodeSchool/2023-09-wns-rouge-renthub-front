import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CardDetailsBtn, CardTarifBtn } from '@/styles/MuiButtons';

function ProductCard({ brand, name, description, src, alt }) {
  return (
    <Card sx={{ width: 286, height: 380, borderRadius: '20px' }}>
      <Box
        sx={{
          width: '100%',
          height: 180,
          padding: '20px 20px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <CardMedia
            component="img"
            alt={alt}
            image={src}
            sx={{
              maxWidth: '100%',
            }}
          />
        </Box>
        <Typography
          gutterBottom
          paragraph
          component="div"
          sx={{ alignSelf: 'flex-start', marginBottom: 0 }}
        >
          <b style={{ color: '#FF8E3C' }}>{brand}</b>
        </Typography>
      </Box>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
        }}
      >
        <Box>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ marginBottom: 0 }}
          >
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
        <Box>
          <Stack
            direction={'column'}
            justifyContent="flex-start"
            alignItems="flex-start"
            gap={2}
          >
            <CardTarifBtn>
              Tarif et durée de location
              <KeyboardArrowDownIcon />
            </CardTarifBtn>

            <CardDetailsBtn>Voir le matériel</CardDetailsBtn>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
