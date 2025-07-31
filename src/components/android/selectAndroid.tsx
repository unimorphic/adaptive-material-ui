import { SelectProps } from "@mui/material/Select";
import SelectItemProps, {
  DefaultAdditionalProps,
} from "../shared/selectItemProps";
import SelectMobile, { SelectItemMobile } from "../shared/selectMobile";

export function SelectItemAndroid<
  RootComponent extends React.ElementType = "li",
  AdditionalProps = DefaultAdditionalProps,
>(props: SelectItemProps<RootComponent, AdditionalProps>) {
  return <SelectItemMobile {...props} />;
}

export default function SelectAndroid<Value = unknown>(
  props: SelectProps<Value>,
) {
  return <SelectMobile {...props} />;
}
