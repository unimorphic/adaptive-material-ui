import LinearProgress, {
  linearProgressClasses,
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import { CSSProperties, styled, Theme } from "@mui/material/styles";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";

const gap = 4;

//https://github.com/mui/material-ui/blob/aa8cf28cb4b32fafd7c398f52dd8fde2a632f8e2/packages/mui-material/src/LinearProgress/LinearProgress.js#L115
function getColorShade(theme: Theme, color: LinearProgressProps["color"]) {
  color ??= "primary";

  if (color === "inherit") {
    return "currentColor";
  }
  if (theme.vars) {
    return theme.vars.palette.LinearProgress[`${color}Bg`];
  }
  return theme.palette.mode === "light"
    ? theme.lighten(theme.palette[color].main, 0.62)
    : theme.darken(theme.palette[color].main, 0.5);
}

/**
 * MD3 https://m3.material.io/components/progress-indicators
 */
const StyledLinearProgress = styled(LinearProgress, {
  name: "AdaptiveLinearProgress",
  slot: "android",
})<{ ownerState: LinearProgressProps }>(({ ownerState, theme }) => {
  const positionTransition = theme.transitions.create(["left", "right"], {
    duration: "0.4s",
    easing: "linear",
  });

  return {
    borderRadius: 1000,

    [`& .${linearProgressClasses.bar}, & .${linearProgressClasses.dashed}`]: {
      borderRadius: "inherit",
    },
    variants: [
      {
        props: (props) => props.variant === "determinate",
        style: {
          backgroundColor: "transparent",

          "&:before": {
            backgroundColor: getColorShade(theme, ownerState.color),
            borderRadius: "inherit",
            content: '""',
            display: "block",
            height: "100%",
            left: `calc(var(--percent-value) + ${gap.toString()}px)`,
            position: "absolute",
            right: 0,
            transition: positionTransition,
          },
        },
      },
      {
        props: (props) => props.variant === "buffer",
        style: {
          [`& .${linearProgressClasses.bar2}`]: {
            left: `calc(var(--percent-value) + ${gap.toString()}px)`,
            right: "calc(100% - var(--percent-buffer))",
            transform: "none !important", // Override inline style
            transition: positionTransition,
            width: "auto",
          },
        },
      },
      {
        props: (props) =>
          props.variant === "buffer" || props.variant === "determinate",
        style: {
          "&:after": {
            backgroundColor:
              ownerState.color === "inherit"
                ? "currentColor"
                : (theme.vars ?? theme).palette[ownerState.color ?? "primary"]
                    .main,
            borderRadius: "inherit",
            content: '""',
            display: "block",
            height: "100%",
            position: "absolute",
            right: 0,
            width: 4,
          },
        },
      },
    ],
  };
});

export function LinearProgressAndroid(props: LinearProgressProps) {
  const { className, style, ...otherProps } = props;

  const composedClasses = composeClasses(
    { android: ["android"] },
    (s) => generateUtilityClass("AdaptiveLinearProgress", s),
    props.classes,
  );

  let determinateStyles: CSSProperties = {};
  if (props.variant === "determinate" || props.variant === "buffer") {
    determinateStyles = {
      "--percent-value": `${(props.value ?? 0).toString()}%`,
      "--percent-buffer": `${(props.valueBuffer ?? 0).toString()}%`,
    };
  }

  return (
    <StyledLinearProgress
      className={clsx(composedClasses.android, className)}
      ownerState={props}
      style={{ ...style, ...determinateStyles }}
      {...otherProps}
    />
  );
}
