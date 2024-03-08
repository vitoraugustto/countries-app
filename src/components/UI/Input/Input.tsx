import { TextField } from '@mui/material';

import { IInput } from './Input.types';

export const Input: React.FC<IInput> = ({
  multiline,
  autoFocus,
  fullWidth,
  placeholder,
  label,
  maxLength,
  value,
  onFocus,
  onChange,
  shouldFocus,
  endAdornment,
  startAdornment,
  hiddenLabel,
  variant,
  minRows,
  maxRows,
  helperText,
  style,
}) => {
  return (
    <TextField
      InputProps={{
        endAdornment,
        startAdornment,
        style,
      }}
      hiddenLabel={hiddenLabel}
      multiline={multiline}
      inputRef={(input) => shouldFocus && input && input.focus()}
      autoFocus={autoFocus}
      inputProps={{ maxLength: maxLength }}
      placeholder={placeholder}
      fullWidth={fullWidth}
      label={label}
      value={value}
      onFocus={onFocus}
      onChange={onChange}
      variant={variant}
      margin="normal"
      minRows={minRows}
      maxRows={maxRows}
      helperText={helperText}
      style={{ margin: 0 }}
    />
  );
};
