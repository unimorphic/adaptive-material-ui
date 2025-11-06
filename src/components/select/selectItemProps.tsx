import { MenuItemProps } from "@mui/material/MenuItem";

export interface DefaultAdditionalProps {}

export type SelectItemProps<
  RootComponent extends React.ElementType = "li",
  AdditionalProps = DefaultAdditionalProps,
> = MenuItemProps<RootComponent, AdditionalProps>;
