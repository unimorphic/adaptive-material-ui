import { OverridableComponent } from "@mui/material/OverridableComponent";
import {
  sliderClasses,
  SliderClasses,
  SliderOwnProps,
  SliderProps,
} from "@mui/material/Slider";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import { lazy, ReactNode } from "react";
import { useAdaptiveMode } from "../../adaptiveMode/adaptiveMode";
import { IosClasses } from "../../shared/ios/iosClasses";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";

type AdaptiveSliderOwnProps = StyledComponentProps<keyof AdaptiveSliderClasses>;

interface AdaptiveSliderTypeMap<
  RootComponent extends React.ElementType = "span",
  AdditionalProps = {},
  Value extends number | number[] = number | number[],
> {
  props: AdditionalProps & SliderOwnProps<Value> & AdaptiveSliderOwnProps;
  defaultComponent: RootComponent;
}

export type AdaptiveSliderProps<
  RootComponent extends
    React.ElementType = AdaptiveSliderTypeMap["defaultComponent"],
  AdditionalProps = {},
> = SliderProps<RootComponent, AdditionalProps> & AdaptiveSliderOwnProps;

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

type SliderComponent<Value extends number | number[]> = OverridableComponent<
  AdaptiveSliderTypeMap<"span", {}, Value>
>;
type SliderType = SliderComponent<number> &
  SliderComponent<number[]> &
  SliderComponent<number | number[]>;

export const AdaptiveSlider: SliderType = function <
  RootComponent extends React.ElementType,
  AdditionalProps = {},
>(inProps: AdaptiveSliderProps<RootComponent, AdditionalProps>) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveSlider" });
  const adaptiveMode = useAdaptiveMode();

  let content: ReactNode;
  switch (adaptiveMode) {
    case "android":
      content = <SliderAndroid {...props} />;
      break;
    case "ios":
      content = <SliderIOS {...props} />;
      break;
    default:
      content = <SliderDesktop {...props} />;
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
};
