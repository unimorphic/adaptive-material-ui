import { ButtonClassKey } from "@mui/material/Button";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import { lazy, useContext } from "react";
import {
  AdaptiveModeProp,
  useAdaptiveModeFromProps,
} from "../../adaptiveMode/adaptiveMode";
import { AdaptiveDialogActionsContext } from "../dialog/adaptiveDialog";
import { ButtonRoundProps } from "./buttonRound";

export interface AdaptiveButtonProps
  extends Omit<ButtonRoundProps, "classes">,
    StyledComponentProps<ButtonClassKey | AdaptiveButtonKey>,
    AdaptiveModeProp {}

export interface AdaptiveButtonClasses {
  /** Styles applied to the iOS mode */
  ios: string;
}

export type AdaptiveButtonKey = keyof AdaptiveButtonClasses;

// See docs\pages\docs\codeSplitting.md
const ButtonAndroid = lazy(async () => {
  const { ButtonAndroid } = await import("../android");
  return { default: ButtonAndroid };
});
const ButtonDesktop = lazy(async () => {
  const { ButtonDesktop } = await import("../desktop");
  return { default: ButtonDesktop };
});
const ButtonIOS = lazy(async () => {
  const { ButtonIOS } = await import("../ios");
  return { default: ButtonIOS };
});

export function AdaptiveButton(inProps: AdaptiveButtonProps) {
  const defaultProps = useContext(AdaptiveDialogActionsContext);

  const props = useThemeProps({
    props: { ...defaultProps, ...inProps },
    name: "AdaptiveButton",
  });
  const [adaptiveMode, otherProps] = useAdaptiveModeFromProps(props);

  switch (adaptiveMode) {
    case "android":
      return <ButtonAndroid {...otherProps} />;
    case "ios":
      return <ButtonIOS {...otherProps} />;
    default:
      return <ButtonDesktop {...otherProps} />;
  }
}
