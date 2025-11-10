import {
  sliderClasses,
  SliderClasses,
  SliderProps,
} from "@mui/material/Slider";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import { lazy, ReactNode } from "react";
import {
  AdaptiveModeProp,
  useAdaptiveModeFromProps,
} from "../../adaptiveMode/adaptiveMode";
import { IosClasses } from "../../shared/iosClasses";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";

export interface AdaptiveSliderProps
  extends Omit<SliderProps, "classes">,
    StyledComponentProps<keyof AdaptiveSliderClasses>,
    AdaptiveModeProp {}

export interface AdaptiveSliderClasses extends SliderClasses, IosClasses {}

export const adaptiveSliderClasses = {
  ...sliderClasses,
  ...generateUtilityClasses("AdaptiveSlider", ["ios"]),
};

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

export function AdaptiveSlider(inProps: AdaptiveSliderProps) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveSlider" });
  const [adaptiveMode, otherProps] = useAdaptiveModeFromProps(props);

  let content: ReactNode;
  switch (adaptiveMode) {
    case "android":
      content = <SliderAndroid {...otherProps} />;
      break;
    case "ios":
      content = <SliderIOS {...otherProps} />;
      break;
    default:
      content = <SliderDesktop {...otherProps} />;
      break;
  }

  return (
    <ReplaceComponentInTheme
      sourceComponentName="AdaptiveSlider"
      targetComponentName="MuiSlider"
    >
      {content}
    </ReplaceComponentInTheme>
  );
}
