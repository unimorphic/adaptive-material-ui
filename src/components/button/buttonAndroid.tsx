import { ExtendButtonBase } from "@mui/material/ButtonBase";
import { ButtonBase, ButtonBaseProps, ButtonBaseTypeMap } from "./buttonBase";

export const ButtonAndroid: ExtendButtonBase<ButtonBaseTypeMap> = function <
  RootComponent extends React.ElementType,
  AdditionalProps = {},
>(props: ButtonBaseProps<RootComponent, AdditionalProps>) {
  return <ButtonBase {...props} />;
};
