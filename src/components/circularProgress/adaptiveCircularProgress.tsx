import {
  circularProgressClasses,
  CircularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import { lazy, ReactNode } from "react";
import {
  AdaptiveModeProp,
  useAdaptiveModeFromProps,
} from "../../adaptiveMode/adaptiveMode";
import { IosClasses } from "../../shared/ios/iosClasses";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";

export interface AdaptiveCircularProgressProps
  extends Omit<CircularProgressProps, "classes">,
    StyledComponentProps<keyof AdaptiveCircularProgressClasses>,
    AdaptiveModeProp {}

export interface AdaptiveCircularProgressClasses
  extends CircularProgressClasses,
    IosClasses {}

export const adaptiveCircularProgressClasses = {
  ...circularProgressClasses,
  ...generateUtilityClasses("AdaptiveCircularProgress", ["ios"]),
};

// See docs\pages\docs\codeSplitting.md
const CircularProgressAndroid = lazy(async () => {
  const { CircularProgressAndroid } = await import("../android");
  return { default: CircularProgressAndroid };
});
const CircularProgressDesktop = lazy(async () => {
  const { CircularProgressDesktop } = await import("../desktop");
  return { default: CircularProgressDesktop };
});
const CircularProgressIOS = lazy(async () => {
  const { CircularProgressIOS } = await import("../ios");
  return { default: CircularProgressIOS };
});

export function AdaptiveCircularProgress(
  inProps: AdaptiveCircularProgressProps,
) {
  const props = useThemeProps({
    props: inProps,
    name: "AdaptiveCircularProgress",
  });
  const [adaptiveMode, otherProps] = useAdaptiveModeFromProps(props);

  let content: ReactNode;
  switch (adaptiveMode) {
    case "android":
      content = <CircularProgressAndroid {...otherProps} />;
      break;
    case "ios":
      content = <CircularProgressIOS {...otherProps} />;
      break;
    default:
      content = <CircularProgressDesktop {...otherProps} />;
      break;
  }

  return (
    <ReplaceComponentInTheme
      sourceComponentName="AdaptiveCircularProgress"
      targetComponentName="MuiCircularProgress"
    >
      {content}
    </ReplaceComponentInTheme>
  );
}
