import { SelectProps } from "@mui/material/Select";
import { SelectBase } from "./selectBase";

export function SelectAndroid<Value = unknown>(props: SelectProps<Value>) {
  return <SelectBase native {...props} />;
}
