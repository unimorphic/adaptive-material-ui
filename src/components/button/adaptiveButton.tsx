import { buttonClasses, ButtonClasses } from "@mui/material/Button";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import { lazy, ReactNode, useContext } from "react";
import {
  AdaptiveModeProp,
  useAdaptiveModeFromProps,
} from "../../adaptiveMode/adaptiveMode";
import { IosClasses } from "../../shared/ios/iosClasses";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";
import { AdaptiveDialogActionsContext } from "../dialog/adaptiveDialog";
import { ButtonRoundProps } from "./buttonRound";

export interface AdaptiveButtonProps
  extends Omit<ButtonRoundProps, "classes">,
    StyledComponentProps<keyof AdaptiveButtonClasses>,
    AdaptiveModeProp {}

export interface AdaptiveButtonClasses extends ButtonClasses, IosClasses {}

export const adaptiveButtonClasses = {
  ...buttonClasses,
  ...generateUtilityClasses("AdaptiveButton", ["ios"]),
};

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

  let content: ReactNode;
  switch (adaptiveMode) {
    case "android":
      content = <ButtonAndroid {...otherProps} />;
      break;
    case "ios":
      content = <ButtonIOS {...otherProps} />;
      break;
    default:
      content = <ButtonDesktop {...otherProps} />;
      break;
  }

  return (
    <ReplaceComponentInTheme
      sourceComponentName="AdaptiveButton"
      targetComponentName="MuiButton"
    >
      {content}
    </ReplaceComponentInTheme>
  );
}
