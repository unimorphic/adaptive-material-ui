import { circularProgressClasses } from "@mui/material/CircularProgress";
import { useThemeProps } from "@mui/material/styles";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import { lazy, ReactNode } from "react";
import { useAdaptiveMode } from "../../adaptiveMode/adaptiveMode";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";
import { AdaptiveCircularProgressProps } from "./circularProgressProps";

export const adaptiveCircularProgressClasses = {
  ...circularProgressClasses,
  ...generateUtilityClasses("AdaptiveCircularProgress", ["android", "ios"]),
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
  const adaptiveMode = useAdaptiveMode();

  let content: ReactNode;
  switch (adaptiveMode) {
    case "android":
      content = <CircularProgressAndroid {...props} />;
      break;
    case "ios":
      content = <CircularProgressIOS {...props} />;
      break;
    default:
      content = <CircularProgressDesktop {...props} />;
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
