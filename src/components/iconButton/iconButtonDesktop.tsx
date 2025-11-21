import { ExtendButtonBase } from "@mui/material/ButtonBase";
import {
  IconButtonContained,
  IconButtonContainedProps,
  IconButtonContainedTypeMap,
} from "./iconButtonContained";

export const IconButtonDesktop: ExtendButtonBase<IconButtonContainedTypeMap> =
  function <RootComponent extends React.ElementType, AdditionalProps = {}>(
    props: IconButtonContainedProps<RootComponent, AdditionalProps>,
  ) {
    return <IconButtonContained {...props} />;
  };
