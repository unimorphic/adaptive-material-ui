import FilledInput, { FilledInputProps } from "@mui/material/FilledInput";
import Input, { InputProps } from "@mui/material/Input";
import OutlinedInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";

export function InputAndroid(props: InputProps) {
  return <Input {...props} />;
}

export function FilledInputAndroid(props: FilledInputProps) {
  return <FilledInput {...props} />;
}

export function OutlinedInputAndroid(props: OutlinedInputProps) {
  return <OutlinedInput {...props} />;
}
