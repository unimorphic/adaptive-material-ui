import { ExtendButtonBase } from "@mui/material/ButtonBase";
import {
  ButtonRound,
  ButtonRoundProps,
  ButtonRoundTypeMap,
} from "./buttonRound";

export const ButtonAndroid: ExtendButtonBase<ButtonRoundTypeMap> = function <
  RootComponent extends React.ElementType,
  AdditionalProps = {},
>(props: ButtonRoundProps<RootComponent, AdditionalProps>) {
  return <ButtonRound {...props} />;
};
