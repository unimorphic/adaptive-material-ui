import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import { SwitchClassKey, SwitchProps } from "@mui/material/Switch";
import { lazy } from "react";
import {
  AdaptiveModeProp,
  useAdaptiveModeFromProps,
} from "../../adaptiveMode/adaptiveMode";

export interface AdaptiveSwitchProps
  extends Omit<SwitchProps, "classes">,
    StyledComponentProps<SwitchClassKey | AdaptiveSwitchKey>,
    AdaptiveModeProp {}

export interface AdaptiveSwitchClasses {
  /** Styles applied to the iOS mode */
  ios: string;
}

export type AdaptiveSwitchKey = keyof AdaptiveSwitchClasses;

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

export default function AdaptiveSwitch(inProps: AdaptiveSwitchProps) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveSwitch" });
  const [adaptiveMode, otherProps] = useAdaptiveModeFromProps(props);

  switch (adaptiveMode) {
    case "android":
      return <SwitchAndroid {...otherProps} />;
    case "ios":
      return <SwitchIOS {...otherProps} />;
    default:
      return <SwitchDesktop {...otherProps} />;
  }
}
