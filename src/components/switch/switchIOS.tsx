import { buttonBaseClasses } from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import Switch, { switchClasses, SwitchProps } from "@mui/material/Switch";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import iosLiquidGlass from "../shared/iosLiquidGlass";
import RemoveComponentFromTheme from "../shared/removeComponentFromTheme";

/**
 * iOS 26 https://www.sketch.com/s/f63aa308-1f82-498c-8019-530f3b846db9/symbols?g=Toggle
 */
const StyledSwitch = styled(Switch, { name: "AdaptiveSwitch", slot: "ios" })<{
  ownerState: SwitchProps;
}>(({ theme, ownerState }) => {
  const height = ownerState.size === "small" ? 24 : 28;
  const width = ownerState.size === "small" ? 70 : 88;
  const padding = ownerState.size === "small" ? 7 : 12;

  return {
    height: height,
    overflow: "visible",
    padding: `0 ${padding.toString()}px`,
    width: width,

    [`& .${switchClasses.switchBase}`]: {
      left: padding,
      margin: 2,
      padding: 0,
      transition: theme.transitions.create(["color", "transform"], {
        duration: iosLiquidGlass.transitionDuration,
      }),

      [`&.${switchClasses.checked}`]: {
        transform: "translateX(21px)",

        [`& + .${switchClasses.track}`]: {
          opacity: 1,

          "&:before": {
            marginLeft: 0,
          },
        },
      },

      [`&.${buttonBaseClasses.focusVisible} .${switchClasses.thumb}`]:
        iosLiquidGlass.thumbFocused(),

      "&:active": {
        [`& .${switchClasses.thumb}`]: iosLiquidGlass.thumbActive(1.3),
        [`& + .${switchClasses.track}`]: {
          transform: "scale(0.75)",

          "&:before": {
            transform: "scale(calc(1/0.75))",
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
      borderRadius: 13,
      boxShadow: "none",
      height: height - 4,
      width: width - 25 - padding * 2,
      ...iosLiquidGlass.thumb(theme),
    },

    [`& .${switchClasses.track}`]: {
      borderRadius: 15,
      transition: theme.transitions.create(
        ["background-color", "opacity", "transform"],
        { duration: iosLiquidGlass.transitionDuration },
      ),

      "&:before": {
        backgroundColor: "inherit",
        borderRadius: "inherit",
        content: '""',
        display: "block",
        height: "100%",
        position: "absolute",
        marginLeft: width - height - padding * 2,
        transition: theme.transitions.create(["margin-left", "transform"], {
          duration: iosLiquidGlass.transitionDuration,
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
