import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import { css, CSSProperties, keyframes, styled } from "@mui/material/styles";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";

const gap = 8;
const length = 126;
const size = 44;

// https://github.com/mui/material-ui/blob/aa8cf28cb4b32fafd7c398f52dd8fde2a632f8e2/packages/mui-material/src/CircularProgress/CircularProgress.js#L26
const circularDashKeyframe = keyframes`
  0% {
    stroke-dasharray: 1px, ${gap}px, ${length - gap * 2 - 1}px, ${gap}px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, ${gap}px, ${length - gap * 2 - 100}px, ${gap}px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, ${gap}px, ${length - gap * 2 - 1}px, ${gap}px;
    stroke-dashoffset: -${length}px;
  }
`;
const dashAnimation =
  typeof circularDashKeyframe !== "string"
    ? css`
        animation: ${circularDashKeyframe} 1.4s ease-in-out infinite;
      `
    : { animation: `${circularDashKeyframe} 1.4s ease-in-out infinite` };

/**
 * MD3 https://m3.material.io/components/progress-indicators
 */
const StyledCircularProgress = styled(CircularProgress, {
  name: "AdaptiveCircularProgress",
  slot: "android",
})<{ ownerState: CircularProgressProps }>(({ theme }) => {
  return {
    [`& .${circularProgressClasses.circle}`]: {
      strokeLinecap: "round",
    },
    [`& .${circularProgressClasses.track}`]: {
      strokeDasharray: `80px, ${gap.toString()}px, ${(length - gap * 2 - 80).toString()}px, ${gap.toString()}px`,
      strokeLinecap: "round",
    },
    variants: [
      {
        props: (props) =>
          props.variant !== "determinate" && !props.disableShrink,
        style: {
          [`& .${circularProgressClasses.track}`]: dashAnimation,
        },
      },
      {
        props: (props) => props.variant === "determinate",
        style: {
          [`& .${circularProgressClasses.track}`]: {
            strokeDasharray: "var(--track-dasharray)",
            strokeDashoffset: "var(--track-dashoffset)",
            transition: theme.transitions.create([
              "stroke-dasharray",
              "stroke-dashoffset",
            ]),
          },
        },
      },
    ],
  };
});

export function CircularProgressAndroid(props: CircularProgressProps) {
  const { className, style, thickness = 3.6, value = 0, ...otherProps } = props;

  const composedClasses = composeClasses(
    { android: ["android"] },
    (s) => generateUtilityClass("AdaptiveCircularProgress", s),
    props.classes,
  );

  let determinateStyles: CSSProperties = {};
  if (props.variant === "determinate" && props.enableTrackSlot !== false) {
    // https://github.com/mui/material-ui/blob/aa8cf28cb4b32fafd7c398f52dd8fde2a632f8e2/packages/mui-material/src/CircularProgress/CircularProgress.js#L220
    const circumference = 2 * Math.PI * ((size - thickness) / 2);
    const percent = (100 - value) / 100;
    const remainingSpace = percent * circumference - (value <= 0 ? 0 : gap * 2);
    determinateStyles = {
      "--track-dasharray": `${circumference.toFixed(3)}px ${(value <= 0 ? 0 : gap).toString()}px ${Math.max(remainingSpace, 0).toFixed(3)}px`,
      "--track-dashoffset": `${(percent * circumference).toFixed(3)}px`,
    };
  }

  return (
    <StyledCircularProgress
      className={clsx(composedClasses.android, className)}
      ownerState={props}
      enableTrackSlot
      style={{ ...style, ...determinateStyles }}
      thickness={thickness}
      value={value}
      {...otherProps}
    />
  );
}
