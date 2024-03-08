import { Color } from '@common/types';
import { SxProps } from '@mui/material';

export interface IButton {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: 'text' | 'contained' | 'outlined';
  disabled?: boolean;
  borderRadius?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
  fullWidth?: boolean;
  text: string;
  backgroundColor?: Color | string;
  color?: Color;
  loading?: boolean;
  style?: SxProps;
  onClick?: () => void;
}
