import Fab, { FabProps, FabTypeMap } from "@mui/material/Fab";

export function FabAndroid<
  RootComponent extends React.ElementType = FabTypeMap["defaultComponent"],
  AdditionalProps = {},
>(props: FabProps<RootComponent, AdditionalProps>) {
  return <Fab {...props} />;
}
