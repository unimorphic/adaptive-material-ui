import { SelectProps } from "@mui/material/Select";
import { SelectBase } from "./selectBase";

export function SelectIOS<Value = unknown>(props: SelectProps<Value>) {
  return <SelectBase native {...props} />;
}
