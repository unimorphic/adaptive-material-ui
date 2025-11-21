import { ExtendButtonBase } from "@mui/material/ButtonBase";
import {
  IconButtonContained,
  IconButtonContainedProps,
  IconButtonContainedTypeMap,
} from "./iconButtonContained";

export const IconButtonAndroid: ExtendButtonBase<IconButtonContainedTypeMap> =
  function <RootComponent extends React.ElementType, AdditionalProps = {}>(
    props: IconButtonContainedProps<RootComponent, AdditionalProps>,
  ) {
    return <IconButtonContained {...props} />;
  };
