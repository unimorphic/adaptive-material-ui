import { SelectProps } from "@mui/material/Select";
import {
  SelectItemGroupNative,
  SelectItemNative,
  SelectNative,
} from "./selectNative";
import { SelectItemGroupProps, SelectItemProps } from "./selectProps";

export function SelectItemIOS<
  RootComponent extends React.ElementType = "li",
  AdditionalProps = {},
>(props: SelectItemProps<RootComponent, AdditionalProps>) {
  return <SelectItemNative {...props} />;
}

export function SelectItemGroupIOS<
  RootComponent extends React.ElementType = "li",
  AdditionalProps = {},
>(props: SelectItemGroupProps<RootComponent, AdditionalProps>) {
  return <SelectItemGroupNative {...props} />;
}

export function SelectIOS<Value = unknown>(props: SelectProps<Value>) {
  return <SelectNative {...props} />;
}
