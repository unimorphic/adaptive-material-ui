import { buttonBaseClasses } from "@mui/material/ButtonBase";
import { alpha, styled, Theme } from "@mui/material/styles";
import { switchClasses } from "@mui/material/Switch";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import { materialDesign } from "../../shared/android/materialDesign";
import { adaptiveSwitchClasses } from "./adaptiveSwitch";
import { getSwitchColor, SwitchBase, SwitchBaseProps } from "./switchBase";

function getBoxShadow(theme: Theme, depth: number) {
  return `0px 0px 0px ${depth.toString()}px ${alpha(theme.palette.grey[500], 0.08)}`;
}

/**
 * MD3 https://m3.material.io/components/switch https://material-web.dev/components/switch/
 */
const StyledSwitchBase = styled(SwitchBase, {
  name: "AdaptiveSwitch",
  slot: "android",
})<{ ownerState: SwitchBaseProps }>(({ theme, ownerState }) => {
  const height = ownerState.size === "small" ? 28 : 32;
  const width = ownerState.size === "small" ? 58 : 76;
  const padding = ownerState.size === "small" ? 7 : 12;

  const transitionDuration = theme.transitions.duration.shortest;
  const currentColor = getSwitchColor(theme, ownerState.color);
  const lightColor =
    ownerState.color === "default"
      ? theme.palette.grey[200]
      : (theme.vars ?? theme).palette[ownerState.color ?? "primary"].light;
  let darkColor =
    ownerState.color === "default"
      ? theme.palette.grey[300]
      : (theme.vars ?? theme).palette[ownerState.color ?? "primary"].dark;
  darkColor = theme.darken(darkColor, 0.4);
  const hasThumbIcon =
    Boolean(ownerState.thumbIcon) || Boolean(ownerState.thumbIconChecked);

  return {
    height: height,
    overflow: "visible",
    padding: `0 ${padding.toString()}px`,
    width: width,

    [`& .${switchClasses.switchBase}`]: {
      left: padding + (hasThumbIcon ? 7 : 5),
      margin: 2,
      padding: 0,
      top: 6,
      transform: hasThumbIcon ? "scale(1.5)" : undefined,
      transition: theme.transitions.create(["color", "transform"], {
        duration: transitionDuration,
      }),

      [`& .${switchClasses.input}`]: {
        height: "250%",
        left: "-50%",
        top: "-75%",
        width: "350%",
      },

      [`&.${switchClasses.checked}`]: {
        transform: `translateX(${((ownerState.size === "small" ? 17 : 21) - (hasThumbIcon ? 2 : 0)).toString()}px) scale(1.5)`,

        [`& .${switchClasses.input}`]: {
          height: "150%",
          left: "-125%",
          top: "-25%",
          width: "250%",
        },
        [`& + .${switchClasses.track}`]: {
          opacity: 1,
        },
        [`& .${switchClasses.thumb}`]: {
          color: theme.palette.common.white,

          ...theme.applyStyles("dark", {
            color: darkColor,
          }),

          [`& .${adaptiveSwitchClasses.thumbIconChecked}`]: {
            color: currentColor,
          },
        },
      },

      ["&:hover"]: {
        backgroundColor: "transparent",

        [`& .${switchClasses.thumb}`]: {
          boxShadow: getBoxShadow(theme, hasThumbIcon ? 6 : 12),
          color: theme.palette.grey[700],
          ...theme.applyStyles("dark", {
            color: theme.palette.grey[500],
          }),

          "@media (hover: none)": {
            boxShadow: "none",
          },
        },

        [`&.${switchClasses.checked} .${switchClasses.thumb}`]: {
          boxShadow: getBoxShadow(theme, 6),
          color: lightColor,
          ...theme.applyStyles("dark", {
            color: darkColor,
          }),

          "@media (hover: none)": {
            boxShadow: "none",
          },
        },
      },

      [`&.${buttonBaseClasses.focusVisible} + .${switchClasses.track}`]:
        materialDesign.focusRippleVisible(theme, ownerState),

      [`&:active`]: {
        [`& .${switchClasses.thumb}`]: {
          boxShadow: getBoxShadow(theme, 4),
          transform: hasThumbIcon ? "scale(1.166)" : "scale(1.75)",
        },
        [`&.${switchClasses.checked}`]: {
          [`& .${switchClasses.thumb}`]: {
            boxShadow: getBoxShadow(theme, 4),
            transform: "scale(1.166)",
          },
        },
      },
    },

    [`& .${switchClasses.thumb}`]: {
      boxShadow: "none",
      color: theme.palette.grey[500],
      height: height - 16,
      padding: ownerState.size !== "small" ? 3 : 1,
      transition: theme.transitions.create(
        ["box-shadow", "color", "transform"],
        { duration: transitionDuration },
      ),
      width: height - 16,

      [`& .${adaptiveSwitchClasses.thumbIcon}`]: {
        color: theme.palette.common.white,
      },
    },

    [`& .${switchClasses.track}`]: {
      backgroundColor: theme.palette.grey[300],
      border: `2px solid ${theme.palette.divider}`,
      borderRadius: 15,
      height: height,
      opacity: 1,
      position: "absolute",
      width: width - padding * 2,
      ...theme.applyStyles("dark", {
        backgroundColor: theme.palette.grey[800],
      }),

      ...materialDesign.focusRipple(
        theme,
        ownerState,
        theme.transitions.create(["background-color", "opacity"], {
          duration: transitionDuration,
        }),
      ),
    },

    variants: [
      {
        props: (props) => props.disabled === true,
        style: {
          [`& .${switchClasses.switchBase}.${switchClasses.disabled} + .${switchClasses.track}`]:
            {
              backgroundColor: "transparent",
              opacity: 1,
            },
          [`& .${switchClasses.switchBase}.${switchClasses.checked} + .${switchClasses.track}`]:
            {
              backgroundColor: theme.palette.grey[300],
              opacity: 0.4,
              ...theme.applyStyles("dark", {
                backgroundColor: theme.palette.grey[800],
              }),
            },
          [`& .${switchClasses.switchBase} .${switchClasses.thumb}`]: {
            opacity: 0.7,
          },
          [`& .${switchClasses.switchBase}.${switchClasses.checked} .${switchClasses.thumb}`]:
            {
              backgroundColor: theme.palette.common.white,
              ...theme.applyStyles("dark", {
                backgroundColor: theme.palette.common.black,
              }),
            },
        },
      },
    ],
  };
});

export function SwitchAndroid(props: SwitchBaseProps) {
  const { className, disableFocusRipple, ...otherProps } = props;

  const composedClasses = composeClasses(
    { android: ["android"] },
    (s) => generateUtilityClass("AdaptiveSwitch", s),
    props.classes,
  );

  return (
    <StyledSwitchBase
      className={clsx(composedClasses.android, className)}
      disableFocusRipple
      disableTouchRipple
      ownerState={props}
      {...otherProps}
    />
  );
}
