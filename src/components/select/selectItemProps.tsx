import { MenuItemProps } from "@mui/material/MenuItem";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DefaultAdditionalProps {}

export type SelectItemProps<
  RootComponent extends React.ElementType = "li",
  AdditionalProps = DefaultAdditionalProps,
> = MenuItemProps<RootComponent, AdditionalProps>;
