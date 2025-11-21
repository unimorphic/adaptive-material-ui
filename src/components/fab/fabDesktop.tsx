import { ExtendButtonBase } from "@mui/material/ButtonBase";
import Fab, { FabProps, FabTypeMap } from "@mui/material/Fab";

export const FabDesktop: ExtendButtonBase<FabTypeMap> = function <
  RootComponent extends React.ElementType,
  AdditionalProps = {},
>(props: FabProps<RootComponent, AdditionalProps>) {
  return <Fab {...props} />;
};
