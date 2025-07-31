import { SelectProps } from "@mui/material/Select";
import SelectItemProps, {
  DefaultAdditionalProps,
} from "../shared/selectItemProps";
import SelectNative, { SelectItemNative } from "../shared/selectNative";

export function SelectItemIOS<
  RootComponent extends React.ElementType = "li",
  AdditionalProps = DefaultAdditionalProps,
>(props: SelectItemProps<RootComponent, AdditionalProps>) {
  return <SelectItemNative {...props} />;
}

export default function SelectIOS<Value = unknown>(props: SelectProps<Value>) {
  return <SelectNative {...props} />;
}
