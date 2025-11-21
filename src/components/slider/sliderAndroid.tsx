import Slider, { SliderProps, SliderType } from "@mui/material/Slider";

export const SliderAndroid: SliderType = function <
  RootComponent extends React.ElementType,
  AdditionalProps = {},
>(props: SliderProps<RootComponent, AdditionalProps>) {
  return <Slider {...props} />;
};
