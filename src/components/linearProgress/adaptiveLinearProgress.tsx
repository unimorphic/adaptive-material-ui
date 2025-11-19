import {
  linearProgressClasses,
  LinearProgressClasses,
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import { lazy, ReactNode } from "react";
import { useAdaptiveMode } from "../../adaptiveMode/adaptiveMode";
import { IosClasses } from "../../shared/ios/iosClasses";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";

export type AdaptiveLinearProgressProps = LinearProgressProps &
  StyledComponentProps<keyof AdaptiveLinearProgressClasses>;

export interface AdaptiveLinearProgressClasses
  extends LinearProgressClasses,
    IosClasses {}

export const adaptiveLinearProgressClasses = {
  ...linearProgressClasses,
  ...generateUtilityClasses("AdaptiveLinearProgress", ["ios"]),
};

// See docs\pages\docs\codeSplitting.md
const LinearProgressAndroid = lazy(async () => {
  const { LinearProgressAndroid } = await import("../android");
  return { default: LinearProgressAndroid };
});
const LinearProgressDesktop = lazy(async () => {
  const { LinearProgressDesktop } = await import("../desktop");
  return { default: LinearProgressDesktop };
});
const LinearProgressIOS = lazy(async () => {
  const { LinearProgressIOS } = await import("../ios");
  return { default: LinearProgressIOS };
});

export function AdaptiveLinearProgress(inProps: AdaptiveLinearProgressProps) {
  const props = useThemeProps({
    props: inProps,
    name: "AdaptiveLinearProgress",
  });
  const adaptiveMode = useAdaptiveMode();

  let content: ReactNode;
  switch (adaptiveMode) {
    case "android":
      content = <LinearProgressAndroid {...props} />;
      break;
    case "ios":
      content = <LinearProgressIOS {...props} />;
      break;
    default:
      content = <LinearProgressDesktop {...props} />;
      break;
  }

  return (
    <ReplaceComponentInTheme
      sourceComponentName="AdaptiveLinearProgress"
      targetComponentName="MuiLinearProgress"
    >
      {content}
    </ReplaceComponentInTheme>
  );
}
