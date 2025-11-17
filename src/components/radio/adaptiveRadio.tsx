import { radioClasses, RadioClasses, RadioProps } from "@mui/material/Radio";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import { lazy, ReactNode } from "react";
import {
  AdaptiveModeProp,
  useAdaptiveModeFromProps,
} from "../../adaptiveMode/adaptiveMode";
import { IosClasses } from "../../shared/ios/iosClasses";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";

export type AdaptiveRadioProps = RadioProps &
  StyledComponentProps<keyof AdaptiveRadioClasses> &
  AdaptiveModeProp;

export interface AdaptiveRadioClasses extends RadioClasses, IosClasses {}

export const adaptiveRadioClasses = {
  ...radioClasses,
  ...generateUtilityClasses("AdaptiveRadio", ["ios"]),
};

// See docs\pages\docs\codeSplitting.md
const RadioAndroid = lazy(async () => {
  const { RadioAndroid } = await import("../android");
  return { default: RadioAndroid };
});
const RadioDesktop = lazy(async () => {
  const { RadioDesktop } = await import("../desktop");
  return { default: RadioDesktop };
});
const RadioIOS = lazy(async () => {
  const { RadioIOS } = await import("../ios");
  return { default: RadioIOS };
});

export function AdaptiveRadio(inProps: AdaptiveRadioProps) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveRadio" });
  const [adaptiveMode, otherProps] = useAdaptiveModeFromProps(props);

  let content: ReactNode;
  switch (adaptiveMode) {
    case "android":
      content = <RadioAndroid {...otherProps} />;
      break;
    case "ios":
      content = <RadioIOS {...otherProps} />;
      break;
    default:
      content = <RadioDesktop {...otherProps} />;
      break;
  }

  return (
    <ReplaceComponentInTheme
      sourceComponentName="AdaptiveRadio"
      targetComponentName="MuiRadio"
    >
      {content}
    </ReplaceComponentInTheme>
  );
}
