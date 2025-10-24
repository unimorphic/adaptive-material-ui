import { SelectProps } from "@mui/material/Select";
import SelectItemProps, { DefaultAdditionalProps } from "./selectItemProps";
import SelectNative, { SelectItemNative } from "./selectNative";

export function SelectItemAndroid<
  RootComponent extends React.ElementType = "li",
  AdditionalProps = DefaultAdditionalProps,
>(props: SelectItemProps<RootComponent, AdditionalProps>) {
  return <SelectItemNative {...props} />;
}

export default function SelectAndroid<Value = unknown>(
  props: SelectProps<Value>,
) {
  return <SelectNative {...props} />;
}
