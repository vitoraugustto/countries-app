import { Button as MuiButton } from '@mui/material';

import { IButton } from './Button.types';

export const Button: React.FC<IButton> = ({
  startIcon,
  endIcon,
  variant = 'contained',
  disabled = false,
  minHeight = BUTTON_MIN_HEIGHT,
  maxHeight,
  borderRadius = '5px',
  fullWidth = true,
  text,
  color,
  backgroundColor,
  loading,
  style,
  onClick,
}) => {
  return (
    <MuiButton
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        transition: '0.5s',
        borderRadius: borderRadius,
        minHeight: minHeight,
        maxHeight: maxHeight,
        backgroundColor: backgroundColor,
        color: color,
        ':hover': {
          backgroundColor: backgroundColor + '8d',
        },
        ...style,
      }}
      fullWidth={fullWidth}
      disabled={disabled}
      variant={variant}
      onClick={onClick}
    >
      {loading ? 'Carregando' : text}
    </MuiButton>
  );
};

const BUTTON_MIN_HEIGHT = 44;
