import { IconButtonTypeMap } from "@mui/material/IconButton";
import {
  IconButtonContained,
  IconButtonContainedProps,
} from "./iconButtonContained";

export function IconButtonDesktop<
  RootComponent extends
    React.ElementType = IconButtonTypeMap["defaultComponent"],
  AdditionalProps = {},
>(props: IconButtonContainedProps<RootComponent, AdditionalProps>) {
  return <IconButtonContained {...props} />;
}
