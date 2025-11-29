import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import { switchClasses, SwitchClasses } from "@mui/material/Switch";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import { lazy, ReactNode } from "react";
import { useAdaptiveMode } from "../../adaptiveMode/adaptiveMode";
import { IosClasses } from "../../shared/ios/iosClasses";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";
import { SwitchBaseProps } from "./switchBase";

export type AdaptiveSwitchProps = SwitchBaseProps &
  StyledComponentProps<keyof AdaptiveSwitchClasses>;

export interface AdaptiveSwitchClasses extends SwitchClasses, IosClasses {}

export const adaptiveSwitchClasses = {
  ...switchClasses,
  ...generateUtilityClasses("AdaptiveSwitch", [
    "android",
    "ios",
    "thumbIcon",
    "thumbIconChecked",
  ]),
};

// See docs\pages\docs\codeSplitting.md
const SwitchAndroid = lazy(async () => {
  const { SwitchAndroid } = await import("../android");
  return { default: SwitchAndroid };
});
const SwitchDesktop = lazy(async () => {
  const { SwitchDesktop } = await import("../desktop");
  return { default: SwitchDesktop };
});
const SwitchIOS = lazy(async () => {
  const { SwitchIOS } = await import("../ios");
  return { default: SwitchIOS };
});

export function AdaptiveSwitch(inProps: AdaptiveSwitchProps) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveSwitch" });
  const adaptiveMode = useAdaptiveMode();

  let content: ReactNode;
  switch (adaptiveMode) {
    case "android":
      content = <SwitchAndroid {...props} />;
      break;
    case "ios":
      content = <SwitchIOS {...props} />;
      break;
    default:
      content = <SwitchDesktop {...props} />;
      break;
  }

  return (
    <ReplaceComponentInTheme
      sourceComponentName="AdaptiveSwitch"
      targetComponentName="MuiSwitch"
    >
      {content}
    </ReplaceComponentInTheme>
  );
}
