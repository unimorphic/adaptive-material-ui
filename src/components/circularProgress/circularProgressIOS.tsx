import { CircularProgressProps } from "@mui/material/CircularProgress";
import { css, keyframes, styled } from "@mui/material/styles";
import capitalize from "@mui/utils/capitalize";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import { Ref } from "react";

interface OwnerState {
  color: NonNullable<CircularProgressProps["color"]>;
  size: NonNullable<CircularProgressProps["size"]>;
  variant: NonNullable<CircularProgressProps["variant"]>;
}

const rotateKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

// https://github.com/mui/material-ui/blob/92c82252c77237100aebbea0446848a70d0ba2a7/packages/mui-material/src/CircularProgress/CircularProgress.js#L43
const rotateAnimation =
  typeof rotateKeyframe !== "string"
    ? css`
        animation: ${rotateKeyframe} 1s steps(8, end) infinite;
      `
    : { animation: `${rotateKeyframe} 1s steps(8, end) infinite` };

function Spinner(props: { className?: string; percent?: number }) {
  return (
    <svg
      className={props.className}
      fill="currentcolor"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.1211263,7.87887373 C11.730602,7.48834944 11.730602,6.85518446 12.1211263,6.46466017 L15.6566602,2.92912627 C16.0471845,2.53860197 16.6803494,2.53860197 17.0708737,2.92912627 C17.461398,3.31965056 17.461398,3.95281554 17.0708737,4.34333983 L13.5353398,7.87887373 C13.1448155,8.26939803 12.5116506,8.26939803 12.1211263,7.87887373 Z"
        opacity={
          props.percent !== undefined ? (props.percent >= 12.5 ? 1 : 0) : 0.91
        }
      />
      <path
        d="M13,10 C13,9.44771525 13.4477153,9 14,9 L19,9 C19.5522847,9 20,9.44771525 20,10 C20,10.5522847 19.5522847,11 19,11 L14,11 C13.4477153,11 13,10.5522847 13,10 Z"
        opacity={
          props.percent !== undefined ? (props.percent >= 25 ? 1 : 0) : 0.82
        }
      />
      <path
        d="M12.1211263,12.1211263 C12.5116506,11.730602 13.1448155,11.730602 13.5353398,12.1211263 L17.0708737,15.6566602 C17.461398,16.0471845 17.461398,16.6803494 17.0708737,17.0708737 C16.6803494,17.461398 16.0471845,17.461398 15.6566602,17.0708737 L12.1211263,13.5353398 C11.730602,13.1448155 11.730602,12.5116506 12.1211263,12.1211263 Z"
        opacity={
          props.percent !== undefined ? (props.percent >= 37.5 ? 1 : 0) : 0.73
        }
      />
      <path
        d="M10,13 C10.5522847,13 11,13.4477153 11,14 L11,19 C11,19.5522847 10.5522847,20 10,20 C9.44771525,20 9,19.5522847 9,19 L9,14 C9,13.4477153 9.44771525,13 10,13 Z"
        opacity={
          props.percent !== undefined ? (props.percent >= 50 ? 1 : 0) : 0.64
        }
      />
      <path
        d="M2.92912627,17.0708737 C2.53860197,16.6803494 2.53860197,16.0471845 2.92912627,15.6566602 L6.46466017,12.1211263 C6.85518446,11.730602 7.48834944,11.730602 7.87887373,12.1211263 C8.26939803,12.5116506 8.26939803,13.1448155 7.87887373,13.5353398 L4.34333983,17.0708737 C3.95281554,17.461398 3.31965056,17.461398 2.92912627,17.0708737 Z"
        opacity={
          props.percent !== undefined ? (props.percent >= 62.5 ? 1 : 0) : 0.55
        }
      />
      <path
        d="M-3.8285687e-16,10 C-3.8285687e-16,9.44771525 0.44771525,9 1,9 L6,9 C6.55228475,9 7,9.44771525 7,10 C7,10.5522847 6.55228475,11 6,11 L1,11 C0.44771525,11 -3.8285687e-16,10.5522847 -3.8285687e-16,10 Z"
        opacity={
          props.percent !== undefined ? (props.percent >= 75 ? 1 : 0) : 0.46
        }
      />
      <path
        d="M2.92912627,2.92912627 C3.31965056,2.53860197 3.95281554,2.53860197 4.34333983,2.92912627 L7.87887373,6.46466017 C8.26939803,6.85518446 8.26939803,7.48834944 7.87887373,7.87887373 C7.48834944,8.26939803 6.85518446,8.26939803 6.46466017,7.87887373 L2.92912627,4.34333983 C2.53860197,3.95281554 2.53860197,3.31965056 2.92912627,2.92912627 Z"
        opacity={
          props.percent !== undefined ? (props.percent >= 87.5 ? 1 : 0) : 0.37
        }
      />
      <path
        d="M10,0 C10.5522847,0 11,0.44771525 11,1 L11,6 C11,6.55228475 10.5522847,7 10,7 C9.44771525,7 9,6.55228475 9,6 L9,1 C9,0.44771525 9.44771525,0 10,0 Z"
        opacity={
          props.percent !== undefined ? (props.percent >= 100 ? 1 : 0) : 1
        }
      />
    </svg>
  );
}

const StyledSpinner = styled(Spinner, {
  name: "MuiCircularProgress",
  slot: "svg",
})({
  height: "100%",
  width: "100%",
});

const StyledMuiRoot = styled("div", {
  name: "MuiCircularProgress",
  slot: "root",
})();

/**
 * iOS 26 https://www.sketch.com/s/f63aa308-1f82-498c-8019-530f3b846db9/symbols?g=Progress%2520Indicators
 */
const StyledRoot = styled(StyledMuiRoot, {
  name: "AdaptiveCircularProgress",
  slot: "ios",
  overridesResolver: (props: { ownerState: OwnerState }, styles) => {
    return [
      styles.root,
      styles[props.ownerState.variant],
      styles[`color${capitalize(props.ownerState.color)}`],
      styles.ios,
    ];
  },
})<{ ownerState: OwnerState }>(({ ownerState, theme }) => ({
  color:
    ownerState.color !== "inherit"
      ? (theme.vars ?? theme).palette[ownerState.color].main
      : undefined,
  height: ownerState.size,
  width: ownerState.size,

  variants: [
    {
      props: (props) => props.variant !== "determinate",
      style: rotateAnimation,
    },
  ],
}));

export function CircularProgressIOS(props: CircularProgressProps) {
  const {
    className,
    color = "primary",
    disableShrink,
    enableTrackSlot,
    ref,
    size = 30,
    thickness,
    value = 0,
    variant = "indeterminate",
    ...otherProps
  } = props;

  const composedClasses = composeClasses(
    { ios: ["ios"] },
    (s) => generateUtilityClass("AdaptiveCircularProgress", s),
    props.classes,
  );
  const muiComposedClasses = composeClasses(
    { root: ["root", variant, `color${capitalize(color)}`], svg: ["svg"] },
    (s) => generateUtilityClass("MuiCircularProgress", s),
    props.classes,
  );

  return (
    <StyledRoot
      aria-valuenow={variant === "determinate" ? Math.round(value) : undefined}
      className={clsx(composedClasses.ios, muiComposedClasses.root, className)}
      ownerState={{ color: color, size: size, variant: variant }}
      ref={ref as Ref<HTMLDivElement>}
      role="progressbar"
      {...otherProps}
    >
      <StyledSpinner
        className={muiComposedClasses.svg}
        percent={variant === "determinate" ? value : undefined}
      />
    </StyledRoot>
  );
}
