import {
  SliderClasses,
  SliderOwnProps,
  SliderProps,
} from "@mui/material/Slider";
import { StyledComponentProps } from "@mui/material/styles";
import { OverridableComponent } from "@mui/types";
import { AndroidClasses } from "../../shared/android/androidClasses";
import { IosClasses } from "../../shared/ios/iosClasses";

export type AdaptiveSliderOwnProps = {
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple?: boolean;
  /**
   * If `true`, the keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple?: boolean;
} & StyledComponentProps<keyof AdaptiveSliderClasses>;

export interface AdaptiveSliderTypeMap<
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

export interface AdaptiveSliderClasses
  extends SliderClasses,
    IosClasses,
    AndroidClasses {}

type SliderComponent<Value extends number | number[]> = OverridableComponent<
  AdaptiveSliderTypeMap<"span", {}, Value>
>;
export type AdaptiveSliderType = SliderComponent<number> &
  SliderComponent<number[]> &
  SliderComponent<number | number[]>;
