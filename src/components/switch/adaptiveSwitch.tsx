import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import {
  switchClasses,
  SwitchClasses,
  SwitchProps,
} from "@mui/material/Switch";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import { lazy, ReactNode } from "react";
import {
  AdaptiveModeProp,
  useAdaptiveModeFromProps,
} from "../../adaptiveMode/adaptiveMode";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";

export interface AdaptiveSwitchProps
  extends Omit<SwitchProps, "classes">,
    StyledComponentProps<keyof AdaptiveSwitchClasses>,
    AdaptiveModeProp {}

export interface AdaptiveSwitchClasses extends SwitchClasses {
  /** Styles applied to the iOS mode */
  ios: string;
}

export const adaptiveSwitchClasses = {
  ...switchClasses,
  ...generateUtilityClasses("AdaptiveSwitch", ["ios"]),
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
  const [adaptiveMode, otherProps] = useAdaptiveModeFromProps(props);

  let content: ReactNode;
  switch (adaptiveMode) {
    case "android":
      content = <SwitchAndroid {...otherProps} />;
      break;
    case "ios":
      content = <SwitchIOS {...otherProps} />;
      break;
    default:
      content = <SwitchDesktop {...otherProps} />;
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
