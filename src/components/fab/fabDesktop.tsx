import Fab, { FabProps, FabTypeMap } from "@mui/material/Fab";

export function FabDesktop<
  RootComponent extends React.ElementType = FabTypeMap["defaultComponent"],
  AdditionalProps = {},
>(props: FabProps<RootComponent, AdditionalProps>) {
  return <Fab {...props} />;
}
