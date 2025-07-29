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

// The below import statements have to be destructured for proper tree shaking
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

  if (adaptiveMode === AdaptiveMode.ios) {
    return <SwitchIOS {...otherProps} />;
  }

  return <SwitchDesktop {...otherProps} />;
}
