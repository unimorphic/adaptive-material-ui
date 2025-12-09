import { ExtendButtonBase } from "@mui/material/ButtonBase";
import { FabBase, FabBaseProps, FabBaseTypeMap } from "./fabBase";

export const FabDesktop: ExtendButtonBase<FabBaseTypeMap> = function <
  RootComponent extends React.ElementType,
  AdditionalProps = {},
>(props: FabBaseProps<RootComponent, AdditionalProps>) {
  return <FabBase {...props} />;
};
