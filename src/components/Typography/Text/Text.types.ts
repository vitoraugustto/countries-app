import { Color } from '@common/types';
import { SxProps } from '@mui/material';

export interface IText {
  id?: string;
  children: React.ReactNode;
  align?: 'center' | 'left' | 'right' | 'justify';
  fontSize?: string | number;
  fontWeight?: '400' | '600' | '700';
  color?: Color | string;
  letterSpacing?: string | number;
  lineHeight?: string | number;
  fontFamily?: 'Lato' | 'Titillium Web';
  component?: any;
  style?: SxProps;
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'button'
    | 'caption'
    | undefined;
}
