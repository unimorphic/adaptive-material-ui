import {
  buttonClasses,
  ButtonClasses,
  ButtonOwnProps,
} from "@mui/material/Button";
import {
  ExtendButtonBase,
  ExtendButtonBaseTypeMap,
} from "@mui/material/ButtonBase";
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
import { ButtonRoundOwnProps, ButtonRoundProps } from "./buttonRound";

type AdaptiveButtonOwnProps = AdaptiveModeProp &
  StyledComponentProps<keyof AdaptiveButtonClasses>;

type AdaptiveButtonTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "button",
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps &
    ButtonOwnProps &
    ButtonRoundOwnProps &
    AdaptiveButtonOwnProps;
  defaultComponent: RootComponent;
}>;

export type AdaptiveButtonProps<
  RootComponent extends
    React.ElementType = AdaptiveButtonTypeMap["defaultComponent"],
  AdditionalProps = {},
> = ButtonRoundProps<RootComponent, AdditionalProps> & AdaptiveButtonOwnProps;

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

export const AdaptiveButton: ExtendButtonBase<AdaptiveButtonTypeMap> =
  function <RootComponent extends React.ElementType, AdditionalProps = {}>(
    inProps: AdaptiveButtonProps<RootComponent, AdditionalProps>,
  ) {
    const defaultProps = useContext(AdaptiveDialogActionsContext);

    const props = useThemeProps({
      props: { ...defaultProps, ...inProps },
      name: "AdaptiveButton",
    });
    const [adaptiveMode, otherProps] = useAdaptiveModeFromProps(props);

    let content: ReactNode;
    switch (adaptiveMode) {
      case "android":
        content = <ButtonAndroid {...(otherProps as AdaptiveButtonProps)} />;
        break;
      case "ios":
        content = <ButtonIOS {...(otherProps as AdaptiveButtonProps)} />;
        break;
      default:
        content = <ButtonDesktop {...(otherProps as AdaptiveButtonProps)} />;
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
  };
