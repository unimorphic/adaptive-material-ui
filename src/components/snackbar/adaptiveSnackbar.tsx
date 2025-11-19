import {
  snackbarClasses,
  SnackbarClasses,
  SnackbarProps,
} from "@mui/material/Snackbar";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import { lazy, ReactNode } from "react";
import { useAdaptiveMode } from "../../adaptiveMode/adaptiveMode";
import { IosClasses } from "../../shared/ios/iosClasses";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";

export type AdaptiveSnackbarProps = SnackbarProps &
  StyledComponentProps<keyof AdaptiveSnackbarClasses>;

export interface AdaptiveSnackbarClasses extends SnackbarClasses, IosClasses {}

export const adaptiveSnackbarClasses = {
  ...snackbarClasses,
  ...generateUtilityClasses("AdaptiveSnackbar", ["ios"]),
};

// See docs\pages\docs\codeSplitting.md
const SnackbarAndroid = lazy(async () => {
  const { SnackbarAndroid } = await import("../android");
  return { default: SnackbarAndroid };
});
const SnackbarDesktop = lazy(async () => {
  const { SnackbarDesktop } = await import("../desktop");
  return { default: SnackbarDesktop };
});
const SnackbarIOS = lazy(async () => {
  const { SnackbarIOS } = await import("../ios");
  return { default: SnackbarIOS };
});

export function AdaptiveSnackbar(inProps: AdaptiveSnackbarProps) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveSnackbar" });
  const adaptiveMode = useAdaptiveMode();

  let content: ReactNode;
  switch (adaptiveMode) {
    case "android":
      content = <SnackbarAndroid {...props} />;
      break;
    case "ios":
      content = <SnackbarIOS {...props} />;
      break;
    default:
      content = <SnackbarDesktop {...props} />;
      break;
  }

  return (
    <ReplaceComponentInTheme
      sourceComponentName="AdaptiveSnackbar"
      targetComponentName="MuiSnackbar"
    >
      {content}
    </ReplaceComponentInTheme>
  );
}
