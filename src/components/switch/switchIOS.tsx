import { buttonBaseClasses } from "@mui/material/ButtonBase";
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
}>(({ theme, ownerState }) => {
  const borderRadius = 15;
  const height = ownerState.size === "small" ? 24 : 28;
  const width = ownerState.size === "small" ? 56 : 64;

  return {
    height: height,
    overflow: "visible",
    padding: 0,
    width: width,

    [`& .${switchClasses.switchBase}`]: {
      margin: 2,
      padding: 0,
      transition: theme.transitions.create(["color", "transform"], {
        duration: 300,
      }),

      [`&.${switchClasses.checked}`]: {
        transform: "translateX(21px)",

        [`& + .${switchClasses.track}`]: {
          opacity: 1,

          "&:before": {
            right: `calc(100% - ${height.toString()}px)`,
          },
        },
      },

      [`&.${buttonBaseClasses.focusVisible} .${switchClasses.thumb}:after`]: {
        opacity: 1,
      },

      "&:active": {
        [`& .${switchClasses.thumb}`]: {
          backgroundColor: "transparent",
          boxShadow: "0 .5px 4px #0000001f, 0 6px 13px #0000001f",
          transform: "scale(1.3)",

          "&:after": {
            opacity: 1,
            transform: "scale(0.7)",
          },
          "&:before": {
            display: "block",
          },
        },
        [`& + .${switchClasses.track}`]: {
          transform: "scale(0.75)",

          "&:before": {
            transform: "scale(1.25)",
          },
        },
      },

      [`&.${switchClasses.disabled}`]: {
        [`& + .${switchClasses.track}, & .${switchClasses.thumb}`]: {
          opacity: 0.4,
        },
      },
    },

    [`& .${switchClasses.thumb}`]: {
      backgroundColor: theme.palette.common.white,
      borderRadius: 13,
      boxShadow: "none",
      display: "block",
      height: height - 4,
      transition: theme.transitions.create(["background-color", "transform"], {
        duration: 300,
      }),
      width: width - 25,

      "&:after": {
        content: '""',
        boxShadow: "0 0 40px 15px currentColor",
        display: "block",
        height: 1,
        left: "50%",
        opacity: 0,
        position: "absolute",
        top: "50%",
        transition: theme.transitions.create(["opacity", "transform"], {
          duration: 300,
        }),
        width: 1,
      },

      "&:before": {
        borderRadius: borderRadius,
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

    [`& .${switchClasses.track}`]: {
      borderRadius: borderRadius,
      transition: theme.transitions.create(
        ["background-color", "opacity", "transform"],
        { duration: 300 },
      ),

      "&:before": {
        backgroundColor: "inherit",
        borderRadius: borderRadius,
        content: '""',
        display: "block",
        height: "100%",
        position: "absolute",
        right: 0,
        transition: theme.transitions.create(["right", "transform"], {
          duration: 300,
        }),
        width: height,
        top: 0,
      },
    },
  };
});

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
