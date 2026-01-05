import Slider, { sliderClasses } from "@mui/material/Slider";
import { alpha, styled } from "@mui/material/styles";
import { mergeSlotProps, useControlled } from "@mui/material/utils";
import { useRtl } from "@mui/system/RtlProvider";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import { materialDesign } from "../../shared/android/materialDesign";
import { AdaptiveSliderProps, AdaptiveSliderType } from "./sliderProps";

const thumbWidth = 4;
const thumbPadding = 6;
const halfThumbWidth = thumbWidth / 2 + thumbPadding;
const overflow = 6;
const markWidth = 4;

function getBorderRadius(
  firstRadius: string,
  secondRadius: string,
  ownerState: AdaptiveSliderProps,
) {
  return ownerState.orientation === "vertical"
    ? `${secondRadius} ${secondRadius} ${firstRadius} ${firstRadius}`
    : `${firstRadius} ${secondRadius} ${secondRadius} ${firstRadius}`;
}

function getPercent(value: number, total: number) {
  return ((value / total) * 100).toString() + "%";
}

/**
 * MD3 https://m3.material.io/components/sliders
 */
const StyledSlider = styled(Slider, {
  name: "AdaptiveSlider",
  slot: "android",
})<{ ownerState: AdaptiveSliderProps & { arrayValue: number[] } }>(({
  ownerState,
  theme,
}) => {
  const currentColor = ownerState.disabled
    ? theme.palette.grey[400]
    : theme.palette[ownerState.color ?? "primary"].main;
  const trackColor = alpha(currentColor, 0.2);
  const opacity = ownerState.disabled ? 0.5 : undefined;
  const radius = { sm: "2px", md: "8px" };

  const transitionDuration = theme.transitions.duration.shortest;
  const sizeTransition = theme.transitions.create(
    ["bottom", "height", "left", "width"],
    { duration: transitionDuration },
  );

  return {
    borderRadius: radius.md,
    [ownerState.orientation === "vertical" ? "width" : "height"]:
      ownerState.size === "small" ? 16 : 24,

    [`& .${sliderClasses.mark}`]: {
      borderRadius: "50%",
      height: markWidth,
      transform:
        ownerState.orientation === "vertical"
          ? "translate(-50%, 50%)"
          : "translate(-50%, -50%)",
      width: markWidth,
    },

    [`& .${sliderClasses.rail}`]: {
      backgroundColor: "transparent",
      bottom: ownerState.orientation === "vertical" ? 0 : undefined,
      margin:
        ownerState.orientation === "vertical"
          ? `-${overflow.toString()}px 0`
          : `0 -${overflow.toString()}px`,
      opacity: 1,

      "& > span": {
        backgroundColor:
          ownerState.track === "inverted" ? "currentColor" : trackColor,
        opacity: opacity,
        overflow: "hidden",
        position: "absolute",
        transition: sizeTransition,
        [ownerState.orientation === "vertical" ? "width" : "height"]: "100%",

        "&:after": {
          backgroundColor: "currentColor",
          borderRadius: "50%",
          content: "''",
          display: ownerState.marks ? "none" : undefined,
          height: markWidth,
          [ownerState.orientation === "vertical" ? "left" : "top"]: "50%",
          position: "absolute",
          transform:
            ownerState.orientation === "vertical"
              ? "translate(-50%, 0)"
              : "translate(0, -50%)",
          width: markWidth,
        },
        "&.end": {
          borderRadius: getBorderRadius(radius.sm, radius.md, ownerState),
          [ownerState.orientation === "vertical"
            ? "marginBottom"
            : "marginLeft"]: halfThumbWidth,

          "&:after": {
            [ownerState.orientation === "vertical" ? "top" : "right"]: 4,
          },
        },
        "&.start": {
          borderRadius: getBorderRadius(radius.md, radius.sm, ownerState),
          bottom: ownerState.orientation === "vertical" ? 0 : undefined,
          [ownerState.orientation === "vertical" ? "marginTop" : "marginRight"]:
            halfThumbWidth,

          "&:after": {
            [ownerState.orientation === "vertical" ? "bottom" : "left"]: 4,
          },
        },
      },
    },

    [`& .${sliderClasses.thumb}`]: {
      borderRadius: 12,
      boxShadow: "none",
      height: ownerState.orientation === "vertical" ? thumbWidth : 44,
      opacity: opacity,
      transform:
        ownerState.orientation === "vertical"
          ? "translate(-50%, 50%)"
          : "translate(-50%, -50%)",
      width: ownerState.orientation === "vertical" ? 44 : thumbWidth,

      ...materialDesign.focusRipple(
        theme,
        ownerState,
        sizeTransition,
        thumbPadding,
      ),

      "&:before": {
        display: "none",
      },
      "&:hover": {
        boxShadow: "none",
      },
      [`&.${sliderClasses.active}, &.${sliderClasses.focusVisible}`]: {
        boxShadow: "none",
        [ownerState.orientation === "vertical" ? "height" : "width"]:
          thumbWidth / 2,
      },
      [`&.${sliderClasses.focusVisible}:not(.${sliderClasses.active})`]:
        materialDesign.focusRippleVisible(theme, ownerState),
    },

    [`& .${sliderClasses.track}`]: {
      backgroundColor: "transparent",
      border: "none",
      transition: sizeTransition,

      "& > span": {
        backgroundColor:
          ownerState.track === "inverted" ? trackColor : "currentColor",
        borderRadius: radius.sm,
        margin:
          ownerState.orientation === "vertical"
            ? `${halfThumbWidth.toString()}px 0`
            : `0 ${halfThumbWidth.toString()}px`,
        opacity: opacity,
        position: "absolute",
        transition: sizeTransition,
        [ownerState.orientation === "vertical" ? "width" : "height"]: "100%",

        "&.single": {
          borderRadius: getBorderRadius(radius.md, radius.sm, ownerState),
          margin:
            ownerState.orientation === "vertical"
              ? `${halfThumbWidth.toString()}px 0 -${overflow.toString()}px 0`
              : `0 ${halfThumbWidth.toString()}px 0 -${overflow.toString()}px`,
          [ownerState.orientation === "vertical" ? "height" : "width"]:
            `calc(100% - ${(halfThumbWidth - overflow).toString()}px)`,
        },
      },
    },

    [`& .${sliderClasses.valueLabel}`]: {
      backgroundColor: theme.palette.inverse.background,
      borderRadius: "50%",
      color: theme.palette.inverse.contrastText,
      padding: "0.8rem 1rem",

      "&:before": {
        display: "none",
      },
      [`&.${sliderClasses.valueLabelOpen}`]: {
        transform: "translateY(-90%) scale(1)",
      },
    },

    [`&.${sliderClasses.dragging}`]: {
      [`& .${sliderClasses.track}, & .${sliderClasses.rail}`]: {
        transition: "none",

        "& > span": {
          transition: "none",
        },
      },
    },
  };
});

export const SliderAndroid: AdaptiveSliderType = function <
  RootComponent extends React.ElementType,
  AdditionalProps = {},
>(props: AdaptiveSliderProps<RootComponent, AdditionalProps>) {
  const {
    className,
    disableFocusRipple,
    disableRipple,
    max = 100,
    min = 0,
    onChange,
    slotProps,
    ...otherProps
  } = props;
  const isRtl = useRtl();
  const ownerState = materialDesign.useButtonBaseRippleProps(props);

  const [valueDerived, setValueState] = useControlled({
    controlled: props.value,
    default: props.defaultValue ?? min,
    name: "SliderAndroid",
  });
  const arrayValue = Array.isArray(valueDerived)
    ? valueDerived
    : [valueDerived];
  const valueMin = Math.min(...arrayValue);
  const valueMax = Math.max(...arrayValue);

  const composedClasses = composeClasses(
    { android: ["android"] },
    (s) => generateUtilityClass("AdaptiveSlider", s),
    props.classes,
  );

  function onChangeSlider(
    event: Event,
    value: number | number[],
    activeThumb: number,
  ) {
    setValueState(value);
    onChange?.(event, value, activeThumb);
  }

  const leftBottomProp =
    props.orientation === "vertical" ? "bottom" : isRtl ? "right" : "left";
  const widthHeightProp = props.orientation === "vertical" ? "height" : "width";

  const trackChildren = arrayValue.map((v, i) =>
    i < arrayValue.length - 1 ? (
      <span
        key={i}
        style={{
          [leftBottomProp]: getPercent(v - valueMin, valueMax - valueMin),
          [widthHeightProp]: `calc(${getPercent(arrayValue[i + 1] - v, valueMax - valueMin)} - ${(halfThumbWidth * 2).toString()}px)`,
        }}
      />
    ) : null,
  );

  return (
    <StyledSlider
      className={clsx(composedClasses.android, className)}
      max={max}
      min={min}
      onChange={onChangeSlider}
      ownerState={{ ...ownerState, arrayValue: arrayValue }}
      slotProps={{
        ...slotProps,
        rail: mergeSlotProps(slotProps?.rail, {
          children: [
            arrayValue.length > 1 || props.track === false ? (
              <span
                className="start"
                key={1}
                style={{
                  [widthHeightProp]: `calc(${getPercent(valueMin - min, max - min)} - ${(halfThumbWidth - overflow).toString()}px)`,
                }}
              />
            ) : null,
            <span
              className="end"
              key={2}
              style={{
                [leftBottomProp]: `calc(${getPercent(valueMax - min, max - min)} + ${overflow.toString()}px)`,
                [widthHeightProp]: `calc(${getPercent(max - valueMax, max - min)} - ${(halfThumbWidth - overflow).toString()}px)`,
              }}
            />,
          ],
        }),
        track: mergeSlotProps(slotProps?.track, {
          children:
            arrayValue.length === 1 ? (
              <span className="single" />
            ) : (
              trackChildren
            ),
        }),
      }}
      {...otherProps}
    />
  );
};
