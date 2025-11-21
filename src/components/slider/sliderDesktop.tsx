import Slider, { SliderProps, SliderType } from "@mui/material/Slider";

export const SliderDesktop: SliderType = function <
  RootComponent extends React.ElementType,
  AdditionalProps = {},
>(props: SliderProps<RootComponent, AdditionalProps>) {
  return <Slider {...props} />;
};
