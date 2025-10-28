import { SliderClassKey, SliderProps } from "@mui/material/Slider";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import { lazy } from "react";
import {
  AdaptiveModeProp,
  useAdaptiveModeFromProps,
} from "../../adaptiveMode/adaptiveMode";

export interface AdaptiveSliderProps
  extends Omit<SliderProps, "classes">,
    StyledComponentProps<SliderClassKey | AdaptiveSliderKey>,
    AdaptiveModeProp {}

export interface AdaptiveSliderClasses {
  /** Styles applied to the iOS mode */
  ios: string;
}

export type AdaptiveSliderKey = keyof AdaptiveSliderClasses;

// See docs\pages\docs\codeSplitting.md
const SliderAndroid = lazy(async () => {
  const { SliderAndroid } = await import("../android");
  return { default: SliderAndroid };
});
const SliderDesktop = lazy(async () => {
  const { SliderDesktop } = await import("../desktop");
  return { default: SliderDesktop };
});
const SliderIOS = lazy(async () => {
  const { SliderIOS } = await import("../ios");
  return { default: SliderIOS };
});

export default function AdaptiveSlider(inProps: AdaptiveSliderProps) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveSlider" });
  const [adaptiveMode, otherProps] = useAdaptiveModeFromProps(props);

  switch (adaptiveMode) {
    case "android":
      return <SliderAndroid {...otherProps} />;
    case "ios":
      return <SliderIOS {...otherProps} />;
    default:
      return <SliderDesktop {...otherProps} />;
  }
}
