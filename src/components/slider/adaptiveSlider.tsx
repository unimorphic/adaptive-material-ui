import { sliderClasses } from "@mui/material/Slider";
import { useThemeProps } from "@mui/material/styles";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import { lazy, ReactNode } from "react";
import { useAdaptiveMode } from "../../adaptiveMode/adaptiveMode";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";
import { AdaptiveSliderProps, AdaptiveSliderType } from "./sliderProps";

export const adaptiveSliderClasses = {
  ...sliderClasses,
  ...generateUtilityClasses("AdaptiveSlider", ["android", "ios"]),
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

export const AdaptiveSlider: AdaptiveSliderType = function <
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
