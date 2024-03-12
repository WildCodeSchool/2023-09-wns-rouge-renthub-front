import { styled } from '@mui/material';
import { VariablesColors } from './Variables.colors';

const colors = new VariablesColors();
const { color1, color2, color3 } = colors;

interface ButtonsHoverProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const OrangeBtnWhiteHover = styled('button')<ButtonsHoverProps>(() => ({
  borderRadius: '10px',
  backgroundColor: color3,
  color: 'white',
  fontWeight: '600',
  minWidth: '160px',
  minHeight: '40px',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  transition:
    'background-color 0.3s ease, color 0.3s ease, font-weight 0.3s ease',
  '&:hover': {
    backgroundColor: color2,
    color: color1,
    border: `1px solid ${color1}`,
  },
}));

export const OrangeBtnBlueHover = styled('button')<ButtonsHoverProps>(() => ({
  borderRadius: '10px',
  backgroundColor: color3,
  color: 'white',
  fontWeight: '600',
  minWidth: '160px',
  minHeight: '40px',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  transition:
    'background-color 0.3s ease, color 0.3s ease, font-weight 0.3s ease',
  '&:hover': {
    backgroundColor: color1,
  },
}));

const cardButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  borderRadius: '20px',
  fontWeight: '600',
  height: '25px',
  padding: '2px 25px',
  outline: '1px solid #000000',
  border: 'none',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  transition:
    'background-color 0.3s ease, color 0.3s ease, font-weight 0.3s ease',
};
export const CardTarifBtn = styled('button')<ButtonsHoverProps>(() => ({
  ...cardButtonStyles,
  backgroundColor: 'white',
  color: 'black',

  '&:hover': {
    backgroundColor: 'black',
    color: 'white',
  },
}));

export const CardDetailsBtn = styled('button')<ButtonsHoverProps>(() => ({
  ...cardButtonStyles,
  backgroundColor: 'black',
  color: 'white',
  '&:hover': {
    backgroundColor: 'white',
    color: 'black',
  },
}));
