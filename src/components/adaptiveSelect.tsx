import { SelectClasses, SelectProps } from "@mui/material/Select";
import { useThemeProps } from "@mui/material/styles";
import { lazy } from "react";
import {
  AdaptiveMode,
  AdaptiveModeProp,
  useAdaptiveModeFromProps,
} from "../adaptiveMode/adaptiveMode";

export type AdaptiveSelectProps = SelectProps &
  AdaptiveModeProp & {
    classes?: Partial<SelectClasses> & Partial<AdaptiveSelectClasses>;
  };

export interface AdaptiveSelectClasses {
  /** Styles applied to the iOS mode */
  ios: string;
}

export type AdaptiveSelectKey = keyof AdaptiveSelectClasses;

// See docs\pages\docs\tech.mdx
const SelectAndroid = lazy(async () => {
  const { SelectAndroid } = await import("./android");
  return { default: SelectAndroid };
});
const SelectDesktop = lazy(async () => {
  const { SelectDesktop } = await import("./desktop");
  return { default: SelectDesktop };
});
const SelectIOS = lazy(async () => {
  const { SelectIOS } = await import("./ios");
  return { default: SelectIOS };
});

export default function AdaptiveSelect(inProps: AdaptiveSelectProps) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveSelect" });
  const [adaptiveMode, otherProps] = useAdaptiveModeFromProps(props);

  switch (adaptiveMode) {
    case AdaptiveMode.android:
      return <SelectAndroid {...otherProps} />;
    case AdaptiveMode.ios:
      return <SelectIOS {...otherProps} />;
    default:
      return <SelectDesktop {...otherProps} />;
  }
}
