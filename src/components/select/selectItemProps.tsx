import { MenuItemProps } from "@mui/material/MenuItem";

export type SelectItemProps<
  RootComponent extends React.ElementType = "li",
  AdditionalProps = {},
> = MenuItemProps<RootComponent, AdditionalProps>;
