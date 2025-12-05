import Slider from "@mui/material/Slider";
import { AdaptiveSliderProps, AdaptiveSliderType } from "./sliderProps";

export const SliderDesktop: AdaptiveSliderType = function <
  RootComponent extends React.ElementType,
  AdditionalProps = {},
>(props: AdaptiveSliderProps<RootComponent, AdditionalProps>) {
  const { disableFocusRipple, disableRipple, ...otherProps } = props;

  return <Slider {...otherProps} />;
};
