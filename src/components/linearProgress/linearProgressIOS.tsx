import LinearProgress, {
  linearProgressClasses,
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";

/**
 * iOS 26 https://www.sketch.com/s/f63aa308-1f82-498c-8019-530f3b846db9/symbols?g=Progress%20Indicators
 */
const StyledLinearProgress = styled(LinearProgress, {
  name: "AdaptiveLinearProgress",
  slot: "ios",
})<{ ownerState: LinearProgressProps }>(({ theme }) => ({
  backgroundColor: "rgba(120, 120, 120, 0.2)",
  borderRadius: 3,
  height: 6,

  ...theme.applyStyles("dark", {
    backgroundColor: "rgba(120, 120, 128, 0.36)",
  }),

  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: "inherit",
  },
  [`& .${linearProgressClasses.dashed}`]: {
    backgroundImage: "none",
    borderRadius: "inherit",
  },
}));

export function LinearProgressIOS(props: LinearProgressProps) {
  const { className, ...otherProps } = props;

  const composedClasses = composeClasses(
    { ios: ["ios"] },
    (s) => generateUtilityClass("AdaptiveLinearProgress", s),
    props.classes,
  );

  return (
    <StyledLinearProgress
      className={clsx(composedClasses.ios, className)}
      ownerState={props}
      {...otherProps}
    />
  );
}
