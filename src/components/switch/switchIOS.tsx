import { buttonBaseClasses } from "@mui/material/ButtonBase";
import { alpha, styled, useTheme } from "@mui/material/styles";
import { switchClasses } from "@mui/material/Switch";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import { clsx } from "clsx";
import { ChangeEvent, useState } from "react";
import { iosLiquidGlass } from "../../shared/ios/iosLiquidGlass";
import { adaptiveSwitchClasses } from "./adaptiveSwitch";
import { SwitchBase, SwitchBaseProps } from "./switchBase";

const privateClasses = generateUtilityClasses("AdaptiveSwitch", ["switching"]);

/**
 * iOS 26 https://www.sketch.com/s/f63aa308-1f82-498c-8019-530f3b846db9/symbols?g=Toggle
 */
const StyledSwitchBase = styled(SwitchBase, {
  name: "AdaptiveSwitch",
  slot: "ios",
})<{ ownerState: SwitchBaseProps }>(({ theme, ownerState }) => {
  const largeHeight = 28;
  const largeWidth = 88;
  const largePadding = 12;
  const height = ownerState.size === "small" ? 24 : largeHeight;
  const width = ownerState.size === "small" ? 70 : largeWidth;
  const padding = ownerState.size === "small" ? 7 : largePadding;

  return {
    height: height,
    overflow: "visible",
    padding: `0 ${padding.toString()}px`,
    width: width,

    [`& .${switchClasses.switchBase}`]: {
      left: padding,
      margin: 2,
      padding: 0,
      transition: theme.transitions.create(["color", "transform"]),

      [`& .${switchClasses.input}`]: {
        height: "150%",
        left: "-25%",
        top: "-25%",
        width: "200%",
      },

      [`&.${switchClasses.checked}`]: {
        transform: `translateX(${(ownerState.size === "small" ? 18 : 21).toString()}px)`,

        [`& .${switchClasses.input}`]: {
          left: "-75%",
        },
        [`& + .${switchClasses.track}`]: {
          clipPath:
            'path("M 30 -6 C 3 -6 3 34 30 34 L 0 34 L 0 -6 Z M 55 -6 C 82 -6 82 34 55 34 L 85 34 L 85 -6 Z M 0 -6 L 41 -6 L 41 34 L 0 34 Z M 41 34 L 85 34 L 85 -6 L 41 -6 Z")',
          opacity: 1,
        },
        [`&:active, &.${privateClasses.switching}`]: {
          [`& + .${switchClasses.track}`]: {
            clipPath:
              'path("M 30 -6 C 3 -6 3 34 30 34 L 0 34 L 0 -6 Z M 55 -6 C 82 -6 82 34 55 34 L 85 34 L 85 -6 Z M 0 4 L 41 4 L 41 24 L 0 24 Z M 41 24 L 85 24 L 85 4 L 41 4 Z")',
          },
        },
        [`& .${switchClasses.thumb} .${adaptiveSwitchClasses.thumbIconChecked}`]:
          {
            color: "inherit",
          },
      },

      [`&:hover, &.${buttonBaseClasses.focusVisible}`]: {
        backgroundColor: "transparent",

        [`& .${switchClasses.thumb}`]: {
          boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.text.primary, 0.16)}`,

          "@media (hover: none)": {
            boxShadow: "none",
          },
        },
      },

      [`&:active, &.${privateClasses.switching}`]: {
        [`& .${switchClasses.thumb}`]: {
          ...iosLiquidGlass.thumbActive(1.7),

          [`& .${adaptiveSwitchClasses.thumbIcon}, & .${adaptiveSwitchClasses.thumbIconChecked}`]:
            {
              opacity: 0,
            },
        },
        [`& + .${switchClasses.track}`]: {
          clipPath:
            'path("M 9 -6 C -18 -6 -18 34 9 34 L -21 34 L -21 -6 Z M 34 -6 C 61 -6 61 34 34 34 L 64 34 L 64 -6 Z M -21 4 L 20 4 L 20 24 L -21 24 Z M 20 24 L 64 24 L 64 4 L 20 4 Z")',
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
      width: width - (ownerState.size === "small" ? 22 : 25) - padding * 2,
      ...iosLiquidGlass.thumb(theme),

      [`& .${adaptiveSwitchClasses.thumbIcon}`]: {
        color: "#C4C4C6",
      },
    },

    [`& .${switchClasses.track}`]: {
      clipPath:
        'path("M 9 -6 C -18 -6 -18 34 9 34 L -21 34 L -21 -6 Z M 34 -6 C 61 -6 61 34 34 34 L 64 34 L 64 -6 Z M -21 -6 L 20 -6 L 20 34 L -21 34 Z M 20 34 L 64 34 L 64 -6 L 20 -6 Z")',
      backgroundColor: "#C4C4C6",
      borderRadius: 15,
      height: largeHeight,
      opacity: 1,
      position: "absolute",
      transform: `scale(${((width - padding * 2) / (largeWidth - largePadding * 2)).toString()}, ${(height / largeHeight).toString()})`,
      transformOrigin: "left top",
      transition: theme.transitions.create([
        "clip-path",
        "background-color",
        "opacity",
      ]),
      width: largeWidth - largePadding * 2,
      ...theme.applyStyles("dark", {
        backgroundColor: "#5B5B5F",
      }),
    },
  };
});

export function SwitchIOS(props: SwitchBaseProps) {
  const { classes, className, onChange, ...otherProps } = props;
  const [isSwitching, setIsSwitching] = useState(false);
  const theme = useTheme();

  const composedClasses = composeClasses(
    { ios: ["ios"], switchBase: [isSwitching ? "switching" : undefined] },
    (s) => generateUtilityClass("AdaptiveSwitch", s),
    props.classes,
  );

  function onChangeSwitch(
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) {
    setIsSwitching(true);

    window.setTimeout(
      () => setIsSwitching(false),
      theme.transitions.duration.standard,
    );

    onChange?.(event, checked);
  }

  return (
    <StyledSwitchBase
      classes={{
        ...classes,
        switchBase: clsx(composedClasses.switchBase, classes?.switchBase),
      }}
      className={clsx(composedClasses.ios, className)}
      disableRipple
      onChange={onChangeSwitch}
      ownerState={props}
      {...otherProps}
    />
  );
}
