import { CircularProgress, Button as MuiButton } from '@mui/material';

import { IButton } from './Button.types';

export const Button: React.FC<IButton> = ({
  startIcon,
  endIcon,
  variant = 'contained',
  disabled = false,
  minWidth,
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
        minWidth: minWidth,
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
      {loading ? <CircularProgress style={{ color: 'white' }} /> : text}
    </MuiButton>
  );
};

const BUTTON_MIN_HEIGHT = 44;
