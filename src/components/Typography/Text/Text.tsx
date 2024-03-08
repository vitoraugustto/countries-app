import { Typography } from '@mui/material';

import { IText } from './Text.types';

export const Text: React.FC<IText> = ({
  id,
  align,
  fontSize,
  fontWeight,
  color,
  letterSpacing,
  lineHeight,
  fontFamily,
  variant,
  component,
  style,
  children,
}) => {
  return (
    <Typography
      id={id}
      component={component}
      sx={{ display: 'inline-block', whiteSpace: 'pre-line', ...style }}
      color={color}
      fontWeight={fontWeight}
      fontSize={fontSize}
      fontFamily={fontFamily}
      variant={variant}
      align={align}
      letterSpacing={letterSpacing}
      lineHeight={lineHeight}
    >
      {children}
    </Typography>
  );
};
