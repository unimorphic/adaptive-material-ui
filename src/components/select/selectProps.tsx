import { ListSubheaderProps } from "@mui/material/ListSubheader";
import { MenuItemProps } from "@mui/material/MenuItem";
import { SelectProps } from "@mui/material/Select";

export type SelectItemProps<
  RootComponent extends React.ElementType = "li",
  AdditionalProps = {},
> = MenuItemProps<RootComponent, AdditionalProps>;

export type SelectItemGroupProps<
  RootComponent extends React.ElementType = "li",
  AdditionalProps = {},
> = ListSubheaderProps<RootComponent, AdditionalProps> & {
  /**
   * Group header text
   */
  label?: string;
};

export type SelectNativeProps<Value = unknown> = SelectProps<Value> & {
  /**
   * Removes the hidden empty value native `option`
   * @default false
   */
  disableNativeEmptyValue?: boolean;
};
