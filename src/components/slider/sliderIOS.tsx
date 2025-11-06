import Slider, { sliderClasses, SliderProps } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import { iosLiquidGlass } from "../shared/iosLiquidGlass";
import { RemoveComponentFromTheme } from "../shared/removeComponentFromTheme";

/**
 * iOS 26 https://www.sketch.com/s/f63aa308-1f82-498c-8019-530f3b846db9/symbols?g=Sliders
 */
const StyledSlider = styled(Slider, { name: "AdaptiveSlider", slot: "ios" })<{
  ownerState: SliderProps;
}>(({ theme, ownerState }) => {
  const thumbTransform =
    ownerState.orientation === "vertical"
      ? "translate(-50%, 50%) rotate(90deg)"
      : "translate(-50%, -50%)";

  return {
    borderRadius: 3,
    [ownerState.orientation === "vertical" ? "width" : "height"]:
      ownerState.size === "small" ? 4 : 6,

    [`& .${sliderClasses.mark}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "dark" ? 700 : 400],
      borderRadius: 3,
      height: 4,
      [ownerState.orientation === "vertical" ? "left" : "top"]:
        "calc(50% + 8px)",
      width: 4,
    },

    [`& .${sliderClasses.rail}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "dark" ? 700 : 400],
    },

    [`& .${sliderClasses.thumb}`]: {
      borderRadius: 12,
      height: ownerState.size === "small" ? 16 : 24,
      transform: thumbTransform,
      width: ownerState.size === "small" ? 30 : 38,
      ...iosLiquidGlass.thumb(theme),

      [`&:not(:hover, .${sliderClasses.focusVisible})`]: {
        boxShadow:
          "0 0.5px 4px 0 rgba(0, 0, 0, 0.12), 0 6px 13px 0 rgba(0, 0, 0, 0.12)",
      },

      [`&.${sliderClasses.active}`]: iosLiquidGlass.thumbActive(
        1.4,
        thumbTransform,
      ),
    },

    [`& .${sliderClasses.track}`]: {
      border: "none",
    },

    [`&.${sliderClasses.disabled} .${sliderClasses.thumb}`]: {
      backgroundColor: "currentColor",
    },
  };
});

export function SliderIOS(props: SliderProps) {
  const { className, classes, ...otherProps } = props;

  const composedClasses = composeClasses(
    { ios: ["ios"] },
    (s) => generateUtilityClass("AdaptiveSlider", s),
    classes,
  );

  return (
    // Only use AdaptiveSlider styles
    <RemoveComponentFromTheme componentName="MuiSlider">
      <StyledSlider
        className={clsx(composedClasses.ios, className)}
        ownerState={props}
        {...otherProps}
      />
    </RemoveComponentFromTheme>
  );
}
