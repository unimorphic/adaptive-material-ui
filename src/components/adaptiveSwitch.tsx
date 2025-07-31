import { useThemeProps } from "@mui/material/styles";
import { SwitchClasses, SwitchProps } from "@mui/material/Switch";
import { lazy } from "react";
import {
  AdaptiveMode,
  AdaptiveModeProp,
  useAdaptiveModeFromProps,
} from "../adaptiveMode/adaptiveMode";

export interface AdaptiveSwitchProps extends SwitchProps, AdaptiveModeProp {
  classes?: Partial<SwitchClasses> & Partial<AdaptiveSwitchClasses>;
}

export interface AdaptiveSwitchClasses {
  /** Styles applied to the iOS mode */
  ios: string;
}

export type AdaptiveSwitchKey = keyof AdaptiveSwitchClasses;

// See docs\pages\docs\theCodes\codeSplitting.md
const SwitchAndroid = lazy(async () => {
  const { SwitchAndroid } = await import("./android");
  return { default: SwitchAndroid };
});
const SwitchDesktop = lazy(async () => {
  const { SwitchDesktop } = await import("./desktop");
  return { default: SwitchDesktop };
});
const SwitchIOS = lazy(async () => {
  const { SwitchIOS } = await import("./ios");
  return { default: SwitchIOS };
});

export default function AdaptiveSwitch(inProps: AdaptiveSwitchProps) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveSwitch" });
  const [adaptiveMode, otherProps] = useAdaptiveModeFromProps(props);

  switch (adaptiveMode) {
    case AdaptiveMode.android:
      return <SwitchAndroid {...otherProps} />;
    case AdaptiveMode.ios:
      return <SwitchIOS {...otherProps} />;
    default:
      return <SwitchDesktop {...otherProps} />;
  }
}
