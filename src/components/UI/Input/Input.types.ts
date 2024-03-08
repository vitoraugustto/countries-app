import { CSSProperties, ChangeEvent, FocusEvent } from 'react';

import { TextFieldProps } from '@mui/material';

export interface IInput {
  multiline?: boolean;
  shouldFocus?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  variant?: TextFieldProps['variant'];
  fullWidth?: boolean;
  hiddenLabel?: boolean;
  label?: string;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  maxLength?: number;
  value: string;
  padding?: CSSProperties['padding'];
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  minRows?: string | number;
  maxRows?: string | number;
  helperText?: string;
  style?: CSSProperties;
}
