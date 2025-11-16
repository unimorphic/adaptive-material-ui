import FilledInput, { FilledInputProps } from "@mui/material/FilledInput";
import Input, { InputProps } from "@mui/material/Input";
import OutlinedInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";

export function InputDesktop(props: InputProps) {
  return <Input {...props} />;
}

export function FilledInputDesktop(props: FilledInputProps) {
  return <FilledInput {...props} />;
}

export function OutlinedInputDesktop(props: OutlinedInputProps) {
  return <OutlinedInput {...props} />;
}
