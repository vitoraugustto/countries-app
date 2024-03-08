import { Color } from '@common/types';
import { SxProps } from '@mui/material';

export interface IBox {
  border?: string;
  backgroundColor?: Color | string;
  width?: string | number;
  height?: string | number;
  flexDirection?: 'column' | 'column-reverse' | 'row' | 'row-reverse';
  gap?: string | number;
  minHeight?: string | number;
  minWidth?: string | number;
  borderRadius?: string | number;
  hCenter?: boolean;
  vCenter?: boolean;
  p?: string | number;
  pt?: string | number;
  pr?: string | number;
  pb?: string | number;
  pl?: string | number;
  px?: string | number;
  py?: string | number;
  m?: string | number;
  mt?: string | number;
  mr?: string | number;
  mb?: string | number;
  ml?: string | number;
  mx?: string | number;
  my?: string | number;
  onClick?: () => void;
  component?: 'aside' | 'section' | 'main';
  style?: SxProps;
  children?: React.ReactNode | undefined;
}
