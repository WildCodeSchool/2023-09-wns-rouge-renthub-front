import { useState } from 'react';
// MUI imports
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import {
  Card,
  CardProps,
  Collapse,
  Grid,
  Stack,
  Typography,
  Button,
} from '@mui/material';
import { styled } from '@mui/material';
import Link from 'next/link';

type CollapseCardPropsType = {
  id: number;
  priceArray: number[];
};

function CollapseCard({ id, priceArray }: CollapseCardPropsType) {
  const [expand, setExpand] = useState<boolean | undefined>(false);

  const CollapseCardStyled = styled<typeof Card>(Card)<CardProps>(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: '13px',
    outline: '1px solid black',
    boxShadow: 'none',
    whiteSpace: 'nowrap',
    transition:
      'background-color 0.3s ease, color 0.3s ease, font-weight 0.3s ease',
    backgroundColor: 'white',
    color: 'black',
  }));

  return (
    <Button sx={{ padding: 0, textTransform: 'none' }}>
      <CollapseCardStyled>
        <Stack
          sx={{
            display: 'flex',
            height: '25px',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0 20px',
            margin: '0',
            cursor: 'pointer',
          }}
          onClick={() => setExpand(!expand)}
        >
          <Typography variant="body2">Tarif et durée de location</Typography>

          {expand ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </Stack>

        <Collapse in={expand} sx={{ width: '100%' }}>
          <Grid
            container
            alignItems="flex-start"
            justifyContent="flex-start"
            padding={'20px'}
          >
            {priceArray.map((price, index) => (
              <Grid item xs={12} key={index}>
                <Link
                  href={`/?productId=${id}/&price=${price}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    alignSelf: 'flex-start',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      '&:hover': { fontWeight: 'bold' },
                    }}
                  >
                    {price}€ par jour
                  </Typography>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Collapse>
      </CollapseCardStyled>
    </Button>
  );
}

export default CollapseCard;
