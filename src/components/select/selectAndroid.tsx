import { SelectProps } from "@mui/material/Select";
import { DefaultAdditionalProps, SelectItemProps } from "./selectItemProps";
import { SelectItemNative, SelectNative } from "./selectNative";

export function SelectItemAndroid<
  RootComponent extends React.ElementType = "li",
  AdditionalProps = DefaultAdditionalProps,
>(props: SelectItemProps<RootComponent, AdditionalProps>) {
  return <SelectItemNative {...props} />;
}

export function SelectAndroid<Value = unknown>(props: SelectProps<Value>) {
  return <SelectNative {...props} />;
}
