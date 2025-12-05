import { ExtendButtonBase } from "@mui/material/ButtonBase";
import {
  IconButtonBase,
  IconButtonBaseProps,
  IconButtonBaseTypeMap,
} from "./iconButtonBase";

export const IconButtonDesktop: ExtendButtonBase<IconButtonBaseTypeMap> =
  function <RootComponent extends React.ElementType, AdditionalProps = {}>(
    props: IconButtonBaseProps<RootComponent, AdditionalProps>,
  ) {
    return <IconButtonBase {...props} />;
  };
