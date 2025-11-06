import { ButtonTypeMap } from "@mui/material/Button";
import { ButtonRound, ButtonRoundProps } from "./buttonRound";

export function ButtonDesktop<
  RootComponent extends React.ElementType = ButtonTypeMap["defaultComponent"],
  AdditionalProps = {},
>(props: ButtonRoundProps<RootComponent, AdditionalProps>) {
  return <ButtonRound {...props} />;
}
