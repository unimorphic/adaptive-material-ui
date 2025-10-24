import { styled } from "@mui/material/styles";
import Switch, { switchClasses, SwitchProps } from "@mui/material/Switch";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import RemoveComponentFromTheme from "../shared/removeComponentFromTheme";

/**
 * iOS 26 https://www.sketch.com/s/f63aa308-1f82-498c-8019-530f3b846db9/symbols?g=Toggle
 */
const StyledSwitch = styled(Switch, { name: "AdaptiveSwitch", slot: "ios" })<{
  ownerState: SwitchProps;
}>(({ theme, ownerState }) => ({
  height: 36,
  padding: "4px 6px",
  width: 76,

  ...(ownerState.size === "small" && {
    height: 24,
    width: 56,
  }),

  [`& .${switchClasses.switchBase}`]: {
    margin: "6px 8px",
    padding: 0,
    transition: theme.transitions.create(["transform"], {
      duration: 300,
    }),

    "&:before": {
      backgroundColor: theme.palette.grey[700],
      borderRadius: 15,
      content: '""',
      display: "block",
      height: "calc(100% + 4px)",
      position: "absolute",
      right: -23,
      transition: theme.transitions.create(["background-color", "right"], {
        duration: 300,
      }),
      width: 28,
      top: -2,
      zIndex: -1,
    },

    [`&.${switchClasses.checked}`]: {
      transform: "translateX(21px)",

      "&:before": {
        backgroundColor: theme.palette.primary.main,
        right: 34,
      },
      [`& + .${switchClasses.track}`]: {
        opacity: 1,
      },
    },

    [`&:active`]: {
      [`& .${switchClasses.thumb}`]: {
        backgroundColor: "transparent",
        boxShadow: "0 .5px 4px #0000001f, 0 0px 1px #0000001f",
        transform: "scale(1.3)",

        "&:before": {
          display: "block",
        },
      },
      [`& + .${switchClasses.track}`]: {
        transform: "scale(0.75)",
      },
    },

    [`&.${switchClasses.disabled}`]: {
      [`& + .${switchClasses.track}, & .${switchClasses.thumb}`]: {
        opacity: 0.4,
      },
      "&:before": {
        display: "none",
      },
    },
  },

  [`& .${switchClasses.track}`]: {
    backgroundColor: theme.palette.grey[700],
    borderRadius: 15,
    opacity: 1,
    transition: theme.transitions.create(["background-color", "transform"], {
      duration: 300,
    }),
  },

  [`& .${switchClasses.thumb}`]: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 13,
    boxShadow: "none",
    display: "block",
    height: 24,
    transition: theme.transitions.create(["background-color", "transform"], {
      duration: 300,
    }),
    width: 39,

    ...(ownerState.size === "small" && {
      height: 20,
      width: 31,
    }),

    "&:before": {
      borderRadius: 15,
      boxShadow:
        theme.palette.mode === "dark"
          ? "inset 3px 3px 0px -3.5px #fff, inset -3px -3px 0px -3.5px #fff, inset -.5px -.5px 0px #ffffff80, inset .5px .5px 0px #ffffff1a, inset -3px 3px 0px -3.5px #ffffff40, inset 0px -5px 0px -3.5px #ffffff40, inset 0px -5px 5px #ffffff40"
          : "inset -3px -3px 0px -3.5px #fff, inset 3px 3px 0px -3.5px #fff, inset 0px 0px 0px .5px #ffffff80, inset 3px 3px 10px -2px #eee, inset -3px -3px 10px -2px #eee, inset 0 0 5px 1px #fff",
      content: '""',
      display: "none",
      height: "100%",
      width: "100%",
    },
  },
}));

export default function SwitchIOS(props: SwitchProps) {
  const { className, classes, ...otherProps } = props;

  const composedClasses = composeClasses(
    { ios: ["ios"] },
    (s) => generateUtilityClass("AdaptiveSwitch", s),
    classes,
  );

  return (
    // Only use AdaptiveSwitch styles
    <RemoveComponentFromTheme componentName="MuiSwitch">
      <StyledSwitch
        className={clsx(composedClasses.ios, className)}
        disableRipple
        ownerState={props}
        {...otherProps}
      />
    </RemoveComponentFromTheme>
  );
}
